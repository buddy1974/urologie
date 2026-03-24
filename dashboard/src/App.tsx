import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Login from "@/pages/auth/Login";
import Overview from "@/pages/overview/Overview";
import Terminplan from "@/pages/terminplan/Terminplan";
import Patienten from "@/pages/patienten/Patienten";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Overview />} />
          <Route path="/terminplan" element={<Terminplan />} />
          <Route path="/patienten" element={<Patienten />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
