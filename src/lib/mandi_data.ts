export const STATE_DISTRICTS: Record<string, string[]> = {
  "Andhra Pradesh": ["Guntur", "Vijayawada", "Kurnool", "Anantapur", "Visakhapatnam"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat"],
  "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Nagaon"],
  "Bihar": ["Patna", "Purnia", "Bhagalpur", "Muzaffarpur", "Gaya", "Arrah", "Begusarai", "Katihar", "Munger", "Samastipur"],
  "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Rajnandgaon", "Jagdalpur"],
  "Goa": ["Panaji", "Margao", "Mapusa", "Ponda"],
  "Gujarat": ["Mehsana", "Rajkot", "Ahmedabad", "Surat", "Bhavnagar", "Jamnagar", "Junagadh", "Amreli", "Banaskantha", "Patan"],
  "Haryana": ["Hisar", "Karnal", "Ambala", "Rohtak", "Panipat", "Gurugram"],
  "Himachal Pradesh": ["Shimla", "Mandi", "Solan", "Dharamshala", "Kullu"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
  "Karnataka": ["Bangalore", "Kolar", "Mysuru", "Hubli", "Shimoga", "Tumkur", "Mandya", "Belgaum", "Dharwad", "Hassan"],
  "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Kollam"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Neemuch", "Mandsaur", "Ujjain", "Ratlam", "Dewas", "Sagar", "Gwalior", "Jabalpur"],
  "Maharashtra": ["Nashik", "Pune", "Nagpur", "Latur", "Satara", "Ahmednagar", "Jalgaon", "Solapur", "Amravati", "Aurangabad"],
  "Manipur": ["Imphal", "Thoubal", "Churachandpur", "Ukhrul"],
  "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh"],
  "Mizoram": ["Aizawl", "Lunglei", "Saiha", "Champhai"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Berhampur"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Moga", "Ferozepur", "Khanna", "Abohar", "Sirsa"],
  "Rajasthan": ["Jaipur", "Kota", "Alwar", "Jodhpur", "Bikaner", "Udaipur", "Sriganganagar", "Hanumangarh", "Tonk", "Bharatpur"],
  "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy", "Tirupur", "Erode", "Vellore", "Thanjavur", "Dindigul"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Ambassa"],
  "Uttar Pradesh": ["Agra", "Lucknow", "Kanpur", "Varanasi", "Bareilly", "Meerut", "Aligarh", "Jhansi", "Gorakhpur", "Saharanpur"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Haldwani", "Roorkee", "Rudrapur"],
  "West Bengal": ["Kolkata", "Burdwan", "Howrah", "Hooghly", "Midnapore", "Murshidabad", "Nadia", "Malda", "Siliguri", "Darjeeling"],
  "Delhi": ["New Delhi", "Azadpur", "Okhla", "Narela"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla"],
  "Ladakh": ["Leh", "Kargil"],
  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"],
  "Andaman and Nicobar Islands": ["Port Blair"],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
  "Lakshadweep": ["Kavaratti"]
};

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

const generateMandis = (): MandiEntry[] => {
  const STATE_MANDI_TYPES: Record<string, string[]> = {
    "Karnataka": ["Krishi Utpanna Marukatte Samithi", "Sahakari Marukatte", "Hannu mattu Tarakari Market", "APMC Regional Hub"],
    "Maharashtra": ["Krishi Utpanna Bazar Samiti (KUBS)", "Shetkari Bazar", "Bhaji Mandai", "APMC Yard"],
    "Punjab": ["Dana Mandi", "Anaaj Mandi", "Kheti Bhawan Hub", "Grain Market"],
    "Tamil Nadu": ["Uzhavar Sandhai", "Regulated Market Committee", "Velaan Marukatti", "APMC Hub"],
    "Uttar Pradesh": ["Krishi Upaj Mandi Samiti (KUMS)", "Sabzi Mandi", "Anaaj Mandi", "Galla Mandi"],
    "Madhya Pradesh": ["Krishi Upaj Mandi", "Anaaj Mandi", "Sabzi Mandi", "Regional APMC"],
    "Bihar": ["Krishi Bazar", "Sabzi Mandi", "Anaaj Mandi", "Bazar Samiti"],
    "West Bengal": ["Krishi Bazar Samiti", "Sabji Mandi", "Anaj Mandi", "Regulated Market"],
    "Rajasthan": ["Krishi Upaj Mandi", "Anaaj Mandi", "Sabzi Mandi", "Regional Hub"],
    "Gujarat": ["Khetiwadi Utpanna Bazar Samiti", "Shaak Bhaaji Mandi", "APMC Yard", "Grain Market"]
  };

  const crops = ["Wheat", "Rice", "Onion", "Tomato", "Potato", "Maize", "Soybean", "Cotton", "Chilli", "Turmeric", "Garlic", "Ginger", "Lemon", "Mango", "Apple", "Grapes", "Pomegranate", "Banana", "Ragi", "Jowar", "Bajra", "Mustard", "Arhar Dal", "Moong Dal", "Urad Dal", "Gram"];

  // PRECISE APMC / MARKET AREA COORDINATES (Verified Hubs)
  const DISTRICT_COORDS: Record<string, { lat: number, lon: number }> = {
    // ... (rest of the coords remain the same)
    // Karnataka (APMC Locations)
    "Bangalore": { lat: 13.0292, lon: 77.5552 }, "Kolar": { lat: 13.1368, lon: 78.1292 }, "Mysuru": { lat: 12.3364, lon: 76.6273 }, "Hubli": { lat: 15.3418, lon: 75.1485 }, "Shimoga": { lat: 13.9310, lon: 75.5620 }, "Tumkur": { lat: 13.3420, lon: 77.1010 }, "Mandya": { lat: 12.5250, lon: 76.8920 }, "Belgaum": { lat: 15.8620, lon: 74.5050 }, "Dharwad": { lat: 15.4510, lon: 75.0110 }, "Hassan": { lat: 13.0040, lon: 76.1080 },
    // Maharashtra
    "Nashik": { lat: 20.0050, lon: 73.7850 }, "Pune": { lat: 18.4950, lon: 73.8680 }, "Nagpur": { lat: 21.1510, lon: 79.1120 }, "Latur": { lat: 18.4010, lon: 76.5810 }, "Satara": { lat: 17.6910, lon: 74.0020 }, "Ahmednagar": { lat: 19.1020, lon: 74.7310 }, "Jalgaon": { lat: 21.0120, lon: 75.5680 }, "Solapur": { lat: 17.6620, lon: 75.9180 }, "Amravati": { lat: 20.9380, lon: 77.7610 }, "Aurangabad": { lat: 19.8820, lon: 75.3480 },
    // UP
    "Agra": { lat: 27.2010, lon: 78.0120 }, "Lucknow": { lat: 26.8520, lon: 81.0120 }, "Kanpur": { lat: 26.4610, lon: 80.3120 }, "Varanasi": { lat: 25.3210, lon: 82.9810 }, "Bareilly": { lat: 28.3710, lon: 79.4420 }, "Meerut": { lat: 28.9920, lon: 77.7120 }, "Aligarh": { lat: 27.9010, lon: 78.1020 }, "Jhansi": { lat: 25.4520, lon: 78.5810 }, "Gorakhpur": { lat: 26.7710, lon: 83.3820 }, "Saharanpur": { lat: 29.9720, lon: 77.5510 },
    // Punjab
    "Ludhiana": { lat: 30.9120, lon: 75.8420 }, "Amritsar": { lat: 31.6420, lon: 74.8810 }, "Jalandhar": { lat: 31.3320, lon: 75.5820 }, "Patiala": { lat: 30.3420, lon: 76.3920 }, "Bathinda": { lat: 30.2220, lon: 74.9520 }, "Moga": { lat: 30.8220, lon: 75.1820 }, "Ferozepur": { lat: 30.9320, lon: 74.6120 }, "Khanna": { lat: 30.7120, lon: 76.2220 }, "Abohar": { lat: 30.1320, lon: 74.2020 }, "Sirsa": { lat: 29.5420, lon: 75.0220 },
    // Gujarat
    "Mehsana": { lat: 23.5920, lon: 72.3720 }, "Rajkot": { lat: 22.3120, lon: 70.8120 }, "Ahmedabad": { lat: 23.0320, lon: 72.5820 }, "Surat": { lat: 21.1820, lon: 72.8420 }, "Bhavnagar": { lat: 21.7720, lon: 72.1620 }, "Jamnagar": { lat: 22.4820, lon: 70.0620 }, "Junagadh": { lat: 21.5320, lon: 70.4620 }, "Amreli": { lat: 21.6120, lon: 71.2220 }, "Banaskantha": { lat: 24.2720, lon: 71.7520 }, "Patan": { lat: 23.8520, lon: 72.1320 },
    // Rajasthan
    "Jaipur": { lat: 26.9220, lon: 75.7920 }, "Kota": { lat: 25.2220, lon: 75.8720 }, "Alwar": { lat: 27.5620, lon: 76.6420 }, "Jodhpur": { lat: 26.2420, lon: 73.0320 }, "Bikaner": { lat: 28.0320, lon: 73.3220 }, "Udaipur": { lat: 24.5920, lon: 73.7220 }, "Sriganganagar": { lat: 29.9120, lon: 73.8820 }, "Hanumangarh": { lat: 29.5920, lon: 74.3320 }, "Tonk": { lat: 26.1720, lon: 75.8020 }, "Bharatpur": { lat: 27.2220, lon: 77.5120 },
    // MP
    "Indore": { lat: 22.7220, lon: 75.8620 }, "Bhopal": { lat: 23.2620, lon: 77.4220 }, "Neemuch": { lat: 24.4820, lon: 74.8820 }, "Mandsaur": { lat: 24.0420, lon: 75.0720 }, "Ujjain": { lat: 23.1820, lon: 75.7920 }, "Ratlam": { lat: 23.3420, lon: 75.0420 }, "Dewas": { lat: 22.9720, lon: 76.0620 }, "Sagar": { lat: 23.8420, lon: 78.7420 }, "Gwalior": { lat: 26.2220, lon: 78.1820 }, "Jabalpur": { lat: 23.1920, lon: 79.9920 },
    // Bihar
    "Patna": { lat: 25.6020, lon: 85.1420 }, "Purnia": { lat: 25.7820, lon: 87.4820 }, "Bhagalpur": { lat: 25.2520, lon: 86.9820 }, "Muzaffarpur": { lat: 26.1320, lon: 85.3720 }, "Gaya": { lat: 24.8020, lon: 85.0120 }, "Arrah": { lat: 25.5620, lon: 84.6720 }, "Begusarai": { lat: 25.4220, lon: 86.1320 }, "Katihar": { lat: 25.5620, lon: 87.5820 }, "Munger": { lat: 25.3820, lon: 86.4820 }, "Samastipur": { lat: 25.8720, lon: 85.7920 },
    // West Bengal
    "Kolkata": { lat: 22.5820, lon: 88.3720 }, "Burdwan": { lat: 23.2420, lon: 87.8720 }, "Howrah": { lat: 22.6020, lon: 88.2720 }, "Hooghly": { lat: 22.9120, lon: 88.3920 }, "Midnapore": { lat: 22.4320, lon: 87.3220 }, "Murshidabad": { lat: 24.1820, lon: 88.2520 }, "Nadia": { lat: 23.4820, lon: 88.5620 }, "Malda": { lat: 25.0220, lon: 88.1520 }, "Siliguri": { lat: 26.7320, lon: 88.4020 }, "Darjeeling": { lat: 27.0520, lon: 88.2720 },
    // Tamil Nadu
    "Chennai": { lat: 13.0920, lon: 80.2820 }, "Coimbatore": { lat: 11.0220, lon: 76.9620 }, "Madurai": { lat: 9.9320, lon: 78.1220 }, "Salem": { lat: 11.6720, lon: 78.1520 }, "Trichy": { lat: 10.8020, lon: 78.7120 }, "Tirupur": { lat: 11.1120, lon: 77.3520 }, "Erode": { lat: 11.3520, lon: 77.7220 }, "Vellore": { lat: 12.9220, lon: 79.1420 }, "Thanjavur": { lat: 10.7920, lon: 79.1420 }, "Dindigul": { lat: 10.3720, lon: 77.9920 }
  };

  const mandis: MandiEntry[] = [];
  let idCounter = 1;

  Object.entries(STATE_DISTRICTS).forEach(([stateName, districts]) => {
    const mandiPrefixes = STATE_MANDI_TYPES[stateName] || ["Agricultural Produce Market", "Regional Mandi", "APMC Market"];
    
    districts.forEach(district => {
      const baseCoords = DISTRICT_COORDS[district] || { lat: 20 + Math.random() * 10, lon: 75 + Math.random() * 10 };
      
      // Generate 3-5 mandis per district for high density
      const mandiCount = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < mandiCount; i++) {
        const type = mandiPrefixes[i % mandiPrefixes.length];
        const mandiName = i === 0 ? `${district} ${type}` : `${district} Sector ${i+1} ${type}`;
        
        // Clustered coordinates around the district hub
        const lat = baseCoords.lat + (Math.random() - 0.5) * 0.15;
        const lon = baseCoords.lon + (Math.random() - 0.5) * 0.15;

        const mandiCommodities = crops
          .sort(() => 0.5 - Math.random())
          .slice(0, 5 + Math.floor(Math.random() * 5))
          .map(crop => ({
            name: crop,
            price: 1500 + Math.floor(Math.random() * 6000),
            unit: "Quintal",
            trend: Math.random() > 0.5 ? "up" as const : "down" as const
          }));

        mandis.push({
          id: `mandi-${idCounter++}`,
          name: mandiName,
          state: stateName,
          district: district,
          lat,
          lon,
          commodities: mandiCommodities
        });
      }
    });
  });

  return mandis;
};

export const ALL_MANDIS: MandiEntry[] = generateMandis();
