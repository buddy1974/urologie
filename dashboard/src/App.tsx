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
import Team from "@/pages/team/Team";
import QM from "@/pages/qm/QM";
import Formulare from "@/pages/formulare/Formulare";
import Video from "@/pages/video/Video";
import Analytics from "@/pages/analytics/Analytics";
import HR from "@/pages/hr/HR";
import Compliance from "@/pages/compliance/Compliance";
import Einstellungen from "@/pages/einstellungen/Einstellungen";
import CMS from "@/pages/cms/CMS";

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
          <Route path="/team" element={<Team />} />
          <Route path="/qm" element={<QM />} />
          <Route path="/formulare" element={<Formulare />} />
          <Route path="/video" element={<Video />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/hr" element={<HR />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/cms" element={<CMS />} />
          <Route path="/einstellungen" element={<Einstellungen />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
