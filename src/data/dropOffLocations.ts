export interface DropOffLocation {
  id: string;
  name: string;
  city: string;
  type: "Composting Hub" | "Recycling Center" | "E-Waste Depot" | "Campus Eco-Kiosk" | "Hazardous Facility";
  acceptedCategories: ("Wet / Organic" | "Dry / Recyclable" | "E-Waste / Hazardous" | "Plastic & Metals" | "Glass")[];
  address: string;
  distanceKm: number;
  openHours: string;
  isOpenNow: boolean;
  contactNumber: string;
  mapCoordinates: { x: number; y: number }; // percentage coordinates for interactive mock SVG map (0-100%)
  rating: number;
  partnerBadge?: string;
  tips: string;
}

export const CITIES_LIST = [
  "Bengaluru",
  "Mumbai",
  "Delhi NCR",
  "Pune",
  "Hyderabad",
  "Chennai",
  "Campus Zone / University District"
];

export const MOCK_DROP_OFF_LOCATIONS: Record<string, DropOffLocation[]> = {
  "Bengaluru": [
    {
      id: "blr-1",
      name: "Koramangala Community Wet Waste & Biomethanation Hub",
      city: "Bengaluru",
      type: "Composting Hub",
      acceptedCategories: ["Wet / Organic"],
      address: "80 Feet Rd, 4th Block, Koramangala, Bengaluru 560034",
      distanceKm: 1.2,
      openHours: "6:00 AM – 7:00 PM (Daily)",
      isOpenNow: true,
      contactNumber: "+91 80 2553 1120",
      mapCoordinates: { x: 38, y: 52 },
      rating: 4.9,
      partnerBadge: "BBMP Verified Sustainable Hub",
      tips: "Accepts raw food scraps, coffee grounds, and soiled unprinted food cardboard."
    },
    {
      id: "blr-2",
      name: "Hasiru Dala E-Waste & Dry Resource Recovery Facility",
      city: "Bengaluru",
      type: "Recycling Center",
      acceptedCategories: ["Dry / Recyclable", "Plastic & Metals", "Glass"],
      address: "Outer Ring Rd, Bellandur, Bengaluru 560103",
      distanceKm: 2.8,
      openHours: "8:00 AM – 6:00 PM",
      isOpenNow: true,
      contactNumber: "+91 80 4122 8900",
      mapCoordinates: { x: 68, y: 34 },
      rating: 4.8,
      partnerBadge: "Zero-Landfill Authorized Partner",
      tips: "Rinse bottles and flatten clean cardboard boxes before drop-off."
    },
    {
      id: "blr-3",
      name: "IISc / Campus Green Zone Smart E-Waste Bin",
      city: "Bengaluru",
      type: "E-Waste Depot",
      acceptedCategories: ["E-Waste / Hazardous"],
      address: "Main Gate Circular Hub, CV Raman Rd, Malleshwaram, Bengaluru 560012",
      distanceKm: 3.5,
      openHours: "Open 24/7 (Campus Smart Drop)",
      isOpenNow: true,
      contactNumber: "+91 80 2293 2004",
      mapCoordinates: { x: 26, y: 22 },
      rating: 5.0,
      partnerBadge: "1M1B Student Chapter Station",
      tips: "Drop alkaline cells, old phone batteries (tape terminals), and broken laptop cords."
    },
    {
      id: "blr-4",
      name: "Indiranagar Circular Glass & Rigid Polymer Depot",
      city: "Bengaluru",
      type: "Recycling Center",
      acceptedCategories: ["Dry / Recyclable", "Plastic & Metals", "Glass"],
      address: "12th Main, HAL 2nd Stage, Indiranagar, Bengaluru 560038",
      distanceKm: 4.1,
      openHours: "9:00 AM – 5:30 PM",
      isOpenNow: true,
      contactNumber: "+91 80 2520 4455",
      mapCoordinates: { x: 55, y: 44 },
      rating: 4.7,
      partnerBadge: "State Pollution Control Accredited",
      tips: "Sort beverage bottles by color (clear vs amber)."
    }
  ],
  "Mumbai": [
    {
      id: "mum-1",
      name: "Bandra West Municipal Dry Waste Sorting & MRF Hub",
      city: "Mumbai",
      type: "Recycling Center",
      acceptedCategories: ["Dry / Recyclable", "Plastic & Metals"],
      address: "Turner Road, Near D'Monte Park, Bandra West, Mumbai 400050",
      distanceKm: 0.9,
      openHours: "7:00 AM – 6:00 PM",
      isOpenNow: true,
      contactNumber: "+91 22 2642 4110",
      mapCoordinates: { x: 30, y: 45 },
      rating: 4.8,
      partnerBadge: "MCGM Swachh Bharat Partner",
      tips: "Accepts segregated plastics, newspapers, clean cartons, and metal cans."
    },
    {
      id: "mum-2",
      name: "IIT Bombay Campus Organic Composting Station",
      city: "Mumbai",
      type: "Composting Hub",
      acceptedCategories: ["Wet / Organic"],
      address: "Hostel 12 Perimeter Trail, Powai, Mumbai 400076",
      distanceKm: 3.2,
      openHours: "Open 24/7",
      isOpenNow: true,
      contactNumber: "+91 22 2576 7000",
      mapCoordinates: { x: 70, y: 30 },
      rating: 5.0,
      partnerBadge: "Campus Zero-Waste Initiative",
      tips: "Designed for cafeteria wet food scraps, tea leaves, and biodegradable trays."
    },
    {
      id: "mum-3",
      name: "EcoReco E-Waste Recycling Depot",
      city: "Mumbai",
      type: "E-Waste Depot",
      acceptedCategories: ["E-Waste / Hazardous"],
      address: "Andheri East Industrial Hub, Mumbai 400093",
      distanceKm: 4.5,
      openHours: "9:30 AM – 6:30 PM",
      isOpenNow: true,
      contactNumber: "+91 22 4005 2200",
      mapCoordinates: { x: 48, y: 25 },
      rating: 4.7,
      partnerBadge: "R2 Certified Recycler",
      tips: "Safe disposal for lithium-ion packs, damaged circuit boards, and lead-acid batteries."
    }
  ],
  "Delhi NCR": [
    {
      id: "del-1",
      name: "Chanakyapuri Bio-Waste & Aerobic Composting Park",
      city: "Delhi NCR",
      type: "Composting Hub",
      acceptedCategories: ["Wet / Organic"],
      address: "Nehru Park Green Depot, Chanakyapuri, New Delhi 110021",
      distanceKm: 1.5,
      openHours: "6:30 AM – 7:30 PM",
      isOpenNow: true,
      contactNumber: "+91 11 2467 1234",
      mapCoordinates: { x: 42, y: 48 },
      rating: 4.9,
      partnerBadge: "NDMC Eco-Model Center",
      tips: "Community compost beds for botanical pruning, peels, and food scraps."
    },
    {
      id: "del-2",
      name: "Delhi University Campus Dry Stream Collection Hub",
      city: "Delhi NCR",
      type: "Recycling Center",
      acceptedCategories: ["Dry / Recyclable", "Plastic & Metals"],
      address: "North Campus Arts Faculty Rd, Delhi 110007",
      distanceKm: 2.1,
      openHours: "8:00 AM – 5:00 PM",
      isOpenNow: true,
      contactNumber: "+91 11 2766 7725",
      mapCoordinates: { x: 45, y: 22 },
      rating: 4.8,
      partnerBadge: "University Green Council",
      tips: "Focuses on textbooks, study handouts, flattened cartons, and PET drink cups."
    },
    {
      id: "del-3",
      name: "Okhla Safe E-Waste & Hazardous Material Drop",
      city: "Delhi NCR",
      type: "E-Waste Depot",
      acceptedCategories: ["E-Waste / Hazardous"],
      address: "Phase III Industrial Estate, Okhla, New Delhi 110020",
      distanceKm: 5.2,
      openHours: "9:00 AM – 6:00 PM",
      isOpenNow: true,
      contactNumber: "+91 11 4161 8800",
      mapCoordinates: { x: 62, y: 72 },
      rating: 4.6,
      partnerBadge: "Central Pollution Control Board Authorized",
      tips: "Proper handling of toxic battery chemicals and fluorescent CFL tubes."
    }
  ],
  "Pune": [
    {
      id: "pun-1",
      name: "SWaCH Cooperative Model Sorting Hub",
      city: "Pune",
      type: "Recycling Center",
      acceptedCategories: ["Dry / Recyclable", "Plastic & Metals", "Glass"],
      address: "Kothrud Depot, Near Paud Road, Pune 411038",
      distanceKm: 1.1,
      openHours: "7:00 AM – 5:00 PM",
      isOpenNow: true,
      contactNumber: "+91 20 2544 3321",
      mapCoordinates: { x: 35, y: 60 },
      rating: 5.0,
      partnerBadge: "Globally Acclaimed Waste-Picker Cooperative",
      tips: "Guarantees 100% fair compensation and clean segregation of municipal dry recyclables."
    },
    {
      id: "pun-2",
      name: "COEP Campus Micro-Composting Pit",
      city: "Pune",
      type: "Composting Hub",
      acceptedCategories: ["Wet / Organic"],
      address: "Shivajinagar Campus Riverside, Pune 411005",
      distanceKm: 2.4,
      openHours: "Open 24/7 (Campus Student Access)",
      isOpenNow: true,
      contactNumber: "+91 20 2550 7000",
      mapCoordinates: { x: 50, y: 38 },
      rating: 4.9,
      partnerBadge: "Student Green Initiative",
      tips: "Tear greasy canteen food trays into small pieces for rapid aerobic breakdown."
    }
  ],
  "Hyderabad": [
    {
      id: "hyd-1",
      name: "Gachibowli Zero-Waste Citizen Kiosk",
      city: "Hyderabad",
      type: "Campus Eco-Kiosk",
      acceptedCategories: ["Dry / Recyclable", "E-Waste / Hazardous"],
      address: "Financial District Junction, Gachibowli, Hyderabad 500032",
      distanceKm: 1.4,
      openHours: "Open 24/7",
      isOpenNow: true,
      contactNumber: "+91 40 2300 6600",
      mapCoordinates: { x: 30, y: 40 },
      rating: 4.8,
      partnerBadge: "GHMC Green Protocol",
      tips: "Automated deposit machines for cans, bottles, and batteries."
    },
    {
      id: "hyd-2",
      name: "Hitec City Decentralized Wet Waste Composter",
      city: "Hyderabad",
      type: "Composting Hub",
      acceptedCategories: ["Wet / Organic"],
      address: "Cyber Towers Circle, Madhapur, Hyderabad 500081",
      distanceKm: 2.0,
      openHours: "6:00 AM – 6:00 PM",
      isOpenNow: true,
      contactNumber: "+91 40 4004 8899",
      mapCoordinates: { x: 60, y: 55 },
      rating: 4.7,
      partnerBadge: "Zero-Food-Waste Campus",
      tips: "Turns hostel dining leftover foods into organic fertilizer for campus landscaping."
    }
  ],
  "Chennai": [
    {
      id: "chn-1",
      name: "IIT Madras Eco-Park & Bio-Digester",
      city: "Chennai",
      type: "Composting Hub",
      acceptedCategories: ["Wet / Organic"],
      address: "Sardar Patel Rd, Adyar, Chennai 600036",
      distanceKm: 1.3,
      openHours: "Open 24/7",
      isOpenNow: true,
      contactNumber: "+91 44 2257 8000",
      mapCoordinates: { x: 55, y: 45 },
      rating: 4.9,
      partnerBadge: "Campus Carbon-Neutral Zone",
      tips: "Campus organic waste converted directly into methane biogas for cooking."
    },
    {
      id: "chn-2",
      name: "Adyar Urbaser Sumeet Resource Recovery Center",
      city: "Chennai",
      type: "Recycling Center",
      acceptedCategories: ["Dry / Recyclable", "Plastic & Metals", "Glass"],
      address: "Gandhi Nagar 3rd Main Rd, Adyar, Chennai 600020",
      distanceKm: 2.2,
      openHours: "7:00 AM – 5:30 PM",
      isOpenNow: true,
      contactNumber: "+91 44 2441 3300",
      mapCoordinates: { x: 40, y: 65 },
      rating: 4.7,
      partnerBadge: "Greater Chennai Corporation Partner",
      tips: "Separate paper fiber from laminated multilayer plastics."
    }
  ],
  "Campus Zone / University District": [
    {
      id: "cmp-1",
      name: "Central Dining Hall Micro-Composting Drum",
      city: "Campus Zone / University District",
      type: "Composting Hub",
      acceptedCategories: ["Wet / Organic"],
      address: "Cafeteria Quad East Wing, Building 4",
      distanceKm: 0.2,
      openHours: "Open 24/7",
      isOpenNow: true,
      contactNumber: "Ext. 4012 (Campus Facility)",
      mapCoordinates: { x: 45, y: 48 },
      rating: 5.0,
      partnerBadge: "1M1B Verified Campus Station",
      tips: "Drop food scraps, fruit rinds, and greasy paper tray bases."
    },
    {
      id: "cmp-2",
      name: "Student Activity Center E-Waste & Battery Drop Box",
      city: "Campus Zone / University District",
      type: "E-Waste Depot",
      acceptedCategories: ["E-Waste / Hazardous"],
      address: "SAC Ground Floor Lobby, Near ATM Alcove",
      distanceKm: 0.4,
      openHours: "Open 24/7 (Card Access)",
      isOpenNow: true,
      contactNumber: "Ext. 2100",
      mapCoordinates: { x: 30, y: 35 },
      rating: 4.9,
      partnerBadge: "Safe Battery Stewardship",
      tips: "Place clear Scotch tape across 9V and coin-cell battery terminals."
    },
    {
      id: "cmp-3",
      name: "Hostel Block B Clean Paper & Plastic Compactor",
      city: "Campus Zone / University District",
      type: "Recycling Center",
      acceptedCategories: ["Dry / Recyclable", "Plastic & Metals"],
      address: "Hostel B Service Lane & Bike Shelter",
      distanceKm: 0.6,
      openHours: "6:00 AM – 10:00 PM",
      isOpenNow: true,
      contactNumber: "Ext. 3340",
      mapCoordinates: { x: 65, y: 62 },
      rating: 4.8,
      partnerBadge: "Student Eco-Ambassadors",
      tips: "Flatten cardboard packaging and rinse drink cans."
    }
  ]
};
