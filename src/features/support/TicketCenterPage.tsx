import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AlertCircle, ArrowLeft, CheckCircle2, ChevronRight, Loader2, MessageSquare, Plus, Send, Ticket } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { ticketApi, type TicketStatus } from "../../api/tickets.api";
import { openNotificationStream } from "../../api/notifications.api";

type TicketEvent = { kind: "message" | "status"; actorId?: string; actorName?: string; actorRole?: string; createdAt?: string; message?: string; status?: TicketStatus; note?: string };
type TicketRecord = { _id: string; ticketNumber?: string; subject: string; category?: string; description?: string; status: TicketStatus; events?: TicketEvent[]; createdAt?: string; updatedAt?: string; organization?: any; organizationName?: string; organizationId?: string; raisedBy?: any; raisedByName?: string; requester?: any };

const statuses: { value: TicketStatus | "all"; label: string }[] = [
  { value: "all", label: "All tickets" }, { value: "open", label: "Open" },
  { value: "in_progress", label: "In progress" }, { value: "waiting_on_user", label: "Waiting on you" }, { value: "resolved", label: "Resolved" },
];
const statusLabel: Record<TicketStatus, string> = { open: "Open", in_progress: "In progress", waiting_on_user: "Waiting on you", resolved: "Resolved" };
const statusStyle: Record<TicketStatus, string> = { open: "bg-blue-50 text-blue-700 ring-blue-200", in_progress: "bg-amber-50 text-amber-700 ring-amber-200", waiting_on_user: "bg-violet-50 text-violet-700 ring-violet-200", resolved: "bg-emerald-50 text-emerald-700 ring-emerald-200" };
const unwrap = (response: any) => response?.data?.data ?? response?.data ?? response;
const dateLabel = (value?: string) => value ? new Date(value).toLocaleString() : "Just now";
const readableError = (error: any) => error?.response?.data?.message || error?.message || "Something went wrong. Please try again.";
const ticketOwner = (item: TicketRecord) => item.raisedByName || item.raisedBy?.name || item.requester?.name || "Customer";
const ticketOrganization = (item: TicketRecord) => item.organizationName || item.organization?.name || (item.organizationId ? `Org ${item.organizationId}` : "Organization");

