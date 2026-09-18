import React from "react";
import {
  TrendingUp,
  Award,
  History,
  Trash2,
  Droplets,
  Wind,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  LineChart as LineChartIcon
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { ClassificationResult } from "../types";

interface CampusDashboardProps {
  history: ClassificationResult[];
  onSelectHistoryItem: (item: ClassificationResult) => void;
  ecoPoints: number;
  divertedKg: number;
}

export const CampusDashboard: React.FC<CampusDashboardProps> = ({
  history,
  onSelectHistoryItem,
  ecoPoints,
  divertedKg,
}) => {
  const co2Total = history.reduce(
    (acc, curr) => acc + (curr.sustainabilityImpact?.co2eSavedKg || 0.3),
    0
  );
  const waterTotal = history.reduce(
    (acc, curr) => acc + (curr.sustainabilityImpact?.waterPreservedLiters || 15),
    0
  );

  // Take the last 10 historical items and order chronologically (oldest to newest)
  const recentHistory = history.slice(0, 10).reverse();

  const chartData = recentHistory.map((item, index) => {
    const val = Number(item.sustainabilityImpact?.landfillDivertedKg ?? 0.2);
    const shortName =
      item.itemName.length > 16 ? item.itemName.slice(0, 15) + "…" : item.itemName;
    return {
      scanNumber: index + 1,
      label: `#${index + 1}`,
      fullName: item.itemName,
      shortName,
      divertedKg: Number(val.toFixed(2)),
      category: item.primaryCategory,
      ecoPoints: item.sustainabilityImpact?.ecoPoints || 20,
    };
  });

  return (
    <div className="ecosort-panel ledger-panel bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 space-y-6 transition-colors duration-200">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="ecosort-heading text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Campus Impact Metrics & Audit Ledger
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Simulated campus dining hall and student hostel waste diversion statistics.
          </p>
        </div>
        <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
          Source Segregation Active
        </span>
      </div>

      {/* Aggregate Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 transition-colors">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
            <Trash2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Landfill Diverted
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            {divertedKg.toFixed(2)} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">kg</span>
          </div>
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5">
            Source-sorted cleanly
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 transition-colors">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
            <Wind className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Net CO2e Abated
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            {co2Total.toFixed(2)} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">kg</span>
          </div>
          <div className="text-[11px] text-blue-700 dark:text-blue-400 font-semibold mt-0.5">
            Avoided landfill methane
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 transition-colors">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
            <Droplets className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            Water Conserved
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            {waterTotal.toFixed(0)} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">Liters</span>
          </div>
          <div className="text-[11px] text-cyan-700 dark:text-cyan-400 font-semibold mt-0.5">
            Paper pulping savings
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 transition-colors">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
            <Award className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            Student Eco-Credits
          </div>
          <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400">
            {ecoPoints} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">pts</span>
          </div>
          <div className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold mt-0.5">
            Campus ID redeemable
          </div>
        </div>
      </div>

      {/* Historical Diverted Kg Trend Line Chart (Recharts) */}
      <div className="p-4 rounded-xl bg-slate-50/90 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-3 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <LineChartIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Diverted Waste Trend (Last 10 Items)
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Landfill mass (kg) diverted per inspected item across chronologically sorted items
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              kg diverted
            </span>
          </div>
        </div>

        {chartData.length === 0 ? (
          <div className="h-44 flex items-center justify-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
            No historical items recorded yet
          </div>
        ) : (
          <div className="h-48 w-full min-w-0 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 15, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.25} vertical={false} />
                <XAxis
                  dataKey="label"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#cbd5e1" }}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#cbd5e1" }}
                  unit="kg"
                  domain={[0, "auto"]}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white text-xs rounded-xl p-2.5 shadow-lg border border-slate-800 space-y-1">
                          <p className="font-bold text-white flex items-center gap-1">
                            <span className="text-emerald-400">{data.label}:</span>
                            <span>{data.fullName}</span>
                          </p>
                          <p className="text-slate-300">
                            Category: <span className="text-slate-200 font-medium">{data.category}</span>
                          </p>
                          <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-700/80 font-mono">
                            <span className="text-emerald-400 font-bold">
                              {data.divertedKg} kg diverted
                            </span>
                            <span className="text-amber-300 font-bold">
                              +{data.ecoPoints} pts
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="divertedKg"
                  stroke="#059669"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#059669", stroke: "#ffffff", strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: "#047857", stroke: "#ffffff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Recent Inspection History */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <History className="w-4 h-4 text-slate-400" />
            Recent Inspections in This Session
          </h4>
          <span className="text-xs text-slate-400">{history.length} items evaluated</span>
        </div>

        {history.length === 0 ? (
          <div className="p-6 text-center rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs">
            No items scanned yet. Use the camera, upload a photo, or click one of the quick demo presets above.
          </div>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {history.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onSelectHistoryItem(item)}
                className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 bg-white dark:bg-slate-800/70 flex items-center justify-between cursor-pointer transition-all shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full shrink-0 ${
                      item.binColorCode === "blue"
                        ? "bg-blue-600"
                        : item.binColorCode === "green"
                        ? "bg-emerald-600"
                        : item.binColorCode === "red"
                        ? "bg-rose-600"
                        : "bg-slate-700"
                    }`}
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      {item.itemName}
                      {item.contaminationWarning?.isRisk && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-semibold border border-amber-200/50 dark:border-amber-800/50">
                          Contamination Risk
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{item.binName}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    +{item.sustainabilityImpact?.ecoPoints || 20} pts
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sustainable Campus Guidelines Tip */}
      <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 flex items-start gap-3 transition-colors">
        <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-emerald-950 dark:text-emerald-200 space-y-0.5">
          <strong className="font-bold text-emerald-900 dark:text-emerald-300 block">
            1M1B Sustainability Insight: "Clean at Source"
          </strong>
          <p className="text-emerald-900/90 dark:text-emerald-300/90 leading-relaxed">
            In campus dining spaces, 80% of waste stream failures happen when wet food sauce or drinks mix with clean paper and plastics. Always empty liquids and tear away greasy cardboard halves before depositing.
          </p>
        </div>
      </div>
    </div>
  );
};
