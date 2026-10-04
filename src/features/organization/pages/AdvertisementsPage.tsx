import { useEffect, useMemo, useState, type FormEvent } from "react";
import { CalendarDays, Check, Eye, Megaphone, MousePointerClick, Plus, Search, Trash2, Users, X } from "lucide-react";
import DashboardLayout from "../../../layouts/DashboardLayout";

type Campaign = { id: string; name: string; goal: string; platforms: string[]; status: "Active" | "Paused" | "Draft"; startDate: string; endDate: string; url: string };
const STORAGE_KEY = "organization-ad-campaigns";
const platformOptions = ["LinkedIn", "Instagram", "Facebook", "Google Ads"];
const sampleCampaigns: Campaign[] = [
  { id: "campaign-1", name: "Graduate hiring 2026", goal: "Recruitment", platforms: ["LinkedIn", "Instagram"], status: "Active", startDate: "2026-09-20", endDate: "2026-10-20", url: "https://example.com/careers" },
  { id: "campaign-2", name: "Industry certification", goal: "Program awareness", platforms: ["Facebook", "Google Ads"], status: "Paused", startDate: "2026-09-01", endDate: "2026-10-31", url: "https://example.com/certifications" },
  { id: "campaign-3", name: "Campus partner program", goal: "Partnerships", platforms: ["LinkedIn"], status: "Draft", startDate: "", endDate: "", url: "" },
];

