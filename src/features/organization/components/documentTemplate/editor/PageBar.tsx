import { useFabric } from "./FabricContext";
import { Plus, Copy, Trash2 } from "lucide-react";

export default function PageBar() {
  const { pages, activePageId, switchPage, addPage, duplicatePage, deletePage } = useFabric();

  return (
    <div className="flex items-center gap-3 px-3 sm:px-4 py-2 bg-white border-t border-gray-200 overflow-x-auto no-scrollbar shrink-0">
      {pages.map((page, idx) => {
        const active = page.id === activePageId;
        const portrait = page.orientation === "portrait";
        return (
          <div key={page.id} className="relative group shrink-0 flex flex-col items-center">
            <button
              onClick={() => switchPage(page.id)}
              className={`relative flex items-center justify-center overflow-hidden rounded-md border-2 bg-white transition ${
                active ? "border-red-600 shadow-sm" : "border-gray-200 hover:border-gray-300"
              }`}
              style={{ width: portrait ? 34 : 52, height: portrait ? 52 : 34 }}
              title={page.name}
            >
              {page.thumbnail ? (
                <img src={page.thumbnail} alt={page.name} className="w-full h-full object-cover" draggable={false} />
              ) : (
                <span className="text-[10px] font-bold text-gray-300">{idx + 1}</span>
              )}
            </button>
            <span className={`text-[9px] font-bold mt-1 ${active ? "text-red-600" : "text-gray-400"}`}>
              {idx + 1}
            </span>

            {/* Hover actions */}
            <div className="absolute -top-1.5 -right-1.5 hidden group-hover:flex items-center gap-0.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  duplicatePage(page.id);
                }}
                className="h-4 w-4 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-red-600"
                title="Duplicate page"
              >
                <Copy size={9} />
              </button>
              {pages.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePage(page.id);
                  }}
                  className="h-4 w-4 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-red-600"
                  title="Delete page"
                >
                  <Trash2 size={9} />
                </button>
              )}
            </div>
          </div>
        );
      })}

      <button
        onClick={addPage}
        className="shrink-0 flex items-center justify-center h-9 w-9 rounded-lg border-2 border-dashed border-gray-300 text-gray-400 hover:border-red-400 hover:text-red-600 hover:bg-red-50 transition"
        title="Add Page"
      >
        <Plus size={16} />
      </button>

      <span className="ml-1 text-[10px] font-semibold text-gray-400 shrink-0">
        {pages.length} {pages.length === 1 ? "page" : "pages"}
      </span>
    </div>
  );
}
