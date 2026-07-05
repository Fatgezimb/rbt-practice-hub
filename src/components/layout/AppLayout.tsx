import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileProgressDrawer } from "./MobileProgressDrawer";
import { TaskSidebar } from "./TaskSidebar";

const routeOrder = ["/", "/map", "/assessment", "/flashcards", "/practice", "/guide", "/progress", "/about"];

function isTextEntryTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return Boolean(
    target.closest(
      'input, textarea, select, button, [contenteditable="true"], [role="textbox"], [role="combobox"], [role="listbox"], [role="slider"]',
    ),
  );
}

export function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function handleArrowNavigation(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        location.pathname === "/practice" ||
        location.pathname === "/flashcards" ||
        event.metaKey ||
        event.altKey ||
        event.ctrlKey ||
        event.shiftKey ||
        isTextEntryTarget(event.target)
      ) {
        return;
      }

      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
        return;
      }

      const currentIndex = Math.max(routeOrder.indexOf(location.pathname), 0);
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (currentIndex + direction + routeOrder.length) % routeOrder.length;

      event.preventDefault();
      navigate(routeOrder[nextIndex]);
    }

    window.addEventListener("keydown", handleArrowNavigation);
    return () => window.removeEventListener("keydown", handleArrowNavigation);
  }, [location.pathname, navigate]);

  return (
    <div className="app-shell">
      <Header onOpenDrawer={() => setDrawerOpen(true)} />
      <div className={sidebarCollapsed ? "body-shell is-sidebar-collapsed" : "body-shell"}>
        <TaskSidebar collapsed={sidebarCollapsed} onToggleCollapsed={() => setSidebarCollapsed((collapsed) => !collapsed)} />
        <main className="main-content" key={location.pathname}>
          <Outlet />
        </main>
      </div>
      <Footer />
      <button className="floating-drawer-button" type="button" onClick={() => setDrawerOpen(true)}>
        <Menu size={22} aria-hidden="true" />
        <span className="sr-only">Open task progress drawer</span>
      </button>
      <MobileProgressDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
