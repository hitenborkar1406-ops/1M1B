import { PresetItem } from "../types";

export const CAMPUS_PRESETS: PresetItem[] = [
  {
    id: "pizza-box",
    name: "Greasy Pizza Box",
    category: "Food Packaging",
    iconName: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=60",
    description: "Common campus dorm waste. Highly prone to contaminating paper recycling batches with cheese oils.",
    query: "Cardboard pizza box with melted cheese grease residue on bottom half and clean cardboard lid"
  },
  {
    id: "coffee-cup",
    name: "Takeaway Paper Coffee Cup",
    category: "Beverage Container",
    iconName: "Coffee",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=60",
    description: "Look like paper, but 99% are lined with waterproof polyethylene plastic film inside.",
    query: "Disposable coffee shop paper cup with inner plastic poly-coating and plastic lid"
  },
  {
    id: "alkaline-battery",
    name: "Spent AA Battery",
    category: "Campus Tech Waste",
    iconName: "BatteryCharging",
    image: "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=400&auto=format&fit=crop&q=60",
    description: "Contains zinc and caustic potassium hydroxide. Never throw into standard trash bins.",
    query: "Discharged AA alkaline household cylinder battery with exposed positive and negative metal contacts"
  },
  {
    id: "soda-can",
    name: "Aluminum Soda Can",
    category: "Beverage Container",
    iconName: "CupSoda",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=60",
    description: "Infinite recyclability! Saves 95% of energy required to make virgin aluminum.",
    query: "Empty aluminum beverage can for carbonated soft drinks, rinsed clean"
  },
  {
    id: "banana-peel",
    name: "Fruit Peels & Food Scraps",
    category: "Cafeteria Organic",
    iconName: "Apple",
    image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&auto=format&fit=crop&q=60",
    description: "High moisture organic waste. In landfills, emits anaerobic methane; in compost, yields rich humus.",
    query: "Cafeteria organic kitchen waste consisting of ripe banana peel and fruit scraps"
  },
  {
    id: "blister-pack",
    name: "Medicine Blister Pack",
    category: "Healthcare / Dorm",
    iconName: "Pill",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60",
    description: "Composite plastic-PVC tightly bonded to aluminum foil backing, difficult for standard recycling.",
    query: "Empty pharmaceutical tablet blister pack made of bonded aluminum foil and PVC plastic bubble"
  },
  {
    id: "usb-cable",
    name: "Frayed USB-C Cable",
    category: "E-Waste",
    iconName: "Cable",
    image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400&auto=format&fit=crop&q=60",
    description: "Contains valuable high-grade copper core encased in flexible thermoplastic elastomer insulation.",
    query: "Broken charging cord USB cable with frayed insulation showing inner braided copper wire"
  },
  {
    id: "plastic-bottle",
    name: "Clear PET Water Bottle",
    category: "Rigid Plastic",
    iconName: "GlassWater",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=400&auto=format&fit=crop&q=60",
    description: "PET Type 1 plastic. Cap is HDPE Type 2. Requires simple rinse and separation.",
    query: "Transparent PET plastic mineral water bottle with polypropylene blue screw cap and paper label"
  }
];
