import { useState, useEffect } from "react";

const API = "/api";

export default function List({ onEdit }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    reason: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/appointments/`);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error("API error:", err.message);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/insert/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      setForm({ name: "", date: "", time: "", reason: "" });
      setShowForm(false);
      setSuccess("Appointment added successfully!");
      setTimeout(() => setSuccess(""), 3000);
      await fetchAppointments();
    } catch (err) {
      console.error("Insert error:", err.message);
      alert("Failed to save appointment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this appointment?")) return;
    await fetch(`${API}/delete/${id}/`, { method: "POST" });
    fetchAppointments();
  };

  return (
    <div>
      {success && (
        <div className="mb-4 bg-teal-50 border border-teal-200 text-teal-800 px-4 py-3 rounded-lg text-sm">
          ✅ {success}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Appointments</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            {appointments.length} total
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-lg text-sm transition"
        >
          {showForm ? "Cancel" : "New Appointment"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            New Appointment
          </h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Patient name"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                Reason
              </label>
              <input
                name="reason"
                value={form.reason}
                onChange={handleChange}
                required
                placeholder="Reason for visit"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-slate-50"
              />
            </div>
            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition disabled:opacity-50"
              >
                {submitting ? "Saving..." : "Save Appointment"}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">
          Loading...
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-slate-500 text-sm">
            No appointments yet. Add one above!
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Name
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Date
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Time
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Reason
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a, i) => (
                <tr
                  key={a.id}
                  className={`border-b border-slate-100 hover:bg-teal-50 transition ${i % 2 === 0 ? "" : "bg-slate-50/50"}`}
                >
                  <td className="px-5 py-3.5 font-medium text-slate-800">
                    {a.name}
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{a.date}</td>
                  <td className="px-5 py-3.5 text-slate-600">{a.time}</td>
                  <td className="px-5 py-3.5 text-slate-600 max-w-xs truncate">
                    {a.reason}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => onEdit(a.id)}
                      className="text-teal-600 hover:text-teal-800 font-medium mr-3 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="text-red-500 hover:text-red-700 font-medium transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
