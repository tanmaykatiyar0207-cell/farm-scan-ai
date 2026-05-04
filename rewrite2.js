import fs from 'fs';
import path from 'path';

const srcDir = 'C:\\Users\\adars\\.gemini\\antigravity\\brain\\363d46ec-6eca-4746-bdc3-73930e7b1cc4';
const destDir = path.join(process.cwd(), 'src', 'assets');

// Copy generated images
fs.copyFileSync(path.join(srcDir, 'disease_rot_1777744579760.png'), path.join(destDir, 'disease-rot.png'));
fs.copyFileSync(path.join(srcDir, 'disease_wilt_1777744594599.png'), path.join(destDir, 'disease-wilt.png'));
fs.copyFileSync(path.join(srcDir, 'disease_canker_1777744612503.png'), path.join(destDir, 'disease-canker.png'));
fs.copyFileSync(path.join(srcDir, 'disease_virus_1777744629268.png'), path.join(destDir, 'disease-virus.png'));
fs.copyFileSync(path.join(srcDir, 'disease_pest_1777744644648.png'), path.join(destDir, 'disease-pest.png'));

// The base diseases without images
const baseDiseases = [
  { name: "Apple Scab", crop: "Apple", symptoms: "Olive green to black spots on leaves and fruit.", treatment: "Apply protective fungicides during early spring." },
  { name: "Fire Blight", crop: "Apple, Pear", symptoms: "Blossoms, shoots, and leaves turn brown/black as if scorched.", treatment: "Prune infected branches 8 inches below damage; copper sprays." },
  { name: "Cedar Apple Rust", crop: "Apple", symptoms: "Yellow-orange spots on leaves, leading to defoliation.", treatment: "Remove nearby cedar hosts; apply fungicides." },
  { name: "Powdery Mildew", crop: "Apple, Grape, Cucumber", symptoms: "White powdery patches on leaf surfaces and shoots.", treatment: "Sulfur spray and improved airflow between plants." },
  { name: "Peach Leaf Curl", crop: "Peach, Nectarine", symptoms: "Thickened, puckered, red/yellow curled leaves.", treatment: "Apply dormant spray of copper fungicide in late winter." },
  { name: "Brown Rot", crop: "Plum, Cherry, Peach", symptoms: "Brown, rotting fruit covered with tan powdery spores.", treatment: "Remove mummified fruit; apply fungicide during bloom." },
  { name: "Black Knot", crop: "Plum, Cherry", symptoms: "Hard, black, elongated galls on branches and twigs.", treatment: "Prune out galls during winter dormancy." },
  { name: "Citrus Canker", crop: "Citrus", symptoms: "Raised, corky, crater-like lesions with yellow halos on leaves.", treatment: "Remove infected trees; apply copper-based bactericides." },
  { name: "Citrus Greening (HLB)", crop: "Citrus", symptoms: "Yellow mottled leaves, misshapen bitter fruit.", treatment: "Control Asian citrus psyllid vector; nutritional support." },
  { name: "Black Spot", crop: "Citrus, Rose", symptoms: "Dark spots on leaves causing them to turn yellow and drop.", treatment: "Fungicide sprays; remove fallen infected leaves." },
  { name: "Late Blight", crop: "Tomato, Potato", symptoms: "Dark water-soaked lesions; rapid leaf collapse, rotting fruit.", treatment: "Mancozeb spray; destroy infected plants immediately." },
  { name: "Early Blight", crop: "Tomato, Potato", symptoms: "Target-like concentric rings of dark spots on lower leaves.", treatment: "Rotate crops; apply protectant fungicides." },
  { name: "Septoria Leaf Spot", crop: "Tomato", symptoms: "Small circular spots with grey centers and dark borders.", treatment: "Mulch to prevent soil splash; apply copper fungicides." },
  { name: "Blossom End Rot", crop: "Tomato, Pepper", symptoms: "Dark, sunken, leathery patches at the bottom of fruit.", treatment: "Ensure consistent watering; apply calcium soil amendments." },
  { name: "Fusarium Wilt", crop: "Tomato, Banana", symptoms: "Yellowing and wilting of leaves, often starting on one side.", treatment: "Use resistant varieties; solarize soil." },
  { name: "Verticillium Wilt", crop: "Various", symptoms: "V-shaped yellow lesions on leaf margins, wilting.", treatment: "Crop rotation; avoid planting susceptible crops in infected soil." },
  { name: "Bacterial Spot", crop: "Pepper, Tomato", symptoms: "Small, dark, water-soaked spots on leaves and fruit.", treatment: "Copper-based bactericides; use pathogen-free seed." },
  { name: "Cucumber Mosaic Virus", crop: "Cucumber, Melon", symptoms: "Mottled, distorted leaves and stunted fruit.", treatment: "Control aphids; remove infected plants and weeds." },
  { name: "Downy Mildew", crop: "Cucumber, Grape, Spinach", symptoms: "Yellow patches on top, grey/purple fuzz underneath leaves.", treatment: "Improve ventilation; apply specific fungicides." },
  { name: "Anthracnose", crop: "Beans, Mango, Melon", symptoms: "Sunken dark lesions with pinkish spore masses in wet weather.", treatment: "Prune infected parts; copper-based sprays." },
  { name: "Common Rust", crop: "Corn", symptoms: "Oval, cinnamon-brown pustules on both leaf surfaces.", treatment: "Fungicide application if severe; plant resistant hybrids." },
  { name: "Northern Corn Leaf Blight", crop: "Corn", symptoms: "Large, cigar-shaped grey/green to tan lesions.", treatment: "Crop rotation; foliar fungicides." },
  { name: "Southern Corn Leaf Blight", crop: "Corn", symptoms: "Small, rectangular, tan lesions between leaf veins.", treatment: "Tillage to bury residue; plant resistant hybrids." },
  { name: "Gray Leaf Spot", crop: "Corn", symptoms: "Rectangular, pale brown to grey lesions restricted by veins.", treatment: "Crop rotation; foliar fungicides at tasseling." },
  { name: "Common Smut", crop: "Corn", symptoms: "Large, greyish-white galls on ears, tassels, or stalks.", treatment: "Avoid mechanical injury to plants; balanced fertilization." },
  { name: "Soybean Rust", crop: "Soybean", symptoms: "Small, tan to reddish-brown lesions mostly on lower leaves.", treatment: "Early fungicide application when detected." },
  { name: "Frogeye Leaf Spot", crop: "Soybean", symptoms: "Circular spots with grey centers and dark reddish-brown borders.", treatment: "Foliar fungicides; plant resistant varieties." },
  { name: "Sudden Death Syndrome", crop: "Soybean", symptoms: "Yellowing and browning between veins; roots rot.", treatment: "Improve soil drainage; delay planting; use resistant varieties." },
  { name: "White Mold", crop: "Soybean, Bean", symptoms: "White, fluffy fungal growth on stems; black sclerotia inside.", treatment: "Wider row spacing; fungicide application at flowering." },
  { name: "Rice Blast", crop: "Rice", symptoms: "Diamond-shaped lesions with grey centers and brown borders.", treatment: "Water management; systemic fungicides." },
  { name: "Sheath Blight", crop: "Rice", symptoms: "Oval, greenish-grey lesions on the leaf sheath near water line.", treatment: "Reduce nitrogen application; apply fungicides." },
  { name: "Bacterial Panicle Blight", crop: "Rice", symptoms: "Discolored grains, upright panicles due to poor grain fill.", treatment: "Early planting; no highly effective chemical control." },
  { name: "Wheat Stem Rust", crop: "Wheat", symptoms: "Brick-red, elongated pustules on stems and leaf sheaths.", treatment: "Plant resistant varieties; eradicate barberry alternate host." },
  { name: "Wheat Leaf Rust", crop: "Wheat", symptoms: "Small, round, orange-red pustules scattered on leaves.", treatment: "Foliar fungicides; resistant cultivars." },
  { name: "Wheat Stripe Rust", crop: "Wheat", symptoms: "Yellow-orange pustules arranged in linear stripes on leaves.", treatment: "Early fungicide application; resistant varieties." },
  { name: "Fusarium Head Blight", crop: "Wheat, Barley", symptoms: "Premature bleaching of spikelets; pink/orange spores.", treatment: "Fungicides at flowering; crop rotation." },
  { name: "Black Sigatoka", crop: "Banana", symptoms: "Narrow, dark brown streaks on leaves, causing necrosis.", treatment: "Frequent fungicide sprays; remove infected leaves." },
  { name: "Panama Disease (TR4)", crop: "Banana", symptoms: "Yellowing of older leaves, vascular discoloration, plant death.", treatment: "Strict quarantine; farm biosecurity; use resistant Cavendish." },
  { name: "Coffee Leaf Rust", crop: "Coffee", symptoms: "Yellow spots turning into orange powdery pustules underneath.", treatment: "Copper fungicides; plant resistant varieties." },
  { name: "Coffee Berry Disease", crop: "Coffee", symptoms: "Dark, sunken lesions on green berries causing them to drop.", treatment: "Fungicide sprays during early berry development." },
  { name: "Cocoa Swollen Shoot Virus", crop: "Cocoa", symptoms: "Swollen stems, mottled leaves, rounded pods.", treatment: "Remove and destroy infected trees." },
  { name: "Black Pod Disease", crop: "Cocoa", symptoms: "Brown/black rotting lesions spreading across the pod.", treatment: "Frequent harvesting; prune for aeration; copper sprays." },
  { name: "Witches' Broom", crop: "Cocoa", symptoms: "Abnormal proliferation of shoots resembling a broom.", treatment: "Phytosanitary pruning; remove diseased pods." },
  { name: "Papaya Ringspot Virus", crop: "Papaya", symptoms: "Yellow mottling on leaves, distinct rings on fruit.", treatment: "Use transgenic resistant varieties; control aphids." },
  { name: "Root-Knot Nematode", crop: "Various", symptoms: "Stunted growth, yellowing, distinct galls/knots on roots.", treatment: "Crop rotation with non-hosts; soil solarization; nematicides." },
  { name: "Clubroot", crop: "Cabbage, Broccoli", symptoms: "Swollen, distorted roots, wilting during hot days.", treatment: "Lime soil to raise pH > 7.2; long crop rotations." },
  { name: "Black Rot", crop: "Cabbage", symptoms: "V-shaped yellow lesions on leaf margins with darkened veins.", treatment: "Use disease-free seed; copper sprays." },
  { name: "Alternaria Leaf Spot", crop: "Cabbage", symptoms: "Dark, target-like spots with yellow halos.", treatment: "Seed treatment; foliar fungicides." },
  { name: "Onion Smut", crop: "Onion", symptoms: "Black, sooty streaks on cotyledons and young leaves.", treatment: "Seed treatments; rotate out of alliums." },
  { name: "Purple Blotch", crop: "Onion", symptoms: "Water-soaked lesions that turn purple with a yellow halo.", treatment: "Reduce leaf wetness; apply protective fungicides." },
  { name: "Botrytis Blight (Gray Mold)", crop: "Onion, Strawberry", symptoms: "Fuzzy grey mold on fruit, leaves, or bulbs in humid conditions.", treatment: "Improve air circulation; protective fungicide sprays." },
  { name: "Strawberry Leaf Spot", crop: "Strawberry", symptoms: "Small purple spots developing white/grey centers.", treatment: "Remove infected debris; copper-based fungicides." }
];

