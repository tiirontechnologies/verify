import { useState } from "react";
import { useFabric } from "./FabricContext";
import { Plus, Copy, Trash2, ChevronDown, ChevronUp, PencilLine } from "lucide-react";

export default function PageBar() {
  const { pages, activePageId, switchPage, addPage, duplicatePage, deletePage, renamePage, reorderPages } = useFabric();
  const [draggedPageId, setDraggedPageId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(true);
  const activePage = pages.find((page) => page.id === activePageId);

  const renameActivePage = () => {
    if (!activePage) return;
    const name = window.prompt("Rename page", activePage.name);
    if (name !== null) renamePage(activePage.id, name);
  };

  const renamePageAt = (pageId: string, pageName: string) => {
    const name = window.prompt("Rename page", pageName);
    if (name !== null) renamePage(pageId, name);
  };

  return (
    <div className="shrink-0 border-t border-gray-200 bg-white">
      <div className="flex h-8 items-center justify-between gap-2 px-2.5 sm:px-3">
        <div className="flex min-w-0 items-center gap-2 truncate text-[10px] font-semibold text-gray-500">
          <span className="uppercase tracking-wide">Pages</span>
          <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[9px] text-gray-500">{pages.length}</span>
          {activePage && <span className="hidden truncate text-gray-700 sm:inline">{activePage.name}</span>}
        </div>
        {expanded && activePage && <div className="flex items-center gap-1">
          <button type="button" onClick={renameActivePage} className="flex h-6 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900" title="Rename current page" aria-label="Rename current page"><PencilLine size={13} /></button>
          <button type="button" onClick={() => duplicatePage(activePage.id)} className="flex h-6 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900" title="Duplicate current page" aria-label="Duplicate current page"><Copy size={13} /></button>
          <button type="button" onClick={() => deletePage(activePage.id)} disabled={pages.length <= 1} className="flex h-6 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-40" title="Delete current page" aria-label="Delete current page"><Trash2 size={13} /></button>
        </div>}
        <button type="button" onClick={() => setExpanded((value) => !value)} className="flex h-6 w-7 shrink-0 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100" aria-label={expanded ? "Hide pages" : "Show pages"} title={expanded ? "Hide pages" : "Show pages"}>
          {expanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>
      </div>

      {expanded && <div className="flex h-[54px] items-center gap-2 overflow-x-auto px-2.5 pb-1 sm:px-3 no-scrollbar">
        {pages.map((page, idx) => {
          const active = page.id === activePageId;
          const portrait = page.orientation === "portrait";
          return (
            <div
              key={page.id}
              className="flex shrink-0 snap-start flex-col items-center"
              draggable
              onDragStart={() => setDraggedPageId(page.id)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                if (draggedPageId) reorderPages(draggedPageId, page.id);
                setDraggedPageId(null);
              }}
              onDragEnd={() => setDraggedPageId(null)}
            >
              <button
                type="button"
                onClick={() => switchPage(page.id)}
                onDoubleClick={() => renamePageAt(page.id, page.name)}
                className={`relative flex items-center justify-center overflow-hidden rounded border bg-white transition ${active ? "border-red-600 shadow-[0_0_0_1px_rgba(220,38,38,0.12)]" : "border-gray-200 hover:border-gray-400"}`}
                style={{ width: portrait ? 27 : 42, height: portrait ? 38 : 30 }}
                title={`${page.name} · drag to reorder`}
                aria-label={`Open ${page.name}`}
              >
                {page.thumbnail ? <img src={page.thumbnail} alt="" className="h-full w-full object-cover" draggable={false} /> : <span className="text-[10px] font-bold text-gray-300">{idx + 1}</span>}
              </button>
              <span className={`mt-0.5 text-[8px] font-semibold ${active ? "text-red-600" : "text-gray-400"}`}>{idx + 1}</span>
            </div>
          );
        })}

        <button type="button" onClick={addPage} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-dashed border-gray-300 text-gray-400 transition hover:border-red-400 hover:bg-red-50 hover:text-red-600" title="Add page" aria-label="Add page"><Plus size={15} /></button>
      </div>}
    </div>
  );
}
