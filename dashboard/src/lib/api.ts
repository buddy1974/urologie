const API_BASE = import.meta.env.VITE_API_URL ?? "https://urologie-backend.onrender.com";

export async function fetchPatients() {
  const res = await fetch(`${API_BASE}/api/patients`);
  if (!res.ok) throw new Error("Failed to fetch patients");
  return res.json();
}

export async function fetchAppointments() {
  const res = await fetch(`${API_BASE}/api/appointments`);
  if (!res.ok) throw new Error("Failed to fetch appointments");
  return res.json();
}

export async function fetchLabResults() {
  const res = await fetch(`${API_BASE}/api/lab`);
  if (!res.ok) throw new Error("Failed to fetch lab results");
  return res.json();
}

export async function createPatient(data: Record<string, unknown>) {
  const res = await fetch(`${API_BASE}/api/patients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create patient");
  return res.json();
}

export async function createAppointment(data: Record<string, unknown>) {
  const res = await fetch(`${API_BASE}/api/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create appointment");
  return res.json();
}

export async function updateAppointmentStatus(id: string, status: string) {
  const res = await fetch(`${API_BASE}/api/appointments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update appointment");
  return res.json();
}

export async function saveLabComment(id: string, comment: string) {
  const res = await fetch(`${API_BASE}/api/lab/${id}/comment`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment }),
  });
  if (!res.ok) throw new Error("Failed to save comment");
  return res.json();
}