let out = `import imgLeafspot from "@/assets/disease-leafspot.jpg";
import imgMildew from "@/assets/disease-mildew.jpg";
import imgRust from "@/assets/disease-rust.jpg";
import imgRot from "@/assets/disease-rot.png";
import imgWilt from "@/assets/disease-wilt.png";
import imgCanker from "@/assets/disease-canker.png";
import imgVirus from "@/assets/disease-virus.png";
import imgPest from "@/assets/disease-pest.png";

export const diseases = [
`;

for (const d of baseDiseases) {
  let imgVar = "imgLeafspot"; // default
  let name = d.name.toLowerCase();
  let sym = d.symptoms.toLowerCase();
  
  if (name.includes("rust")) imgVar = "imgRust";
  else if (name.includes("mildew") || name.includes("mold")) imgVar = "imgMildew";
  else if (name.includes("rot") || sym.includes("rot")) imgVar = "imgRot";
  else if (name.includes("wilt") || sym.includes("wilt") || name.includes("death")) imgVar = "imgWilt";
  else if (name.includes("knot") || name.includes("canker") || name.includes("clubroot") || sym.includes("gall")) imgVar = "imgCanker";
  else if (name.includes("virus") || name.includes("greening") || sym.includes("mosaic") || sym.includes("mottling")) imgVar = "imgVirus";
  else if (name.includes("blight") || name.includes("scab") || name.includes("spot")) imgVar = "imgLeafspot";
  else if (name.includes("smut") || sym.includes("sooty")) imgVar = "imgPest";

  out += `  { img: ${imgVar}, name: "${d.name}", crop: "${d.crop}", symptoms: "${d.symptoms}", treatment: "${d.treatment}" },\n`;
}
out += `];\n`;

fs.writeFileSync(path.join(process.cwd(), 'src/data/diseases.ts'), out);
console.log("Rewrite completed successfully!");
