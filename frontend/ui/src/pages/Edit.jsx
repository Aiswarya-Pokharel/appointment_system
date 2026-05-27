import { useState, useEffect } from "react";

const API = "/api";

export default function Edit({ id, onBack }) {
  const [form, setForm] = useState({ name: "", date: "", time: "", reason: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${API}/edit/${id}/`)
      .then((r) => r.json())
      .then((data) => {
        setForm({ name: data.name, date: data.date, time: data.time, reason: data.reason });
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await fetch(`${API}/edit/${id}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    onBack();
  };

  if (loading) return <div className="text-center py-16 text-slate-400 text-sm">Loading...</div>;

  return (
    <div className="max-w-lg mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-teal-600 mb-6 transition"
      >
        ← Back to list
      </button>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Edit Appointment</h2>
        <p className="text-slate-400 text-sm mb-6">Update the appointment details below.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Name</label>
            <input
              name="name" value={form.name} onChange={handleChange} required
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Date</label>
            <input
              type="date" name="date" value={form.date} onChange={handleChange} required
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Time</label>
            <input
              type="time" name="time" value={form.time} onChange={handleChange} required
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Reason</label>
            <textarea
              name="reason" value={form.reason} onChange={handleChange} required rows={3}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-slate-50 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button" onClick={onBack}
              className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-lg text-sm hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit" disabled={submitting}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-50"
            >
              {submitting ? "Updating..." : "Update Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}