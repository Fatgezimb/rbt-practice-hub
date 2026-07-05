import { BarChart3, BookOpen, Brain, ClipboardCheck, ClipboardList, Home, Info, Layers3, Map, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useProgress } from "../../state/ProgressContext";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/map", label: "Map", icon: Map },
  { to: "/assessment", label: "BCBA Form", icon: ClipboardCheck },
  { to: "/flashcards", label: "Flashcards", icon: Layers3 },
  { to: "/practice", label: "Practice", icon: ClipboardList },
  { to: "/guide", label: "Guide", icon: BookOpen },
  { to: "/progress", label: "Progress", icon: BarChart3 },
  { to: "/about", label: "About", icon: Info },
];

export function Header({ onOpenDrawer }: { onOpenDrawer: () => void }) {
  const { summary } = useProgress();
  const location = useLocation();
  const [siteMenuOpen, setSiteMenuOpen] = useState(false);

  useEffect(() => {
    setSiteMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!siteMenuOpen) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSiteMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [siteMenuOpen]);

  return (
    <header className="app-header">
      <NavLink className="brand-link" to="/" aria-label="RBT Practice Hub home">
        <span className="brand-mark" aria-hidden="true">
          <Brain size={27} />
        </span>
        <span className="brand-name">RBT Practice Hub</span>
      </NavLink>

      <nav className="top-nav" aria-label="Primary navigation">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink className="top-nav-link" to={to} key={to}>
            <Icon size={20} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        className="site-menu-button"
        type="button"
        aria-expanded={siteMenuOpen}
        aria-controls="site-menu-dialog"
        onClick={() => setSiteMenuOpen(true)}
      >
        <Menu size={22} aria-hidden="true" />
        <span>Menu</span>
      </button>

      <div className="header-progress" aria-label={`${summary.ready} of ${summary.total} tasks practice ready`}>
        <span className="progress-ring">{summary.percentReady}%</span>
        <span>
          <strong>
            {summary.ready} of {summary.total}
          </strong>
          <small>practice ready</small>
        </span>
      </div>

      <button className="mobile-task-button" type="button" onClick={onOpenDrawer}>
        <Menu size={22} aria-hidden="true" />
        <span>Tasks</span>
      </button>

      {siteMenuOpen ? (
        <div className="site-menu-modal" role="dialog" aria-modal="true" aria-label="Site navigation" id="site-menu-dialog">
          <button className="site-menu-backdrop" type="button" aria-label="Close site menu" onClick={() => setSiteMenuOpen(false)} />
          <div className="site-menu-panel">
            <div className="site-menu-header">
              <strong>Navigation</strong>
              <button className="icon-button" type="button" aria-label="Close site menu" onClick={() => setSiteMenuOpen(false)}>
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <nav className="site-menu-nav" aria-label="Site menu navigation">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink className="site-menu-link" to={to} key={to}>
                  <Icon size={20} aria-hidden="true" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
