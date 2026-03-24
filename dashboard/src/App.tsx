import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Login from "@/pages/auth/Login";
import Overview from "@/pages/overview/Overview";
import Terminplan from "@/pages/terminplan/Terminplan";
import Patienten from "@/pages/patienten/Patienten";
import KiAssistent from "@/pages/ki-assistent/KiAssistent";
import Labor from "@/pages/labor/Labor";
import Dokumente from "@/pages/dokumente/Dokumente";
import Abrechnung from "@/pages/abrechnung/Abrechnung";
import Kommunikation from "@/pages/kommunikation/Kommunikation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Overview />} />
          <Route path="/terminplan" element={<Terminplan />} />
          <Route path="/patienten" element={<Patienten />} />
          <Route path="/ki-assistent" element={<KiAssistent />} />
          <Route path="/labor" element={<Labor />} />
          <Route path="/dokumente" element={<Dokumente />} />
          <Route path="/abrechnung" element={<Abrechnung />} />
          <Route path="/kommunikation" element={<Kommunikation />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