export default function AdvertisementsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) as Campaign[] : sampleCampaigns;
    } catch {
      return sampleCampaigns;
    }
  });
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All campaigns");
  const [createOpen, setCreateOpen] = useState(false);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("Recruitment");
  const [url, setUrl] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([]);

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns)), [campaigns]);

  const visibleCampaigns = useMemo(() => campaigns.filter((campaign) => {
    const matchesQuery = `${campaign.name} ${campaign.goal} ${campaign.platforms.join(" ")}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "All campaigns" || campaign.status === filter;
    return matchesQuery && matchesFilter;
  }), [campaigns, filter, query]);

  const activeCount = campaigns.filter((campaign) => campaign.status === "Active").length;
  const platformCount = new Set(campaigns.flatMap((campaign) => campaign.platforms)).size;

  const createCampaign = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || platforms.length === 0) return;
    setCampaigns((current) => [{ id: crypto.randomUUID(), name: name.trim(), goal, platforms, status: "Draft", startDate: "", endDate: "", url: url.trim() }, ...current]);
    setName("");
    setUrl("");
    setPlatforms([]);
    setCreateOpen(false);
  };

  const toggleStatus = (id: string) => setCampaigns((current) => current.map((campaign) => campaign.id === id ? { ...campaign, status: campaign.status === "Active" ? "Paused" : "Active" } : campaign));

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-6 pb-10">
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-red-600">Organization workspace</p><h1 className="mt-1 text-3xl font-bold text-slate-900">Advertisements</h1><p className="mt-2 text-sm text-slate-500">Plan and manage campaigns across your marketing channels.</p></div>
          <button type="button" onClick={() => setCreateOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"><Plus size={17} /> New campaign</button>
        </header>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Total campaigns", value: campaigns.length, icon: Megaphone, tone: "bg-red-50 text-red-700" },
            { label: "Currently active", value: activeCount, icon: Eye, tone: "bg-emerald-50 text-emerald-700" },
            { label: "Platforms used", value: platformCount, icon: MousePointerClick, tone: "bg-blue-50 text-blue-700" },
          ].map(({ label, value, icon: Icon, tone }) => <div key={label} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><span className={`flex h-11 w-11 items-center justify-center rounded-lg ${tone}`}><Icon size={20} /></span><div><p className="text-2xl font-bold text-slate-900">{value}</p><p className="text-sm text-slate-500">{label}</p></div></div>)}
        </div>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div><h2 className="font-bold text-slate-900">Campaigns</h2><p className="mt-1 text-xs text-slate-500">{campaigns.length} campaigns across {platformCount} platforms</p></div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2"><Search size={16} className="text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search campaigns" className="w-full text-sm outline-none sm:w-44" /></label>
              <select aria-label="Filter campaigns" value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"><option>All campaigns</option><option>Active</option><option>Paused</option><option>Draft</option></select>
            </div>
          </div>

          {visibleCampaigns.length ? <div className="divide-y divide-slate-100">{visibleCampaigns.map((campaign) => <article key={campaign.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold text-slate-900">{campaign.name}</h3><span className={`rounded-md px-2 py-1 text-[11px] font-bold ${campaign.status === "Active" ? "bg-emerald-50 text-emerald-700" : campaign.status === "Paused" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}>{campaign.status}</span></div>
              <p className="mt-1 text-xs text-slate-500">{campaign.goal}{campaign.startDate ? ` · ${campaign.startDate} to ${campaign.endDate || "Ongoing"}` : " · Schedule not set"}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">{campaign.platforms.map((platform) => <span key={platform} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600">{platform}</span>)}</div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" onClick={() => toggleStatus(campaign.id)} title={campaign.status === "Active" ? "Pause campaign" : "Activate campaign"} aria-label={campaign.status === "Active" ? "Pause campaign" : "Activate campaign"} className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"><span className={`h-2 w-2 rounded-full ${campaign.status === "Active" ? "bg-emerald-500" : "bg-slate-400"}`} />{campaign.status === "Active" ? "Pause" : "Activate"}</button>
              <button type="button" onClick={() => setCampaigns((current) => current.filter((item) => item.id !== campaign.id))} title="Delete campaign" aria-label={`Delete ${campaign.name}`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button>
            </div>
          </article>)}</div> : <div className="px-5 py-14 text-center"><Users size={28} className="mx-auto text-slate-300" /><p className="mt-3 font-semibold text-slate-700">No campaigns match</p><p className="mt-1 text-sm text-slate-500">Adjust the filters or create a new campaign.</p></div>}
        </section>
        <p className="text-xs text-slate-400">Campaign changes are saved in this browser. Connect an advertising service to publish campaigns to external platforms.</p>
      </div>

      {createOpen && <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/55 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setCreateOpen(false); }}>
        <section role="dialog" aria-modal="true" aria-labelledby="campaign-modal-title" className="my-auto w-full max-w-lg rounded-xl bg-white shadow-2xl">
          <div className="flex items-start justify-between border-b border-slate-100 p-5"><div><p className="text-xs font-bold uppercase tracking-wider text-red-600">Campaign setup</p><h2 id="campaign-modal-title" className="mt-1 text-xl font-bold text-slate-900">Create campaign</h2></div><button type="button" onClick={() => setCreateOpen(false)} aria-label="Close" className="rounded-md p-2 text-slate-500 hover:bg-slate-100"><X size={18} /></button></div>
          <form onSubmit={createCampaign} className="space-y-4 p-5">
            <label className="block text-sm font-semibold text-slate-700">Campaign name<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Graduate hiring" className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-red-500" /></label>
            <label className="block text-sm font-semibold text-slate-700">Objective<select value={goal} onChange={(event) => setGoal(event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 font-normal"><option>Recruitment</option><option>Program awareness</option><option>Partnerships</option><option>Lead generation</option></select></label>
            <label className="block text-sm font-semibold text-slate-700">Destination URL <span className="font-normal text-slate-400">(optional)</span><input type="url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://" className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-red-500" /></label>
            <fieldset><legend className="text-sm font-semibold text-slate-700">Platforms</legend><div className="mt-2 grid grid-cols-2 gap-2">{platformOptions.map((platform) => { const selected = platforms.includes(platform); return <button key={platform} type="button" aria-pressed={selected} onClick={() => setPlatforms((current) => selected ? current.filter((item) => item !== platform) : [...current, platform])} className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm font-medium ${selected ? "border-red-300 bg-red-50 text-red-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{platform}{selected && <Check size={15} />}</button>; })}</div></fieldset>
            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4"><button type="button" onClick={() => setCreateOpen(false)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700">Cancel</button><button type="submit" disabled={!name.trim() || platforms.length === 0} className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"><Plus size={16} /> Create draft</button></div>
          </form>
        </section>
      </div>}
    </DashboardLayout>
  );
}