function StatusBadge({ status, supportView = false }: { status: TicketStatus; supportView?: boolean }) {
  const label = supportView && status === "waiting_on_user" ? "Waiting on customer" : statusLabel[status];
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyle[status]}`}>{label}</span>;
}

export default function TicketCenterPage() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState<TicketRecord[]>([]);
  const [ticket, setTicket] = useState<TicketRecord | null>(null);
  const [filter, setFilter] = useState<TicketStatus | "all">("all");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Certificates");
  const [description, setDescription] = useState("");
  const [reply, setReply] = useState("");
  const [statusNote, setStatusNote] = useState("");
  const [statusChoice, setStatusChoice] = useState<TicketStatus>("in_progress");
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [isSupportAdmin, setIsSupportAdmin] = useState(false);

  useEffect(() => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user") || localStorage.getItem("user") || "{}");
      setIsSupportAdmin((user.role === "admin" || user.roleId === "admin") && !user.organization && !user.organizationId);
    } catch { setIsSupportAdmin(false); }
  }, []);

  const loadList = useCallback(async () => {
    if (ticketId) return;
    try {
      setLoading(true); setError("");
      const result = unwrap(await ticketApi.list({ status: filter, page, limit: 20 }));
      setItems(Array.isArray(result?.tickets) ? result.tickets : Array.isArray(result) ? result : []);
      setPages(Math.max(1, Number(result?.pagination?.pages || 1)));
    } catch (err) { setError(readableError(err)); }
    finally { setLoading(false); }
  }, [ticketId, filter, page]);

  const loadDetail = useCallback(async () => {
    if (!ticketId || ticketId === "new") { setTicket(null); return; }
    try {
      setLoading(true); setError("");
      const result = unwrap(await ticketApi.get(ticketId));
      setTicket(result?.ticket ?? result);
    } catch (err) { setError(readableError(err)); }
    finally { setLoading(false); }
  }, [ticketId]);

  useEffect(() => { void loadList(); }, [loadList, refreshIndex]);
  useEffect(() => { void loadDetail(); }, [loadDetail, refreshIndex]);
  useEffect(() => {
    const stream = openNotificationStream();
    const refreshOnTicketUpdate = (event: Event) => {
      try {
        const payload = JSON.parse((event as MessageEvent).data || "{}");
        const notification = payload?.notification || payload?.data || payload;
        if (notification?.type === "ticket_update") setRefreshIndex((value) => value + 1);
      } catch { /* Ignore unrelated stream payloads. */ }
    };
    stream.addEventListener("notification", refreshOnTicketUpdate);
    stream.addEventListener("message", refreshOnTicketUpdate);
    return () => {
      stream.removeEventListener("notification", refreshOnTicketUpdate);
      stream.removeEventListener("message", refreshOnTicketUpdate);
      stream.close();
    };
  }, []);

  const sortedEvents = useMemo(() => [...(ticket?.events || [])].sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()), [ticket?.events]);
  const displayEvents = useMemo(() => {
    if (!ticket?.description || sortedEvents.some((event) => event.kind === "message" && event.message === ticket.description)) return sortedEvents;
    return [{ kind: "message" as const, actorName: "Customer", actorRole: "customer", createdAt: ticket.createdAt, message: ticket.description }, ...sortedEvents];
  }, [ticket, sortedEvents]);

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (subject.trim().length < 4 || description.trim().length < 10) { setError("Add a subject (at least 4 characters) and a description (at least 10 characters)."); return; }
    try {
      setSubmitting(true); setError("");
      const created = unwrap(await ticketApi.create({ subject: subject.trim(), category, description: description.trim() }));
      const id = created?._id || created?.ticket?._id;
      if (!id) throw new Error("Ticket was created but its details were not returned.");
      navigate(`/tickets/${id}`, { replace: true });
    } catch (err) { setError(readableError(err)); }
    finally { setSubmitting(false); }
  };

  const handleReply = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!ticket || !reply.trim()) return;
    try { setSubmitting(true); setError(""); await ticketApi.reply(ticket._id, reply.trim()); setReply(""); setRefreshIndex((value) => value + 1); }
    catch (err) { setError(readableError(err)); }
    finally { setSubmitting(false); }
  };

  const handleStatus = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!ticket) return;
    try { setSubmitting(true); setError(""); await ticketApi.setStatus(ticket._id, statusChoice, statusNote.trim() || undefined); setStatusNote(""); setRefreshIndex((value) => value + 1); }
    catch (err) { setError(readableError(err)); }
    finally { setSubmitting(false); }
  };

  return <DashboardLayout><main className="mx-auto max-w-6xl space-y-6 pb-12">
    <header className="flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-red-950 p-6 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div><p className="text-xs font-bold uppercase tracking-[.18em] text-rose-200">Tiiron Verify Support</p><h1 className="mt-2 text-2xl font-bold sm:text-3xl">{ticketId === "new" ? "Raise a ticket" : ticketId ? "Ticket conversation" : isSupportAdmin ? "Support inbox" : "My tickets"}</h1><p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">{ticketId ? "Follow updates and replies in one place." : isSupportAdmin ? "Review customer requests, reply, and keep each issue moving." : "Get help from our team and track every request here."}</p></div>
      {!ticketId && !isSupportAdmin && <Link to="/tickets/new" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-rose-50"><Plus size={17} /> Raise a ticket</Link>}
      {ticketId && <Link to="/tickets" className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold hover:bg-white/10"><ArrowLeft size={16} /> All tickets</Link>}
    </header>

    {error && <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"><AlertCircle size={18} className="mt-0.5 shrink-0" />{error}<button className="ml-auto text-xs font-semibold underline" onClick={() => setError("")}>Dismiss</button></div>}

    {ticketId === "new" ? <form onSubmit={handleCreate} className="mx-auto max-w-3xl space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div><label className="mb-2 block text-sm font-semibold text-slate-800" htmlFor="ticket-subject">What do you need help with?</label><input id="ticket-subject" value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={140} required placeholder="For example: Cannot download my certificate" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100" /></div>
      <div><label className="mb-2 block text-sm font-semibold text-slate-800" htmlFor="ticket-category">Category</label><select id="ticket-category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100"><option>Certificates</option><option>Account access</option><option>Organization profile</option><option>Billing</option><option>Technical issue</option><option>Other</option></select></div>
      <div><label className="mb-2 block text-sm font-semibold text-slate-800" htmlFor="ticket-description">Describe the issue</label><textarea id="ticket-description" value={description} onChange={(e) => setDescription(e.target.value)} required minLength={10} maxLength={5000} rows={7} placeholder="Tell us what happened and include any relevant certificate ID or error message." className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100" /><p className="mt-1 text-right text-xs text-slate-400">{description.length}/5000</p></div>
      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end"><Link to="/tickets" className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</Link><button disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60">{submitting ? <Loader2 size={17} className="animate-spin" /> : <Send size={16} />} Submit ticket</button></div>
    </form> : null}

    {!ticketId && <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"><div><h2 className="font-semibold text-slate-900">{isSupportAdmin ? "Customer requests" : "Your requests"}</h2><p className="mt-1 text-xs text-slate-500">Sorted by most recent activity</p></div><label className="flex items-center gap-2 text-xs font-semibold text-slate-600">Filter <select value={filter} onChange={(e) => { setFilter(e.target.value as TicketStatus | "all"); setPage(1); }} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">{statuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}</select></label></div>
      {loading ? <div className="flex items-center justify-center gap-3 p-12 text-sm text-slate-500"><Loader2 size={18} className="animate-spin text-rose-600" />Loading tickets…</div> : items.length === 0 ? <div className="p-12 text-center"><Ticket size={32} className="mx-auto text-slate-300" /><h3 className="mt-3 font-semibold text-slate-900">No tickets found</h3><p className="mt-1 text-sm text-slate-500">{isSupportAdmin ? "There are no tickets in the support inbox yet." : filter === "all" ? "Raise a ticket whenever you need help." : "Try another status filter."}</p>{!isSupportAdmin && <Link to="/tickets/new" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white"><Plus size={16} /> Raise a ticket</Link>}</div> : <div className="divide-y divide-slate-100">{items.map((item) => <Link key={item._id} to={`/tickets/${item._id}`} className="flex flex-col gap-3 p-4 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:px-6"><div className="flex min-w-0 flex-1 items-start gap-3"><div className="mt-0.5 rounded-xl bg-rose-50 p-2.5 text-rose-700"><MessageSquare size={18} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-bold text-rose-700">{item.ticketNumber || "Ticket"}</span><StatusBadge status={item.status} supportView={isSupportAdmin} /></div><h3 className="mt-1 truncate font-semibold text-slate-900">{item.subject}</h3><p className="mt-1 text-xs text-slate-500">{item.category || "Support"}{isSupportAdmin ? ` · ${ticketOrganization(item)} · ${ticketOwner(item)}` : ""}</p></div></div><div className="flex items-center justify-between gap-4 pl-12 text-xs text-slate-500 sm:justify-end sm:pl-0"><span>{dateLabel(item.updatedAt || item.createdAt)}</span><ChevronRight size={16} /></div></Link>)}</div>}
      {pages > 1 && <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-sm"><span className="text-slate-500">Page {page} of {pages}</span><div className="flex gap-2"><button disabled={page <= 1} onClick={() => setPage((value) => value - 1)} className="rounded-lg border px-3 py-1.5 disabled:opacity-40">Previous</button><button disabled={page >= pages} onClick={() => setPage((value) => value + 1)} className="rounded-lg border px-3 py-1.5 disabled:opacity-40">Next</button></div></div>}
    </section>}

    {ticketId && ticketId !== "new" && (loading ? <div className="flex items-center justify-center gap-3 rounded-2xl border bg-white p-14 text-sm text-slate-500"><Loader2 size={18} className="animate-spin text-rose-600" />Loading conversation…</div> : ticket && <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]"><section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 p-5 sm:p-7"><div className="flex flex-wrap items-center gap-2"><span className="text-sm font-bold text-rose-700">{ticket.ticketNumber}</span><StatusBadge status={ticket.status} supportView={isSupportAdmin} /></div><h2 className="mt-3 text-xl font-bold text-slate-900">{ticket.subject}</h2><p className="mt-1 text-sm text-slate-500">{ticket.category} · Opened {dateLabel(ticket.createdAt)}</p></div><div className="space-y-5 p-5 sm:p-7">{displayEvents.map((event, index) => <article key={`${event.createdAt || "event"}-${index}`} className={`rounded-xl border p-4 ${event.kind === "status" ? "border-amber-100 bg-amber-50/60" : "border-slate-100 bg-slate-50"}`}><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-sm font-semibold text-slate-800">{event.kind === "status" ? `${event.actorName || "Support"} changed status` : event.actorName || (index === 0 ? "Customer" : "Support")}</p><time className="text-xs text-slate-400">{dateLabel(event.createdAt)}</time></div>{event.kind === "status" ? <p className="mt-2 text-sm text-slate-700">Status changed to <strong>{statusLabel[event.status || "open"]}</strong>{event.note ? ` · ${event.note}` : ""}</p> : <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">{event.message}</p>}</article>)}</div>{ticket.status === "resolved" ? <div className="m-5 mt-0 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 sm:m-7 sm:mt-0"><CheckCircle2 size={18} className="shrink-0" /><div><strong>Ticket resolved</strong><p className="mt-1">This conversation is closed. Contact support again by raising a new ticket.</p></div></div> : <form onSubmit={handleReply} className="border-t border-slate-100 p-5 sm:p-7"><label htmlFor="ticket-reply" className="mb-2 block text-sm font-semibold text-slate-800">Reply to this ticket</label><textarea id="ticket-reply" value={reply} onChange={(e) => setReply(e.target.value)} rows={4} maxLength={5000} required placeholder="Write your message…" className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100" /><button disabled={submitting || !reply.trim()} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-50"><Send size={15} /> Send reply</button></form>}</section>
      <aside className="h-fit space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h3 className="font-semibold text-slate-900">Ticket details</h3><div className="space-y-3 text-sm"><p><span className="block text-xs text-slate-500">Ticket number</span><strong className="mt-1 block">{ticket.ticketNumber || "—"}</strong></p><p><span className="block text-xs text-slate-500">Category</span><strong className="mt-1 block">{ticket.category || "Support"}</strong></p>{isSupportAdmin && <p><span className="block text-xs text-slate-500">Organization</span><strong className="mt-1 block">{ticket.organizationName || ticket.organization?.name || "Organization"}</strong></p>}</div>{isSupportAdmin && <form onSubmit={handleStatus} className="space-y-3 border-t border-slate-100 pt-4"><h4 className="text-sm font-semibold text-slate-800">Update status</h4><select value={statusChoice} onChange={(e) => setStatusChoice(e.target.value as TicketStatus)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">{statuses.filter((status) => status.value !== "all").map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}</select><textarea value={statusNote} onChange={(e) => setStatusNote(e.target.value)} rows={3} maxLength={1000} placeholder="Optional note for the history" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" /><button disabled={submitting} className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">Save status</button></form>}</aside></div>)}
  </main></DashboardLayout>;
}
