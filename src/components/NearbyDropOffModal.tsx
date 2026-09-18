import React, { useState, useMemo } from "react";
import {
  X,
  MapPin,
  Navigation,
  Clock,
  Phone,
  CheckCircle2,
  Filter,
  Search,
  Layers,
  Sparkles,
  Compass,
  Building2,
  Recycle,
  Share2,
  Copy,
  Check,
  ChevronRight,
  Info
} from "lucide-react";
import {
  MOCK_DROP_OFF_LOCATIONS,
  CITIES_LIST,
  DropOffLocation
} from "../data/dropOffLocations";
import { ClassificationResult } from "../types";

interface NearbyDropOffModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentItem?: ClassificationResult | null;
}

export const NearbyDropOffModal: React.FC<NearbyDropOffModalProps> = ({
  isOpen,
  onClose,
  currentItem,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>("Bengaluru");
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationSuccessMsg, setLocationSuccessMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showDirectionsFor, setShowDirectionsFor] = useState<DropOffLocation | null>(null);

  // Available facilities in selected city
  const cityLocations = useMemo(() => {
    return MOCK_DROP_OFF_LOCATIONS[selectedCity] || MOCK_DROP_OFF_LOCATIONS["Bengaluru"];
  }, [selectedCity]);

  // Filtered by category and search
  const filteredLocations = useMemo(() => {
    return cityLocations.filter((loc) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategoryFilter === "All" ||
        (selectedCategoryFilter === "Compost" &&
          (loc.type === "Composting Hub" || loc.acceptedCategories.includes("Wet / Organic"))) ||
        (selectedCategoryFilter === "Recyclable" &&
          (loc.type === "Recycling Center" || loc.acceptedCategories.includes("Dry / Recyclable"))) ||
        (selectedCategoryFilter === "E-Waste" &&
          (loc.type === "E-Waste Depot" || loc.acceptedCategories.includes("E-Waste / Hazardous"))) ||
        (selectedCategoryFilter === "Campus" && loc.type === "Campus Eco-Kiosk");

      return matchesSearch && matchesCategory;
    });
  }, [cityLocations, selectedCategoryFilter, searchQuery]);

  // Selected location object
  const activeLocation = useMemo(() => {
    if (!selectedLocationId) {
      return filteredLocations[0] || cityLocations[0] || null;
    }
    return cityLocations.find((l) => l.id === selectedLocationId) || filteredLocations[0] || null;
  }, [selectedLocationId, filteredLocations, cityLocations]);

  if (!isOpen) return null;

  const handleSimulateLocationDetect = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      // Pick based on IP/local simulation or set to Campus Zone
      setSelectedCity("Campus Zone / University District");
      setLocationSuccessMsg("Detected nearest hub: University District!");
      setTimeout(() => setLocationSuccessMsg(null), 3000);
    }, 700);
  };

  const handleCopyAddress = (loc: DropOffLocation) => {
    navigator.clipboard.writeText(`${loc.name}, ${loc.address}`);
    setCopiedId(loc.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getMarkerColor = (type: DropOffLocation["type"]) => {
    switch (type) {
      case "Composting Hub":
        return { bg: "bg-emerald-600", border: "border-emerald-700", text: "text-emerald-700", fill: "#059669" };
      case "Recycling Center":
        return { bg: "bg-blue-600", border: "border-blue-700", text: "text-blue-700", fill: "#2563eb" };
      case "E-Waste Depot":
        return { bg: "bg-rose-600", border: "border-rose-700", text: "text-rose-700", fill: "#e11d48" };
      default:
        return { bg: "bg-amber-600", border: "border-amber-700", text: "text-amber-700", fill: "#d97706" };
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] transition-colors duration-200">
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 dark:from-emerald-950 dark:via-teal-950 dark:to-slate-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 shadow-inner">
              <MapPin className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-white">
                  Nearby Recycling & Composting Drop-off Hubs
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                  Local Finder
                </span>
              </div>
              <p className="text-xs text-emerald-100/80">
                Verified zero-contamination drop-off bins, municipal composting beds & campus e-waste kiosks
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Map vs List View Toggle */}
            <div className="bg-white/15 p-1 rounded-xl flex items-center gap-1 border border-white/20 text-xs font-semibold">
              <button
                onClick={() => setViewMode("map")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  viewMode === "map"
                    ? "bg-white text-emerald-900 shadow-xs"
                    : "text-white/80 hover:text-white"
                }`}
              >
                Mock Map View
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-white text-emerald-900 shadow-xs"
                    : "text-white/80 hover:text-white"
                }`}
              >
                List View
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* City Selector & Search Bar */}
        <div className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 px-5 py-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 transition-colors">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              City / Region:
            </span>
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedLocationId(null);
                setShowDirectionsFor(null);
              }}
              className="text-xs font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
            >
              {CITIES_LIST.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <button
              onClick={handleSimulateLocationDetect}
              disabled={isLocating}
              className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 transition-colors flex items-center gap-1"
            >
              <Compass className={`w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 ${isLocating ? "animate-spin" : ""}`} />
              <span>{isLocating ? "Detecting..." : "Detect Nearest"}</span>
            </button>

            {locationSuccessMsg && (
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/80 px-2 py-1 rounded-md animate-fade-in border border-emerald-200/50 dark:border-emerald-800/50">
                {locationSuccessMsg}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search hub or material..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* Stream Filter Chips & Context Banner */}
        <div className="px-5 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-2 text-xs transition-colors">
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <span className="text-slate-400 text-xs font-medium mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Stream:
            </span>
            {[
              { id: "All", label: "All Hubs" },
              { id: "Compost", label: "🌱 Composting / Wet" },
              { id: "Recyclable", label: "♻️ Dry / Recyclables" },
              { id: "E-Waste", label: "🔋 E-Waste / Batteries" },
              { id: "Campus", label: "🏫 Campus Smart Kiosks" },
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => setSelectedCategoryFilter(chip.id)}
                className={`px-2.5 py-1 rounded-full font-medium transition-colors whitespace-nowrap ${
                  selectedCategoryFilter === chip.id
                    ? "bg-slate-900 text-white font-bold"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {currentItem && (
            <div className="text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                Matching current scan: <strong>{currentItem.itemName}</strong> ({currentItem.primaryCategory})
              </span>
            </div>
          )}
        </div>

        {/* Body Content: Split into Map/List and Detail Pane */}
        <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row">
          {/* Main Visual: Map or List */}
          <div className="lg:w-7/12 border-r border-slate-200 dark:border-slate-800 p-4 sm:p-5 flex flex-col transition-colors">
            {viewMode === "map" ? (
              <div className="flex-1 flex flex-col space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Interactive Campus & City Mock Grid</span>
                  <span className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" /> Compost
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" /> Recyclable
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block" /> E-Waste
                    </span>
                  </span>
                </div>

                {/* Interactive SVG Mock Map */}
                <div className="relative w-full h-[320px] sm:h-[380px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-inner select-none">
                  {/* Map Graphic Layer */}
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                      </pattern>
                    </defs>

                    {/* Background Grid Roads */}
                    <rect width="100%" height="100%" fill="#f8fafc" />
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Stylized River / Green Parks */}
                    <path
                      d="M 0 160 Q 150 180 300 130 T 600 190"
                      fill="none"
                      stroke="#cffafe"
                      strokeWidth="24"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 0 160 Q 150 180 300 130 T 600 190"
                      fill="none"
                      stroke="#bae6fd"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />

                    {/* Park zones */}
                    <rect x="15%" y="60%" width="18%" height="22%" rx="16" fill="#dcfce7" opacity="0.7" />
                    <text x="17%" y="72%" fill="#15803d" fontSize="10" fontWeight="bold">Eco Park</text>

                    <rect x="70%" y="15%" width="22%" height="24%" rx="16" fill="#f1f5f9" stroke="#cbd5e1" strokeDasharray="4 4" />
                    <text x="73%" y="27%" fill="#475569" fontSize="10" fontWeight="bold">Campus Quad</text>

                    {/* Radius Rings centered at You (50%, 50%) */}
                    <circle cx="50%" cy="50%" r="50" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                    <circle cx="50%" cy="50%" r="110" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="3 3" opacity="0.2" />
                    <circle cx="50%" cy="50%" r="170" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="3 3" opacity="0.15" />
                    
                    <text x="51%" y="36%" fill="#64748b" fontSize="9">1.5 km radius</text>
                    <text x="51%" y="23%" fill="#64748b" fontSize="9">3.0 km radius</text>
                  </svg>

                  {/* "You Are Here" Center Pin */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none"
                  >
                    <div className="relative">
                      <div className="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-md animate-ping opacity-75 absolute inset-0" />
                      <div className="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-md flex items-center justify-center text-white text-[9px] font-bold">
                        •
                      </div>
                    </div>
                    <span className="mt-1 px-1.5 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-bold tracking-tight shadow">
                      You are here
                    </span>
                  </div>

                  {/* Interactive Facility Pins */}
                  {filteredLocations.map((loc) => {
                    const isSelected = activeLocation?.id === loc.id;
                    const styling = getMarkerColor(loc.type);

                    return (
                      <div
                        key={loc.id}
                        onClick={() => {
                          setSelectedLocationId(loc.id);
                          setShowDirectionsFor(null);
                        }}
                        style={{
                          left: `${loc.mapCoordinates.x}%`,
                          top: `${loc.mapCoordinates.y}%`,
                        }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group transition-transform ${
                          isSelected ? "scale-125 z-40" : "hover:scale-110"
                        }`}
                      >
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full shadow-lg border-2 border-white text-white ${styling.bg} transition-all`}
                        >
                          <MapPin className="w-4 h-4" />
                        </div>

                        {/* Pin label */}
                        <div
                          className={`mt-1 whitespace-nowrap text-[10px] font-bold px-1.5 py-0.5 rounded shadow transition-all ${
                            isSelected
                              ? "bg-slate-900 text-white ring-2 ring-emerald-400 scale-105"
                              : "bg-white/95 text-slate-800 border border-slate-200 group-hover:bg-slate-900 group-hover:text-white"
                          }`}
                        >
                          {loc.name.length > 20 ? loc.name.slice(0, 18) + "…" : loc.name}
                          <span className="ml-1 text-emerald-500 font-normal font-mono">({loc.distanceKm}km)</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>💡 Click any colored pin on the map to inspect details & get directions.</span>
                  <span className="font-semibold text-slate-700">
                    Showing {filteredLocations.length} hubs in {selectedCity}
                  </span>
                </div>
              </div>
            ) : (
              /* List View Mode */
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {filteredLocations.length === 0 ? (
                  <div className="p-8 text-center border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
                    No drop-off locations match your filter. Try selecting "All Hubs" or clearing search.
                  </div>
                ) : (
                  filteredLocations.map((loc) => {
                    const isSelected = activeLocation?.id === loc.id;
                    const styling = getMarkerColor(loc.type);

                    return (
                      <div
                        key={loc.id}
                        onClick={() => {
                          setSelectedLocationId(loc.id);
                          setShowDirectionsFor(null);
                        }}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 shadow-sm ring-1 ring-emerald-400 dark:ring-emerald-600"
                            : "bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700/80 shadow-2xs"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-white ${styling.bg}`}
                            >
                              <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                                  {loc.name}
                                </h4>
                                {loc.isOpenNow && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50">
                                    Open Now
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{loc.address}</p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-extrabold text-sm text-slate-900 dark:text-white font-mono">
                              {loc.distanceKm} km
                            </span>
                            <span className="block text-[10px] text-slate-400">away</span>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                          <div className="flex flex-wrap gap-1.5">
                            {loc.acceptedCategories.map((cat, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                              >
                                {cat}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLocationId(loc.id);
                              setShowDirectionsFor(loc);
                            }}
                            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1"
                          >
                            <span>Directions</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Right Panel: Selected Hub Details & Step-by-Step Directions */}
          <div className="lg:w-5/12 p-4 sm:p-5 bg-slate-50/70 dark:bg-slate-900/90 flex flex-col justify-between space-y-4 transition-colors">
            {activeLocation ? (
              <div className="space-y-4">
                {/* Header & Badges */}
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        getMarkerColor(activeLocation.type).text
                      } bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs`}
                    >
                      {activeLocation.type}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                      {activeLocation.distanceKm} km from you
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white mt-2">
                    {activeLocation.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{activeLocation.address}</span>
                  </p>
                </div>

                {/* Operating hours & Partner */}
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/90 dark:border-slate-750 space-y-2 text-xs transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      Hours:
                    </span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{activeLocation.openHours}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      Contact:
                    </span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{activeLocation.contactNumber}</span>
                  </div>
                  {activeLocation.partnerBadge && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700/80 flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{activeLocation.partnerBadge}</span>
                    </div>
                  )}
                </div>

                {/* Accepted Waste Categories */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Accepted Segregated Waste:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLocation.acceptedCategories.map((cat, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/80"
                      >
                        ✓ {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contamination Prevention Tip */}
                <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-950 dark:text-amber-200 space-y-1 transition-colors">
                  <span className="font-bold flex items-center gap-1 text-amber-900 dark:text-amber-300">
                    <Info className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                    Facility Drop-Off Protocol:
                  </span>
                  <p className="text-[11px] leading-relaxed text-amber-900/90 dark:text-amber-200/90">
                    {activeLocation.tips}
                  </p>
                </div>

                {/* Simulated Directions Walkthrough */}
                {showDirectionsFor?.id === activeLocation.id && (
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 shadow-sm space-y-2 text-xs animate-in fade-in transition-colors">
                    <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                      <span className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
                        <Navigation className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        Simulated Route & Walking Guide
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">
                        ~{Math.max(2, Math.round(activeLocation.distanceKm * 12))} mins walk
                      </span>
                    </div>
                    <ol className="space-y-1.5 text-slate-600 dark:text-slate-300 pl-4 list-decimal text-[11px] leading-relaxed">
                      <li>Head toward the nearest designated waste station or campus corridor.</li>
                      <li>Follow signs to <strong>{activeLocation.address.split(",")[0]}</strong>.</li>
                      <li>Verify your item has zero liquid/grease contamination before placing in the corresponding bin color.</li>
                      <li>Scan the QR code at the receptacle kiosk to log +25 campus eco-credits!</li>
                    </ol>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 dark:text-slate-500 text-xs">
                Select a drop-off hub from the map or list to inspect details.
              </div>
            )}

            {/* Bottom Actions */}
            {activeLocation && (
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => setShowDirectionsFor(activeLocation)}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-700/20 transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </button>

                <button
                  onClick={() => handleCopyAddress(activeLocation)}
                  className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title="Copy location address"
                >
                  {copiedId === activeLocation.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 transition-colors">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Aligned with municipal zero-waste segregation protocols & 1M1B SDG 12 targets</span>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            Close Finder
          </button>
        </div>
      </div>
    </div>
  );
};
