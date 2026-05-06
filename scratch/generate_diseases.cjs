const fs = require('fs');

const cities = [
  { name: "Mumbai", state: "Maharashtra", lat: 19.0760, lon: 72.8777 },
  { name: "Delhi", state: "Delhi", lat: 28.7041, lon: 77.1025 },
  { name: "Bengaluru", state: "Karnataka", lat: 12.9716, lon: 77.5946 },
  { name: "Hyderabad", state: "Telangana", lat: 17.3850, lon: 78.4867 },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lon: 72.5714 },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lon: 80.2707 },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lon: 88.3639 },
  { name: "Pune", state: "Maharashtra", lat: 18.5204, lon: 73.8567 },
  { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lon: 75.7873 },
  { name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lon: 80.9462 },
  { name: "Nagpur", state: "Maharashtra", lat: 21.1458, lon: 79.0882 },
  { name: "Indore", state: "Madhya Pradesh", lat: 22.7196, lon: 75.8577 },
  { name: "Patna", state: "Bihar", lat: 25.5941, lon: 85.1376 },
  { name: "Ludhiana", state: "Punjab", lat: 30.9010, lon: 75.8573 },
  { name: "Agra", state: "Uttar Pradesh", lat: 27.1767, lon: 78.0081 },
  { name: "Nashik", state: "Maharashtra", lat: 19.9975, lon: 73.7898 },
  { name: "Srinagar", state: "Jammu and Kashmir", lat: 34.0837, lon: 74.7973 },
  { name: "Amritsar", state: "Punjab", lat: 31.6340, lon: 74.8723 },
  { name: "Guwahati", state: "Assam", lat: 26.1445, lon: 91.7362 },
  { name: "Bhubaneswar", state: "Odisha", lat: 20.2961, lon: 85.8245 },
  { name: "Kochi", state: "Kerala", lat: 9.9312, lon: 76.2673 },
  { name: "Shimla", state: "Himachal Pradesh", lat: 31.1048, lon: 77.1734 },
  { name: "Shillong", state: "Meghalaya", lat: 25.5788, lon: 91.8933 },
  { name: "Goa", state: "Goa", lat: 15.4909, lon: 73.8278 },
  { name: "Gorakhpur", state: "Uttar Pradesh", lat: 26.7606, lon: 83.3731 },
  { name: "Saharanpur", state: "Uttar Pradesh", lat: 29.9640, lon: 77.5460 },
  { name: "Bikaner", state: "Rajasthan", lat: 28.0229, lon: 73.3119 },
  { name: "Kota", state: "Rajasthan", lat: 25.2138, lon: 75.8648 },
  { name: "Solapur", state: "Maharashtra", lat: 17.6599, lon: 75.9064 },
  { name: "Kolhapur", state: "Maharashtra", lat: 16.7050, lon: 74.2433 },
  { name: "Mangalore", state: "Karnataka", lat: 12.9141, lon: 74.8560 },
  { name: "Mysore", state: "Karnataka", lat: 12.2958, lon: 76.6394 },
  { name: "Madurai", state: "Tamil Nadu", lat: 9.9252, lon: 78.1198 },
  { name: "Tiruchirappalli", state: "Tamil Nadu", lat: 10.7905, lon: 78.7047 },
  { name: "Warangal", state: "Telangana", lat: 17.9689, lon: 79.5941 },
  { name: "Guntur", state: "Andhra Pradesh", lat: 16.3067, lon: 80.4365 },
  { name: "Siliguri", state: "West Bengal", lat: 26.7271, lon: 88.3953 },
  { name: "Asansol", state: "West Bengal", lat: 23.6739, lon: 86.9524 },
  { name: "Ujjain", state: "Madhya Pradesh", lat: 23.1760, lon: 75.7885 },
  { name: "Gaya", state: "Bihar", lat: 24.7914, lon: 85.0002 },
  { name: "Udaipur", state: "Rajasthan", lat: 24.5854, lon: 73.7125 },
  { name: "Jammu", state: "J&K", lat: 32.7266, lon: 74.8570 },
  { name: "Dehradun", state: "Uttarakhand", lat: 30.3165, lon: 78.0322 },
  { name: "Rohtak", state: "Haryana", lat: 28.8955, lon: 76.6066 },
  { name: "Bhatinda", state: "Punjab", lat: 30.2110, lon: 74.9455 },
  { name: "Nizamabad", state: "Telangana", lat: 18.6725, lon: 78.0941 },
  { name: "Salem", state: "Tamil Nadu", lat: 11.6643, lon: 78.1460 },
  { name: "Jabalpur", state: "Madhya Pradesh", lat: 23.1815, lon: 79.9864 },
  { name: "Gwalior", state: "Madhya Pradesh", lat: 26.2183, lon: 78.1828 },
  { name: "Aurangabad", state: "Maharashtra", lat: 19.8762, lon: 75.3433 }
];

