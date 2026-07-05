import { ChevronLeft, ChevronRight, RotateCcw, Search, Shuffle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MemoryAidVisual } from "../components/memoryAids/MemoryAidVisual";
import { sectionOrder } from "../data/competencyTasks";
import { flashcards } from "../data/flashcards";
import { getMemoryAidVisualsForFlashcard } from "../data/memoryAidVisuals";
import { studyAssets } from "../data/studyAssets";
import { PageHeader } from "../components/ui/PageHeader";
import { useProgress } from "../state/ProgressContext";
import type { CardType, CompetencySection, Difficulty, FlashcardStatus } from "../types";

const cardTypeLabels: Record<CardType, string> = {
  "applied-choice": "Applied choice",
  "example-nonexample": "Example / nonexample",
  "memory-aid": "Memory aid",
  "wrong-answer-boundary": "Wrong-answer boundary",
  comparison: "Comparison",
  definition: "Definition",
  procedure: "Procedure",
  scenario: "Scenario",
  "self-check": "Self-check",
  term: "Term",
};

const statusLabels: Record<FlashcardStatus, string> = {
  known: "Known",
  "needs-review": "Needs review",
  "not-started": "Not started",
};

const taskNumbers = Array.from(new Set(flashcards.map((card) => card.taskNumber))).sort((a, b) => a - b);
const cardTypes = Array.from(new Set(flashcards.map((card) => card.cardType))).sort();
const difficulties = Array.from(new Set(flashcards.map((card) => card.difficulty))).sort();

const difficultyLabels: Record<Difficulty, string> = {
  challenge: "Challenge",
  core: "Core",
  intro: "Intro",
};

type CardMode = "normal" | "mini";

function hashString(value: string) {
  return value.split("").reduce((hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0, 0);
}

function shuffleScore(cardId: string, seed: number) {
  return hashString(`${cardId}:${seed}`);
}

function shouldIgnoreFlashcardShortcutTarget(target: EventTarget | null, key: string) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const isTextEntryTarget = Boolean(
    target.closest(
      'input, textarea, select, [contenteditable="true"], [role="textbox"], [role="combobox"], [role="listbox"], [role="slider"]',
    ),
  );

  if (isTextEntryTarget) {
    return true;
  }

  return (key === " " || key === "Spacebar") && Boolean(target.closest("button"));
}

function isNumberShortcut(event: KeyboardEvent, numberKey: "1" | "2") {
  return event.key === numberKey || event.code === `Digit${numberKey}` || event.code === `Numpad${numberKey}`;
}

