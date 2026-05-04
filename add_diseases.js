import fs from 'fs';
import path from 'path';

const newDiseases = [
  { name: "Citrus Tristeza Virus", crop: "Citrus", symptoms: "Quick decline, stem pitting, and seedling yellows.", treatment: "Use tolerant rootstocks; control aphid vectors." },
  { name: "Citrus Melanose", crop: "Citrus", symptoms: "Small, raised, reddish-brown pustules on leaves, fruit, and twigs.", treatment: "Copper sprays during fruit set." },
  { name: "Bitter Pit", crop: "Apple", symptoms: "Sunken, dark spots on fruit skin, spongy tissue underneath.", treatment: "Calcium foliar sprays; maintain even soil moisture." },
  { name: "Sooty Blotch and Flyspeck", crop: "Apple", symptoms: "Dark, smudgy blemishes or groups of tiny black dots on fruit surface.", treatment: "Prune for better airflow; apply fungicides." },
  { name: "Shot Hole Disease", crop: "Peach, Apricot", symptoms: "Small brown spots on leaves that drop out, leaving 'shot holes'.", treatment: "Dormant copper sprays; remove infected wood." },
  { name: "Plum Pox Virus", crop: "Plum, Peach", symptoms: "Yellow rings on leaves and fruit, premature fruit drop.", treatment: "Eradicate infected trees; control aphids." },
  { name: "Black Rot", crop: "Grape", symptoms: "Brown circular lesions on leaves; berries shrivel into hard black mummies.", treatment: "Destroy mummies; apply protective fungicides." },
  { name: "Botrytis Bunch Rot", crop: "Grape", symptoms: "Grey, fuzzy mold covering ripening grape clusters.", treatment: "Leaf removal around clusters; specific fungicides." },
  { name: "Esca", crop: "Grape", symptoms: "Tiger-stripe discoloration on leaves; internal wood decay.", treatment: "Prune infected wood carefully; protect pruning wounds." },
  { name: "Red Stele Root Rot", crop: "Strawberry", symptoms: "Stunted plants, wilting in warm weather; red core in roots.", treatment: "Improve soil drainage; use resistant varieties." },
  { name: "Angular Leaf Spot", crop: "Strawberry, Cucumber", symptoms: "Water-soaked, angular spots limited by leaf veins.", treatment: "Avoid overhead watering; copper-based sprays." },
  { name: "Mummy Berry", crop: "Blueberry", symptoms: "Berries turn pale, shrivel, and harden into whitish mummies.", treatment: "Rake and destroy fallen mummies; apply fungicides." },
  { name: "Cane Blight", crop: "Raspberry", symptoms: "Dark brown/purple cankers on stems, causing dieback.", treatment: "Prune out old fruiting canes immediately after harvest." },
  { name: "Tomato Spotted Wilt Virus", crop: "Tomato, Pepper, Peanut", symptoms: "Dark necrotic spots, ring patterns, and severe stunting.", treatment: "Control thrips; plant resistant varieties." },
  { name: "Tomato Leaf Mold", crop: "Tomato", symptoms: "Pale green spots on upper leaves, olive-green fuzz on undersides.", treatment: "Increase greenhouse ventilation; resistant varieties." },
  { name: "Corky Root Rot", crop: "Tomato", symptoms: "Roots develop brown, corky, swollen bands; plants wilt.", treatment: "Soil solarization; crop rotation; resistant rootstocks." },
  { name: "Watermelon Mosaic Virus", crop: "Melon, Watermelon", symptoms: "Green/yellow mottling and distortion of leaves; misshapen fruit.", treatment: "Control aphids; use reflective mulches." },
  { name: "Common Bacterial Blight", crop: "Beans", symptoms: "Large, brown, irregular necrotic spots with yellow halos.", treatment: "Use certified disease-free seed; avoid working in wet fields." },
  { name: "Halo Blight", crop: "Beans", symptoms: "Small brown spots surrounded by large, distinct yellow halos.", treatment: "Copper-based bactericides; crop rotation." },
  { name: "Early Leaf Spot", crop: "Peanut", symptoms: "Brown circular spots surrounded by yellow halos on leaves.", treatment: "Foliar fungicides; crop rotation." },
  { name: "Target Spot", crop: "Cotton, Soybean", symptoms: "Concentric ringed lesions on lower canopy leaves causing defoliation.", treatment: "Fungicides targeting lower canopy; manage canopy density." },
  { name: "Common Scab", crop: "Potato", symptoms: "Rough, corky, raised or sunken lesions on tubers.", treatment: "Keep soil pH below 5.2; maintain consistent soil moisture." },
  { name: "Silver Scurf", crop: "Potato", symptoms: "Silvery patches on the tuber skin, causing water loss.", treatment: "Harvest promptly; apply post-harvest fungicides." },
  { name: "Potato Blackleg", crop: "Potato", symptoms: "Inky black, slimy decay of the lower stem; yellowing leaves.", treatment: "Use certified seed; avoid planting in cold, wet soil." },
  { name: "Avocado Sunblotch", crop: "Avocado", symptoms: "Yellow or red streaking on fruit, stems, and leaves; stunted growth.", treatment: "Remove infected trees; strictly use indexed, disease-free budwood." },
  { name: "Mango Bacterial Black Spot", crop: "Mango", symptoms: "Raised, angular black spots on leaves and star-shaped cracks on fruit.", treatment: "Windbreaks to reduce spread; copper sprays." },
  { name: "Mango Malformation", crop: "Mango", symptoms: "Abnormal, compact, vegetative or floral shoots that don't set fruit.", treatment: "Prune malformed panicles; apply appropriate fungicides." },
  { name: "Pineapple Heart Rot", crop: "Pineapple", symptoms: "Yellow-red leaves easily pulled from the base; foul-smelling rot.", treatment: "Improve drainage; fungicidal dips for planting material." },
  { name: "Mealybug Wilt", crop: "Pineapple", symptoms: "Reddening, wilting, and dieback of leaves.", treatment: "Control ants and mealybugs; use healthy planting material." },
  { name: "Moko Disease", crop: "Banana", symptoms: "Rapid wilting, yellowing of inner leaves, internal fruit rot.", treatment: "Disinfect tools; destroy infected mats; remove male buds." },
  { name: "Banana Bunchy Top Virus", crop: "Banana", symptoms: "Leaves are narrow, upright, bunched at the top with dark green streaks.", treatment: "Strict eradication of infected plants; control banana aphids." },
  { name: "Frosty Pod Rot", crop: "Cocoa", symptoms: "Pods develop irregular brown lesions covered in thick white/grey spores.", treatment: "Frequent removal of diseased pods; severe pruning." },
  { name: "Cercospora Leaf Spot", crop: "Coffee", symptoms: "Brown spots with light grey centers ('brown eye spot').", treatment: "Provide adequate shade and nutrition; copper sprays." },
  { name: "Sorghum Ergot", crop: "Sorghum", symptoms: "Sticky, pinkish 'honeydew' exuding from flower spikelets.", treatment: "Plant hybrids that shed pollen early and abundantly." },
  { name: "Sorghum Downy Mildew", crop: "Sorghum, Corn", symptoms: "Systemic pale yellow/white striping; white downy growth on undersides.", treatment: "Seed treatment; resistant varieties." },
  { name: "Ascochyta Blight", crop: "Chickpea, Lentil", symptoms: "Circular lesions with dark margins and tiny black dots (pycnidia).", treatment: "Foliar fungicides; wide crop rotation." },
  { name: "Bacterial Wilt", crop: "Alfalfa", symptoms: "Stunted, yellow-green plants; yellow/brown discoloration in taproot.", treatment: "Plant resistant varieties; harvest young stands carefully." },
  { name: "Brown Stem Rot", crop: "Soybean", symptoms: "Browning of pith inside stems; interveinal chlorosis on leaves.", treatment: "Crop rotation with non-hosts (corn); resistant varieties." },
  { name: "Charcoal Rot", crop: "Soybean, Corn", symptoms: "Lower stem and taproot turn silver-grey with tiny black microsclerotia.", treatment: "Irrigate to reduce drought stress; lower plant populations." },
  { name: "Crown Rust", crop: "Oats", symptoms: "Orange-yellow pustules on leaves.", treatment: "Eradicate buckthorn alternate host; plant resistant varieties." },
  { name: "Karnal Bunt", crop: "Wheat", symptoms: "Partially smutted grains with a fishy odor.", treatment: "Strict quarantine; disease-free seed; fungicidal seed treatment." },
  { name: "Snow Mold", crop: "Wheat", symptoms: "White or pink cottony mycelium covering plants after snowmelt.", treatment: "Avoid excessive nitrogen late in fall; crop rotation." },
  { name: "Stem Rot", crop: "Rice", symptoms: "Black angular lesions on the leaf sheath at the water line.", treatment: "Apply potassium fertilizer; drain fields at the end of the season." },
  { name: "Tungro Disease", crop: "Rice", symptoms: "Stunted plants, yellow-orange leaves from the tip downward.", treatment: "Control green leafhoppers; synchronize planting." },
  { name: "Bacterial Blight", crop: "Rice", symptoms: "Water-soaked stripes on leaves turning yellow-white and drying.", treatment: "Avoid field flooding; use resistant varieties." },
  { name: "Cassava Brown Streak Disease", crop: "Cassava", symptoms: "Yellow chlorosis along leaf veins; dry brown necrotic rot in roots.", treatment: "Plant certified virus-free cuttings; control whiteflies." },
  { name: "Coconut Lethal Yellowing", crop: "Coconut", symptoms: "Premature nut drop, blackening of flower stalks, yellowing fronds.", treatment: "Inject trunks with oxytetracycline; plant resistant varieties." },
  { name: "Oil Palm Ganoderma Rot", crop: "Oil Palm", symptoms: "Lower fronds collapse, shelf-like mushrooms appear at trunk base.", treatment: "Trenching to isolate diseased palms; thorough stump removal." },
  { name: "Tea Blister Blight", crop: "Tea", symptoms: "Translucent spots turning into white, blister-like swellings on leaves.", treatment: "Adjust shade; frequent harvesting; copper fungicides." },
  { name: "Rubber South American Leaf Blight", crop: "Rubber", symptoms: "Young leaves blacken and fall; older leaves have dark, shot-hole lesions.", treatment: "Strict quarantine (prevent spread outside South America); fungicides." }
];

const targetFile = path.join(process.cwd(), 'src', 'data', 'diseases.ts');
let content = fs.readFileSync(targetFile, 'utf-8');

// Find the position just before the closing bracket of the array
const closingIndex = content.lastIndexOf('];');

if (closingIndex !== -1) {
  let toAppend = '';
  for (const d of newDiseases) {
    toAppend += `  { name: "${d.name}", crop: "${d.crop}", symptoms: "${d.symptoms}", treatment: "${d.treatment}" },\n`;
  }
  const updatedContent = content.substring(0, closingIndex) + toAppend + '];\n';
  fs.writeFileSync(targetFile, updatedContent, 'utf-8');
  console.log("Appended 50 new diseases successfully.");
} else {
  console.error("Could not find the end of the diseases array.");
}
