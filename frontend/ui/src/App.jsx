import { useState } from "react";
import List from "./pages/List";
import Edit from "./pages/Edit";

export default function App() {
  const [page, setPage] = useState("list");
  const [editId, setEditId] = useState(null);

  const goEdit = (id) => {
    setEditId(id);
    setPage("edit");
  };
  const goList = () => {
    setEditId(null);
    setPage("list");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-teal-700 text-white px-6 py-4 flex items-center justify-between shadow-md">
        <h1
          className="text-xl font-bold tracking-wide cursor-pointer"
          onClick={goList}
        >
          📅 Appointment System
        </h1>
        <button
          onClick={goList}
          className="bg-white text-teal-700 font-semibold px-4 py-1.5 rounded-full text-sm hover:bg-teal-50 transition"
        >
          All Appointments
        </button>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {page === "list" && <List onEdit={goEdit} />}
        {page === "edit" && <Edit id={editId} onBack={goList} />}
      </main>
    </div>
  );
}