const cropDiseases = [
  { crop: "Rice", diseases: ["Rice Blast", "Sheath Blight", "Bacterial Blight", "Brown Spot", "Tungro", "False Smut"] },
  { crop: "Wheat", diseases: ["Wheat Rust", "Leaf Rust", "Stripe Rust", "Fusarium Head Blight", "Powdery Mildew", "Karnal Bunt"] },
  { crop: "Tomato", diseases: ["Tomato Late Blight", "Early Blight", "Septoria Leaf Spot", "Bacterial Spot", "Tomato Leaf Curl", "Fusarium Wilt"] },
  { crop: "Potato", diseases: ["Potato Late Blight", "Early Blight", "Common Scab", "Blackleg", "Potato Virus Y", "Silver Scurf"] },
  { crop: "Cotton", diseases: ["Cotton Bollworm", "Leaf Spot", "Cotton Leaf Curl", "Boll Rot", "Fusarium Wilt", "Target Spot"] },
  { crop: "Maize", diseases: ["Maize Downy Mildew", "Common Rust", "Gray Leaf Spot", "Northern Corn Leaf Blight", "Common Smut"] },
  { crop: "Sugarcane", diseases: ["Red Rot", "Smut", "Wilt", "Mosaic", "Grassy Shoot", "Pokkah Boeng"] },
  { crop: "Mango", diseases: ["Anthracnose", "Powdery Mildew", "Bacterial Canker", "Malformation", "Black Band"] },
  { crop: "Grapes", diseases: ["Downy Mildew", "Powdery Mildew", "Black Rot", "Botrytis Bunch Rot", "Esca"] },
  { crop: "Citrus", diseases: ["Citrus Canker", "Greening", "Tristeza", "Black Spot", "Melanose"] },
  { crop: "Banana", diseases: ["Black Sigatoka", "Panama Disease", "Bunchy Top Virus", "Moko Disease", "Cercospora Leaf Spot"] },
  { crop: "Apple", diseases: ["Apple Scab", "Fire Blight", "Cedar Apple Rust", "Powdery Mildew", "Bitter Pit"] },
  { crop: "Onion", diseases: ["Purple Blotch", "Onion Smut", "Botrytis Blight", "Downy Mildew"] },
  { crop: "Coffee", diseases: ["Leaf Rust", "Berry Disease", "Cercospora Leaf Spot"] },
  { crop: "Tea", diseases: ["Blister Blight", "Mosquito Bug", "Red Rust"] }
];

const severities = ["High", "Medium", "Low"];

const results = [];
for (let i = 0; i < 1200; i++) {
  const city = cities[Math.floor(Math.random() * cities.length)];
  const cropData = cropDiseases[Math.floor(Math.random() * cropDiseases.length)];
  const disease = cropData.diseases[Math.floor(Math.random() * cropData.diseases.length)];
  const severity = severities[Math.floor(Math.random() * severities.length)];
  
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
  
  // Random offsets (roughly within 40-50km of city center)
  const latOffset = (Math.random() - 0.5) * 0.6;
  const lonOffset = (Math.random() - 0.5) * 0.6;

  results.push({
    id: `r${i}`,
    disease: disease,
    crop: cropData.crop,
    severity: severity,
    lat: parseFloat((city.lat + latOffset).toFixed(4)),
    lon: parseFloat((city.lon + lonOffset).toFixed(4)),
    city: city.name,
    state: city.state,
    created_at: date.toISOString()
  });
}

const tsContent = `export const MOCK_DATA: any[] = ${JSON.stringify(results, null, 2)};`;
fs.writeFileSync('../src/data/mock_heatmap.ts', tsContent);
console.log("Successfully generated src/data/mock_heatmap.ts with 1200 records.");