export function FlashcardsPage() {
  const { markFlashcardKnown, markFlashcardNeedsReview, progress, summary } = useProgress();
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(flashcards[0]?.id);
  const [query, setQuery] = useState("");
  const [sectionFilter, setSectionFilter] = useState<CompetencySection | "all">("all");
  const [taskFilter, setTaskFilter] = useState<number | "all">("all");
  const [typeFilter, setTypeFilter] = useState<CardType | "all">("all");
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "all">("all");
  const [statusFilter, setStatusFilter] = useState<FlashcardStatus | "all">("all");
  const [cardMode, setCardMode] = useState<CardMode>("normal");
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const deckCounts = useMemo(
    () =>
      Object.fromEntries(
        sectionOrder.map((section) => [section, flashcards.filter((card) => card.section === section).length]),
      ),
    [],
  );

  const flashcardStatusCounts = useMemo(
    () =>
      flashcards.reduce(
        (counts, card) => {
          const status = progress.flashcards[card.id] ?? "not-started";
          counts[status] += 1;
          return counts;
        },
        { known: 0, "needs-review": 0, "not-started": 0 } as Record<FlashcardStatus, number>,
      ),
    [progress.flashcards],
  );

  const filteredCards = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const matchingCards = flashcards.filter((card) => {
      const status = progress.flashcards[card.id] ?? "not-started";
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          card.front,
          card.back,
          card.explanation,
          card.memoryAid,
          card.section,
          card.taskNumber.toString(),
          card.cardType,
          ...card.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return (
        matchesQuery &&
        (sectionFilter === "all" || card.section === sectionFilter) &&
        (taskFilter === "all" || card.taskNumber === taskFilter) &&
        (typeFilter === "all" || card.cardType === typeFilter) &&
        (difficultyFilter === "all" || card.difficulty === difficultyFilter) &&
        (statusFilter === "all" || status === statusFilter)
      );
    });

    if (shuffleSeed === 0) {
      return matchingCards;
    }

    return [...matchingCards].sort((first, second) => shuffleScore(first.id, shuffleSeed) - shuffleScore(second.id, shuffleSeed));
  }, [difficultyFilter, progress.flashcards, query, sectionFilter, shuffleSeed, statusFilter, taskFilter, typeFilter]);

  useEffect(() => {
    if (filteredCards.length === 0) {
      setSelectedCardId(undefined);
      return;
    }

    if (!filteredCards.some((card) => card.id === selectedCardId)) {
      setSelectedCardId(filteredCards[0].id);
      setIsFlipped(false);
    }
  }, [filteredCards, selectedCardId]);

  const selectedCard = filteredCards.find((card) => card.id === selectedCardId) ?? filteredCards[0];
  const selectedIndex = selectedCard ? filteredCards.findIndex((card) => card.id === selectedCard.id) : -1;
  const selectedCardVisuals = selectedCard ? getMemoryAidVisualsForFlashcard(selectedCard).slice(0, 2) : [];

  function goToCard(nextIndex: number) {
    const nextCard = filteredCards[nextIndex];
    if (!nextCard) {
      return;
    }
    setSelectedCardId(nextCard.id);
    setIsFlipped(false);
  }

  useEffect(() => {
    function handleFlashcardShortcuts(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.altKey ||
        event.ctrlKey ||
        event.shiftKey ||
        shouldIgnoreFlashcardShortcutTarget(event.target, event.key) ||
        !selectedCard
      ) {
        return;
      }

      if (event.key === "ArrowLeft" && selectedIndex > 0) {
        event.preventDefault();
        goToCard(selectedIndex - 1);
        return;
      }

      if (event.key === "ArrowRight" && selectedIndex < filteredCards.length - 1) {
        event.preventDefault();
        goToCard(selectedIndex + 1);
        return;
      }

      if (event.key === " " || event.key === "Spacebar" || event.code === "Space") {
        event.preventDefault();
        setIsFlipped((value) => !value);
        return;
      }

      if (isNumberShortcut(event, "1")) {
        event.preventDefault();
        markFlashcardNeedsReview(selectedCard.id);
        return;
      }

      if (isNumberShortcut(event, "2")) {
        event.preventDefault();
        markFlashcardKnown(selectedCard.id);
      }
    }

    window.addEventListener("keydown", handleFlashcardShortcuts);
    return () => window.removeEventListener("keydown", handleFlashcardShortcuts);
  }, [filteredCards, markFlashcardKnown, markFlashcardNeedsReview, selectedCard, selectedIndex]);

  function clearFilters() {
    setQuery("");
    setSectionFilter("all");
    setTaskFilter("all");
    setTypeFilter("all");
    setDifficultyFilter("all");
    setStatusFilter("all");
    setShuffleSeed(0);
    setIsFlipped(false);
  }

  function shuffleDeck() {
    const nextSeed = shuffleSeed + 1;
    const shuffledCards = [...filteredCards].sort((first, second) => shuffleScore(first.id, nextSeed) - shuffleScore(second.id, nextSeed));
    setShuffleSeed(nextSeed);
    setSelectedCardId(shuffledCards[0]?.id);
    setIsFlipped(false);
  }

  return (
    <section className="page flashcard-page">
      <PageHeader title="Flashcards">
        {studyAssets.flashcardCount} planned cards. {flashcards.length} original cards are loaded for tasks{" "}
        {taskNumbers[0]}-{taskNumbers[taskNumbers.length - 1]}.
      </PageHeader>

      <div className="deck-counter-grid" aria-label="Flashcard deck counter">
        <div>
          <span>Total deck</span>
          <strong>
            {flashcards.length} / {studyAssets.flashcardCount}
          </strong>
        </div>
        <div>
          <span>Filtered</span>
          <strong>{filteredCards.length}</strong>
        </div>
        <div>
          <span>Known</span>
          <strong>{flashcardStatusCounts.known}</strong>
        </div>
        <div>
          <span>Needs review</span>
          <strong>{flashcardStatusCounts["needs-review"]}</strong>
        </div>
      </div>

      <div className="learning-mode-bar" aria-label="Flashcard mode controls">
        <div className="segmented-control" role="group" aria-label="Card display mode">
          <button
            className={cardMode === "normal" ? "mode-button is-selected" : "mode-button"}
            type="button"
            onClick={() => setCardMode("normal")}
            aria-pressed={cardMode === "normal"}
          >
            Normal cards
          </button>
          <button
            className={cardMode === "mini" ? "mode-button is-selected" : "mode-button"}
            type="button"
            onClick={() => setCardMode("mini")}
            aria-pressed={cardMode === "mini"}
          >
            Mini cards
          </button>
        </div>
        <button className="utility-action-button" type="button" onClick={shuffleDeck}>
          <Shuffle size={17} aria-hidden="true" />
          Shuffle
        </button>
        <span className="keyboard-hint">Space flips · arrows move · 1 review · 2 known</span>
      </div>

      <div className="flashcard-toolbar" aria-label="Flashcard search and filters">
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Search flashcards</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search cards, concepts, tags..."
          />
        </label>
        <label>
          <span>Section</span>
          <select value={sectionFilter} onChange={(event) => setSectionFilter(event.target.value as CompetencySection | "all")}>
            <option value="all">All sections</option>
            {sectionOrder.map((section) => (
              <option value={section} key={section}>
                {section}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Task</span>
          <select
            value={taskFilter}
            onChange={(event) => setTaskFilter(event.target.value === "all" ? "all" : Number(event.target.value))}
          >
            <option value="all">All tasks</option>
            {taskNumbers.map((taskNumber) => (
              <option value={taskNumber} key={taskNumber}>
                Task {taskNumber}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Type</span>
          <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as CardType | "all")}>
            <option value="all">All types</option>
            {cardTypes.map((cardType) => (
              <option value={cardType} key={cardType}>
                {cardTypeLabels[cardType]}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Difficulty</span>
          <select value={difficultyFilter} onChange={(event) => setDifficultyFilter(event.target.value as Difficulty | "all")}>
            <option value="all">All difficulties</option>
            {difficulties.map((difficulty) => (
              <option value={difficulty} key={difficulty}>
                {difficultyLabels[difficulty]}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Status</span>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as FlashcardStatus | "all")}>
            <option value="all">All statuses</option>
            {Object.entries(statusLabels).map(([status, label]) => (
              <option value={status} key={status}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <button className="filter-clear-button" type="button" onClick={clearFilters}>
          Clear
        </button>
      </div>

      <div className="flashcard-layout">
        <aside className="deck-panel">
          <h2>Deck Groups</h2>
          {sectionOrder.map((section) => (
            <button
              className={sectionFilter === section ? "deck-button is-selected" : "deck-button"}
              type="button"
              onClick={() => {
                setSectionFilter(section);
                setTaskFilter("all");
                setIsFlipped(false);
              }}
              key={section}
            >
              <span>{section}</span>
              <strong>{deckCounts[section]}</strong>
            </button>
          ))}
        </aside>

        <section className={cardMode === "mini" ? "study-panel is-mini-card-mode" : "study-panel"} aria-label="Flashcard study area">
          <div className="card-progress">
            {filteredCards.length > 0 ? selectedIndex + 1 : 0} / {filteredCards.length} filtered cards ·{" "}
            {summary.flashcardsKnown} known
          </div>
          {selectedCard ? (
            <>
              <button
                className={isFlipped ? "seed-card is-flipped" : "seed-card"}
                type="button"
                onClick={() => setIsFlipped((value) => !value)}
                aria-keyshortcuts="Space"
                title="Flip card"
              >
                <span className="seed-label">
                  Task {selectedCard.taskNumber} · {cardTypeLabels[selectedCard.cardType]} ·{" "}
                  {statusLabels[progress.flashcards[selectedCard.id] ?? "not-started"]}
                </span>
                <h2>{isFlipped ? selectedCard.back : selectedCard.front}</h2>
                {isFlipped ? (
                  <>
                    <p>{selectedCard.explanation}</p>
                    <dl className="seed-metadata">
                      <div>
                        <dt>Memory aid</dt>
                        <dd>{selectedCard.memoryAid}</dd>
                      </div>
                      <div>
                        <dt>Difficulty</dt>
                        <dd>{selectedCard.difficulty}</dd>
                      </div>
                      <div>
                        <dt>Assessment</dt>
                        <dd>{selectedCard.assessmentTypes.join(", ")}</dd>
                      </div>
                    </dl>
                  </>
                ) : (
                  <p className="seed-explanation">Click the card or use Flip to reveal the answer and explanation.</p>
                )}
              </button>
              {isFlipped && selectedCardVisuals.length > 0 ? (
                <div className="flashcard-visual-panel" aria-label="Related visual memory aids">
                  <h3>Visual Memory Aid</h3>
                  <div>
                    {selectedCardVisuals.map((visual) => (
                      <MemoryAidVisual id={visual.id} compact key={visual.id} />
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="card-controls" aria-label="Flashcard controls">
                <button
                  type="button"
                  onClick={() => goToCard(selectedIndex - 1)}
                  disabled={selectedIndex <= 0}
                  aria-keyshortcuts="ArrowLeft"
                  title="Previous card"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setIsFlipped((value) => !value)}
                  aria-keyshortcuts="Space"
                  title="Flip card"
                >
                  <RotateCcw size={16} aria-hidden="true" /> Flip
                </button>
                <button
                  type="button"
                  onClick={() => goToCard(selectedIndex + 1)}
                  disabled={selectedIndex >= filteredCards.length - 1}
                  aria-keyshortcuts="ArrowRight"
                  title="Next card"
                >
                  Next
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => markFlashcardNeedsReview(selectedCard.id)}
                  aria-keyshortcuts="1"
                  title="Mark needs review"
                >
                  Needs Review
                </button>
                <button
                  type="button"
                  onClick={() => markFlashcardKnown(selectedCard.id)}
                  aria-keyshortcuts="2"
                  title="Mark known"
                >
                  Mark Known
                </button>
              </div>
              <div className={cardMode === "mini" ? "seed-list mini-card-grid" : "seed-list"} aria-label="Filtered flashcards">
                {filteredCards.map((card) => (
                  <button
                    className={card.id === selectedCard.id ? "seed-list-item is-selected" : "seed-list-item"}
                    type="button"
                    onClick={() => {
                      setSelectedCardId(card.id);
                      setIsFlipped(false);
                    }}
                    key={card.id}
                  >
                    <span>Task {card.taskNumber}</span>
                    <strong>{card.front}</strong>
                    <small>{statusLabels[progress.flashcards[card.id] ?? "not-started"]}</small>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-card">
              <RotateCcw size={46} aria-hidden="true" />
              <p>No cards match the current filters.</p>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
