import { X } from "lucide-react";
import { TaskSidebarContent } from "./TaskSidebar";

export function MobileProgressDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={`mobile-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button className="drawer-backdrop" type="button" onClick={onClose}>
        <span className="sr-only">Close task progress drawer</span>
      </button>
      <aside className="drawer-panel" aria-label="Mobile task progress">
        <div className="drawer-header">
          <h2>Competency Tasks</h2>
          <button className="icon-button" type="button" onClick={onClose}>
            <X size={20} aria-hidden="true" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <TaskSidebarContent onNavigate={onClose} />
      </aside>
    </div>
  );
}
