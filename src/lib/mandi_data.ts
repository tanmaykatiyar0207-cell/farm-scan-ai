export interface MandiEntry {
  id: string;
  name: string;
  state: string;
  district: string;
  lat: number;
  lon: number;
  commodities: {
    name: string;
    price: number;
    unit: string;
    trend: "up" | "down" | "stable";
  }[];
}

export const ALL_MANDIS: MandiEntry[] = [
  // KARNATAKA
  { id: "k1", name: "Yeshwanthpur Market", state: "Karnataka", district: "Bangalore", lat: 13.02, lon: 77.55, commodities: [{ name: "Onion", price: 2200, unit: "Quintal", trend: "up" }, { name: "Tomato", price: 1500, unit: "Quintal", trend: "down" }] },
  { id: "k2", name: "Kolar Mandi", state: "Karnataka", district: "Kolar", lat: 13.13, lon: 78.13, commodities: [{ name: "Tomato", price: 1100, unit: "Quintal", trend: "down" }, { name: "Potato", price: 1400, unit: "Quintal", trend: "stable" }] },
  { id: "k3", name: "Mysuru APMC", state: "Karnataka", district: "Mysuru", lat: 12.30, lon: 76.63, commodities: [{ name: "Rice", price: 4800, unit: "Quintal", trend: "up" }, { name: "Ragi", price: 3300, unit: "Quintal", trend: "stable" }] },
  { id: "k4", name: "Hubli Mandi", state: "Karnataka", district: "Dharwad", lat: 15.36, lon: 75.12, commodities: [{ name: "Cotton", price: 7500, unit: "Quintal", trend: "up" }, { name: "Chilli", price: 15000, unit: "Quintal", trend: "stable" }] },
  { id: "k5", name: "Shimoga Market", state: "Karnataka", district: "Shimoga", lat: 13.92, lon: 75.56, commodities: [{ name: "Arecanut", price: 45000, unit: "Quintal", trend: "up" }, { name: "Maize", price: 2100, unit: "Quintal", trend: "stable" }] },

  // MAHARASHTRA
  { id: "m1", name: "Lasalgaon Mandi", state: "Maharashtra", district: "Nashik", lat: 20.14, lon: 74.22, commodities: [{ name: "Onion", price: 1850, unit: "Quintal", trend: "up" }, { name: "Grapes", price: 6000, unit: "Quintal", trend: "stable" }] },
  { id: "m2", name: "Vashi APMC", state: "Maharashtra", district: "Navi Mumbai", lat: 19.07, lon: 73.00, commodities: [{ name: "Rice", price: 5500, unit: "Quintal", trend: "stable" }, { name: "Wheat", price: 3200, unit: "Quintal", trend: "down" }] },
  { id: "m3", name: "Nagpur Mandi", state: "Maharashtra", district: "Nagpur", lat: 21.14, lon: 79.08, commodities: [{ name: "Orange", price: 4500, unit: "Quintal", trend: "up" }, { name: "Cotton", price: 7800, unit: "Quintal", trend: "stable" }] },
  { id: "m4", name: "Pune Gultekdi", state: "Maharashtra", district: "Pune", lat: 18.52, lon: 73.85, commodities: [{ name: "Pomegranate", price: 8000, unit: "Quintal", trend: "up" }, { name: "Potato", price: 1600, unit: "Quintal", trend: "stable" }] },
  { id: "m5", name: "Latur Mandi", state: "Maharashtra", district: "Latur", lat: 18.40, lon: 76.56, commodities: [{ name: "Soybean", price: 4400, unit: "Quintal", trend: "up" }, { name: "Urad Dal", price: 7200, unit: "Quintal", trend: "stable" }] },

  // PUNJAB & HARYANA
  { id: "p1", name: "Khanna Mandi", state: "Punjab", district: "Ludhiana", lat: 30.70, lon: 76.21, commodities: [{ name: "Wheat", price: 2125, unit: "Quintal", trend: "stable" }, { name: "Paddy", price: 2040, unit: "Quintal", trend: "up" }] },
  { id: "p2", name: "Amritsar Mandi", state: "Punjab", district: "Amritsar", lat: 31.63, lon: 74.87, commodities: [{ name: "Basmati Rice", price: 9500, unit: "Quintal", trend: "up" }, { name: "Wheat", price: 2150, unit: "Quintal", trend: "stable" }] },
  { id: "p3", name: "Jalandhar Market", state: "Punjab", district: "Jalandhar", lat: 31.32, lon: 75.57, commodities: [{ name: "Potato", price: 1100, unit: "Quintal", trend: "down" }, { name: "Sunflower", price: 5800, unit: "Quintal", trend: "stable" }] },
  { id: "h1", name: "Karnal Mandi", state: "Haryana", district: "Karnal", lat: 29.68, lon: 76.99, commodities: [{ name: "Paddy", price: 2100, unit: "Quintal", trend: "up" }, { name: "Wheat", price: 2125, unit: "Quintal", trend: "stable" }] },
  { id: "h2", name: "Sirsa Mandi", state: "Haryana", district: "Sirsa", lat: 29.53, lon: 75.01, commodities: [{ name: "Cotton", price: 7400, unit: "Quintal", trend: "up" }, { name: "Guar Seed", price: 5200, unit: "Quintal", trend: "stable" }] },

  // UTTAR PRADESH
  { id: "u1", name: "Agra Mandi", state: "Uttar Pradesh", district: "Agra", lat: 27.17, lon: 78.00, commodities: [{ name: "Potato", price: 950, unit: "Quintal", trend: "down" }, { name: "Mustard", price: 5400, unit: "Quintal", trend: "stable" }] },
  { id: "u2", name: "Lucknow Mandi", state: "Uttar Pradesh", district: "Lucknow", lat: 26.84, lon: 80.94, commodities: [{ name: "Mango", price: 4500, unit: "Quintal", trend: "up" }, { name: "Wheat", price: 2150, unit: "Quintal", trend: "stable" }] },
  { id: "u3", name: "Kanpur Mandi", state: "Uttar Pradesh", district: "Kanpur", lat: 26.44, lon: 80.33, commodities: [{ name: "Arhar Dal", price: 9500, unit: "Quintal", trend: "up" }, { name: "Maize", price: 2000, unit: "Quintal", trend: "stable" }] },
  { id: "u4", name: "Varanasi Mandi", state: "Uttar Pradesh", district: "Varanasi", lat: 25.31, lon: 82.97, commodities: [{ name: "Banana", price: 2800, unit: "Quintal", trend: "up" }, { name: "Rice", price: 3200, unit: "Quintal", trend: "stable" }] },
  { id: "u5", name: "Bareilly Market", state: "Uttar Pradesh", district: "Bareilly", lat: 28.36, lon: 79.41, commodities: [{ name: "Sugarcane", price: 350, unit: "Quintal", trend: "up" }, { name: "Wheat", price: 2125, unit: "Quintal", trend: "stable" }] },

  // TAMIL NADU & KERALA
  { id: "t1", name: "Koyambedu Market", state: "Tamil Nadu", district: "Chennai", lat: 13.07, lon: 80.19, commodities: [{ name: "Carrot", price: 3500, unit: "Quintal", trend: "up" }, { name: "Coconut", price: 2800, unit: "Quintal", trend: "stable" }] },
  { id: "t2", name: "Coimbatore APMC", state: "Tamil Nadu", district: "Coimbatore", lat: 11.01, lon: 76.95, commodities: [{ name: "Turmeric", price: 8500, unit: "Quintal", trend: "up" }, { name: "Coconut", price: 3000, unit: "Quintal", trend: "stable" }] },
  { id: "t3", name: "Madurai Mandi", state: "Tamil Nadu", district: "Madurai", lat: 9.92, lon: 78.11, commodities: [{ name: "Jasmine", price: 25000, unit: "Quintal", trend: "up" }, { name: "Rice", price: 5200, unit: "Quintal", trend: "stable" }] },
  { id: "t4", name: "Salem Market", state: "Tamil Nadu", district: "Salem", lat: 11.66, lon: 78.14, commodities: [{ name: "Tapioca", price: 12000, unit: "Quintal", trend: "up" }, { name: "Mango", price: 5500, unit: "Quintal", trend: "stable" }] },
  { id: "ke1", name: "Kochi APMC", state: "Kerala", district: "Ernakulam", lat: 9.93, lon: 76.26, commodities: [{ name: "Pepper", price: 52000, unit: "Quintal", trend: "up" }, { name: "Rubber", price: 16000, unit: "Quintal", trend: "stable" }] },

  // ANDHRA & TELANGANA
  { id: "a1", name: "Guntur Red Chilli", state: "Andhra Pradesh", district: "Guntur", lat: 16.30, lon: 80.43, commodities: [{ name: "Chilli (Red)", price: 18000, unit: "Quintal", trend: "up" }, { name: "Cotton", price: 7200, unit: "Quintal", trend: "stable" }] },
  { id: "a2", name: "Vijayawada Mandi", state: "Andhra Pradesh", district: "Krishna", lat: 16.50, lon: 80.64, commodities: [{ name: "Lemon", price: 4500, unit: "Quintal", trend: "up" }, { name: "Rice", price: 4800, unit: "Quintal", trend: "stable" }] },
  { id: "tel1", name: "Warangal Mandi", state: "Telangana", district: "Warangal", lat: 17.96, lon: 79.59, commodities: [{ name: "Chilli", price: 17500, unit: "Quintal", trend: "up" }, { name: "Maize", price: 2150, unit: "Quintal", trend: "stable" }] },
  { id: "tel2", name: "Hyderabad APMC", state: "Telangana", district: "Hyderabad", lat: 17.38, lon: 78.48, commodities: [{ name: "Onion", price: 2400, unit: "Quintal", trend: "up" }, { name: "Tomato", price: 1600, unit: "Quintal", trend: "stable" }] },

  // GUJARAT & RAJASTHAN
  { id: "g1", name: "Unjha Mandi", state: "Gujarat", district: "Mehsana", lat: 23.81, lon: 72.40, commodities: [{ name: "Cumin (Jeera)", price: 32000, unit: "Quintal", trend: "up" }, { name: "Fennel", price: 18000, unit: "Quintal", trend: "stable" }] },
  { id: "g2", name: "Rajkot Mandi", state: "Gujarat", district: "Rajkot", lat: 22.30, lon: 70.80, commodities: [{ name: "Groundnut", price: 6500, unit: "Quintal", trend: "up" }, { name: "Cotton", price: 7300, unit: "Quintal", trend: "stable" }] },
  { id: "g3", name: "Ahmedabad APMC", state: "Gujarat", district: "Ahmedabad", lat: 23.02, lon: 72.57, commodities: [{ name: "Potato", price: 1400, unit: "Quintal", trend: "up" }, { name: "Onion", price: 2100, unit: "Quintal", trend: "stable" }] },
  { id: "r1", name: "Jaipur Mandi", state: "Rajasthan", district: "Jaipur", lat: 26.91, lon: 75.78, commodities: [{ name: "Mustard", price: 5800, unit: "Quintal", trend: "up" }, { name: "Wheat", price: 2200, unit: "Quintal", trend: "stable" }] },
  { id: "r2", name: "Kota Mandi", state: "Rajasthan", district: "Kota", lat: 25.21, lon: 75.86, commodities: [{ name: "Soybean", price: 4700, unit: "Quintal", trend: "up" }, { name: "Coriander", price: 7200, unit: "Quintal", trend: "stable" }] },
  { id: "r3", name: "Alwar Mandi", state: "Rajasthan", district: "Alwar", lat: 27.55, lon: 76.60, commodities: [{ name: "Mustard", price: 5600, unit: "Quintal", trend: "up" }, { name: "Onion", price: 1800, unit: "Quintal", trend: "stable" }] },

  // WEST BENGAL & ODISHA
  { id: "wb1", name: "Kolkata Mandi", state: "West Bengal", district: "Kolkata", lat: 22.57, lon: 88.36, commodities: [{ name: "Rice", price: 4200, unit: "Quintal", trend: "up" }, { name: "Jute", price: 6500, unit: "Quintal", trend: "stable" }] },
  { id: "wb2", name: "Burdwan Market", state: "West Bengal", district: "Purba Bardhaman", lat: 23.23, lon: 87.86, commodities: [{ name: "Paddy", price: 2050, unit: "Quintal", trend: "up" }, { name: "Rice", price: 4000, unit: "Quintal", trend: "stable" }] },
  { id: "o1", name: "Bhubaneswar Mandi", state: "Odisha", district: "Khurda", lat: 20.30, lon: 85.82, commodities: [{ name: "Rice", price: 4100, unit: "Quintal", trend: "up" }, { name: "Vegetables", price: 3000, unit: "Quintal", trend: "stable" }] },

  // BIHAR & JHARKHAND
  { id: "b1", name: "Patna APMC", state: "Bihar", district: "Patna", lat: 25.59, lon: 85.13, commodities: [{ name: "Maize", price: 2100, unit: "Quintal", trend: "up" }, { name: "Wheat", price: 2150, unit: "Quintal", trend: "stable" }] },
  { id: "b2", name: "Gulabbagh Mandi", state: "Bihar", district: "Purnia", lat: 25.77, lon: 87.47, commodities: [{ name: "Maize", price: 2080, unit: "Quintal", trend: "up" }, { name: "Paddy", price: 2040, unit: "Quintal", trend: "stable" }] },

  // MADHYA PRADESH
  { id: "mp1", name: "Indore Mandi", state: "Madhya Pradesh", district: "Indore", lat: 22.71, lon: 75.85, commodities: [{ name: "Soybean", price: 4600, unit: "Quintal", trend: "up" }, { name: "Wheat", price: 2400, unit: "Quintal", trend: "stable" }] },
  { id: "mp2", name: "Bhopal Mandi", state: "Madhya Pradesh", district: "Bhopal", lat: 23.25, lon: 77.41, commodities: [{ name: "Wheat", price: 2350, unit: "Quintal", trend: "up" }, { name: "Gram", price: 5400, unit: "Quintal", trend: "stable" }] },
  { id: "mp3", name: "Neemuch Mandi", state: "Madhya Pradesh", district: "Neemuch", lat: 24.47, lon: 74.87, commodities: [{ name: "Garlic", price: 12000, unit: "Quintal", trend: "up" }, { name: "Soybean", price: 4500, unit: "Quintal", trend: "stable" }] },
  { id: "mp4", name: "Mandsaur Mandi", state: "Madhya Pradesh", district: "Mandsaur", lat: 24.03, lon: 75.07, commodities: [{ name: "Garlic", price: 11500, unit: "Quintal", trend: "up" }, { name: "Mustard", price: 5200, unit: "Quintal", trend: "stable" }] },

  // DELHI & OTHERS
  { id: "d1", name: "Azadpur Mandi", state: "Delhi", district: "North Delhi", lat: 28.70, lon: 77.17, commodities: [{ name: "Apple", price: 12000, unit: "Quintal", trend: "up" }, { name: "Mango", price: 15000, unit: "Quintal", trend: "up" }] },
  { id: "d2", name: "Okhla Mandi", state: "Delhi", district: "South Delhi", lat: 28.55, lon: 77.27, commodities: [{ name: "Potato", price: 1500, unit: "Quintal", trend: "stable" }, { name: "Onion", price: 2200, unit: "Quintal", trend: "up" }] }
];
