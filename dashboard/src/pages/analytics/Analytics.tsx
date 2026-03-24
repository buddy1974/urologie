import { useState } from "react";
import { BarChart3, TrendingUp, Users, Calendar, CreditCard, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const kpis = [
  { label:"Patienten/Monat", value:"187", change:"+8%", up:true, color:"#1E9FD4" },
  { label:"Umsatz März", value:"€18.420", change:"+12%", up:true, color:"#16a34a" },
  { label:"Online-Buchungsrate", value:"68%", change:"+5%", up:true, color:"#7c3aed" },
  { label:"No-Show Rate", value:"4.2%", change:"-1.1%", up:false, color:"#d97706" },
  { label:"Ø Wartezeit", value:"12 Min.", change:"-3 Min.", up:false, color:"#0891b2" },
  { label:"Neue Patienten", value:"24", change:"+6", up:true, color:"#16a34a" },
];

const insuranceMix = [
  { type:"GKV", count:112, pct:60, color:"#0d9488" },
  { type:"PKV", count:56, pct:30, color:"#7c3aed" },
  { type:"Selbstzahler", count:19, pct:10, color:"#d97706" },
];

const serviceMix = [
  { name:"Diagnostik", count:68, revenue:"€4.200", color:"#1E9FD4" },
  { name:"Onkologie", count:24, revenue:"€3.800", color:"#dc2626" },
  { name:"Andrologie", count:31, revenue:"€2.900", color:"#0d9488" },
  { name:"UroLift®", count:8, revenue:"€4.800", color:"#d97706" },
  { name:"Magnetstimulation", count:19, revenue:"€1.900", color:"#7c3aed" },
  { name:"Urodynamik/Ästhetik", count:12, revenue:"€1.200", color:"#5ECFEB" },
  { name:"Vasektomie", count:15, revenue:"€3.100", color:"#16a34a" },
];

const weeklyData = [
  { day:"Mo", appointments:12, revenue:820 },
  { day:"Di", appointments:14, revenue:960 },
  { day:"Mi", appointments:8, revenue:540 },
  { day:"Do", appointments:13, revenue:880 },
  { day:"Fr", appointments:7, revenue:480 },
];

const maxAppointments = Math.max(...weeklyData.map(d => d.appointments));

export default function Analytics() {
  const [period, setPeriod] = useState<"week"|"month"|"quarter">("month");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics & Statistiken</h1>
          <p className="text-slate-500 text-sm mt-0.5">Praxis-KPIs · März 2026</p>
        </div>
        <div className="flex gap-1.5">
          {(["week","month","quarter"] as const).map(p => (
            <button key={p} onClick={()=>setPeriod(p)}
              className={cn("px-3 py-2 rounded-xl text-xs font-medium transition-all",
                period===p ? "text-white" : "bg-white border border-slate-200 text-slate-500")}
              style={period===p ? {backgroundColor:"#1E9FD4"} : {}}>
              {p==="week"?"Woche":p==="month"?"Monat":"Quartal"}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {kpis.map(k => (
          <div key={k.label} className="bg-white rounded-2xl p-5 border border-slate-100">
            <div className="text-2xl font-bold mb-1" style={{color:k.color}}>{k.value}</div>
            <div className="text-sm font-semibold text-slate-700 mb-1">{k.label}</div>
            <div className={cn("text-xs font-medium", k.up ? "text-green-600" : "text-red-500")}>
              {k.change} vs Vormonat
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly chart */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-bold text-slate-800 mb-5">Termine diese Woche</h3>
          <div className="flex items-end gap-3 h-32">
            {weeklyData.map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="text-xs text-slate-400 font-medium">{d.appointments}</div>
                <div className="w-full rounded-t-lg transition-all"
                  style={{
                    height:`${(d.appointments/maxAppointments)*100}px`,
                    backgroundColor:"#1E9FD4",
                    opacity: d.day==="Mo" ? 1 : 0.5
                  }} />
                <div className="text-xs font-semibold text-slate-500">{d.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Insurance mix */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-bold text-slate-800 mb-5">Versicherungsmix</h3>
          <div className="space-y-3">
            {insuranceMix.map(ins => (
              <div key={ins.type}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">{ins.type}</span>
                  <span className="text-slate-500">{ins.count} Patienten ({ins.pct}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{width:`${ins.pct}%`, backgroundColor:ins.color}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service mix */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-800 mb-5">Leistungsmix März 2026</h3>
        <div className="space-y-2">
          {serviceMix.map(s => (
            <div key={s.name} className="flex items-center gap-4 py-2 border-b border-slate-50 last:border-0">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{backgroundColor:s.color}} />
              <div className="flex-1 font-medium text-slate-700 text-sm">{s.name}</div>
              <div className="text-slate-400 text-sm">{s.count} Behandlungen</div>
              <div className="font-bold text-slate-800 text-sm w-20 text-right">{s.revenue}</div>
              <div className="w-24 bg-slate-100 rounded-full h-1.5">
                <div className="h-1.5 rounded-full" style={{width:`${(s.count/68)*100}%`, backgroundColor:s.color}} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
