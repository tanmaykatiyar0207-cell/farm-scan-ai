import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
const diseases = [
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
  { name: "Strawberry Leaf Spot", crop: "Strawberry", symptoms: "Small purple spots developing white/grey centers.", treatment: "Remove infected debris; copper-based fungicides." },
  { name: "Potato Cyst Nematode", crop: "Potato", symptoms: "Stunted growth, yellowing, tiny cysts on roots.", treatment: "Crop rotation out of solanaceous plants; resistant varieties." },
  { name: "Potato Virus Y", crop: "Potato", symptoms: "Mosaic mottling, necrosis, and stunting.", treatment: "Use certified disease-free seed potatoes; aphid control." },
  { name: "Cercospora Leaf Spot", crop: "Sugar Beet", symptoms: "Small circular spots with ash-grey centers and purple borders.", treatment: "Crop rotation; foliar fungicides." },
  { name: "Curly Top Virus", crop: "Sugar Beet, Tomato", symptoms: "Curled, yellowed leaves and stunted growth.", treatment: "Control leafhoppers; plant resistant varieties." },
  { name: "Aster Yellows", crop: "Carrot, Lettuce", symptoms: "Yellowing, stunting, and abnormal bushy growth.", treatment: "Control leafhoppers; remove infected plants." },
  { name: "Carrot Blight", crop: "Carrot", symptoms: "Brown/black spots on foliage, leading to leaf death.", treatment: "Fungicides; wide crop rotation." },
  { name: "Lettuce Drop", crop: "Lettuce", symptoms: "Sudden wilting and collapse; white mold near soil.", treatment: "Avoid excess moisture; deep plowing." },
  { name: "Bacterial Wilt", crop: "Cucumber, Melon", symptoms: "Sudden severe wilting of vines, sticky sap inside stems.", treatment: "Control cucumber beetles; remove infected plants." },
  { name: "Gummy Stem Blight", crop: "Watermelon", symptoms: "Brown lesions on stems exuding gummy sap.", treatment: "Fungicides; crop rotation." },
  { name: "Sclerotinia Stem Rot", crop: "Canola", symptoms: "Bleached stems with hard black sclerotia inside.", treatment: "Fungicides at flowering; rotate with non-hosts." },
  { name: "Blackleg", crop: "Canola", symptoms: "Grey/white lesions with black dots on leaves and stems.", treatment: "Resistant varieties; stubble management." },
  { name: "Take-All", crop: "Wheat", symptoms: "Stunted plants, white dead heads, black roots.", treatment: "Crop rotation; improve soil drainage and fertility." },
  { name: "Barley Yellow Dwarf Virus", crop: "Barley, Oats", symptoms: "Stunted growth with yellow or red leaf tips.", treatment: "Control aphids; plant tolerant varieties." },
  { name: "Ergot", crop: "Rye, Wheat", symptoms: "Hard, dark purple/black sclerotia replacing grain kernels.", treatment: "Clean seed; crop rotation; deep plowing." },
  { name: "Alfalfa Weevil Damage", crop: "Alfalfa", symptoms: "Skeletonized leaves, severe defoliation.", treatment: "Early harvest; insecticide application if severe." },
  { name: "Phytophthora Root Rot", crop: "Alfalfa", symptoms: "Stunted yellow plants; dark rotted taproots.", treatment: "Plant resistant varieties; improve soil drainage." },
  { name: "Crown Gall", crop: "Grape, Stone Fruits", symptoms: "Large tumor-like galls on roots or lower stems.", treatment: "Plant disease-free stock; avoid stem injuries." },
  { name: "Pierce's Disease", crop: "Grape", symptoms: "Leaf margins turn yellow/red and dry up.", treatment: "Control sharpshooter vectors; remove infected vines." },
  { name: "Olive Knot", crop: "Olive", symptoms: "Rough galls on twigs, branches, and trunks.", treatment: "Prune during dry weather; copper sprays." },
  { name: "Pecan Scab", crop: "Pecan", symptoms: "Small black spots on leaves and husks.", treatment: "Frequent fungicide applications." },
  { name: "Chestnut Blight", crop: "Chestnut", symptoms: "Sunken cankers on bark causing dieback above.", treatment: "Use resistant hybrids; hypovirulence treatment." },
  { name: "Dutch Elm Disease", crop: "Elm", symptoms: "Wilting, yellowing leaves in the canopy; brown streaks in wood.", treatment: "Control elm bark beetles; inject fungicides." },
  { name: "Oak Wilt", crop: "Oak", symptoms: "Leaves turn bronze/brown from edges inward and drop rapidly.", treatment: "Avoid pruning in spring; trenching to break root grafts." },
  { name: "Pine Wilt", crop: "Pine", symptoms: "Needles turn grey-green, then brown; rapid tree death.", treatment: "Remove and destroy infected trees; control sawyer beetles." },
  { name: "Diplodia Tip Blight", crop: "Pine", symptoms: "Stunted, brown needles at branch tips; resin droplets.", treatment: "Fungicide sprays during bud break." },
  { name: "Rose Rosette Disease", crop: "Rose", symptoms: "Excessive thorns, red distorted growth (witches' broom).", treatment: "Remove and destroy infected plants entirely." },
  { name: "Boxwood Blight", crop: "Boxwood", symptoms: "Dark leaf spots, rapid defoliation, black streaks on stems.", treatment: "Strict sanitation; preventive fungicides." },
  { name: "Daylily Rust", crop: "Daylily", symptoms: "Yellow-orange streaks and pustules on leaves.", treatment: "Remove infected leaves; apply fungicides." },
  { name: "Impatiens Necrotic Spot Virus", crop: "Various Ornamentals", symptoms: "Brown/black spots, rings, or line patterns on leaves.", treatment: "Control thrips; destroy infected plants." },
  { name: "Tobacco Mosaic Virus", crop: "Tobacco, Tomato", symptoms: "Mottled light and dark green leaves, stunting.", treatment: "Strict sanitation; avoid smoking near plants." },
  { name: "Cotton Leaf Curl Virus", crop: "Cotton", symptoms: "Upward or downward leaf curling, swollen veins.", treatment: "Plant resistant varieties; control whiteflies." },
  { name: "Boll Rot", crop: "Cotton", symptoms: "Rotting bolls covered with fungal growth.", treatment: "Wider plant spacing; defoliate bottom leaves." },
  { name: "Sugarcane Mosaic Virus", crop: "Sugarcane", symptoms: "Mottled leaves with yellow and green streaks.", treatment: "Use disease-free setts; plant resistant varieties." },
  { name: "Cassava Mosaic Disease", crop: "Cassava", symptoms: "Severe leaf distortion and yellow mottling.", treatment: "Use certified clean planting material." },
  { name: "Sweet Potato Weevil Damage", crop: "Sweet Potato", symptoms: "Punctured vines; larvae tunnel into roots causing rot.", treatment: "Crop rotation; pheromone traps." },
  { name: "Taro Leaf Blight", crop: "Taro", symptoms: "Large, brown, water-soaked leaf spots with yellow halos.", treatment: "Fungicides; remove infected leaves." },
  { name: "Yam Mosaic Virus", crop: "Yam", symptoms: "Chlorotic mottling and stunting of plants.", treatment: "Use virus-free seed yams." },
  { name: "Peanut Rosette Disease", crop: "Peanut", symptoms: "Severe stunting, yellowed and bunched leaves.", treatment: "Early planting; control aphids." },
  { name: "Sunflower Rust", crop: "Sunflower", symptoms: "Cinnamon-brown pustules on leaves.", treatment: "Plant resistant hybrids; foliar fungicides." },
  { name: "Safflower Rust", crop: "Safflower", symptoms: "Orange pustules on cotyledons and leaves.", treatment: "Seed treatment; resistant varieties." },
  { name: "Flax Wilt", crop: "Flax", symptoms: "Yellowing, wilting, and death of plants at any stage.", treatment: "Crop rotation; resistant varieties." },
  { name: "Hemp Canker", crop: "Hemp", symptoms: "Water-soaked lesions on stems, leading to breakage.", treatment: "Increase plant spacing; remove infected debris." },
  { name: "Hop Downy Mildew", crop: "Hops", symptoms: "Stunted shoots ('spikes'), black spores on leaf undersides.", treatment: "Systemic fungicides; remove basal growth." },
  { name: "Vanilla Root Rot", crop: "Vanilla", symptoms: "Browning and rotting of roots, plant wilts.", treatment: "Improve drainage; use disease-free cuttings." },
  { name: "Black Pepper Wilt", crop: "Black Pepper", symptoms: "Rapid yellowing and dropping of leaves; root rot.", treatment: "Phytosanitary measures; copper drenching." },
  { name: "Ginger Soft Rot", crop: "Ginger", symptoms: "Yellowing leaves; rhizomes become soft, watery, and foul-smelling.", treatment: "Seed rhizome treatment; raised bed planting." },
  { name: "Turmeric Leaf Spot", crop: "Turmeric", symptoms: "Elliptical spots with yellow halos.", treatment: "Foliar spray of Bordeaux mixture." },
  { name: "Cardamom Mosaic", crop: "Cardamom", symptoms: "Pale green to yellow mottling on leaves.", treatment: "Eradicate infected plants; control aphid vectors." },
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
const diseasesHi = [
  {
    "name": "एप्पल सकब",
    "crop": "एप्पल",
    "symptoms": "ओलिव ग्रीन तो ब्लैक स्पॉट्स ों लीव्स एंड फ्रूट.",
    "treatment": "अप्लाई प्रोटेक्टिव फुनगीकिदेस दूरिंग अर्ली स्प्रिंग."
  },
  {
    "name": "फायर ब्लाइट",
    "crop": "एप्पल पर",
    "symptoms": "ब्लॉसम्स शूट्स एंड लीव्स टर्न ब्राउन/ब्लैक ास िफ़ स्कोर्चड.",
    "treatment": "पॄने इन्फेक्टेड ब्रांचेज ८ इनचेस बिलो डैमेज; कॉपर सप्रेस."
  },
  {
    "name": "सीडर एप्पल रस्ट",
    "crop": "एप्पल",
    "symptoms": "येलो-ऑरेंज स्पॉट्स ों लीव्स लीडिंग तो डेफोलिएशन.",
    "treatment": "रिमूव नेअर्बी सीडर होस्ट्स; अप्लाई फुनगीकिदेस."
  },
  {
    "name": "पाउडरी मिलदेव",
    "crop": "एप्पल ग्रापए कुकुम्बर",
    "symptoms": "वाइट पाउडरी पैचेज ों लीफ सुरफकेस एंड शूट्स.",
    "treatment": "सल्फर स्प्रे एंड इम्प्रोवेद ैरफ्लो बिटवीन प्लांट्स."
  },
  {
    "name": "पीच लीफ कर्ल",
    "crop": "पीच नेक्टेरिने",
    "symptoms": "ठिकेनेड पुकेरेद रेड/येलो करलेंड लीव्स.",
    "treatment": "अप्लाई डॉर्मेंट स्प्रे ऑफ़ कॉपर फुनगीकीडे इन लैटे विंटर."
  },
  {
    "name": "ब्राउन रैट",
    "crop": "पल्म चेरी पीच",
    "symptoms": "ब्राउन रोटिंग फ्रूट कवर्ड विथ तन पाउडरी स्पोर्स.",
    "treatment": "रिमूव मुम्मिफिएड फ्रूट; अप्लाई फुनगीकीडे दूरिंग ब्लूम."
  },
  {
    "name": "ब्लैक क्नॉट",
    "crop": "पल्म चेरी",
    "symptoms": "हार्ड ब्लैक ेलोंगटेड गल्स ों ब्रांचेज एंड ट्विग्स.",
    "treatment": "पॄने आउट गल्स दूरिंग विंटर दौर्मनस्य."
  },
  {
    "name": "साइट्रस कांकेर",
    "crop": "साइट्रस",
    "symptoms": "रैसेड ककय क्रेटर-लिखे लेशन्स विथ येलो हालोस ों लीव्स.",
    "treatment": "रिमूव इन्फेक्टेड ट्रीज; अप्लाई कॉपर-बेस्ड बक्टेरिसिडेस."
  },
  {
    "name": "साइट्रस ग्रीनिंग (हलब)",
    "crop": "साइट्रस",
    "symptoms": "येलो मोटलेड लीव्स मिस्शपेन बिटर फ्रूट.",
    "treatment": "कण्ट्रोल एशियाई साइट्रस पसीलिड वेक्टर; न्युट्रिशनल सपोर्ट."
  },
  {
    "name": "ब्लैक स्पॉट",
    "crop": "साइट्रस रोज",
    "symptoms": "डार्क स्पॉट्स ों लीव्स कॉसिंग थम तो टर्न येलो एंड ड्राप.",
    "treatment": "फुनगीकीडे सप्रेस; रिमूव फालेन इन्फेक्टेड लीव्स."
  },
  {
    "name": "लेट ब्लाइट",
    "crop": "टोमेटो पोटैटो",
    "symptoms": "डार्क वाटर-सिक्त लेशन्स; रैपिड लीफ कलपसे रोटिंग फ्रूट.",
    "treatment": "मैंकोजेब स्प्रे; डिस्ट्रॉय इन्फेक्टेड प्लांट्स इम्मेडिएटली."
  },
  {
    "name": "अर्ली ब्लाइट",
    "crop": "टोमेटो पोटैटो",
    "symptoms": "टारगेट-लिखे कन्सेन्ट्रिक रिंग्स ऑफ़ डार्क स्पॉट्स ों लोअर लीव्स.",
    "treatment": "रोटेट क्रॉप्स; अप्लाई प्रोटेस्टंट फुनगीकिदेस."
  },
  {
    "name": "सेपटोरिअ लीफ स्पॉट",
    "crop": "टोमेटो",
    "symptoms": "स्माल सर्कुलर स्पॉट्स विथ ग्रे सेंटर्स एंड डार्क बॉर्डर्स.",
    "treatment": "मूलच तो प्रिवेंट साइल स्प्लैश; अप्लाई कॉपर फुनगीकिदेस."
  },
  {
    "name": "ब्लॉसम एन्ड रॉट",
    "crop": "टोमेटो पीपर",
    "symptoms": "डार्क सुनके लीथरय पैचेज ात थे बॉटम ऑफ फ्रूट.",
    "treatment": "ेंसुरे कंसिस्टेंट वाटरिंग; अप्लाई कैल्शियम साइल अमेंडमेंटस."
  },
  {
    "name": "फुसरियम विल्ट",
    "crop": "टोमेटो बनाना",
    "symptoms": "येल्लोविंग एंड विल्टिंग ऑफ़ लीव्स ओफ्तें स्टार्टिंग ों ओने साइड.",
    "treatment": "उसे रेसिस्टेंट वेरायटीज; सोलरीज़े साइल."
  },
  {
    "name": "वेर्टिकिलियम विल्ट",
    "crop": "वेरियस",
    "symptoms": "व्-शेप्ड येलो लेशन्स ों लीफ मार्जिन्स विल्टिंग.",
    "treatment": "क्रॉप रोटेशन; अवॉयड प्लांटिंग सुससेपटिब्ले क्रॉप्स इन इन्फेक्टेड साइल."
  },
  {
    "name": "बैक्टीरियल स्पॉट",
    "crop": "पीपर टोमेटो",
    "symptoms": "स्माल डार्क वाटर-सिक्त स्पॉट्स ों लीव्स एंड फ्रूट.",
    "treatment": "कॉपर-बेस्ड बक्टेरिसिडेस; उसे पैथोजन-फ्री सीड."
  },
  {
    "name": "कुकुम्बर मोज़ेक वायरस",
    "crop": "कुकुम्बर मेलों",
    "symptoms": "मोटलेड डिस्टॉर्टेड लीव्स एंड स्टंटेड फ्रूट.",
    "treatment": "कण्ट्रोल अफिड्स; रिमूव इन्फेक्टेड प्लांट्स एंड वीड्स."
  },
  {
    "name": "दौनी मिलदेव",
    "crop": "कुकुम्बर ग्रापए स्पिनच",
    "symptoms": "येलो पैचेज ऑन टॉप ग्रे/पर्पल फ़ज़ज़ ुंडेरनाथ लीव्स.",
    "treatment": "इम्प्रूव वेंटिलेशन; अप्लाई स्पेसिफिक फुनगीकिदेस."
  },
  {
    "name": "एन्थ्रक्नोसे",
    "crop": "बीन्स मानगो मेलों",
    "symptoms": "सुनके डार्क लेशन्स विथ पिंकिश स्पोरे मास्सेस इन वेट वेअथेर.",
    "treatment": "पॄने इन्फेक्टेड पार्ट्स; कॉपर-बेस्ड सप्रेस."
  },
  {
    "name": "कॉमन रस्ट",
    "crop": "कॉर्न",
    "symptoms": "ओवल सिनेमन-ब्राउन पुस्तुलेस ऑन बोथ लीफ सुरफकेस.",
    "treatment": "फुनगीकीडे एप्लीकेशन इफ सीवियर; प्लांट रेसिस्टेंट ह्यब्रिडस."
  },
  {
    "name": "नॉर्थेर्न कॉर्न लीफ ब्लाइट",
    "crop": "कॉर्न",
    "symptoms": "लार्ज सिगार-शेप्ड ग्रे/ग्रीन तो तन लेशन्स.",
    "treatment": "क्रॉप रोटेशन; फोलिअर फुनगीकिदेस."
  },
  {
    "name": "साउथर्न कॉर्न लीफ ब्लाइट",
    "crop": "कॉर्न",
    "symptoms": "स्माल रेक्टेंगुलर तन लेशन्स बिटवीन लीफ वेइन्स.",
    "treatment": "तिळगे तो बरी रेसिडुए; प्लांट रेसिस्टेंट ह्यब्रिडस."
  },
  {
    "name": "ग्रे लीफ स्पॉट",
    "crop": "कॉर्न",
    "symptoms": "रेक्टेंगुलर पीला ब्राउन तो ग्रे लेशन्स रिस्ट्रिक्टेड बी वेइन्स.",
    "treatment": "क्रॉप रोटेशन; फोलिअर फुनगीकिदेस ात तस्सलीनग."
  },
  {
    "name": "कॉमन स्मट",
    "crop": "कॉर्न",
    "symptoms": "लार्ज ग्रेइश-वाइट गल्स ों ेअर्स तासेल्स और स्टॉक्स.",
    "treatment": "अवॉयड मैकेनिकल इंजरी तो प्लांट्स; बैलेंस्ड फर्टिलाइजेशन."
  },
  {
    "name": "सोयाबीन रस्ट",
    "crop": "सोयाबीन",
    "symptoms": "स्माल तन तो रेड्डिश-ब्राउन लेशन्स मोस्टली ों लोअर लीव्स.",
    "treatment": "अर्ली फुनगीकीडे एप्लीकेशन व्हेन डेटेक्टेड."
  },
  {
    "name": "फ्रोगेए लीफ स्पॉट",
    "crop": "सोयाबीन",
    "symptoms": "सर्कुलर स्पॉट्स विथ ग्रे सेंटर्स एंड डार्क रेड्डिश-ब्राउन बॉर्डर्स.",
    "treatment": "फोलिअर फुनगीकिदेस; प्लांट रेसिस्टेंट वेरायटीज."
  },
  {
    "name": "सुद्दीन डेथ सिंड्रोम",
    "crop": "सोयाबीन",
    "symptoms": "येल्लोविंग एंड ब्राउनिंग बिटवीन वेइन्स; रूट्स रॉट.",
    "treatment": "इम्प्रूव साइल ड्रेनेज; डिले प्लांटिंग; उसे रेसिस्टेंट वेरायटीज."
  },
  {
    "name": "वाइट मोल्ड",
    "crop": "सोयाबीन बीन",
    "symptoms": "वाइट फ़लुफ़्फ़ी फंगल ग्रोथ ों स्टेमस; ब्लैक स्क्लेरोटिअ इनसाइड.",
    "treatment": "विदेर रौ स्पेसिंग; फुनगीकीडे एप्लीकेशन ात फ्लॉवरिंग."
  },
  {
    "name": "राइस ब्लास्ट",
    "crop": "राइस",
    "symptoms": "डायमंड-शेप्ड लेशन्स विथ ग्रे सेंटर्स एंड ब्राउन बॉर्डर्स.",
    "treatment": "वाटर मैनेजमेंट; सिस्टमिक फुनगीकिदेस."
  },
  {
    "name": "शीथ ब्लाइट",
    "crop": "राइस",
    "symptoms": "ओवल ग्रीनिश-ग्रे लेशन्स ों थे लीफ शीथ नियर वाटर लाइन.",
    "treatment": "रेडके नाइट्रोजन एप्लीकेशन; अप्लाई फुनगीकिदेस."
  },
  {
    "name": "बैक्टीरियल पानिक्ले ब्लाइट",
    "crop": "राइस",
    "symptoms": "डिस्कलरेड ग्रेन्स अपराइट पानिक्लेस देय तो पूर ग्रेन फइलल.",
    "treatment": "अर्ली प्लांटिंग; नो हाइली इफेक्टिव केमिकल कण्ट्रोल."
  },
  {
    "name": "वीट स्टेम रस्ट",
    "crop": "वीट",
    "symptoms": "ब्रिक-रेड ेलोंगटेड पुस्तुलेस ों स्टेमस एंड लीफ शीथ्स.",
    "treatment": "प्लांट रेसिस्टेंट वेरायटीज; ेरादिसते बर्बेर्री अल्टेरनाते होस्ट."
  },
  {
    "name": "वीट लीफ रस्ट",
    "crop": "वीट",
    "symptoms": "स्माल राउंड ऑरेंज-रेड पुस्तुलेस स्कैटर्ड ों लीव्स.",
    "treatment": "फोलिअर फुनगीकिदेस; रेसिस्टेंट कल्टीवर्स."
  },
  {
    "name": "वीट स्ट्राइप रस्ट",
    "crop": "वीट",
    "symptoms": "येलो-ऑरेंज पुस्तुलेस अरेंज्ड इन लीनियर स्ट्राइप्स ों लीव्स.",
    "treatment": "अर्ली फुनगीकीडे एप्लीकेशन; रेसिस्टेंट वेरायटीज."
  },
  {
    "name": "फुसरियम हेड ब्लाइट",
    "crop": "वीट बार्ली",
    "symptoms": "प्रेमातुर ब्लीचिंग ऑफ़ स्पिकेलेट्स; पिंक/ऑरेंज स्पोर्स.",
    "treatment": "फुनगीकिदेस ात फ्लॉवरिंग; क्रॉप रोटेशन."
  },
  {
    "name": "ब्लैक सिगटोका",
    "crop": "बनाना",
    "symptoms": "नैरो डार्क ब्राउन स्ट्रीक्स ों लीव्स कॉसिंग नेक्रोसिस.",
    "treatment": "फ्रीक्वेंट फुनगीकीडे सप्रेस; रिमूव इन्फेक्टेड लीव्स."
  },
  {
    "name": "पनामा डिजीज (तर४)",
    "crop": "बनाना",
    "symptoms": "येल्लोविंग ऑफ़ ओल्डर लीव्स वैस्कुलर डिस्कलोरेशन प्लांट डेथ.",
    "treatment": "स्ट्रिक्ट क्वारंटाइन; फार्म बिओसेक्युरित्य; उसे रेसिस्टेंट कैवेंडिश."
  },
  {
    "name": "कॉफ़ी लीफ रस्ट",
    "crop": "कॉफ़ी",
    "symptoms": "येलो स्पॉट्स टर्निंग इंटो ऑरेंज पाउडरी पुस्तुलेस ुंडेरनाथ.",
    "treatment": "कॉपर फुनगीकिदेस; प्लांट रेसिस्टेंट वेरायटीज."
  },
  {
    "name": "कॉफ़ी बेर डिजीज",
    "crop": "कॉफ़ी",
    "symptoms": "डार्क सुनकेँ लेशन्स ों ग्रीन बेरीज कॉसिंग थम तो ड्राप.",
    "treatment": "फुनगीकीडे सप्रेस दुरिन्ग अर्ली बेर डेवलपमेंट."
  },
  {
    "name": "कोको वललें शूट वायरस",
    "crop": "कोको",
    "symptoms": "वललें स्टेमस मोटलेड लीव्स राउंडेड पॉड्स.",
    "treatment": "रिमूव एंड डिस्ट्रॉय इन्फेक्टेड ट्रीज."
  },
  {
    "name": "ब्लैक पोड डिजीज",
    "crop": "कोको",
    "symptoms": "ब्राउन/ब्लैक रोटिंग लेशन्स स्प्रैडिंग अक्रॉस थे पोड.",
    "treatment": "फ्रीक्वेंट हार्वेस्टिंग; पॄने फॉर एरटीओं; कॉपर सप्रेस."
  },
  {
    "name": "विट्चेस' ब्रूम",
    "crop": "कोको",
    "symptoms": "एब्नार्मल प्रोलीफेरतीओं ऑफ़ शूट्स रेसेमब्लिंग ा ब्रूम.",
    "treatment": "फीटोसॉनिटरी प्रूनिंग; रिमूव डिसीसेड पॉड्स."
  },
  {
    "name": "पापाया रिंगस्पॉट वायरस",
    "crop": "पापाया",
    "symptoms": "येलो मोटलिंग ों लीव्स डिस्टिंक्ट रिंग्स ों फ्रूट.",
    "treatment": "उसे ट्रांसजेनिक रेसिस्टेंट वेरायटीज; कण्ट्रोल अफिड्स."
  },
  {
    "name": "रुट-क्नॉट निमेटोड",
    "crop": "वेरियस",
    "symptoms": "स्टंटेड ग्रोथ येल्लोविंग डिस्टिंक्ट गल्स/कनोट्स ों रूट्स.",
    "treatment": "क्रॉप रोटेशन विथ नॉन-होस्ट्स; साइल सोलरिज़तिओन; नेमाटिकिडेस."
  },
  {
    "name": "क्लूब्र्रोट",
    "crop": "कैबेज ब्रोक्कोली",
    "symptoms": "वललें डिस्टॉर्टेड रूट्स विल्टिंग दूरिंग होत डेज.",
    "treatment": "लाइम साइल तो रेज पह &gt; ७.२; लांग क्रॉप रोटेशन्स."
  },
  {
    "name": "ब्लैक रोत",
    "crop": "कैबेज",
    "symptoms": "व्-शेप्ड येलो लेशन्स ों लीफ मार्जिन्स विथ डार्कनेड वेइन्स.",
    "treatment": "उसे डिजीज-फ्री सीड; कॉपर सप्रेस."
  },
  {
    "name": "अल्टेरनारिअ लीफ स्पॉट",
    "crop": "कैबेज",
    "symptoms": "डार्क टारगेट-लिखे स्पॉट्स विथ येलो हालोस.",
    "treatment": "सीड ट्रीटमेंट; फोलिअर फुनगीकिदेस."
  },
  {
    "name": "अनियन स्मट",
    "crop": "अनियन",
    "symptoms": "ब्लैक सूती स्ट्रीक्स ों कटीलेदोन्स एंड यंग लीव्स.",
    "treatment": "सीड ट्रीट्मेंट्स; रोटेट आउट ऑफ़ ाललियम्स."
  },
  {
    "name": "पर्पल ब्लोच",
    "crop": "अनियन",
    "symptoms": "वाटर-सिक्त लेशन्स ठाट टर्न पर्पल विथ ा येलो हालो.",
    "treatment": "रेडके लीफ वेटनेस; अप्लाई प्रोटेक्टिव फुनगीकिदेस."
  },
  {
    "name": "बोट्रिटिस ब्लाइट (ग्रे मोल्ड)",
    "crop": "अनियन स्ट्रॉबेरी",
    "symptoms": "फजी ग्रे मोल्ड ों फ्रूट लीव्स और बल्बस इन ह्यूमिड कंडिशंस.",
    "treatment": "इम्प्रूव एयर सर्कुलेशन; प्रोटेक्टिव फुनगीकीडे सप्रेस."
  },
  {
    "name": "स्ट्रॉबेरी लीफ स्पॉट",
    "crop": "स्ट्रॉबेरी",
    "symptoms": "स्माल पर्पल स्पॉट्स डेवलपिंग वाइट/ग्रे सेंटर्स.",
    "treatment": "रिमूव इन्फेक्टेड डेब्रिस; कॉपर-बेस्ड फुनगीकिदेस."
  },
  {
    "name": "पोटैटो कित निमेटोड",
    "crop": "पोटैटो",
    "symptoms": "स्टंटेड ग्रोथ येल्लोविंग टाइनी सिस्ट्स ों रूट्स.",
    "treatment": "क्रॉप रोटेशन आउट ऑफ़ सोलनकेओस प्लांट्स; रेसिस्टेंट वेरायटीज."
  },
  {
    "name": "पोटैटो वायरस य",
    "crop": "पोटैटो",
    "symptoms": "मोज़ेक मोटलिंग नेक्रोसिस एंड स्टंटिंग.",
    "treatment": "उसे सर्टिफाइड डिजीज-फ्री सीड पोटाटोएस; एफिड कण्ट्रोल."
  },
  {
    "name": "सर्कोस्पोरा लीफ स्पॉट",
    "crop": "शुगर बीत",
    "symptoms": "स्माल सर्कुलर स्पॉट्स विथ ऐश-ग्रे सेंटर्स एंड पर्पल बॉर्डर्स.",
    "treatment": "क्रॉप रोटेशन; फोलिअर फुनगीकिदेस."
  },
  {
    "name": "करलय टॉप वायरस",
    "crop": "शुगर बीत टोमेटो",
    "symptoms": "करलेंड येल्लोवेद लीव्स एंड स्टंटेड ग्रोथ.",
    "treatment": "कण्ट्रोल लीफहोप्पेर्स; प्लांट रेसिस्टेंट वेरायटीज."
  },
  {
    "name": "एस्टर येल्लोव्स",
    "crop": "कार्रत लेटिष",
    "symptoms": "येल्लोविंग स्टंटिंग एंड एब्नार्मल बुशी ग्रोथ.",
    "treatment": "कण्ट्रोल लीफहोप्पेर्स; रिमूव इन्फेक्टेड प्लांट्स."
  },
  {
    "name": "कार्रत ब्लाइट",
    "crop": "कार्रत",
    "symptoms": "ब्राउन/ब्लैक स्पॉट्स ों फोलिएज लीडिंग तो लीफ डेथ.",
    "treatment": "फुनगीकिदेस; वाइड क्रॉप रोटेशन."
  },
  {
    "name": "लेटिष ड्राप",
    "crop": "लेटिष",
    "symptoms": "सुद्दीन विल्टिंग एंड कलपसे; वाइट मोल्ड नियर साइल.",
    "treatment": "अवॉयड एक्सेस मॉइस्चर; डीप प्लोइंग."
  },
  {
    "name": "बैक्टीरियल विल्ट",
    "crop": "कुकुम्बर मेलों",
    "symptoms": "सुद्दीन सीवियर विल्टिंग ऑफ़ वाइन्स स्टिकी सैप इनसाइड स्टेमस.",
    "treatment": "कण्ट्रोल कुकुम्बर बीटल्स; रिमूव इन्फेक्टेड प्लांट्स."
  },
  {
    "name": "गुम्मी स्टेम ब्लाइट",
    "crop": "वाटरमैलों",
    "symptoms": "ब्राउन लेशन्स ों स्टेमस एक्सुडिंग गुम्मी साप.",
    "treatment": "फुनगीकिदेस; क्रॉप रोटेशन."
  },
  {
    "name": "स्क्लेरोटिनिअ स्टेम रॉट",
    "crop": "केनोला",
    "symptoms": "ब्लीचेड स्टेमस विथ हार्ड ब्लैक स्क्लेरोटिअ इनसाइड.",
    "treatment": "फुनगीकिदेस ात फ्लॉवरिंग; रोटेट विथ नॉन-होस्ट्स."
  },
  {
    "name": "ब्लैकलेग",
    "crop": "केनोला",
    "symptoms": "ग्रे/वाइट लेशन्स विथ ब्लैक डॉट्स ों लीव्स एंड स्टेमस.",
    "treatment": "रेसिस्टेंट वेरायटीज; स्तुब्ब्ले मैनेजमेंट."
  },
  {
    "name": "टेक-आल",
    "crop": "वीट",
    "symptoms": "स्टंटेड प्लांट्स वाइट डेड हेड्स ब्लैक रूट्स.",
    "treatment": "क्रॉप रोटेशन; इम्प्रूव साइल ड्रेनेज एंड फर्टिलिटी."
  },
  {
    "name": "बार्ली येलो ड्वार्फ वायरस",
    "crop": "बार्ली ओट्स",
    "symptoms": "स्टंटेड ग्रोथ विथ येलो और रेड लीफ टिप्स.",
    "treatment": "कण्ट्रोल अफिड्स; प्लांट टोलेरंट वेरायटीज."
  },
  {
    "name": "अरगट",
    "crop": "राई वीट",
    "symptoms": "हार्ड डार्क पर्पल/ब्लैक स्क्लेरोटिअ रेप्लेसिंग ग्रेन कर्नल्स.",
    "treatment": "क्लीन सीड; क्रॉप रोटेशन; डीप प्लोइंग."
  },
  {
    "name": "अल्फाल्फा वीविल डैमेज",
    "crop": "अल्फाल्फा",
    "symptoms": "स्केलेटोनीज़ेड लीव्स सीवियर डेफोलिएशन.",
    "treatment": "अर्ली हार्वेस्ट; इंसेक्टिसाइड एप्लीकेशन इफ सीवियर."
  },
  {
    "name": "फ़यटोफ्थोरा रूट रॉट",
    "crop": "अल्फाल्फा",
    "symptoms": "स्टंटेड येलो प्लांट्स; डार्क रोटेड तपरूट्स.",
    "treatment": "प्लांट रेसिस्टेंट वेरायटीज; इम्प्रूव साइल ड्रेनेज."
  },
  {
    "name": "क्राउन गल्ल",
    "crop": "ग्रापए स्टोन फ्रूट्स",
    "symptoms": "लार्ज टूमओर-लिखे गल्स ों रूट्स और लोअर स्टेमस.",
    "treatment": "प्लांट डिजीज-फ्री स्टॉक; अवॉयड स्टेम इंजरीज."
  },
  {
    "name": "पियर्स'स डिजीज",
    "crop": "ग्रापए",
    "symptoms": "लीफ मार्जिन्स टर्न येलो/रेड एंड ड्राई उप.",
    "treatment": "कण्ट्रोल शार्पशूटर वेक्टर्स; रिमूव इन्फेक्टेड वाइन्स."
  },
  {
    "name": "ओलिव क्नॉट",
    "crop": "ओलिव",
    "symptoms": "रफ़ गल्स ों ट्विग्स ब्रांचेज एंड ट्रुंक्स.",
    "treatment": "पॄने दूरिंग ड्राई वेदर; कॉपर सप्रेस."
  },
  {
    "name": "पेकान सकब",
    "crop": "पेकान",
    "symptoms": "स्माल ब्लैक स्पॉट्स ों लीव्स एंड हसकस.",
    "treatment": "फ्रीक्वेंट फुनगीकीडे ऍप्लिकेशन्स."
  },
  {
    "name": "चेस्टनट ब्लाइट",
    "crop": "चेस्टनट",
    "symptoms": "सुनकेँ सांकेरस ों बारक कॉसिंग दिएबाक अबोवे.",
    "treatment": "उसे रेसिस्टेंट ह्यब्रिडस; ह्य्पोविरुलेन्स ट्रीटमेंट."
  },
  {
    "name": "डच एल्म डिजीज",
    "crop": "एल्म",
    "symptoms": "विल्टिंग येल्लोविंग लीव्स इन थे कैनोपी; ब्राउन स्ट्रीक्स इन वुड.",
    "treatment": "कण्ट्रोल एल्म बारक बीटल्स; इंजेक्ट फुनगीकिदेस."
  },
  {
    "name": "ओक विल्ट",
    "crop": "ओक",
    "symptoms": "लीव्स टर्न ब्रोंज/ब्राउन फ्रॉम ेद्गेस इनवर्ड एंड ड्राप रपीड़ली.",
    "treatment": "अवॉयड प्रूनिंग इन स्प्रिंग; ट्रेन्चिंग तो ब्रेक रुट ग्राफ्ट्स."
  },
  {
    "name": "पिने विल्ट",
    "crop": "पिने",
    "symptoms": "नीडल्स टर्न ग्रे-ग्रीन थें ब्राउन; रैपिड ट्री डेथ.",
    "treatment": "रिमूव एंड डिस्ट्रॉय इन्फेक्टेड ट्रीज; कण्ट्रोल सॉयर बीटल्स."
  },
  {
    "name": "डिप्लोडिअ टिप ब्लाइट",
    "crop": "पिने",
    "symptoms": "स्टंटेड ब्राउन नीडल्स ात ब्रांच टिप्स; रेसिन ड्रॉप्लेट्स.",
    "treatment": "फुनगीकीडे सप्रेस दुरिन्ग बड ब्रेक."
  },
  {
    "name": "रोज रोजेट डिजीज",
    "crop": "रोज",
    "symptoms": "एक्सेसिवे थोर्न्स रेड डिस्टॉर्टेड ग्रोथ (विट्चेस' ब्रूम).",
    "treatment": "रिमूव एंड डिस्ट्रॉय इन्फेक्टेड प्लांट्स एंटीरेलय."
  },
  {
    "name": "बोकसवुद ब्लाइट",
    "crop": "बोकसवुद",
    "symptoms": "डार्क लीफ स्पॉट्स रैपिड डेफोलिएशन ब्लैक स्ट्रीक्स ों स्टेमस.",
    "treatment": "स्ट्रिक्ट सैनिटेशन; प्रिवेंटिव फुनगीकिदेस."
  },
  {
    "name": "डायलिलय रस्ट",
    "crop": "डायलिलय",
    "symptoms": "येलो-ऑरेंज स्ट्रीक्स एंड पुस्तुलेस ों लीव्स.",
    "treatment": "रिमूव इन्फेक्टेड लीव्स; अप्लाई फुनगीकिदेस."
  },
  {
    "name": "इम्पेटिएन्स नेक्रोटिक स्पॉट वायरस",
    "crop": "वेरियस ऑर्नमेंटल्स",
    "symptoms": "ब्राउन/ब्लैक स्पॉट्स रिंग्स और लाइन पैटर्न्स ों लीव्स.",
    "treatment": "कण्ट्रोल थ्रिप्स; डिस्ट्रॉय इन्फेक्टेड प्लांट्स."
  },
  {
    "name": "तंबाकू मोज़ेक वायरस",
    "crop": "तंबाकू टोमेटो",
    "symptoms": "मोटलेड लाइट एंड डार्क ग्रीन लीव्स स्टंटिंग.",
    "treatment": "स्ट्रिक्ट सैनिटेशन; अवॉयड स्मोकिंग नियर प्लांट्स."
  },
  {
    "name": "कॉटन लीफ कर्ल वायरस",
    "crop": "कॉटन",
    "symptoms": "उपवार्ड और दोनवार्ड लीफ कर्लिंग वललें वेइन्स.",
    "treatment": "प्लांट रेसिस्टेंट वेरायटीज; कण्ट्रोल व्हीटफ्लैश."
  },
  {
    "name": "बोलल रॉट",
    "crop": "कॉटन",
    "symptoms": "रोटिंग बोललस कवर्ड विथ फंगल ग्रोथ.",
    "treatment": "विदेर प्लांट स्पेसिंग; डेफोलियते बॉटम लीव्स."
  },
  {
    "name": "सुगरकाने मोज़ेक वायरस",
    "crop": "सुगरकाने",
    "symptoms": "मोटलेड लीव्स विथ येलो एंड ग्रीन स्ट्रीक्स.",
    "treatment": "उसे डिजीज-फ्री सेट्ट्स; प्लांट रेसिस्टेंट वेरायटीज."
  },
  {
    "name": "कसावा मोज़ेक डिजीज",
    "crop": "कसावा",
    "symptoms": "सीवियर लीफ डिस्टॉरशन एंड येलो मोटलिंग.",
    "treatment": "उसे सर्टिफाइड क्लीन प्लांटिंग मटेरियल."
  },
  {
    "name": "स्वीट पोटैटो वीविल डैमेज",
    "crop": "स्वीट पोटैटो",
    "symptoms": "पुनस्तूरेद वाइन्स; लार्वा टनल ईंटो रूट्स कॉसिंग रॉट.",
    "treatment": "क्रॉप रोटेशन; फेरोमोने ट्रैप्स."
  },
  {
    "name": "तारो लीफ ब्लाइट",
    "crop": "तारो",
    "symptoms": "लार्ज ब्राउन वाटर-सिक्त लीफ स्पॉट्स विथ येलो हालोस.",
    "treatment": "फुनगीकिदेस; रिमूव इन्फेक्टेड लीव्स."
  },
  {
    "name": "याम मोज़ेक वायरस",
    "crop": "याम",
    "symptoms": "च्लोरोटिक मोटलिंग एंड स्टंटिंग ऑफ़ प्लांट्स.",
    "treatment": "उसे वायरस-फ्री सीड एम्स."
  },
  {
    "name": "पीनट रोजेट डिजीज",
    "crop": "पीनट",
    "symptoms": "सीवियर स्टंटिंग येल्लोवेद एंड बुनछेद लीव्स.",
    "treatment": "अर्ली प्लांटिंग; कण्ट्रोल अफिड्स."
  },
  {
    "name": "सुंफ्लोवेर रस्ट",
    "crop": "सुंफ्लोवेर",
    "symptoms": "सिनेमन-ब्राउन पुस्तुलेस ों लीव्स.",
    "treatment": "प्लांट रेसिस्टेंट ह्यब्रिडस; फोलिअर फुनगीकिदेस."
  },
  {
    "name": "सफ्फ्लौर रस्ट",
    "crop": "सफ्फ्लौर",
    "symptoms": "ऑरेंज पुस्तुलेस ों कटीलेदोन्स एंड लीव्स.",
    "treatment": "सीड ट्रीटमेंट; रेसिस्टेंट वेरायटीज."
  },
  {
    "name": "फ्लक्स विल्ट",
    "crop": "फ्लक्स",
    "symptoms": "येल्लोविंग विल्टिंग एंड डेथ ऑफ़ प्लांट्स एट एनी स्टेज.",
    "treatment": "क्रॉप रोटेशन; रेसिस्टेंट वेरायटीज."
  },
  {
    "name": "हेम्प कांकेर",
    "crop": "हेम्प",
    "symptoms": "वाटर-सिक्त लेशन्स ों स्टेमस लीडिंग तो ब्रेकेज.",
    "treatment": "इनक्रीस प्लांट स्पेसिंग; रिमूव इन्फेक्टेड डेब्रिस."
  },
  {
    "name": "हॉप दौनी मिलदेव",
    "crop": "हॉप्स",
    "symptoms": "स्टंटेड शूट्स ('स्पीक्स') ब्लैक स्पोर्स ों लीफ ुन्दरसिदेस.",
    "treatment": "सिस्टमिक फुनगीकिदेस; रिमूव बसल ग्रोथ."
  },
  {
    "name": "वैनिला रूट रॉट",
    "crop": "वैनिला",
    "symptoms": "ब्राउनिंग एंड रोटिंग ऑफ़ रूट्स प्लांट वॉल्ट्स.",
    "treatment": "इम्प्रूव ड्रेनेज; उसे डिजीज-फ्री कट्टिंग्स."
  },
  {
    "name": "ब्लैक पीपर विल्ट",
    "crop": "ब्लैक पीपर",
    "symptoms": "रैपिड येल्लोविंग एंड द्रोप्पिंग ऑफ़ लीव्स; रूट रॉट.",
    "treatment": "फीटोसॉनिटरी मेझस; कॉपर ड्रेंचिंग."
  },
  {
    "name": "जिंजर सॉफ्ट रॉट",
    "crop": "जिंजर",
    "symptoms": "येल्लोविंग लीव्स; रहिजोम्स बिकम सॉफ्ट वाटरय एंड फ़ाउल-स्मेल्लिंग.",
    "treatment": "सीड राइजोम ट्रीटमेंट; रैसेड बेड प्लांटिंग."
  },
  {
    "name": "टर्मेरिक लीफ स्पॉट",
    "crop": "टर्मेरिक",
    "symptoms": "एलिप्टिकल स्पॉट्स विथ येलो हालोस.",
    "treatment": "फोलिअर स्प्रे ऑफ़ बौर्डिओक्स मिक्सचर."
  },
  {
    "name": "कार्डामम मोज़ेक",
    "crop": "कार्डामम",
    "symptoms": "पीला ग्रीन तो येलो मोटलिंग ों लीव्स.",
    "treatment": "ेरादिसते इन्फेक्टेड प्लांट्स; कण्ट्रोल एफिड वेक्टर्स."
  },
  {
    "name": "साइट्रस त्रिसतेजा वायरस",
    "crop": "साइट्रस",
    "symptoms": "क्विक डिक्लाइन स्टेम पिट्टिंग एंड सीडलिंग येल्लोव्स.",
    "treatment": "उसे टोलेरंट रूटस्टॉक्स; कण्ट्रोल एफिड वेक्टर्स."
  },
  {
    "name": "साइट्रस मेलनोसे",
    "crop": "साइट्रस",
    "symptoms": "स्माल रैसेड रेड्डिश-ब्राउन पुस्तुलेस ों लीव्स फ्रूट एंड ट्विग्स.",
    "treatment": "कॉपर सप्रेस दूरिंग फ्रूट सेट."
  },
  {
    "name": "बिटर पिट",
    "crop": "एप्पल",
    "symptoms": "सुनके डार्क स्पॉट्स ों फ्रूट स्किन स्पंजी टिश्यू ुंडेरनाथ.",
    "treatment": "कैल्शियम फोलिअर सप्रेस; मेन्टेन इवन साइल मॉइस्चर."
  },
  {
    "name": "सूती ब्लोच एंड फ्लिपक",
    "crop": "एप्पल",
    "symptoms": "डार्क समुद्गी ब्लेमिशेस और ग्रुप्स ऑफ़ टाइनी ब्लैक डॉट्स ों फ्रूट सरफेस.",
    "treatment": "पॄने फॉर बेटर ैरफ्लो; अप्लाई फुनगीकिदेस."
  },
  {
    "name": "शॉट होल डिजीज",
    "crop": "पीच एप्रीकॉट",
    "symptoms": "स्माल ब्राउन स्पॉट्स ों लीव्स तहत ड्राप आउट लीविंग 'शॉट होल्स'.",
    "treatment": "डॉर्मेंट कॉपर सप्रेस; रिमूव इन्फेक्टेड वुड."
  },
  {
    "name": "पल्म पॉक्स वायरस",
    "crop": "पल्म पीच",
    "symptoms": "येलो रिंग्स ों लीव्स एंड फ्रूट प्रेमातुर फ्रूट ड्राप.",
    "treatment": "ेरादिसते इन्फेक्टेड ट्रीज; कण्ट्रोल अफिड्स."
  },
  {
    "name": "ब्लैक रोत",
    "crop": "ग्रापए",
    "symptoms": "ब्राउन सर्कुलर लेशन्स ों लीव्स; बेरीज श्रीवेल ईंटो हार्ड ब्लैक मुम्मिएस.",
    "treatment": "डिस्ट्रॉय मुम्मिएस; अप्लाई प्रोटेक्टिव फुनगीकिदेस."
  },
  {
    "name": "बोट्रिटिस बंच रॉट",
    "crop": "ग्रापए",
    "symptoms": "ग्रे फजी मोल्ड कवरिंग ृपेनिंग ग्रापए क्लस्टर्स.",
    "treatment": "लीफ रिमूवल अराउंड क्लस्टर्स; स्पेसिफिक फुनगीकिदेस."
  },
  {
    "name": "इसका",
    "crop": "ग्रापए",
    "symptoms": "टाइगर-स्ट्राइप डिस्कलोरेशन ों लीव्स; इंटरनल वुड देकय.",
    "treatment": "पॄने इन्फेक्टेड वुड करेफुल्ली; प्रोटेक्ट प्रूनिंग वुंड्स."
  },
  {
    "name": "रेड स्टेले रूट रॉट",
    "crop": "स्ट्रॉबेरी",
    "symptoms": "स्टंटेड प्लांट्स विल्टिंग इन वार्म वेअथेर; रेड कोर इन रूट्स.",
    "treatment": "इम्प्रूव साइल ड्रेनेज; उसे रेसिस्टेंट वेरायटीज."
  },
  {
    "name": "एंगुलर लीफ स्पॉट",
    "crop": "स्ट्रॉबेरी कुकुम्बर",
    "symptoms": "वाटर-सिक्त एंगुलर स्पॉट्स लिमिटेड बय लीफ वेइन्स.",
    "treatment": "अवॉयड ओवरहेड वाटरिंग; कॉपर-बेस्ड सप्रेस."
  },
  {
    "name": "मम्मी बेर",
    "crop": "ब्लूबेरी",
    "symptoms": "बेरीज टर्न पीला श्रीवेल एंड हार्डेन इंटो व्हिटिष मुम्मिएस.",
    "treatment": "रेक एंड डिस्ट्रॉय फालेन मुम्मिएस; अप्लाई फुनगीकिदेस."
  },
  {
    "name": "चैने ब्लाइट",
    "crop": "रास्पबेरी",
    "symptoms": "डार्क ब्राउन/पर्पल सांकेरस ों स्टेमस कॉसिंग दिएबाक.",
    "treatment": "पॄने आउट ओल्ड फ्रुइटिंग कानेस िम्मेदिअटली आफ्टर हार्वेस्ट."
  },
  {
    "name": "टोमेटो स्पॉटेड विल्ट वायरस",
    "crop": "टोमेटो पीपर पीनट",
    "symptoms": "डार्क नेक्रोटिक स्पॉट्स रिंग पैटर्न्स एंड सीवियर स्टंटिंग.",
    "treatment": "कण्ट्रोल थ्रिप्स; प्लांट रेसिस्टेंट वेरायटीज."
  },
  {
    "name": "टोमेटो लीफ मोल्ड",
    "crop": "टोमेटो",
    "symptoms": "पीला ग्रीन स्पोट्स ों उप्पेर लीव्स ओलिव-ग्रीन फ़ज़ज़ ों ुन्दरसिदेस.",
    "treatment": "इनक्रीस ग्रीनहाउस वेंटिलेशन; रेसिस्टेंट वेरायटीज."
  },
  {
    "name": "ककय रूट रॉट",
    "crop": "टोमेटो",
    "symptoms": "रूट्स डेवेलोप ब्राउन ककय वललें बैंड्स; प्लांट्स विल्ट.",
    "treatment": "साइल सोलरिज़तिओन; क्रॉप रोटेशन; रेसिस्टेंट रूटस्टॉक्स."
  },
  {
    "name": "वाटरमैलों मोज़ेक वायरस",
    "crop": "मेलों वाटरमैलों",
    "symptoms": "ग्रीन/येलो मोटलिंग एंड डिस्टॉरशन ऑफ़ लीव्स; मिस्शपेन फ्रूट.",
    "treatment": "कण्ट्रोल अफिड्स; उसे रिफ्लेक्टिव मुल्चेस."
  },
  {
    "name": "कॉमन बैक्टीरियल ब्लाइट",
    "crop": "बीन्स",
    "symptoms": "लार्ज ब्राउन इर्रेगुलर नेक्रोटिक स्पोट्स विथ येलो हालोस.",
    "treatment": "उसे सर्टिफाइड डिजीज-फ्री सीड; अवॉयड वर्किंग इन वेट फ़ील्ड्स."
  },
  {
    "name": "हालो ब्लाइट",
    "crop": "बीन्स",
    "symptoms": "स्माल ब्राउन स्पॉट्स सुररौनडेड बी लार्ज डिस्टिंक्ट येलो हालोस.",
    "treatment": "कॉपर-बेस्ड बक्टेरिसिडेस; क्रॉप रोटेशन."
  },
  {
    "name": "अर्ली लीफ स्पॉट",
    "crop": "पीनट",
    "symptoms": "ब्राउन सर्कुलर स्पॉट्स सुररौनडेड बी येलो हालोस ों लीव्स.",
    "treatment": "फोलिअर फुनगीकिदेस; क्रॉप रोटेशन."
  },
  {
    "name": "टारगेट स्पॉट",
    "crop": "कॉटन सोयाबीन",
    "symptoms": "कन्सेन्ट्रिक रिंगड लेशन्स ों लोअर कैनोपी लीव्स कॉसिंग डेफोलिएशन.",
    "treatment": "फुनगीकिदेस टार्गेटिंग लोअर कैनोपी; मैनेज कैनोपी डेंसिटी."
  },
  {
    "name": "कॉमन सकब",
    "crop": "पोटैटो",
    "symptoms": "रफ़ ककय रैसेड और सुनकेँ लेशन्स ों तुबेरस.",
    "treatment": "कीप साइल पह बिलो ५.२; मेन्टेन कंसिस्टेंट साइल मॉइस्चर."
  },
  {
    "name": "सिल्वर स्क्रफ",
    "crop": "पोटैटो",
    "symptoms": "सिल्वेरी पैचेज ों थे तुबेर स्किन कॉसिंग वाटर लोस्स.",
    "treatment": "हार्वेस्ट प्रोमप्टली; अप्लाई पोस्ट-हार्वेस्ट फुनगीकिदेस."
  },
  {
    "name": "पोटैटो ब्लैकलेग",
    "crop": "पोटैटो",
    "symptoms": "इनकी ब्लैक स्लिमय डे ऑफ़ थे लोअर स्टेम; येल्लोविंग लीव्स.",
    "treatment": "उसे सर्टिफाइड सीड; अवॉयड प्लांटिंग इन कोल्ड वेट साइल."
  },
  {
    "name": "अवोकेडो सुंब्लोच",
    "crop": "अवोकेडो",
    "symptoms": "येलो और रेड स्ट्रीकिंग ों फ्रूट स्टेमस एंड लीव्स; स्टंटेड ग्रोथ.",
    "treatment": "रिमूव इन्फेक्टेड ट्रीज; स्ट्रिक्टली उसे इंडेक्स्ड डिजीज-फ्री बुडवुड."
  },
  {
    "name": "मानगो बैक्टीरियल ब्लैक स्पॉट",
    "crop": "मानगो",
    "symptoms": "रैसेड एंगुलर ब्लैक स्पॉट्स ों लीव्स एंड स्टार-शेप्ड क्रैक्स ों फ्रूट.",
    "treatment": "विंडब्रेक्स तो रेडके स्प्रेड; कॉपर सप्रेस."
  },
  {
    "name": "मानगो मलफोर्मेशन",
    "crop": "मानगो",
    "symptoms": "एब्नार्मल कॉम्पैक्ट वगतत्वे और फ्लोरल शूट्स तहत डॉन'टी सेट फ्रूट.",
    "treatment": "पॄने मलफोर्मेड पानिक्लेस; अप्लाई एप्रोप्रियेट फुनगीकिदेस."
  },
  {
    "name": "पाइनएप्पल हार्ट रेट",
    "crop": "पाइनएप्पल",
    "symptoms": "येलो-रेड लीव्स ैसिलय पुल्लेड फ्रॉम थे बेस; फ़ाउल-स्मेल्लिंग रॉट.",
    "treatment": "इम्प्रूव ड्रेनेज; फुनगिसीदल डिप्स फॉर प्लांटिंग मटेरियल."
  },
  {
    "name": "मअलीबग विल्ट",
    "crop": "पाइनएप्पल",
    "symptoms": "रेडडैनिंग विल्टिंग एंड दिएबाक ऑफ़ लीव्स.",
    "treatment": "कण्ट्रोल अन्तस् एंड मालिबूगस; उसे हेअल्थी प्लांटिंग मटेरियल."
  },
  {
    "name": "मोको डिजीज",
    "crop": "बनाना",
    "symptoms": "रैपिड विल्टिंग येल्लोविंग ऑफ़ इनर लीव्स इंटरनल फ्रूट रॉट.",
    "treatment": "डिसइंफेक्ट टूल्स; डिस्ट्रॉय इन्फेक्टेड मैट्स; रिमूव मेल बुडस."
  },
  {
    "name": "बनाना बुंची टॉप वायरस",
    "crop": "बनाना",
    "symptoms": "लीव्स अरे नैरो अपराइट बुनछेद ात थे टॉप विथ डार्क ग्रीन स्ट्रीक्स.",
    "treatment": "स्ट्रिक्ट ेरडिकेशन ऑफ़ इन्फेक्टेड प्लांट्स; कण्ट्रोल बानाना अफिड्स."
  },
  {
    "name": "फ्रॉस्टी पोड रोत",
    "crop": "कोको",
    "symptoms": "पॉड्स डेवेलोप इर्रेगुलर ब्राउन लेशन्स कवर्ड इन थिक वाइट/ग्रे स्पोर्स.",
    "treatment": "फ्रीक्वेंट रिमूवल ऑफ़ डिसीसेड पॉड्स; सीवियर प्रूनिंग."
  },
  {
    "name": "सर्कोस्पोरा लीफ स्पॉट",
    "crop": "कॉफ़ी",
    "symptoms": "ब्राउन स्पॉट्स विथ लाइट ग्रे सेंटर्स ('ब्राउन ऑय स्पॉट').",
    "treatment": "प्रोवाइड ादकते सहदे एंड न्यूट्रिशन; कॉपर सप्रेस."
  },
  {
    "name": "सोरघम अरगट",
    "crop": "सोरघम",
    "symptoms": "स्टिकी पिंकिश 'होनेदेव' एक्सुडिंग फ्रॉम फ्लावर स्पिकेलेट्स.",
    "treatment": "प्लांट ह्यब्रिडस ठाट शेड पोलें अर्ली एंड ाबुनदांतली."
  },
  {
    "name": "सोरघम दौनी मिलदेव",
    "crop": "सोरघम कॉर्न",
    "symptoms": "सिस्टमिक पीला येलो/वाइट स्ट्राइपिंग; वाइट दौनी ग्रोथ ों ुन्दरसिदेस.",
    "treatment": "सीड ट्रीटमेंट; रेसिस्टेंट वेरायटीज."
  },
  {
    "name": "ासकोचिता ब्लाइट",
    "crop": "चिक्की लेंटिल",
    "symptoms": "सर्कुलर लेशन्स विथ डार्क मार्जिन्स एंड टाइनी ब्लैक डॉट्स (पयसनईडीए).",
    "treatment": "फोलिअर फुनगीकिदेस; वाइड क्रॉप रोटेशन."
  },
  {
    "name": "बैक्टीरियल विल्ट",
    "crop": "अल्फाल्फा",
    "symptoms": "स्टंटेड येलो-ग्रीन प्लांट्स; येलो/ब्राउन डिस्कलोरेशन इन तपरूट.",
    "treatment": "प्लांट रेसिस्टेंट वेरायटीज; हार्वेस्ट यंग स्टैंड्स करेफुल्ली."
  },
  {
    "name": "ब्राउन स्टेम रॉट",
    "crop": "सोयाबीन",
    "symptoms": "ब्राउनिंग ऑफ़ पीथ इनसाइड स्टेमस; इंटरवेईनल च्लोरोसिस ों लीव्स.",
    "treatment": "क्रॉप रोटेशन विथ नॉन-होस्ट्स (कॉर्न); रेसिस्टेंट वेरायटीज."
  },
  {
    "name": "चारकोल रॉट",
    "crop": "सोयाबीन कॉर्न",
    "symptoms": "लोअर स्टेम एंड तपरूट टर्न सिल्वर-ग्रे विथ टाइनी ब्लैक मिक्रॉस्लेरोटिअ.",
    "treatment": "इर्रिगेटे तो रेडके द्रोगहट स्ट्रेस; लोअर प्लांट पॉपुलेशन्स."
  },
  {
    "name": "क्राउन रस्ट",
    "crop": "ओट्स",
    "symptoms": "ऑरेंज-येलो पुस्तुलेस ों लीव्स.",
    "treatment": "ेरादिसते बुकथोर्न अल्टेरनाते होस्ट; प्लांट रेसिस्टेंट वेरायटीज."
  },
  {
    "name": "करनाल बंट",
    "crop": "वीट",
    "symptoms": "पार्टिकल्ल्य समुट्ठेद ग्रेन्स विथ अ फिश्य ओडोर.",
    "treatment": "स्ट्रिक्ट क्वारंटाइन; डिजीज-फ्री सीड; फुनगिसीदल सीड ट्रीटमेंट."
  },
  {
    "name": "स्नो मोल्ड",
    "crop": "वीट",
    "symptoms": "वाइट और पिंक कोटोंय मिसलियम कवरिंग प्लांट्स आफ्टर स्नोमैट.",
    "treatment": "अवॉयड एक्सेसिवे नाइट्रोजन लेट इन फॉल; क्रॉप रोटेशन."
  },
  {
    "name": "स्टेम रॉट",
    "crop": "राइस",
    "symptoms": "ब्लैक एंगुलर लेशन्स ों थे लीफ शीथ ात थे वाटर लाइन.",
    "treatment": "अप्लाई पोटैशियम फ़र्टिलाइज़र; ड्रेन फ़ील्ड्स ात थे एन्ड ऑफ़ थे सीजन."
  },
  {
    "name": "टुंग्रो डिजीज",
    "crop": "राइस",
    "symptoms": "स्टंटेड प्लांट्स येलो-ऑरेंज लीव्स फ्रॉम थे टिप दोनवार्ड.",
    "treatment": "कण्ट्रोल ग्रीन लीफहोप्पेर्स; सिंक्रोनाइज प्लांटिंग."
  },
  {
    "name": "बैक्टीरियल ब्लाइट",
    "crop": "राइस",
    "symptoms": "वाटर-सिक्त स्ट्राइप्स ों लीव्स टर्निंग येलो-वाइट एंड द्यिंग.",
    "treatment": "अवॉयड फील्ड फ्लूडिंग; उसे रेसिस्टेंट वेरायटीज."
  },
  {
    "name": "कसावा ब्राउन स्ट्रीक डिजीज",
    "crop": "कसावा",
    "symptoms": "येलो च्लोरोसिस अलोंग लीफ वेइन्स; ड्राई ब्राउन नेक्रोटिक रॉट इन रूट्स.",
    "treatment": "प्लांट सर्टिफाइड वायरस-फ्री कट्टिंग्स; कण्ट्रोल व्हीटफ्लैश."
  },
  {
    "name": "कोकोनट लीथल येल्लोविंग",
    "crop": "कोकोनट",
    "symptoms": "प्रेमातुर नुत ड्राप ब्लैकेनिंग ऑफ फ्लावर स्टॉक्स येल्लोविंग फ्रेंड्स.",
    "treatment": "इंजेक्ट ट्रुंक्स विथ ऑक्सीटेट्रासीक्लीने; प्लांट रेसिस्टेंट वेरायटीज."
  },
  {
    "name": "आयल पाम गैनोडर्मा रॉट",
    "crop": "आयल पाम",
    "symptoms": "लोअर फ्रोंड्स कलपसे शेल्फ-लिखे मुशरूम्स अप्पेअर ात ट्रंक बेस.",
    "treatment": "ट्रेन्चिंग तो िसलते डिसीसेड पाल्म्स; थोरौघ स्टंप रिमूवल."
  },
  {
    "name": "टिया ब्लिस्टर ब्लाइट",
    "crop": "टिया",
    "symptoms": "ट्रांसलूसेंट स्पॉट्स टर्निंग इंटो वाइट ब्लिस्टर-लिखे स्वेलिंग्स ों लीव्स.",
    "treatment": "एडजस्ट शादी; फ्रीक्वेंट हार्वेस्टिंग; कॉपर फुनगीकिदेस."
  },
  {
    "name": "रबर साउथ अमेरिकन लीफ ब्लाइट",
    "crop": "रबर",
    "symptoms": "यंग लीव्स ब्लैकेन एंड फॉल; ओल्डर लीव्स हैवे डार्क शॉट-होल लेशन्स.",
    "treatment": "स्ट्रिक्ट क्वारंटाइन (प्रिवेंट स्प्रेड आउटसाइड साउथ अमेरिका); फुनगीकिदेस."
  }
];
const diseasesKn = [
  {
    "name": "ಆಪಲ್ ಸ್ಕ್ಯಾಬ್",
    "crop": "ಆಪಲ್",
    "symptoms": "ಆಲಿವ್ ಗ್ರೀನ್ ಟು ಬ್ಲಾಕ್ ಸ್ಪೋಟ್ಸ್ ಆನ್ ಲೇತ್ವ್ಸ್ ಅಂಡ್ ಫ್ರೂಟ್.",
    "treatment": "ಅಪ್ಲೈ ಪ್ರೊಟೆಕ್ಟಿವ್ ಫುಣ್ಗಿಸಿದೆಸ್ ದೂರಿಂಗ್ ಅರ್ಲಿ ಸ್ಪ್ರಿಂಗ್."
  },
  {
    "name": "ಫೈರ್ ಬಲೈಟ್",
    "crop": "ಆಪಲ್ ಪಿಆರ್",
    "symptoms": "ಬ್ಲಾಸ್ಸೋಮ್ಸ್ ಶೂಟ್ಸ್ ಅಂಡ್ ಲೇತ್ವ್ಸ್ ಟರ್ನ್ ಬ್ರೌನ್/ಬ್ಲಾಕ್ ಅಸ ಇಫ್ ಸ್ಕೋರ್ಚೆಡ್.",
    "treatment": "ಪೃನೆ ಇಂಫೆಕ್ಟ್ದ್ ಬ್ರಾಂಚೆಸ್ ೮ ಇಂಚೆಸ್ ಬಿಲೋ ಡ್ಯಾಮೇಜ್; ಕಾಪರ್ ಸ್ಪ್ರೇಸ್."
  },
  {
    "name": "ಸೀಡರ್ ಆಪಲ್ ರೂಸ್ಟ್",
    "crop": "ಆಪಲ್",
    "symptoms": "ಯಲ್ಲೋ-ಆರೆಂಜ್ ಸ್ಪೋಟ್ಸ್ ಆನ್ ಲೇತ್ವ್ಸ್ ಲೀಡಿಂಗ್ ಟು ಡೆಫೋಲಿಯೇಷನ್.",
    "treatment": "ರೇಂವ್ ನೇತ್ರ್ಬ್ಯ್ ಸೀಡರ್ ಹೊಸ್ಟ್ಸ್; ಅಪ್ಲೈ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ಪೌಡರಿ ಮಿಲ್ಡ್ವ",
    "crop": "ಆಪಲ್ ಗ್ರೇಪ್ ಕ್ಯುಕಂಬೆರ್",
    "symptoms": "ವೈಟ್ ಪೌಡರಿ ಪಾಟಿಕ್ಸ್ ಆನ್ ಲೀಫ್ ಸುರ್ಫ್ಯಾಕ್ಸ್ ಅಂಡ್ ಶೂಟ್ಸ್.",
    "treatment": "ಸಲ್ಫರ್ ಸ್ಪ್ರೇ ಅಂಡ್ ಇಮ್ಪ್ರೋವೆಡ್ ಐರ್ಫ್ಲೌ ಬಿಟ್ವೀನ್ ಪ್ಲಾಂಟ್ಸ್."
  },
  {
    "name": "ಪೀಚ್ ಲೀಫ್ ಕಲ್",
    "crop": "ಪೀಚ್ ನೆಕ್ಟಾರಿನೇ",
    "symptoms": "ಠೀಕೆನೆಡ್ ಫುಕರ್ಲೆಡ್ ರೆಡ್/ಯಲ್ಲೋ ಕಳೆದ್ ಲೇತ್ವ್ಸ್.",
    "treatment": "ಅಪ್ಲೈ ದೋರ್ಮ್ಯಾಂತ್ ಸ್ಪ್ರೇ ಆ ಕಾಪರ್ ಫುಣ್ಗಿಸಿದೆ ಇನ್ ಲೇಟ್ ವಿಂಟರ್."
  },
  {
    "name": "ಬ್ರೌನ್ ರೊಟ್",
    "crop": "ಪ್ಲಮ್ ಚೆರ್ರಿ ಪೀಚ್",
    "symptoms": "ಬ್ರೌನ್ ರೊಟ್ಟಿಂಗ್ ಫ್ರೂಟ್ ಕೋವೆರೆಡ್ ವಿಥ್ ಟಾನ್ ಪೌಡರಿ ಸ್ಪೋರ್ಸ್.",
    "treatment": "ರೇಂವ್ ಮುಮ್ಮಿಫಿಎಡ್ ಫ್ರೂಟ್; ಅಪ್ಲೈ ಫುಣ್ಗಿಸಿದೆ ಡ್ಯೂರಿಂಗ್ ಬ್ಲೂಮ್."
  },
  {
    "name": "ಬ್ಲಾಕ್ ಕ್ನೋಟ್",
    "crop": "ಪ್ಲಮ್ ಚೆರ್ರಿ",
    "symptoms": "ಹಾರ್ಡ್ ಬ್ಲಾಕ್ ಎಲಂಗಟೆಡ್ ಗಲ್ಸ್ ಆನ್ ಬ್ರಾಂಚೆಸ್ ಅಂಡ್ ಟ್ವಿಗ್ಸ್.",
    "treatment": "ಪೃನೆ ಔಟ್ ಗಲ್ಸ್ ಡ್ಯೂರಿಂಗ್ ವಿಂಟರ್ ದೋರ್ಮ್ಯಾನ್ಸಿ."
  },
  {
    "name": "ಸಿಟ್ರಸ್ ಕ್ಯಾನ್ಕರ್",
    "crop": "ಸಿಟ್ರಸ್",
    "symptoms": "ರೈಸ್ಡ್ ಕಾರ್ಕಿ ಕ್ರೇಟರ್-ಲೈಕ್ ಲೇಸಿಒನ್ಸ್ ವಿಥ್ ಯಲ್ಲೋ ಹ್ಯಾಲೋಸ್ ಆನ್ ಲೇತ್ವ್ಸ್.",
    "treatment": "ರೇಂವ್ ಇಂಫೆಕ್ಟ್ದ್ ಟ್ರೀಸ್; ಅಪ್ಲೈ ಕಾಪರ್-ಬೇಸ್ಡ್ ಬಾಸಿಟ್ರಿಸದೇಶ್."
  },
  {
    "name": "ಸಿಟ್ರಸ್ ಗ್ರೀನ್ನಿಂಗ್ (ಹ್ಲ್ಬ್)",
    "crop": "ಸಿಟ್ರಸ್",
    "symptoms": "ಯಲ್ಲೋ ಮೊಟ್ಟೆಲ್ಡ್ ಲೇಅವೇಸ್ ಮಿಸ್ಹ್ಯಾಪೆನ್ ಬಿಟರ್ ಫ್ರೂಟ್.",
    "treatment": "ಕಂಟ್ರೋಲ್ ಏಶಿಯನ್ ಸಿಟ್ರಸ್ ಪಿಸಿಲ್ಲಿದ್ ವೆಕ್ಟರ್; ನ್ಯೂಟ್ರಿಷನಲ್ ಸಪೋರ್ಟ್."
  },
  {
    "name": "ಬ್ಲಾಕ್ ಸ್ಪಾಟ್",
    "crop": "ಸಿಟ್ರಸ್ ರೋಜ್",
    "symptoms": "ಡಾರ್ಕ್ ಸ್ಪೋಟ್ಸ್ ಆನ್ ಲೇತ್ವ್ಸ್ ಚೌಸಿಂಗ್ ಥೆಮ್ ಟು ಟರ್ನ್ ಯಲ್ಲೋ ಅಂಡ್ ಡ್ರಾಪ್.",
    "treatment": "ಫುಣ್ಗಿಸಿದೆ ಸ್ಪ್ರೇಸ್; ರೇಂವ್ ಫಳ್ಳೆಂ ಇಂಫೆಕ್ಟ್ದ್ ಲೇಅವೇಸ್."
  },
  {
    "name": "ಲೇಟ್ ಬಲೈಟ್",
    "crop": "ಟೊಮೇಟೊ ಪೊಟಾಟೋ",
    "symptoms": "ಡಾರ್ಕ್ ವಾಟರ್-ಸೂಕೆಡ್ ಲೇಸಿಒನ್ಸ್; ರಾಪಿಡ್ ಲೀಫ್ ಕಾಲಾಪ್ಸ್ ರೊಟ್ಟಿಂಗ್ ಫ್ರೂಟ್.",
    "treatment": "ಮ್ಯಾಂಚೊಝೇಬ್ ಸ್ಪ್ರೇ; ಡೆಸ್ಟ್ರಾಯ್ ಇಂಫೆಕ್ಟ್ದ್ ಪ್ಲಾಂಟ್ಸ್ ಇಮ್ಮೆಡೈತೆಲಿ."
  },
  {
    "name": "ಅರ್ಲಿ ಬಲೈಟ್",
    "crop": "ಟೊಮೇಟೊ ಪೊಟಾಟೋ",
    "symptoms": "ಟಾರ್ಗೆಟ್-ಲೈಕ್ ಕಾಂಸೆಂಟ್ರಿಕ್ ರಿಂಗ್ಸ್ ಆ ಡಾರ್ಕ್ ಸ್ಪೋಟ್ಸ್ ಆನ್ ಲೋಯರ್ ಲೇತ್ವ್ಸ್.",
    "treatment": "ರೋಟತೆ ಕ್ರಾಪ್ಸ್; ಅಪ್ಲೈ ಪ್ರೊಟೆಕ್ಟ್ಯಾಂತ್ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ಸೆಪ್ಟಾರಿಆ ಲೀಫ್ ಸ್ಪಾಟ್",
    "crop": "ಟೊಮೇಟೊ",
    "symptoms": "ಸ್ಮಾಲ್ ಸರ್ಕ್ಯುಲರ್ ಸ್ಪೋಟ್ಸ್ ವಿಥ್ ಗ್ರೆಯ್ ಸೆಂಟರ್ಸ್ ಅಂಡ್ ಡಾರ್ಕ್ ಬಾರ್ಡರ್ಸ್.",
    "treatment": "ಮುಲ್ಕ್ ಟು ಪ್ರೆವೆಂಟ್ ಸಾಯಿಲ್ ಸ್ಪ್ಲಾಷ್; ಅಪ್ಲೈ ಕಾಪರ್ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ಬ್ಲಾಸಮ್ ಎಂಡ್ ರೊಟ್",
    "crop": "ಟೊಮೇಟೊ ಪೆಪ್ಪರ್",
    "symptoms": "ಡಾರ್ಕ್ ಸುಂಕೇನ ಲೆತ್ತೆರಿ ಪಾಟಿಕ್ಸ್ ಅಟ್ ದಿ ಬಾಟಮ್ ಆ ಫ್ರೂಟ್.",
    "treatment": "ಎಣ್ಸುರೆ ಕಾನ್ಸಿಸ್ಟನ್ಟ್ ವಾಟರಿಂಗ್; ಅಪ್ಲೈ ಕ್ಯಾಲ್ಸಿಯಂ ಸಾಯಿಲ್ ಅಮೆಂಡ್ಮೆಂಟ್ಸ್."
  },
  {
    "name": "ಫುಸರಿಯಂ ವಿಲ್ಟ್",
    "crop": "ಟೊಮೇಟೊ ಬನಾನಾ",
    "symptoms": "ಎಲಲೊವಿಂಗ್ ಅಂಡ್ ವೈಲ್ಟಿಂಗ್ ಆ ಲೇಅವೇಸ್ ಅಟೆನ್ ಸ್ಟಾರ್ಟಿಂಗ್ ಆನ್ ವನ್ ಸೈಡ್.",
    "treatment": "ಉಷೆ ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್; ಸೋಲರಿಜ್ ಸಾಯಿಲ್."
  },
  {
    "name": "ವರ್ಟಿಸಿಲಿಯಂ ವಿಲ್ಟ್",
    "crop": "ವರಿಯೋಸ್ಸ್",
    "symptoms": "ವಿ-ಶೇಪ್ಡ್ ಯಲ್ಲೋ ಲೇಸಿಒನ್ಸ್ ಆನ್ ಲೀಫ್ ಮರ್ಗಿನ್ಸ್ ವೈಲ್ಟಿಂಗ್.",
    "treatment": "ಕ್ರಾಪ್ ರೊಟೇಷನ್; ಅವಾಯ್ಡ್ ಪ್ಲಾಂಟಿಂಗ್ ಸುಶ್ಸ್ಪ್ತಿಬ್ಲೆ ಕ್ರಾಪ್ಸ್ ಇನ್ ಇಂಫೆಕ್ಟ್ದ್ ಸಾಯಿಲ್."
  },
  {
    "name": "ಬಸಿಟೇರಿಯಲ್ ಸ್ಪಾಟ್",
    "crop": "ಪೆಪ್ಪರ್ ಟೊಮೇಟೊ",
    "symptoms": "ಸ್ಮಾಲ್ ಡಾರ್ಕ್ ವಾಟರ್-ಸೂಕೆಡ್ ಸ್ಪೋಟ್ಸ್ ಆನ್ ಲೇಅವೇಸ್ ಅಂಡ್ ಫ್ರೂಟ್.",
    "treatment": "ಕಾಪರ್-ಬೇಸ್ಡ್ ಬಾಸಿಟ್ರಿಸದೇಶ್; ಉಷೆ ಪೆಥೊಜೆನ್-ಫ್ರೀ ಸೀಡ್."
  },
  {
    "name": "ಕ್ಯುಕಂಬೆರ್ ಮೊಸಾಯಿಕ್ ವೈರಸ್",
    "crop": "ಕ್ಯುಕಂಬೆರ್ ಮೆಳೊನ್",
    "symptoms": "ಮೊಟ್ಟೆಲ್ಡ್ ಡಿಸ್ಟಾರ್ಟಡ್ ಲೇತ್ವ್ಸ್ ಅಂಡ್ ಸ್ಟುನ್ಟ್ದ್ ಫ್ರೂಟ್.",
    "treatment": "ಕಂಟ್ರೋಲ್ ಅಫಿಡ್ಸ್; ರೇಂವ್ ಇಂಫೆಕ್ಟ್ದ್ ಪ್ಲಾಂಟ್ಸ್ ಅಂಡ್ ವೀಡ್ಸ್."
  },
  {
    "name": "ಡೌನಿ ಮಿಲ್ಡ್ವ",
    "crop": "ಕ್ಯುಕಂಬೆರ್ ಗ್ರೇಪ್ ಸ್ಪಿನಾಚ್",
    "symptoms": "ಯಲ್ಲೋ ಪಾಟಿಕ್ಸ್ ಆನ್ ಟಾಪ್ ಗ್ರೇಯ್/ಪರ್ಪಲ್ ಫುಝ್ ಉಂಡೆರ್ನ್ಥ್ ಲೇತ್ವ್ಸ್.",
    "treatment": "ಇಂಪ್ರೂವ್ ವೆಂಟಿಲೇಷನ್; ಅಪ್ಲೈ ಸ್ಪೆಸಿಫಿಕ್ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ಅಂತ್ರಸಿನೋಸೆ",
    "crop": "ಬೀನ್ಸ್ ಮ್ಯಾಂಗೋ ಮೆಳೊನ್",
    "symptoms": "ಸುಂಕೇನ ಡಾರ್ಕ್ ಲೇಸಿಒನ್ಸ್ ವಿಥ್ ಪಿಂಕಿಶ್ ಸ್ಪೋರ್ ಮಸ್ಸೇಸ್ ಇನ್ ವೆಟ್ ವೀಥಿರ್.",
    "treatment": "ಪೃನೆ ಇಂಫೆಕ್ಟ್ದ್ ಪಾರ್ಟ್ಸ್; ಕಾಪರ್-ಬೇಸ್ಡ್ ಸ್ಪ್ರೇಸ್."
  },
  {
    "name": "ಕಾಮನ್ ರೂಸ್ಟ್",
    "crop": "ಕಾರ್ನ್",
    "symptoms": "ಓವಲ್ ಸಿನ್ನಮೋನ್-ಬ್ರೌನ್ ಪುಸ್ತುಲೆಸ್ ಆನ್ ಬೋಥ್ ಲೀಫ್ ಸುರ್ಫ್ಯಾಕ್ಸ್.",
    "treatment": "ಫುಣ್ಗಿಸಿದೆ ಅಪ್ಲಿಕೇಶನ್ ಇಫ್ ಸೇವೆರೆ; ಪ್ಲಾಂಟ್ ರೆಸಿಸ್ಟನ್ಟ್ ಹೈಬ್ರಿಡ್ಸ್."
  },
  {
    "name": "ನೊರ್ತೆರ್ನ್ ಕಾರ್ನ್ ಲೀಫ್ ಬಲೈಟ್",
    "crop": "ಕಾರ್ನ್",
    "symptoms": "ಲಾರ್ಜ್ ಸಿಗಾರ್-ಶೇಪ್ಡ್ ಗ್ರೇಯ್/ಗ್ರೀನ್ ಟು ಟಾನ್ ಲೇಸಿಒನ್ಸ್.",
    "treatment": "ಕ್ರಾಪ್ ರೊಟೇಷನ್; ಫೋಲಿಯಾರ್ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ಸೌಥೆರ್ನ್ ಕಾರ್ನ್ ಲೀಫ್ ಬಲೈಟ್",
    "crop": "ಕಾರ್ನ್",
    "symptoms": "ಸ್ಮಾಲ್ ರೆಸಿತಂಗುಲರ್ ಟಾನ್ ಲೇಸಿಒನ್ಸ್ ಬಿಟ್ವೀನ್ ಲೀಫ್ ವೆಯ್ನ್ಸ್.",
    "treatment": "ಟಿಲ್ಲಗೆ ಟು ಬುರಿ ರೆಸಿಡುಕ್ಕಿ; ಪ್ಲಾಂಟ್ ರೆಸಿಸ್ಟನ್ಟ್ ಹೈಬ್ರಿಡ್ಸ್."
  },
  {
    "name": "ಗ್ರೇ ಲೀಫ್ ಸ್ಪಾಟ್",
    "crop": "ಕಾರ್ನ್",
    "symptoms": "ರೆಸಿತಂಗುಲರ್ ಪಾಲೇ ಬ್ರೌನ್ ಟು ಗ್ರೆಯ್ ಲೇಸಿಒನ್ಸ್ ರೆಸ್ಟ್ರಿಕ್ಟ್ದ್ ಬೈ ವೆಯ್ನ್ಸ್.",
    "treatment": "ಕ್ರಾಪ್ ರೊಟೇಷನ್; ಫೋಲಿಯಾರ್ ಫುಣ್ಗಿಸಿದೆಸ್ ಅಟ್ ಟಸ್ಸೆಲ್ಲಿಂಗ್."
  },
  {
    "name": "ಕಾಮನ್ ಸಮುತ್",
    "crop": "ಕಾರ್ನ್",
    "symptoms": "ಲಾರ್ಜ್ ಗ್ರೇಯ್ಶ್-ವೈಟ್ ಗಲ್ಸ್ ಆನ್ ಈರ್ಸ್ ಠಸ್ಸೆಲ್ಸ್ ಓರ್ ಸ್ಟೇಲ್ಕ್ಸ್.",
    "treatment": "ಅವಾಯ್ಡ್ ಮೆಕ್ಯಾನಿಕಲ್ ಇಂಜುರಿ ಟು ಪ್ಲಾಂಟ್ಸ್; ಬ್ಯಾಲೆನ್ಸ್ಡ್ ಫರ್ಟಿಲೈಝಷನ್."
  },
  {
    "name": "ಸೊಯಾಬೀನ್ ರೂಸ್ಟ್",
    "crop": "ಸೊಯಾಬೀನ್",
    "symptoms": "ಸ್ಮಾಲ್ ಟಾನ್ ಟು ರೆಡ್ಡಿಶ್-ಬ್ರೌನ್ ಲೇಸಿಒನ್ಸ್ ಮೋಸ್ಟ್ಲಿ ಆನ್ ಲೋಯರ್ ಲೇಅವೇಸ್.",
    "treatment": "ಅರ್ಲಿ ಫುಣ್ಗಿಸಿದೆ ಅಪ್ಲಿಕೇಶನ್ ವೆನ್ ಡಿಟೆಕ್ಟೆಡ್."
  },
  {
    "name": "ಫ್ರಒಗೆಯೇ ಲೀಫ್ ಸ್ಪಾಟ್",
    "crop": "ಸೊಯಾಬೀನ್",
    "symptoms": "ಸರ್ಕ್ಯುಲರ್ ಸ್ಪೋಟ್ಸ್ ವಿಥ್ ಗ್ರೇಯ್ ಸೆಂಟರ್ಸ್ ಅಂಡ್ ಡಾರ್ಕ್ ರೆಡ್ಡಿಶ್-ಬ್ರೌನ್ ಬಾರ್ಡರ್ಸ್.",
    "treatment": "ಫೋಲಿಯಾರ್ ಫುಣ್ಗಿಸಿದೆಸ್; ಪ್ಲಾಂಟ್ ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್."
  },
  {
    "name": "ಸಡನ್ ಡೆತ್ ಸಿಂಡ್ರೋಮ್",
    "crop": "ಸೊಯಾಬೀನ್",
    "symptoms": "ಎಲಲೊವಿಂಗ್ ಅಂಡ್ ಬ್ರೌನಿಂಗ್ ಬಿಟ್ವೀನ್ ವೆಯ್ನ್ಸ್; ರೂಟ್ಸ್ ರೊಟ್.",
    "treatment": "ಇಂಪ್ರೂವ್ ಸಾಯಿಲ್ ಡ್ರೈನೇಜ್; ಡೆಲೇ ಪ್ಲಾಂಟಿಂಗ್; ಉಷೆ ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್."
  },
  {
    "name": "ವೈಟ್ ಮೊಲ್ಡ್",
    "crop": "ಸೊಯಾಬೀನ್ ಬೀನ್",
    "symptoms": "ವೈಟ್ ಫ್ಲ್ಯೂಫ್ಯ್ ಫಂಗಲ್ ಗ್ರೋಥ್ ಆನ್ ಸ್ಟೆಮ್ಸ್; ಬ್ಲಾಕ್ ಸ್ಕಲೆರೋಟಿಯ ಇನ್ಸೈಡ್.",
    "treatment": "ವಿದ್ರ್ ರೋ ಸ್ಪೇಸಿಂಗ್; ಫುಣ್ಗಿಸಿದೆ ಅಪ್ಲಿಕೇಶನ್ ಅಟ್ ಫ್ಲವರಿಂಗ್."
  },
  {
    "name": "ರೈಸ್ ಬ್ಲಾಸ್ಟ್",
    "crop": "ರೈಸ್",
    "symptoms": "ಡೈಮಂಡ್-ಶೇಪ್ಡ್ ಲೇಸಿಒನ್ಸ್ ವಿಥ್ ಗ್ರೆಯ್ ಸೆಂಟರ್ಸ್ ಅಂಡ್ ಬ್ರೌನ್ ಬಾರ್ಡರ್ಸ್.",
    "treatment": "ವಾಟರ್ ಮ್ಯಾನೇಜ್ಮೆಂಟ್; ಸಿಸ್ಟೆಮಿಕ್ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ಶೇತ್ತ್ ಬಲೈಟ್",
    "crop": "ರೈಸ್",
    "symptoms": "ಓವಲ್ ಗ್ರೀನಿಷ್-ಗ್ರೆಯ್ ಲೇಸಿಒನ್ಸ್ ಆನ್ ದಿ ಲೀಫ್ ಶೇಥ್ ನಿಯರ್ ವಾಟರ್ ಲೈನ್.",
    "treatment": "ರೆಡ್ಯೂಸ್ ನೈಟ್ರೋಜನ್ ಅಪ್ಲಿಕೇಶನ್; ಅಪ್ಲೈ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ಬಸಿಟೇರಿಯಲ್ ಪಾನಿಕ್ಲ್ ಬಲೈಟ್",
    "crop": "ರೈಸ್",
    "symptoms": "ಡಿಸ್ಕೋಲೊರ್ಡ್ ಗ್ರಾಯ್ನ್ಸ್ ಉಪಿರೈಟ್ ಪಾನಿಕ್ಲ್ಸ್ ದುಇ ಟು ಪೂರ್ ಗ್ರೇನ್ ಫೈಲ್.",
    "treatment": "ಅರ್ಲಿ ಪ್ಲಾಂಟಿಂಗ್; ನೋ ಹೈಲಿ ಎಫೆಕ್ಟಿವ್ ಕೆಮಿಕಲ್ ಕಂಟ್ರೋಲ್."
  },
  {
    "name": "ವೀಟ್ ಸ್ತೆಂ ರೂಸ್ಟ್",
    "crop": "ವೀಟ್",
    "symptoms": "ಬ್ರಿಕ್-ರೆಡ್ ಎಲಂಗಟೆಡ್ ಪುಸ್ತುಲೆಸ್ ಆನ್ ಸ್ಟೆಮ್ಸ್ ಅಂಡ್ ಲೀಫ್ ಶೇಥ್ಸ್.",
    "treatment": "ಪ್ಲಾಂಟ್ ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್; ಎರಡಿಕ್ಯಾತೆ ಬಾರ್ಬೆರಿ ಅಳ್ತೇರ್ಣತೆ ಹೋಸ್ಟ್."
  },
  {
    "name": "ವೀಟ್ ಲೀಫ್ ರೂಸ್ಟ್",
    "crop": "ವೀಟ್",
    "symptoms": "ಸ್ಮಾಲ್ ರೌಂಡ್ ಆರೆಂಜ್-ರೆಡ್ ಪುಸ್ತುಲೆಸ್ ಸ್ಕ್ಯಾಟರ್ಡ್ ಆನ್ ಲೇತ್ವ್ಸ್.",
    "treatment": "ಫೋಲಿಯಾರ್ ಫುಣ್ಗಿಸಿದೆಸ್; ರೆಸಿಸ್ಟನ್ಟ್ ಕಲ್ತಿವರ್ಸ್."
  },
  {
    "name": "ವೀಟ್ ಸ್ಟ್ರಿಪ್ ರೂಸ್ಟ್",
    "crop": "ವೀಟ್",
    "symptoms": "ಯಲ್ಲೋ-ಆರೆಂಜ್ ಪುಸ್ತುಲೆಸ್ ಅರೇಂಜ್ಡ್ ಇನ್ ಲೀನಿಯರ್ ಸ್ತ್ರೀಫೇಸ್ ಆನ್ ಲೇಅವೇಸ್.",
    "treatment": "ಅರ್ಲಿ ಫುಣ್ಗಿಸಿದೆ ಅಪ್ಲಿಕೇಶನ್; ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್."
  },
  {
    "name": "ಫುಸರಿಯಂ ಹೆಡ್ ಬಲೈಟ್",
    "crop": "ವೀಟ್ ಬಾರ್ಲಿ",
    "symptoms": "ಪ್ರೇಮಾತುರೇ ಬ್ಲೀಚಿಂಗ್ ಆ ಸ್ಪೈಕೆಲೆಟ್ಸ್; ಪಿಂಕ್/ಆರೆಂಜ್ ಸ್ಪೋರ್ಸ್.",
    "treatment": "ಫುಣ್ಗಿಸಿದೆಸ್ ಅಟ್ ಫ್ಲವರಿಂಗ್; ಕ್ರಾಪ್ ರೊಟೇಷನ್."
  },
  {
    "name": "ಬ್ಲಾಕ್ ಸಿಗತೋಕ",
    "crop": "ಬನಾನಾ",
    "symptoms": "ನರೋ ಡಾರ್ಕ್ ಬ್ರೌನ್ ಸ್ಟ್ರೆಕ್ಸ್ ಆನ್ ಲೇತ್ವ್ಸ್ ಚೌಸಿಂಗ್ ನೆಕ್ರೋಸಿಸ್.",
    "treatment": "ಫ್ರೆಕ್ಯುನ್ಟ್ ಫುಣ್ಗಿಸಿದೆ ಸ್ಪ್ರೇಸ್; ರೇಂವ್ ಇಂಫೆಕ್ಟ್ದ್ ಲೇಅವೇಸ್."
  },
  {
    "name": "ಪನಾಮ ಡಿಸೀಸ್ (ತೃ೪)",
    "crop": "ಬನಾನಾ",
    "symptoms": "ಎಲಲೊವಿಂಗ್ ಆ ಒಲ್ಡ್ರ್ ಲೇಅವೇಸ್ ವಾಸ್ಕ್ಯುಲರ್ ಡಿಸ್ಕೋಳೋರೇಷನ್ ಪ್ಲಾಂಟ್ ಡೆತ್.",
    "treatment": "ಸ್ಟ್ರಿಕ್ಟ್ ಕ್ವಾರಂಟೈನ್; ಫಾರ್ಮ್ ಬಯೋಸೆಕ್ಯೂರಿಟಿ; ಉಷೆ ರೆಸಿಸ್ಟನ್ಟ್ ಕ್ಯಾವೆಂಡಿಷ್."
  },
  {
    "name": "ಕಾಫಿ ಲೀಫ್ ರೂಸ್ಟ್",
    "crop": "ಕಾಫಿ",
    "symptoms": "ಯಲ್ಲೋ ಸ್ಪೋಟ್ಸ್ ಟರ್ನಿಂಗ್ ಇಂಟು ಆರೆಂಜ್ ಪೌಡರಿ ಪುಸ್ತುಲೆಸ್ ಉಂಡೆರ್ನ್ಥ್.",
    "treatment": "ಕಾಪರ್ ಫುಣ್ಗಿಸಿದೆಸ್; ಪ್ಲಾಂಟ್ ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್."
  },
  {
    "name": "ಕಾಫಿ ಬೆರಿ ಡಿಸೀಸ್",
    "crop": "ಕಾಫಿ",
    "symptoms": "ಡಾರ್ಕ್ ಸುಂಕೇನ ಲೇಸಿಒನ್ಸ್ ಆನ್ ಗ್ರೀನ್ ಬೆರ್ರೀಸ್ ಚೌಸಿಂಗ್ ಥೆಮ್ ಟು ಡ್ರಾಪ್.",
    "treatment": "ಫುಣ್ಗಿಸಿದೆ ಸ್ಪ್ರೇಸ್ ಡ್ಯೂರಿಂಗ್ ಅರ್ಲಿ ಬೆರಿ ಡೆವಲಪ್ಮೆಂಟ್."
  },
  {
    "name": "ಕೋಕೋ ವೆವ್ಲ್ಲೆಂ ಶೂಟ್ ವೈರಸ್",
    "crop": "ಕೋಕೋ",
    "symptoms": "ವೆವ್ಲ್ಲೆಂ ಸ್ಟೆಮ್ಸ್ ಮೊಟ್ಟೆಲ್ಡ್ ಲೇಅವೇಸ್ ರೌಂಡೆಡ್ ಪೋಡ್ಸ್.",
    "treatment": "ರೇಂವ್ ಅಂಡ್ ಡೆಸ್ಟ್ರಾಯ್ ಇಂಫೆಕ್ಟ್ದ್ ಟ್ರೀಸ್."
  },
  {
    "name": "ಬ್ಲಾಕ್ ಪೋದ್ ಡಿಸೀಸ್",
    "crop": "ಕೋಕೋ",
    "symptoms": "ಬ್ರೌನ್/ಬ್ಲಾಕ್ ರೊಟ್ಟಿಂಗ್ ಲೇಸಿಒನ್ಸ್ ಸ್ಪ್ರೆಅಡಿಂಗ್ ಅಕ್ರಾಸ್ ದಿ ಪೋದ್.",
    "treatment": "ಫ್ರೆಕ್ಯುನ್ಟ್ ಹಾರ್ವೆಸ್ಟಿಂಗ್; ಪೃನೆ ಫಾರ್ ಅರಾಶನ್; ಕಾಪರ್ ಸ್ಪ್ರೇಸ್."
  },
  {
    "name": "ವಿಟಿಕ್ಸ್' ಬ್ರೂಮ್",
    "crop": "ಕೋಕೋ",
    "symptoms": "ಅಬ್ನಾರ್ಮಲ್ ಪ್ರೊಲಿಫೆರೇಷನ್ ಆ ಶೂಟ್ಸ್ ರೆಸೆಮ್ಬಲಿಂಗ್ ಆ ಬ್ರೂಮ್.",
    "treatment": "ಫಿಟೋಸಾನಿಟರಿ ಪೃನಿಂಗ್; ರೇಂವ್ ಡಿಸೀಜ್ಡ್ ಪೋಡ್ಸ್."
  },
  {
    "name": "ಪಪಾಯ ರಿಂಗ್ಸ್ಫೋಟ್ ವೈರಸ್",
    "crop": "ಪಪಾಯ",
    "symptoms": "ಯಲ್ಲೋ ಮೊಟ್ಟಲಿಂಗ್ ಆನ್ ಲೇತ್ವ್ಸ್ ಡಿಸ್ಟಿಂಕ್ಟ್ ರಿಂಗ್ಸ್ ಆನ್ ಫ್ರೂಟ್.",
    "treatment": "ಉಷೆ ಟ್ರಾನ್ಸ್ಗೆನಿಕ್ ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್; ಕಂಟ್ರೋಲ್ ಅಫಿಡ್ಸ್."
  },
  {
    "name": "ರೂಟ್-ಕ್ನೋಟ್ ನೆಮಟೋಡ್",
    "crop": "ವರಿಯೋಸ್ಸ್",
    "symptoms": "ಸ್ಟುನ್ಟ್ದ್ ಗ್ರೋಥ್ ಎಲಲೊವಿಂಗ್ ಡಿಸ್ಟಿಂಕ್ಟ್ ಗಲ್ಸ್/ಕ್ನೋಟ್ಸ್ ಆನ್ ರೂಟ್ಸ್.",
    "treatment": "ಕ್ರಾಪ್ ರೊಟೇಷನ್ ವಿಥ್ ನೋನ್-ಹೊಸ್ಟ್ಸ್; ಸಾಯಿಲ್ ಸೋಲಾರಿಝಷನ್; ನೇಮತಿಸದೇಶ್."
  },
  {
    "name": "ಕ್ಲ್ಯೂಬಿರೂಟ್",
    "crop": "ಕಬ್ಬಗೆ ಬ್ರೊಸಿಕೊಳ್ಳಿ",
    "symptoms": "ವೆವ್ಲ್ಲೆಂ ಡಿಸ್ಟಾರ್ಟಡ್ ರೂಟ್ಸ್ ವೈಲ್ಟಿಂಗ್ ಡ್ಯೂರಿಂಗ್ ಹಾಟ್ ಡೇಸ್.",
    "treatment": "ಲೈಮ್ ಸಾಯಿಲ್ ಟು ರೈಸ್ ಪ್ಹ್ &gt; ೭.೨; ಲಾಂಗ್ ಕ್ರಾಪ್ ರೊಟೇಷನ್ಸ್."
  },
  {
    "name": "ಬ್ಲಾಕ್ ರೊಟ್",
    "crop": "ಕಬ್ಬಗೆ",
    "symptoms": "ವಿ-ಶೇಪ್ಡ್ ಯಲ್ಲೋ ಲೇಸಿಒನ್ಸ್ ಆನ್ ಲೀಫ್ ಮರ್ಗಿನ್ಸ್ ವಿಥ್ ದಾರಿಕೆನ್ಡ್ ವೆಯ್ನ್ಸ್.",
    "treatment": "ಉಷೆ ಡಿಸೀಸ್-ಫ್ರೀ ಸೀಡ್; ಕಾಪರ್ ಸ್ಪ್ರೇಸ್."
  },
  {
    "name": "ಅಲ್ಟ್ನರಿಆ ಲೀಫ್ ಸ್ಪಾಟ್",
    "crop": "ಕಬ್ಬಗೆ",
    "symptoms": "ಡಾರ್ಕ್ ಟಾರ್ಗೆಟ್-ಲೈಕ್ ಸ್ಪೋಟ್ಸ್ ವಿಥ್ ಯಲ್ಲೋ ಹ್ಯಾಲೋಸ್.",
    "treatment": "ಸೀಡ್ ಟ್ರೀಟ್ಮೆಂಟ್; ಫೋಲಿಯಾರ್ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ಆನಿಯನ್ ಸಮುತ್",
    "crop": "ಆನಿಯನ್",
    "symptoms": "ಬ್ಲಾಕ್ ಸೂಟಿ ಸ್ಟ್ರೆಕ್ಸ್ ಆನ್ ಕೋಟಿಲೆದೊನ್ಸ್ ಅಂಡ್ ಯಂಗ್ ಲೇಅವೇಸ್.",
    "treatment": "ಸೀಡ್ ಟ್ರೆಅಟ್ಮೆಂಟ್ಸ್; ರೋಟತೆ ಔಟ್ ಆ ಅಲ್ಲಿಮ್ಸ್."
  },
  {
    "name": "ಪರ್ಪಲ್ ಬ್ಲಾತ್ಚ್",
    "crop": "ಆನಿಯನ್",
    "symptoms": "ವಾಟರ್-ಸೂಕೆಡ್ ಲೇಸಿಒನ್ಸ್ ಥಟ್ ಟರ್ನ್ ಪರ್ಪಲ್ ವಿಥ್ ಆ ಯಲ್ಲೋ ಹಾಲೋ.",
    "treatment": "ರೆಡ್ಯೂಸ್ ಲೀಫ್ ವೆಟ್ನ್ಸ್; ಅಪ್ಲೈ ಪ್ರೊಟೆಕ್ಟಿವ್ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ಬೋತ್ರ್ಯ್ಟಿಸ್ ಬಲೈಟ್ (ಗ್ರೇ ಮೊಲ್ಡ್)",
    "crop": "ಆನಿಯನ್ ಸ್ಟ್ರಾಬೆರಿ",
    "symptoms": "ಫ್ಯೂಜ್ಜ್ಯ್ ಗ್ರೆಯ್ ಮೊಲ್ಡ್ ಆನ್ ಫ್ರೂಟ್ ಲೇತ್ವ್ಸ್ ಓರ್ ಬಲ್ಬಸ್ ಇನ್ ಹೂಮಿಡ್ ಕಂಡಿಷನ್ಸ್.",
    "treatment": "ಇಂಪ್ರೂವ್ ಏರ್ ಸರ್ಕ್ಯುಲೇಶನ್; ಪ್ರೊಟೆಕ್ಟಿವ್ ಫುಣ್ಗಿಸಿದೆ ಸ್ಪ್ರೇಸ್."
  },
  {
    "name": "ಸ್ಟ್ರಾಬೆರಿ ಲೀಫ್ ಸ್ಪಾಟ್",
    "crop": "ಸ್ಟ್ರಾಬೆರಿ",
    "symptoms": "ಸ್ಮಾಲ್ ಪರ್ಪಲ್ ಸ್ಪೋಟ್ಸ್ ಡೆವಲಪಿಂಗ್ ವೈಟ್/ಗ್ರೇಯ್ ಸೆಂಟರ್ಸ್.",
    "treatment": "ರೇಂವ್ ಇಂಫೆಕ್ಟ್ದ್ ಡೆಬ್ರಿಸ್; ಕಾಪರ್-ಬೇಸ್ಡ್ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ಪೊಟಾಟೋ ಸಿಸ್ಟ್ ನೆಮಟೋಡ್",
    "crop": "ಪೊಟಾಟೋ",
    "symptoms": "ಸ್ಟುನ್ಟ್ದ್ ಗ್ರೋಥ್ ಎಲಲೊವಿಂಗ್ ಟಿನಿ ಸೈಸ್ಟ್ಸ್ ಆನ್ ರೂಟ್ಸ್.",
    "treatment": "ಕ್ರಾಪ್ ರೊಟೇಷನ್ ಔಟ್ ಆ ಸೋಲನಸ್ನಔಸ್ ಪ್ಲಾಂಟ್ಸ್; ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್."
  },
  {
    "name": "ಪೊಟಾಟೋ ವೈರಸ್ ವೈ",
    "crop": "ಪೊಟಾಟೋ",
    "symptoms": "ಮೊಸಾಯಿಕ್ ಮೊಟ್ಟಲಿಂಗ್ ನೆಕ್ರೋಸಿಸ್ ಅಂಡ್ ಸ್ಟುನ್ಟಿಂಗ್.",
    "treatment": "ಉಷೆ ಸರ್ಟಿಫೈಡ್ ಡಿಸೀಸ್-ಫ್ರೀ ಸೀಡ್ ಪೊಟ್ಯಾಟೋಸ್; ಆಫಿಡ್ ಕಂಟ್ರೋಲ್."
  },
  {
    "name": "ಕೆರ್ಕೋಸ್ಪೊರ ಲೀಫ್ ಸ್ಪಾಟ್",
    "crop": "ಶುಗರ್ ಬೀಟ್",
    "symptoms": "ಸ್ಮಾಲ್ ಸರ್ಕ್ಯುಲರ್ ಸ್ಪೋಟ್ಸ್ ವಿಥ್ ಅಷ-ಗ್ರೆಯ್ ಸೆಂಟರ್ಸ್ ಅಂಡ್ ಪರ್ಪಲ್ ಬಾರ್ಡರ್ಸ್.",
    "treatment": "ಕ್ರಾಪ್ ರೊಟೇಷನ್; ಫೋಲಿಯಾರ್ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ಕಲಿ ಟಾಪ್ ವೈರಸ್",
    "crop": "ಶುಗರ್ ಬೀಟ್ ಟೊಮೇಟೊ",
    "symptoms": "ಕಳೆದ್ ಎಲ್ಲೋಎಡ್ ಲೇಅವೇಸ್ ಅಂಡ್ ಸ್ಟುನ್ಟ್ದ್ ಗ್ರೋಥ್.",
    "treatment": "ಕಂಟ್ರೋಲ್ ಲೇಅಫ್ಹೊಪ್ಪೆರ್ಸ್; ಪ್ಲಾಂಟ್ ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್."
  },
  {
    "name": "ಆಸ್ಟರ್ ಎಲ್ಲೋಸ್",
    "crop": "ಕ್ಯಾರಟ್ ಲೆಟ್ಟೂಸ್",
    "symptoms": "ಎಲಲೊವಿಂಗ್ ಸ್ಟುನ್ಟಿಂಗ್ ಅಂಡ್ ಅಬ್ನಾರ್ಮಲ್ ಬುಷ್ಯ್ ಗ್ರೋಥ್.",
    "treatment": "ಕಂಟ್ರೋಲ್ ಲೇಅಫ್ಹೊಪ್ಪೆರ್ಸ್; ರೇಂವ್ ಇಂಫೆಕ್ಟ್ದ್ ಪ್ಲಾಂಟ್ಸ್."
  },
  {
    "name": "ಕ್ಯಾರಟ್ ಬಲೈಟ್",
    "crop": "ಕ್ಯಾರಟ್",
    "symptoms": "ಬ್ರೌನ್/ಬ್ಲಾಕ್ ಸ್ಪೋಟ್ಸ್ ಆನ್ ಫೋಲಿಯಾಗೆ ಲೀಡಿಂಗ್ ಟು ಲೀಫ್ ಡೆತ್.",
    "treatment": "ಫುಣ್ಗಿಸಿದೆಸ್; ವೈಡ್ ಕ್ರಾಪ್ ರೊಟೇಷನ್."
  },
  {
    "name": "ಲೆಟ್ಟೂಸ್ ಡ್ರಾಪ್",
    "crop": "ಲೆಟ್ಟೂಸ್",
    "symptoms": "ಸಡನ್ ವೈಲ್ಟಿಂಗ್ ಅಂಡ್ ಕಾಲಾಪ್ಸ್; ವೈಟ್ ಮೊಲ್ಡ್ ನಿಯರ್ ಸಾಯಿಲ್.",
    "treatment": "ಅವಾಯ್ಡ್ ಎಸ್ಸ್ಸ್ಸ್ ಮೊಇಸ್ಟುರೆ; ಡೀಪ್ ಫ್ಲೋವಿಂಗ್."
  },
  {
    "name": "ಬಸಿಟೇರಿಯಲ್ ವಿಲ್ಟ್",
    "crop": "ಕ್ಯುಕಂಬೆರ್ ಮೆಳೊನ್",
    "symptoms": "ಸಡನ್ ಸೇವೆರೆ ವೈಲ್ಟಿಂಗ್ ಆ ವಿನೆಸ್ ಸ್ಟಿಕಿ ಸಪ ಇನ್ಸೈಡ್ ಸ್ಟೆಮ್ಸ್.",
    "treatment": "ಕಂಟ್ರೋಲ್ ಕ್ಯುಕಂಬೆರ್ ಬೀಟ್ಲ್ಸ್; ರೇಂವ್ ಇಂಫೆಕ್ಟ್ದ್ ಪ್ಲಾಂಟ್ಸ್."
  },
  {
    "name": "ಗುಮ್ಮಿ ಸ್ತೆಂ ಬಲೈಟ್",
    "crop": "ವಾಟೆರ್ಮೆಲೋನ್",
    "symptoms": "ಬ್ರೌನ್ ಲೇಸಿಒನ್ಸ್ ಆನ್ ಸ್ಟೆಮ್ಸ್ ಎಸ್ಸ್ಡಿಂಗ್ ಗುಮ್ಮಿ ಸಪ.",
    "treatment": "ಫುಣ್ಗಿಸಿದೆಸ್; ಕ್ರಾಪ್ ರೊಟೇಷನ್."
  },
  {
    "name": "ಸ್ಕಲೆರೋಟಿನಿಯಾ ಸ್ತೆಂ ರೊಟ್",
    "crop": "ಕ್ಯಾನೋಲ",
    "symptoms": "ಬ್ಲೇಚ್ಎಡ್ ಸ್ಟೆಮ್ಸ್ ವಿಥ್ ಹಾರ್ಡ್ ಬ್ಲಾಕ್ ಸ್ಕಲೆರೋಟಿಯ ಇನ್ಸೈಡ್.",
    "treatment": "ಫುಣ್ಗಿಸಿದೆಸ್ ಅಟ್ ಫ್ಲವರಿಂಗ್; ರೋಟತೆ ವಿಥ್ ನೋನ್-ಹೊಸ್ಟ್ಸ್."
  },
  {
    "name": "ಬ್ಲಾಕ್ಕ್ಲೆಗ್",
    "crop": "ಕ್ಯಾನೋಲ",
    "symptoms": "ಗ್ರೇಯ್/ವೈಟ್ ಲೇಸಿಒನ್ಸ್ ವಿಥ್ ಬ್ಲಾಕ್ ಡಾಟ್ಸ್ ಆನ್ ಲೇತ್ವ್ಸ್ ಅಂಡ್ ಸ್ಟೆಮ್ಸ್.",
    "treatment": "ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್; ಸ್ಟುಬ್ಬಳೇ ಮ್ಯಾನೇಜ್ಮೆಂಟ್."
  },
  {
    "name": "ಟೇಕ್-ಎಲ್ಲ",
    "crop": "ವೀಟ್",
    "symptoms": "ಸ್ಟುನ್ಟ್ದ್ ಪ್ಲಾಂಟ್ಸ್ ವೈಟ್ ಡೆಡ್ ಹೆಡ್ಸ್ ಬ್ಲಾಕ್ ರೂಟ್ಸ್.",
    "treatment": "ಕ್ರಾಪ್ ರೊಟೇಷನ್; ಇಂಪ್ರೂವ್ ಸಾಯಿಲ್ ಡ್ರೈನಗೆ ಅಂಡ್ ಫರ್ಟಿಲಿಟಿ."
  },
  {
    "name": "ಬಾರ್ಲಿ ಯಲ್ಲೋ ಡ್ವಾರ್ಫ್ ವೈರಸ್",
    "crop": "ಬಾರ್ಲಿ ಓಟ್ಸ್",
    "symptoms": "ಸ್ಟುನ್ಟ್ದ್ ಗ್ರೋಥ್ ವಿಥ್ ಯಲ್ಲೋ ಓರ್ ರೆಡ್ ಲೀಫ್ ಟಿಪ್ಸ್.",
    "treatment": "ಕಂಟ್ರೋಲ್ ಅಫಿಡ್ಸ್; ಪ್ಲಾಂಟ್ ತೊಲೆರಾಂತ್ ವರಿಎಟಿಎಸ್."
  },
  {
    "name": "ಅರ್ಗಟ್",
    "crop": "ರೈ ವೀಟ್",
    "symptoms": "ಹಾರ್ಡ್ ಡಾರ್ಕ್ ಪರ್ಪಲ್/ಬ್ಲಾಕ್ ಸ್ಕಲೆರೋಟಿಯ ರಿಪ್ಲೇಸನ್ಗ್ ಗ್ರೇನ್ ಕೆರ್ನಿಲ್ಸ್.",
    "treatment": "ಕ್ಲೀನ್ ಸೀಡ್; ಕ್ರಾಪ್ ರೊಟೇಷನ್; ಡೀಪ್ ಫ್ಲೋವಿಂಗ್."
  },
  {
    "name": "ಆಲ್ಫಾಲ್ಫಾ ವೀವಿಲ್ ಡ್ಯಾಮೇಜ್",
    "crop": "ಆಲ್ಫಾಲ್ಫಾ",
    "symptoms": "ಸ್ಕೆಲೆಟೊನೈಜ್ಡ್ ಲೇಅವೇಸ್ ಸೇವೆರೆ ಡೆಫೋಲಿಯೇಷನ್.",
    "treatment": "ಅರ್ಲಿ ಹಾರ್ವೆಸ್ಟ್; ಇನ್ಸೆಕ್ಟಿಸಿದೆ ಅಪ್ಲಿಕೇಶನ್ ಇಫ್ ಸೇವೆರೆ."
  },
  {
    "name": "ಫಿಟೊಪ್ಹ್ಥೋರ ರೂಟ್ ರೊಟ್",
    "crop": "ಆಲ್ಫಾಲ್ಫಾ",
    "symptoms": "ಸ್ಟುನ್ಟ್ದ್ ಯಲ್ಲೋ ಪ್ಲಾಂಟ್ಸ್; ಡಾರ್ಕ್ ರೊಟ್ಟೆಡ್ ತಾಪ್ರೂಟ್ಸ್.",
    "treatment": "ಪ್ಲಾಂಟ್ ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್; ಇಂಪ್ರೂವ್ ಸಾಯಿಲ್ ಡ್ರೈನೇಜ್."
  },
  {
    "name": "ಕ್ರೌನ್ ಗಾಲ್",
    "crop": "ಗ್ರೇಪ್ ಸ್ಟೋನ್ ಫ್ರುಇಟ್ಸ್",
    "symptoms": "ಲಾರ್ಜ್ ಟ್ಯೂಮೊರಿ-ಲೈಕ್ ಗಲ್ಸ್ ಆನ್ ರೂಟ್ಸ್ ಓರ್ ಲೋಯರ್ ಸ್ಟೆಮ್ಸ್.",
    "treatment": "ಪ್ಲಾಂಟ್ ಡಿಸೀಸ್-ಫ್ರೀ ಸ್ಟಾಕ್; ಅವಾಯ್ಡ್ ಸ್ತೆಂ ಇಂಜ್ಯೂರಿಸ್."
  },
  {
    "name": "ಪಿಯರ್ಸ್'ಸ್ ಡಿಸೀಸ್",
    "crop": "ಗ್ರೇಪ್",
    "symptoms": "ಲೀಫ್ ಮರ್ಗಿನ್ಸ್ ಟರ್ನ್ ಯಲ್ಲೋ/ರೆಡ್ ಅಂಡ್ ಡ್ರೈ ಅಪ್.",
    "treatment": "ಕಂಟ್ರೋಲ್ ಷಾರ್ಪ್ಶೂಟರ್ ವೆಕ್ಟರ್ಸ್; ರೇಂವ್ ಇಂಫೆಕ್ಟ್ದ್ ವಿನೆಸ್."
  },
  {
    "name": "ಆಲಿವ್ ಕ್ನೋಟ್",
    "crop": "ಆಲಿವ್",
    "symptoms": "ರಫ್ ಗಲ್ಸ್ ಆನ್ ಟ್ವಿಗ್ಸ್ ಬ್ರಾಂಚೆಸ್ ಅಂಡ್ ಟ್ರನ್ಕ್ಸ್.",
    "treatment": "ಪೃನೆ ಡ್ಯೂರಿಂಗ್ ಡ್ರೈ ವೀಥಿರ್; ಕಾಪರ್ ಸ್ಪ್ರೇಸ್."
  },
  {
    "name": "ಪೆಕನ್ ಸ್ಕ್ಯಾಬ್",
    "crop": "ಪೆಕನ್",
    "symptoms": "ಸ್ಮಾಲ್ ಬ್ಲಾಕ್ ಸ್ಪೋಟ್ಸ್ ಆನ್ ಲೇತ್ವ್ಸ್ ಅಂಡ್ ಹುಶ್ಕ್ಸ್.",
    "treatment": "ಫ್ರೆಕ್ಯುನ್ಟ್ ಫುಣ್ಗಿಸಿದೆ ಅಪ್ಪ್ಲಿಕೆಶನ್ಸ್."
  },
  {
    "name": "ಚೆಸ್ಟ್ನಟ್ ಬಲೈಟ್",
    "crop": "ಚೆಸ್ಟ್ನಟ್",
    "symptoms": "ಸುಂಕೇನ ಕ್ಯಾಂಕ್ರ್ಸ್ ಆನ್ ಬರ್ಕ್ ಚೌಸಿಂಗ್ ಡೀಬ್ಯಾಕ್ ಅಬೊವೆ.",
    "treatment": "ಉಷೆ ರೆಸಿಸ್ಟನ್ಟ್ ಹೈಬ್ರಿಡ್ಸ್; ಹೈಪೋವಿರುಲೆನ್ಸ್ ಟ್ರೀಟ್ಮೆಂಟ್."
  },
  {
    "name": "ಡಚ್ ಎಲ್ಮ್ ಡಿಸೀಸ್",
    "crop": "ಎಲ್ಮ್",
    "symptoms": "ವೈಲ್ಟಿಂಗ್ ಎಲಲೊವಿಂಗ್ ಲೇತ್ವ್ಸ್ ಇನ್ ದಿ ಕ್ಯಾನೋಪಿ; ಬ್ರೌನ್ ಸ್ಟ್ರೆಕ್ಸ್ ಇನ್ ವುಡ್.",
    "treatment": "ಕಂಟ್ರೋಲ್ ಎಲ್ಮ್ ಬರ್ಕ್ ಬೀಟ್ಲ್ಸ್; ಇಂಜೆಕ್ಟ್ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ಓಕ್ ವಿಲ್ಟ್",
    "crop": "ಓಕ್",
    "symptoms": "ಲೇತ್ವ್ಸ್ ಟರ್ನ್ ಬ್ರೊನ್ಜ್/ಬ್ರೌನ್ ಫ್ರಮ್ ಎಡ್ಗೆಸ್ ಇನ್ವರ್ಡ್ ಅಂಡ್ ಡ್ರಾಪ್ ರಫಿಡ್ಲಯ್.",
    "treatment": "ಅವಾಯ್ಡ್ ಪೃನಿಂಗ್ ಇನ್ ಸ್ಪ್ರಿಂಗ್; ಟ್ರೆಂಚಿಂಗ್ ಟು ಬ್ರೇಕ್ ರೂಟ್ ಗ್ರಾಫ್ಟ್ಸ್."
  },
  {
    "name": "ಪೀನೇ ವಿಲ್ಟ್",
    "crop": "ಪೀನೇ",
    "symptoms": "ನೀಡಲೇಸ್ ಟರ್ನ್ ಗ್ರೆಯ್-ಗ್ರೀನ್ ಥೇನ್ ಬ್ರೌನ್; ರಾಪಿಡ್ ಟ್ರೀ ಡೆತ್.",
    "treatment": "ರೇಂವ್ ಅಂಡ್ ಡೆಸ್ಟ್ರಾಯ್ ಇಂಫೆಕ್ಟ್ದ್ ಟ್ರೀಸ್; ಕಂಟ್ರೋಲ್ ಸಾಯರ್ ಬೀಟ್ಲ್ಸ್."
  },
  {
    "name": "ಡಿಪ್ಲೋಡಿಯಾ ಟಿಪ್ ಬಲೈಟ್",
    "crop": "ಪೀನೇ",
    "symptoms": "ಸ್ಟುನ್ಟ್ದ್ ಬ್ರೌನ್ ನೀಡಲೇಸ್ ಅಟ್ ಬ್ರಾಂಚ್ ಟಿಪ್ಸ್; ರೆಸಿನ್ ಡ್ರಾಪ್ಲ್ಟ್ಸ್.",
    "treatment": "ಫುಣ್ಗಿಸಿದೆ ಸ್ಪ್ರೇಸ್ ಡ್ಯೂರಿಂಗ್ ಬಡ್ ಬ್ರೇಕ್."
  },
  {
    "name": "ರೋಜ್ ರೊಸೆಟ್ಟೆ ಡಿಸೀಸ್",
    "crop": "ರೋಜ್",
    "symptoms": "ಎಸ್ಸ್ಸ್ಸಿವೆ ಥಾರ್ನ್ಸ್ ರೆಡ್ ಡಿಸ್ಟಾರ್ಟಡ್ ಗ್ರೋಥ್ (ವಿಟಿಕ್ಸ್' ಬ್ರೂಮ್).",
    "treatment": "ರೇಂವ್ ಅಂಡ್ ಡೆಸ್ಟ್ರಾಯ್ ಇಂಫೆಕ್ಟ್ದ್ ಪ್ಲಾಂಟ್ಸ್ ಎಂತಿರೇಲಿ."
  },
  {
    "name": "ಬೊಸ್ವುಡ್ ಬಲೈಟ್",
    "crop": "ಬೊಸ್ವುಡ್",
    "symptoms": "ಡಾರ್ಕ್ ಲೀಫ್ ಸ್ಪೋಟ್ಸ್ ರಾಪಿಡ್ ಡೆಫೋಲಿಯೇಷನ್ ಬ್ಲಾಕ್ ಸ್ಟ್ರೆಕ್ಸ್ ಆನ್ ಸ್ಟೆಮ್ಸ್.",
    "treatment": "ಸ್ಟ್ರಿಕ್ಟ್ ಸ್ಯಾನಿಟೇಷನ್; ಪ್ರೆವೆಂಟಿವ್ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ಡೇಲಿಲಿ ರೂಸ್ಟ್",
    "crop": "ಡೇಲಿಲಿ",
    "symptoms": "ಯಲ್ಲೋ-ಆರೆಂಜ್ ಸ್ಟ್ರೆಕ್ಸ್ ಅಂಡ್ ಪುಸ್ತುಲೆಸ್ ಆನ್ ಲೇತ್ವ್ಸ್.",
    "treatment": "ರೇಂವ್ ಇಂಫೆಕ್ಟ್ದ್ ಲೇಅವೇಸ್; ಅಪ್ಲೈ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ಇಂಪೆಟಿಎನ್ಸ್ ನೆಕ್ರೋಟಿಕ್ ಸ್ಪಾಟ್ ವೈರಸ್",
    "crop": "ವರಿಯೋಸ್ಸ್ ಒರ್ನಮೆಂಟಲ್ಸ್",
    "symptoms": "ಬ್ರೌನ್/ಬ್ಲಾಕ್ ಸ್ಪೋಟ್ಸ್ ರಿಂಗ್ಸ್ ಓರ್ ಲೈನ್ ಪಟ್ಟೇರ್ನ್ಸ್ ಆನ್ ಲೇಅವೇಸ್.",
    "treatment": "ಕಂಟ್ರೋಲ್ ಥ್ರಿಪ್ಸ್; ಡೆಸ್ಟ್ರಾಯ್ ಇಂಫೆಕ್ಟ್ದ್ ಪ್ಲಾಂಟ್ಸ್."
  },
  {
    "name": "ತಂಬಾಕು ಮೊಸಾಯಿಕ್ ವೈರಸ್",
    "crop": "ತಂಬಾಕು ಟೊಮೇಟೊ",
    "symptoms": "ಮೊಟ್ಟೆಲ್ಡ್ ಲೈಟ್ ಅಂಡ್ ಡಾರ್ಕ್ ಗ್ರೀನ್ ಲೇಅವೇಸ್ ಸ್ಟುನ್ಟಿಂಗ್.",
    "treatment": "ಸ್ಟ್ರಿಕ್ಟ್ ಸ್ಯಾನಿಟೇಷನ್; ಅವಾಯ್ಡ್ ಸ್ಮೋಕಿಂಗ್ ನಿಯರ್ ಪ್ಲಾಂಟ್ಸ್."
  },
  {
    "name": "ಕಾಟನ್ ಲೀಫ್ ಕಲ್ ವೈರಸ್",
    "crop": "ಕಾಟನ್",
    "symptoms": "ಉಪವಾರ್ಡ್ ಓರ್ ಡೌನ್ವಾರ್ಡ್ ಲೀಫ್ ಕರ್ಲಿಂಗ್ ವೆವ್ಲ್ಲೆಂ ವೆಯ್ನ್ಸ್.",
    "treatment": "ಪ್ಲಾಂಟ್ ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್; ಕಂಟ್ರೋಲ್ ವಿಟ್ಫ್ಲಿಸ್."
  },
  {
    "name": "ಬಾಲ್ ರೊಟ್",
    "crop": "ಕಾಟನ್",
    "symptoms": "ರೊಟ್ಟಿಂಗ್ ಬಾಲ್ಸ್ ಕೋವೆರೆಡ್ ವಿಥ್ ಫಂಗಲ್ ಗ್ರೋಥ್.",
    "treatment": "ವಿದ್ರ್ ಪ್ಲಾಂಟ್ ಸ್ಪೇಸಿಂಗ್; ಡೆಫೋಲಿಯೇಟ್ ಬಾಟಮ್ ಲೇತ್ವ್ಸ್."
  },
  {
    "name": "ಸುಗರಚನೆ ಮೊಸಾಯಿಕ್ ವೈರಸ್",
    "crop": "ಸುಗರಚನೆ",
    "symptoms": "ಮೊಟ್ಟೆಲ್ಡ್ ಲೇಅವೇಸ್ ವಿಥ್ ಯಲ್ಲೋ ಅಂಡ್ ಗ್ರೀನ್ ಸ್ಟ್ರೆಕ್ಸ್.",
    "treatment": "ಉಷೆ ಡಿಸೀಸ್-ಫ್ರೀ ಸೆಟ್ಸ್; ಪ್ಲಾಂಟ್ ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್."
  },
  {
    "name": "ಚಸ್ಸವ ಮೊಸಾಯಿಕ್ ಡಿಸೀಸ್",
    "crop": "ಚಸ್ಸವ",
    "symptoms": "ಸೇವೆರೆ ಲೀಫ್ ಡಿಸ್ಟೋರ್ಟಿವ್ನ್ ಅಂಡ್ ಯಲ್ಲೋ ಮೊಟ್ಟಲಿಂಗ್.",
    "treatment": "ಉಷೆ ಸರ್ಟಿಫೈಡ್ ಕ್ಲೀನ್ ಪ್ಲಾಂಟಿಂಗ್ ಮೆಟೀರಿಯಲ್."
  },
  {
    "name": "ಸ್ವೀಟ್ ಪೊಟಾಟೋ ವೀವಿಲ್ ಡ್ಯಾಮೇಜ್",
    "crop": "ಸ್ವೀಟ್ ಪೊಟಾಟೋ",
    "symptoms": "ಪಂಕ್ಟುರ್ಡ್ ವಿನೆಸ್; ಲಾರ್ವಏ ಟನಲ್ ಇಂಟು ರೂಟ್ಸ್ ಚೌಸಿಂಗ್ ರೊಟ್.",
    "treatment": "ಕ್ರಾಪ್ ರೊಟೇಷನ್; ಫೆರೊಮೋನ್ ಟ್ರಾಪ್ಸ್."
  },
  {
    "name": "ಟ್ಯಾರೊ ಲೀಫ್ ಬಲೈಟ್",
    "crop": "ಟ್ಯಾರೊ",
    "symptoms": "ಲಾರ್ಜ್ ಬ್ರೌನ್ ವಾಟರ್-ಸೂಕೆಡ್ ಲೀಫ್ ಸ್ಪೋಟ್ಸ್ ವಿಥ್ ಯಲ್ಲೋ ಹಾಲೋಸ್.",
    "treatment": "ಫುಣ್ಗಿಸಿದೆಸ್; ರೇಂವ್ ಇಂಫೆಕ್ಟ್ದ್ ಲೇಅವೇಸ್."
  },
  {
    "name": "ಯಂ ಮೊಸಾಯಿಕ್ ವೈರಸ್",
    "crop": "ಯಂ",
    "symptoms": "ಛ್ಲೊರೋಟಿಕ್ ಮೊಟ್ಟಲಿಂಗ್ ಅಂಡ್ ಸ್ಟುನ್ಟಿಂಗ್ ಆ ಪ್ಲಾಂಟ್ಸ್.",
    "treatment": "ಉಷೆ ವೈರಸ್-ಫ್ರೀ ಸೀಡ್ ಯಮ್ಸ್."
  },
  {
    "name": "ಪೆಅನುಟ್ ರೊಸೆಟ್ಟೆ ಡಿಸೀಸ್",
    "crop": "ಪೆಅನುಟ್",
    "symptoms": "ಸೇವೆರೆ ಸ್ಟುನ್ಟಿಂಗ್ ಎಲ್ಲೋಎಡ್ ಅಂಡ್ ಬುಂಚೆಡ್ ಲೇಅವೇಸ್.",
    "treatment": "ಅರ್ಲಿ ಪ್ಲಾಂಟಿಂಗ್; ಕಂಟ್ರೋಲ್ ಅಫಿಡ್ಸ್."
  },
  {
    "name": "ಸೂನ್ಫ್ಲವರ್ ರೂಸ್ಟ್",
    "crop": "ಸೂನ್ಫ್ಲವರ್",
    "symptoms": "ಸಿನ್ನಮೋನ್-ಬ್ರೌನ್ ಪುಸ್ತುಲೆಸ್ ಆನ್ ಲೇಅವೇಸ್.",
    "treatment": "ಪ್ಲಾಂಟ್ ರೆಸಿಸ್ಟನ್ಟ್ ಹೈಬ್ರಿಡ್ಸ್; ಫೋಲಿಯಾರ್ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ಸ್ಫಫ್ಲವರ್ ರೂಸ್ಟ್",
    "crop": "ಸ್ಫಫ್ಲವರ್",
    "symptoms": "ಆರೆಂಜ್ ಪುಸ್ತುಲೆಸ್ ಆನ್ ಕೋಟಿಲೆದೊನ್ಸ್ ಅಂಡ್ ಲೇಅವೇಸ್.",
    "treatment": "ಸೀಡ್ ಟ್ರೀಟ್ಮೆಂಟ್; ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್."
  },
  {
    "name": "ಪ್ಲಾಸ್ ವಿಲ್ಟ್",
    "crop": "ಪ್ಲಾಸ್",
    "symptoms": "ಎಲಲೊವಿಂಗ್ ವೈಲ್ಟಿಂಗ್ ಅಂಡ್ ಡೆತ್ ಆ ಪ್ಲಾಂಟ್ಸ್ ಅಟ್ ಎನಿ ಸ್ಟೇಜ್.",
    "treatment": "ಕ್ರಾಪ್ ರೊಟೇಷನ್; ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್."
  },
  {
    "name": "ಹೆಂಪ್ ಕ್ಯಾನ್ಕರ್",
    "crop": "ಹೆಂಪ್",
    "symptoms": "ವಾಟರ್-ಸೂಕೆಡ್ ಲೇಸಿಒನ್ಸ್ ಆನ್ ಸ್ಟೆಮ್ಸ್ ಲೀಡಿಂಗ್ ಟು ಬ್ರೇಕಗೆ.",
    "treatment": "ಇನ್ಕ್ರೀಜ್ ಪ್ಲಾಂಟ್ ಸ್ಪೇಸಿಂಗ್; ರೇಂವ್ ಇಂಫೆಕ್ಟ್ದ್ ಡೆಬ್ರಿಸ್."
  },
  {
    "name": "ಹಾಪ್ ಡೌನಿ ಮಿಲ್ಡ್ವ",
    "crop": "ಹೊಪ್ಸ್",
    "symptoms": "ಸ್ಟುನ್ಟ್ದ್ ಶೂಟ್ಸ್ ('ಸ್ಪೀಕ್ಸ್') ಬ್ಲಾಕ್ ಸ್ಪೋರ್ಸ್ ಆನ್ ಲೀಫ್ ಉಂಡೇರ್ಸಿಡೆಸ್.",
    "treatment": "ಸಿಸ್ಟೆಮಿಕ್ ಫುಣ್ಗಿಸಿದೆಸ್; ರೇಂವ್ ಬಾಸಲ್ ಗ್ರೋಥ್."
  },
  {
    "name": "ವೆನಿಲ್ಲಾ ರೂಟ್ ರೊಟ್",
    "crop": "ವೆನಿಲ್ಲಾ",
    "symptoms": "ಬ್ರೌನಿಂಗ್ ಅಂಡ್ ರೊಟ್ಟಿಂಗ್ ಆ ರೂಟ್ಸ್ ಪ್ಲಾಂಟ್ ವಿಲ್ಟ್ಸ್.",
    "treatment": "ಇಂಪ್ರೂವ್ ಡ್ರೈನೇಜ್; ಉಷೆ ಡಿಸೀಸ್-ಫ್ರೀ ಕಟ್ಟಿಂಗ್ಸ್."
  },
  {
    "name": "ಬ್ಲಾಕ್ ಪೆಪ್ಪರ್ ವಿಲ್ಟ್",
    "crop": "ಬ್ಲಾಕ್ ಪೆಪ್ಪರ್",
    "symptoms": "ರಾಪಿಡ್ ಎಲಲೊವಿಂಗ್ ಅಂಡ್ ಡ್ರಾಪ್ಪಿಂಗ್ ಆ ಲೇಅವೇಸ್; ರೂಟ್ ರೊಟ್.",
    "treatment": "ಫಿಟೋಸಾನಿಟರಿ ಮೆಸರ್ಸ್; ಕಾಪರ್ ಡ್ರೇನ್ಚಿಂಗ್."
  },
  {
    "name": "ಜಿಂಜರ್ ಸಾಫ್ಟ್ ರೊಟ್",
    "crop": "ಜಿಂಜರ್",
    "symptoms": "ಎಲಲೊವಿಂಗ್ ಲೇತ್ವ್ಸ್; ರ್ಹಿಝೋಮೆಸ್ ಬೇಕಷ್ಟೇ ಸಾಫ್ಟ್ ವಾಟೆರ್ಯ್ ಅಂಡ್ ಫೌಲ್-ಸ್ಮೆಲ್ಲಿಂಗ್.",
    "treatment": "ಸೀಡ್ ರ್ಹಿಝೋಮೆ ಟ್ರೀಟ್ಮೆಂಟ್; ರೈಸ್ಡ್ ಬೆಡ್ ಪ್ಲಾಂಟಿಂಗ್."
  },
  {
    "name": "ಟ್ಯುರ್ಮೆರಿಕ್ ಲೀಫ್ ಸ್ಪಾಟ್",
    "crop": "ಟ್ಯುರ್ಮೆರಿಕ್",
    "symptoms": "ಎಲಿಪ್ಟಿಕಲ್ ಸ್ಪೋಟ್ಸ್ ವಿಥ್ ಯಲ್ಲೋ ಹ್ಯಾಲೋಸ್.",
    "treatment": "ಫೋಲಿಯಾರ್ ಸ್ಪ್ರೇ ಆ ಬೋರ್ಡೆಕ್ಸ್ ಮಿಸ್ಟ್ರ್."
  },
  {
    "name": "ಕಾರ್ಡಮೋಮ್ ಮೊಸಾಯಿಕ್",
    "crop": "ಕಾರ್ಡಮೋಮ್",
    "symptoms": "ಪಾಲೇ ಗ್ರೀನ್ ಟು ಯಲ್ಲೋ ಮೊಟ್ಟಲಿಂಗ್ ಆನ್ ಲೇತ್ವ್ಸ್.",
    "treatment": "ಎರಡಿಕ್ಯಾತೆ ಇಂಫೆಕ್ಟ್ದ್ ಪ್ಲಾಂಟ್ಸ್; ಕಂಟ್ರೋಲ್ ಆಫಿಡ್ ವೆಕ್ಟರ್ಸ್."
  },
  {
    "name": "ಸಿಟ್ರಸ್ ಟ್ರಿಸ್ಟಝ ವೈರಸ್",
    "crop": "ಸಿಟ್ರಸ್",
    "symptoms": "ಕ್ವಿಕ್ ಡಿಕ್ಲೈನ್ ಸ್ತೆಂ ಫಿಟ್ಟಿಂಗ್ ಅಂಡ್ ಸೀಡಲಿಂಗ್ ಎಲ್ಲೋಸ್.",
    "treatment": "ಉಷೆ ತೊಲೆರಾಂತ್ ರೂಟ್ಸ್ಟಾಕ್ಸ್; ಕಂಟ್ರೋಲ್ ಆಫಿಡ್ ವೆಕ್ಟರ್ಸ್."
  },
  {
    "name": "ಸಿಟ್ರಸ್ ಮೆಲನೋಸೆ",
    "crop": "ಸಿಟ್ರಸ್",
    "symptoms": "ಸ್ಮಾಲ್ ರೈಸ್ಡ್ ರೆಡ್ಡಿಶ್-ಬ್ರೌನ್ ಪುಸ್ತುಲೆಸ್ ಆನ್ ಲೇತ್ವ್ಸ್ ಫ್ರೂಟ್ ಅಂಡ್ ಟ್ವಿಗ್ಸ್.",
    "treatment": "ಕಾಪರ್ ಸ್ಪ್ರೇಸ್ ಡ್ಯೂರಿಂಗ್ ಫ್ರೂಟ್ ಸೆಟ್."
  },
  {
    "name": "ಬಿಟರ್ ಪಿತ",
    "crop": "ಆಪಲ್",
    "symptoms": "ಸುಂಕೇನ ಡಾರ್ಕ್ ಸ್ಪೋಟ್ಸ್ ಆನ್ ಫ್ರೂಟ್ ಸ್ಕಿನ್ ಸ್ಪೊನ್ಗ್ಯ್ ಟಿಶ್ಯೂ ಉಂಡೆರ್ನ್ಥ್.",
    "treatment": "ಕ್ಯಾಲ್ಸಿಯಂ ಫೋಲಿಯಾರ್ ಸ್ಪ್ರೇಸ್; ಮೈನ್ಟೈನ್ ಈವನ್ ಸಾಯಿಲ್ ಮೊಇಸ್ಟುರೆ."
  },
  {
    "name": "ಸೂಟಿ ಬ್ಲಾತ್ಚ್ ಅಂಡ್ ಫ್ಲೈಸ್ಪೆಕ್",
    "crop": "ಆಪಲ್",
    "symptoms": "ಡಾರ್ಕ್ ಸ್ಮುಡ್ಗ್ಯ್ ಬ್ಲೆಮಿಶ್ಸ್ ಓರ್ ಗ್ರೂಪ್ಸ್ ಆ ಟಿನಿ ಬ್ಲಾಕ್ ಡಾಟ್ಸ್ ಆನ್ ಫ್ರೂಟ್ ಸರ್ಫೇಸ್.",
    "treatment": "ಪೃನೆ ಫಾರ್ ಬೆಟರ್ ಐರ್ಫ್ಲೌ; ಅಪ್ಲೈ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ಶಾಟ್ ಹೋಲ್ ಡಿಸೀಸ್",
    "crop": "ಪೀಚ್ ಆಪ್ರಿಕಾಟ್",
    "symptoms": "ಸ್ಮಾಲ್ ಬ್ರೌನ್ ಸ್ಪೋಟ್ಸ್ ಆನ್ ಲೇತ್ವ್ಸ್ ಥಟ್ ಡ್ರಾಪ್ ಔಟ್ ಲೀವಿಂಗ್ 'ಶಾಟ್ ಹೋಲ್ಸ'.",
    "treatment": "ದೋರ್ಮ್ಯಾಂತ್ ಕಾಪರ್ ಸ್ಪ್ರೇಸ್; ರೇಂವ್ ಇಂಫೆಕ್ಟ್ದ್ ವುಡ್."
  },
  {
    "name": "ಪ್ಲಮ್ ಪೋಸ್ ವೈರಸ್",
    "crop": "ಪ್ಲಮ್ ಪೀಚ್",
    "symptoms": "ಯಲ್ಲೋ ರಿಂಗ್ಸ್ ಆನ್ ಲೇತ್ವ್ಸ್ ಅಂಡ್ ಫ್ರೂಟ್ ಪ್ರೇಮಾತುರೇ ಫ್ರೂಟ್ ಡ್ರಾಪ್.",
    "treatment": "ಎರಡಿಕ್ಯಾತೆ ಇಂಫೆಕ್ಟ್ದ್ ಟ್ರೀಸ್; ಕಂಟ್ರೋಲ್ ಅಫಿಡ್ಸ್."
  },
  {
    "name": "ಬ್ಲಾಕ್ ರೊಟ್",
    "crop": "ಗ್ರೇಪ್",
    "symptoms": "ಬ್ರೌನ್ ಸರ್ಕ್ಯುಲರ್ ಲೇಸಿಒನ್ಸ್ ಆನ್ ಲೇತ್ವ್ಸ್; ಬೆರ್ರೀಸ್ ಶ್ರೀವೇಲ್ ಇಂಟು ಹಾರ್ಡ್ ಬ್ಲಾಕ್ ಮುಮ್ಮಿಸ್.",
    "treatment": "ಡೆಸ್ಟ್ರಾಯ್ ಮುಮ್ಮಿಸ್; ಅಪ್ಲೈ ಪ್ರೊಟೆಕ್ಟಿವ್ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ಬೋತ್ರ್ಯ್ಟಿಸ್ ಬಂಚ್ ರೊಟ್",
    "crop": "ಗ್ರೇಪ್",
    "symptoms": "ಗ್ರೇಯ್ ಫ್ಯೂಜ್ಜ್ಯ್ ಮೊಲ್ಡ್ ಕವರಿಂಗ್ ರಿಪೆನಿಂಗ್ ಗ್ರೇಪ್ ಕ್ಲ್ಯೂಸ್ಟರ್ಸ್.",
    "treatment": "ಲೀಫ್ ರಿಮೂವಲ್ ಅರೌಂಡ್ ಕ್ಲಕ್ಸ್ಟರ್ಸ್; ಸ್ಪೆಸಿಫಿಕ್ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ಸ್ಕ್ಯಾ",
    "crop": "ಗ್ರೇಪ್",
    "symptoms": "ಟೈಗರ್-ಸ್ಟ್ರಿಪ್ ಡಿಸ್ಕೋಳೋರೇಷನ್ ಆನ್ ಲೇತ್ವ್ಸ್; ಇಂಟರ್ನಲ್ ವುಡ್ ಡೆಕಾಯ್.",
    "treatment": "ಪೃನೆ ಇಂಫೆಕ್ಟ್ದ್ ವುಡ್ ಕ್ಯಾರೆಫ್ಯೂಲ್ಯ್; ಪ್ರೊಟೆಕ್ಟ್ ಪೃನಿಂಗ್ ವಉಂಡ್ಸ್."
  },
  {
    "name": "ರೆಡ್ ಸ್ಟೆಲೆ ರೂಟ್ ರೊಟ್",
    "crop": "ಸ್ಟ್ರಾಬೆರಿ",
    "symptoms": "ಸ್ಟುನ್ಟ್ದ್ ಪ್ಲಾಂಟ್ಸ್ ವೈಲ್ಟಿಂಗ್ ಇನ್ ವಾರ್ಮ್ ವೀಥಿರ್; ರೆಡ್ ಕೋರ್ ಇನ್ ರೂಟ್ಸ್.",
    "treatment": "ಇಂಪ್ರೂವ್ ಸಾಯಿಲ್ ಡ್ರೈನೇಜ್; ಉಷೆ ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್."
  },
  {
    "name": "ಅಂಗುಲರ್ ಲೀಫ್ ಸ್ಪಾಟ್",
    "crop": "ಸ್ಟ್ರಾಬೆರಿ ಕ್ಯುಕಂಬೆರ್",
    "symptoms": "ವಾಟರ್-ಸೂಕೆಡ್ ಅಂಗುಲರ್ ಸ್ಪೋಟ್ಸ್ ಲಿಮಿಟೆಡ್ ಬೈ ಲೀಫ್ ವೆಯ್ನ್ಸ್.",
    "treatment": "ಅವಾಯ್ಡ್ ಓವರ್ಹೆಡ್ ವಾಟರಿಂಗ್; ಕಾಪರ್-ಬೇಸ್ಡ್ ಸ್ಪ್ರೇಸ್."
  },
  {
    "name": "ಮಮ್ಮಿ ಬೆರಿ",
    "crop": "ಬ್ಲೂಬೆರ್ರಿ",
    "symptoms": "ಬೆರ್ರೀಸ್ ಟರ್ನ್ ಪಾಲೇ ಶ್ರೀವೇಲ್ ಅಂಡ್ ಹಾರ್ಡೆನ್ ಇಂಟು ವಿಟಿಸ್ ಮುಮ್ಮಿಸ್.",
    "treatment": "ರಾಕೇ ಅಂಡ್ ಡೆಸ್ಟ್ರಾಯ್ ಫಳ್ಳೆಂ ಮುಮ್ಮಿಸ್; ಅಪ್ಲೈ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ಕೇನ್ನ ಬಲೈಟ್",
    "crop": "ರಾಸ್ಪ್ಬೇರಿ",
    "symptoms": "ಡಾರ್ಕ್ ಬ್ರೌನ್/ಪರ್ಪಲ್ ಕ್ಯಾಂಕ್ರ್ಸ್ ಆನ್ ಸ್ಟೆಮ್ಸ್ ಚೌಸಿಂಗ್ ಡೀಬ್ಯಾಕ್.",
    "treatment": "ಪೃನೆ ಔಟ್ ಓಲ್ಡ್ ಫ್ರುಈಟಿಂಗ್ ಕ್ಯಾನೆಸ್ ಇಮ್ಮೆಡೈತೆಲಿ ಆಫ್ಟರ್ ಹಾರ್ವೆಸ್ಟ್."
  },
  {
    "name": "ಟೊಮೇಟೊ ಸ್ಪಾಟೆಡ್ ವಿಲ್ಟ್ ವೈರಸ್",
    "crop": "ಟೊಮೇಟೊ ಪೆಪ್ಪರ್ ಪೆಅನುಟ್",
    "symptoms": "ಡಾರ್ಕ್ ನೆಕ್ರೋಟಿಕ್ ಸ್ಪೋಟ್ಸ್ ರಿಂಗ್ ಪ್ಯಾಟರ್ನ್ಸ್ ಅಂಡ್ ಸೇವೆರೆ ಸ್ಟುನ್ಟಿಂಗ್.",
    "treatment": "ಕಂಟ್ರೋಲ್ ಥ್ರಿಪ್ಸ್; ಪ್ಲಾಂಟ್ ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್."
  },
  {
    "name": "ಟೊಮೇಟೊ ಲೀಫ್ ಮೊಲ್ಡ್",
    "crop": "ಟೊಮೇಟೊ",
    "symptoms": "ಪಾಲೇ ಗ್ರೀನ್ ಸ್ಪೋಟ್ಸ್ ಆನ್ ಅಪ್ಪರ್ ಲೇತ್ವ್ಸ್ ಆಲಿವ್-ಗ್ರೀನ್ ಫುಝ್ ಆನ್ ಉಂಡೇರ್ಸಿಡೆಸ್.",
    "treatment": "ಇನ್ಕ್ರೀಜ್ ಗ್ರೀನ್ಹೌಸ್ ವೆಂಟಿಲೇಷನ್; ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್."
  },
  {
    "name": "ಕಾರ್ಕಿ ರೂಟ್ ರೊಟ್",
    "crop": "ಟೊಮೇಟೊ",
    "symptoms": "ರೂಟ್ಸ್ ದೆವೆಲೋಪ್ ಬ್ರೌನ್ ಕಾರ್ಕಿ ವೆವ್ಲ್ಲೆಂ ಬ್ಯಾಂಡ್ಸ್; ಪ್ಲಾಂಟ್ಸ್ ವಿಲ್ಟ್.",
    "treatment": "ಸಾಯಿಲ್ ಸೋಲಾರಿಝಷನ್; ಕ್ರಾಪ್ ರೊಟೇಷನ್; ರೆಸಿಸ್ಟನ್ಟ್ ರೂಟ್ಸ್ಟಾಕ್ಸ್."
  },
  {
    "name": "ವಾಟೆರ್ಮೆಲೋನ್ ಮೊಸಾಯಿಕ್ ವೈರಸ್",
    "crop": "ಮೆಳೊನ್ ವಾಟೆರ್ಮೆಲೋನ್",
    "symptoms": "ಗ್ರೀನ್/ಯಲ್ಲೋ ಮೊಟ್ಟಲಿಂಗ್ ಅಂಡ್ ಡಿಸ್ಟೋರ್ಟಿವ್ನ್ ಆ ಲೇಅವೇಸ್; ಮಿಸ್ಹ್ಯಾಪೆನ್ ಫ್ರೂಟ್.",
    "treatment": "ಕಂಟ್ರೋಲ್ ಅಫಿಡ್ಸ್; ಉಷೆ ರೆಫ್ಲೆಕ್ಟಿವ್ ಮುಲ್ಕ್ಸ್."
  },
  {
    "name": "ಕಾಮನ್ ಬಸಿಟೇರಿಯಲ್ ಬಲೈಟ್",
    "crop": "ಬೀನ್ಸ್",
    "symptoms": "ಲಾರ್ಜ್ ಬ್ರೌನ್ ಇರ್ರೆಗುಲರ್ ನೆಕ್ರೋಟಿಕ್ ಸ್ಪೋಟ್ಸ್ ವಿಥ್ ಯಲ್ಲೋ ಹ್ಯಾಲೋಸ್.",
    "treatment": "ಉಷೆ ಸರ್ಟಿಫೈಡ್ ಡಿಸೀಸ್-ಫ್ರೀ ಸೀಡ್; ಅವಾಯ್ಡ್ ವರ್ಕಿಂಗ್ ಇನ್ ವೆಟ್ ಫೀಲ್ಡ್ಸ್."
  },
  {
    "name": "ಹಾಲೋ ಬಲೈಟ್",
    "crop": "ಬೀನ್ಸ್",
    "symptoms": "ಸ್ಮಾಲ್ ಬ್ರೌನ್ ಸ್ಪೋಟ್ಸ್ ಸುರರೊಉಂದೆಡ್ ಬೈ ಲಾರ್ಜ್ ಡಿಸ್ಟಿಂಕ್ಟ್ ಯಲ್ಲೋ ಹ್ಯಾಲೋಸ್.",
    "treatment": "ಕಾಪರ್-ಬೇಸ್ಡ್ ಬಾಸಿಟ್ರಿಸದೇಶ್; ಕ್ರಾಪ್ ರೊಟೇಷನ್."
  },
  {
    "name": "ಅರ್ಲಿ ಲೀಫ್ ಸ್ಪಾಟ್",
    "crop": "ಪೆಅನುಟ್",
    "symptoms": "ಬ್ರೌನ್ ಸರ್ಕ್ಯುಲರ್ ಸ್ಪೋಟ್ಸ್ ಸುರರೊಉಂದೆಡ್ ಬೈ ಯಲ್ಲೋ ಹ್ಯಾಲೋಸ್ ಆನ್ ಲೇತ್ವ್ಸ್.",
    "treatment": "ಫೋಲಿಯಾರ್ ಫುಣ್ಗಿಸಿದೆಸ್; ಕ್ರಾಪ್ ರೊಟೇಷನ್."
  },
  {
    "name": "ಟಾರ್ಗೆಟ್ ಸ್ಪಾಟ್",
    "crop": "ಕಾಟನ್ ಸೊಯಾಬೀನ್",
    "symptoms": "ಕಾಂಸೆಂಟ್ರಿಕ್ ರಿಂಗೇಡ್ ಲೇಸಿಒನ್ಸ್ ಆನ್ ಲೋಯರ್ ಕ್ಯಾನೋಪಿ ಲೇಅವೇಸ್ ಚೌಸಿಂಗ್ ಡೆಫೋಲಿಯೇಷನ್.",
    "treatment": "ಫುಣ್ಗಿಸಿದೆಸ್ ಟಾರ್ಗೆಟಿಂಗ್ ಲೋಯರ್ ಕ್ಯಾನೋಪಿ; ಮ್ಯಾನೇಜ್ ಕ್ಯಾನೋಪಿ ಡೆನ್ಸಿಟಿ."
  },
  {
    "name": "ಕಾಮನ್ ಸ್ಕ್ಯಾಬ್",
    "crop": "ಪೊಟಾಟೋ",
    "symptoms": "ರಫ್ ಕಾರ್ಕಿ ರೈಸ್ಡ್ ಓರ್ ಸುಂಕೇನ ಲೇಸಿಒನ್ಸ್ ಆನ್ ಟುಬೆರ್ಸ್.",
    "treatment": "ಕೀಪ್ ಸಾಯಿಲ್ ಪ್ಹ್ ಬಿಲೋ ೫.೨; ಮೈನ್ಟೈನ್ ಕಾನ್ಸಿಸ್ಟನ್ಟ್ ಸಾಯಿಲ್ ಮೊಇಸ್ಟುರೆ."
  },
  {
    "name": "ಸಿಲ್ವರ್ ಸ್ಕ್ಯೂರ್ಫ್",
    "crop": "ಪೊಟಾಟೋ",
    "symptoms": "ಸಿಲ್ವೆರ್ಯ್ ಪಾಟಿಕ್ಸ್ ಆನ್ ದಿ ಟ್ಯುಬೆರ್ ಸ್ಕಿನ್ ಚೌಸಿಂಗ್ ವಾಟರ್ ಲೋಸ್.",
    "treatment": "ಹಾರ್ವೆಸ್ಟ್ ಪ್ರಾಮ್ಪ್ಟ್ಲಿ; ಅಪ್ಲೈ ಪೋಸ್ಟ್-ಹಾರ್ವೆಸ್ಟ್ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ಪೊಟಾಟೋ ಬ್ಲಾಕ್ಕ್ಲೆಗ್",
    "crop": "ಪೊಟಾಟೋ",
    "symptoms": "ಇನ್ಕ್ಯ್ ಬ್ಲಾಕ್ ಸ್ಲೀಮ್ಯ್ ಡೆಕಾಯ್ ಆ ದಿ ಲೋಯರ್ ಸ್ತೆಂ; ಎಲಲೊವಿಂಗ್ ಲೇತ್ವ್ಸ್.",
    "treatment": "ಉಷೆ ಸರ್ಟಿಫೈಡ್ ಸೀಡ್; ಅವಾಯ್ಡ್ ಪ್ಲಾಂಟಿಂಗ್ ಇನ್ ಕೋಲ್ಡ್ ವೆಟ್ ಸಾಯಿಲ್."
  },
  {
    "name": "ಆವಕಾಡೊ ಸುಂಬ್ಲಾತ್ಚ್",
    "crop": "ಆವಕಾಡೊ",
    "symptoms": "ಯಲ್ಲೋ ಓರ್ ರೆಡ್ ಸ್ಟ್ರೆಯಾಕಿಂಗ್ ಆನ್ ಫ್ರೂಟ್ ಸ್ಟೆಮ್ಸ್ ಅಂಡ್ ಲೇತ್ವ್ಸ್; ಸ್ಟುನ್ಟ್ದ್ ಗ್ರೋಥ್.",
    "treatment": "ರೇಂವ್ ಇಂಫೆಕ್ಟ್ದ್ ಟ್ರೀಸ್; ಸ್ಟ್ರೀಕ್ಟ್ಲಿ ಉಷೆ ಇಂಡಿಸ್ಗ್ದ್ ಡಿಸೀಸ್-ಫ್ರೀ ಬುಡವೂಡ್."
  },
  {
    "name": "ಮ್ಯಾಂಗೋ ಬಸಿಟೇರಿಯಲ್ ಬ್ಲಾಕ್ ಸ್ಪಾಟ್",
    "crop": "ಮ್ಯಾಂಗೋ",
    "symptoms": "ರೈಸ್ಡ್ ಅಂಗುಲರ್ ಬ್ಲಾಕ್ ಸ್ಪೋಟ್ಸ್ ಆನ್ ಲೇತ್ವ್ಸ್ ಅಂಡ್ ಸ್ಟಾರ್-ಶೇಪ್ಡ್ ಕ್ರೇಕ್ಸ್ ಆನ್ ಫ್ರೂಟ್.",
    "treatment": "ವಿಂಡ್ಬ್ರೆಕ್ಸ್ ಟು ರೆಡ್ಯೂಸ್ ಸ್ಪ್ರೆಡ್; ಕಾಪರ್ ಸ್ಪ್ರೇಸ್."
  },
  {
    "name": "ಮ್ಯಾಂಗೋ ಮಲಫಾರ್ಮ್ಯಾಟಿವ್ನ್",
    "crop": "ಮ್ಯಾಂಗೋ",
    "symptoms": "ಅಬ್ನಾರ್ಮಲ್ ಕಾಂಪ್ಯಾಕ್ಟ್ ವೆಜೆಟೇಟಿವ್ ಓರ್ ಫ್ಲೋರಲ್ ಶೂಟ್ಸ್ ಥಟ್ ಡಾನ್'ತ್ ಸೆಟ್ ಫ್ರೂಟ್.",
    "treatment": "ಪೃನೆ ಮಲಫಾರ್ಮ್ಡ್ ಪಾನಿಕ್ಲ್ಸ್; ಅಪ್ಲೈ ಅಪ್ಪ್ರೊಪ್ರೈಟ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ಫಿನೇಯಪ್ಪಲೆ ಹಾರ್ಟ್ ರೊಟ್",
    "crop": "ಫಿನೇಯಪ್ಪಲೆ",
    "symptoms": "ಯಲ್ಲೋ-ರೆಡ್ ಲೇತ್ವ್ಸ್ ಎಸ್ಸಿಲಿ ಪುಳ್ಳೆದ್ ಫ್ರಮ್ ದಿ ಬೇಸ್; ಫೌಲ್-ಸ್ಮೆಲ್ಲಿಂಗ್ ರೊಟ್.",
    "treatment": "ಇಂಪ್ರೂವ್ ಡ್ರೈನೇಜ್; ಫುಣ್ಗಿಸಿಡಲ್ ಡಿಪ್ಸ್ ಫಾರ್ ಪ್ಲಾಂಟಿಂಗ್ ಮೆಟೀರಿಯಲ್."
  },
  {
    "name": "ಮೇಅಲಿಬುಗ್ ವಿಲ್ಟ್",
    "crop": "ಫಿನೇಯಪ್ಪಲೆ",
    "symptoms": "ರೆಡ್ಡೇನಿಂಗ್ ವೈಲ್ಟಿಂಗ್ ಅಂಡ್ ಡೀಬ್ಯಾಕ್ ಆ ಲೇತ್ವ್ಸ್.",
    "treatment": "ಕಂಟ್ರೋಲ್ ಅಂಟ್ಸ್ ಅಂಡ್ ಮೇಅಲಿಬುಗ್ಸ್; ಉಷೆ ಹೀಅಲ್ಥ್ಯ್ ಪ್ಲಾಂಟಿಂಗ್ ಮೆಟೀರಿಯಲ್."
  },
  {
    "name": "ಮೊಕೊ ಡಿಸೀಸ್",
    "crop": "ಬನಾನಾ",
    "symptoms": "ರಾಪಿಡ್ ವೈಲ್ಟಿಂಗ್ ಎಲಲೊವಿಂಗ್ ಆ ಇನ್ನರ್ ಲೇತ್ವ್ಸ್ ಇಂಟರ್ನಲ್ ಫ್ರೂಟ್ ರೊಟ್.",
    "treatment": "ಡಿಸಿಂಫೆಕ್ಟ್ ಟೂಲ್ಸ್; ಡೆಸ್ಟ್ರಾಯ್ ಇಂಫೆಕ್ಟ್ದ್ ಮಟ್ಸ್; ರೇಂವ್ ಮಳೆ ಬುಡ್ಸ್."
  },
  {
    "name": "ಬನಾನಾ ಬಂಚ್ಯ್ ಟಾಪ್ ವೈರಸ್",
    "crop": "ಬನಾನಾ",
    "symptoms": "ಲೇತ್ವ್ಸ್ ಾರೆ ನರೋ ಉಪಿರೈಟ್ ಬುಂಚೆಡ್ ಅಟ್ ದಿ ಟಾಪ್ ವಿಥ್ ಡಾರ್ಕ್ ಗ್ರೀನ್ ಸ್ಟ್ರೆಕ್ಸ್.",
    "treatment": "ಸ್ಟ್ರಿಕ್ಟ್ ಎರಡಿಕೇಷನ್ ಆ ಇಂಫೆಕ್ಟ್ದ್ ಪ್ಲಾಂಟ್ಸ್; ಕಂಟ್ರೋಲ್ ಬನಾನಾ ಅಫಿಡ್ಸ್."
  },
  {
    "name": "ಫ್ರಒಸ್ಟಿ ಪೋದ್ ರೊಟ್",
    "crop": "ಕೋಕೋ",
    "symptoms": "ಪೋಡ್ಸ್ ದೆವೆಲೋಪ್ ಇರ್ರೆಗುಲರ್ ಬ್ರೌನ್ ಲೇಸಿಒನ್ಸ್ ಕೋವೆರೆಡ್ ಇನ್ ಥಿಕ್ ವೈಟ್/ಗ್ರೆಯ್ ಸ್ಪೋರ್ಸ್.",
    "treatment": "ಫ್ರೆಕ್ಯುನ್ಟ್ ರಿಮೂವಲ್ ಆ ಡಿಸೀಜ್ಡ್ ಪೋಡ್ಸ್; ಸೇವೆರೆ ಪೃನಿಂಗ್."
  },
  {
    "name": "ಕೆರ್ಕೋಸ್ಪೊರ ಲೀಫ್ ಸ್ಪಾಟ್",
    "crop": "ಕಾಫಿ",
    "symptoms": "ಬ್ರೌನ್ ಸ್ಪೋಟ್ಸ್ ವಿಥ್ ಲೈಟ್ ಗ್ರೇಯ್ ಸೆಂಟರ್ಸ್ ('ಬ್ರೌನ್ ಎಯೇ ಸ್ಪಾಟ್').",
    "treatment": "ಪ್ರೊವಿಡೆ ಅದೇಕ್ವಾಟೆ ಶೇಡ್ ಅಂಡ್ ನ್ಯೂಟ್ರಿಷನ್; ಕಾಪರ್ ಸ್ಪ್ರೇಸ್."
  },
  {
    "name": "ಸೋರಘುಮ್ ಅರ್ಗಟ್",
    "crop": "ಸೋರಘುಮ್",
    "symptoms": "ಸ್ಟಿಕಿ ಪಿಂಕಿಶ್ 'ಹೊಣೆಯ್ಡ್ನವ' ಎಸ್ಸ್ಡಿಂಗ್ ಫ್ರಮ್ ಫ್ಲವರ್ ಸ್ಪೈಕೆಲೆಟ್ಸ್.",
    "treatment": "ಪ್ಲಾಂಟ್ ಹೈಬ್ರಿಡ್ಸ್ ಥಟ್ ಶೆಡ್ ಪೊಳ್ಳೆಂ ಅರ್ಲಿ ಅಂಡ್ ಅಬಂದಂಟ್ಲಿ."
  },
  {
    "name": "ಸೋರಘುಮ್ ಡೌನಿ ಮಿಲ್ಡ್ವ",
    "crop": "ಸೋರಘುಮ್ ಕಾರ್ನ್",
    "symptoms": "ಸಿಸ್ಟೆಮಿಕ್ ಪಳೆ ಯಲ್ಲೋ/ವೈಟ್ ಸ್ತ್ರಿಪಿಂಗ್; ವೈಟ್ ಡೌನಿ ಗ್ರೋಥ್ ಆನ್ ಉಂಡೇರ್ಸಿಡೆಸ್.",
    "treatment": "ಸೀಡ್ ಟ್ರೀಟ್ಮೆಂಟ್; ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್."
  },
  {
    "name": "ಅಸ್ಕಾಚ್ಯ್ಟ್ ಬಲೈಟ್",
    "crop": "ಚಿಕ್ಪ್ತ್ ಲೆಂಟಿಲ್",
    "symptoms": "ಸರ್ಕ್ಯುಲರ್ ಲೇಸಿಒನ್ಸ್ ವಿಥ್ ಡಾರ್ಕ್ ಮರ್ಗಿನ್ಸ್ ಅಂಡ್ ಟಿನಿ ಬ್ಲಾಕ್ ಡಾಟ್ಸ್ (ಪಿಕ್ನಿಡೈ).",
    "treatment": "ಫೋಲಿಯಾರ್ ಫುಣ್ಗಿಸಿದೆಸ್; ವೈಡ್ ಕ್ರಾಪ್ ರೊಟೇಷನ್."
  },
  {
    "name": "ಬಸಿಟೇರಿಯಲ್ ವಿಲ್ಟ್",
    "crop": "ಆಲ್ಫಾಲ್ಫಾ",
    "symptoms": "ಸ್ಟುನ್ಟ್ದ್ ಯಲ್ಲೋ-ಗ್ರೀನ್ ಪ್ಲಾಂಟ್ಸ್; ಯಲ್ಲೋ/ಬ್ರೌನ್ ಡಿಸ್ಕೋಳೋರೇಷನ್ ಇನ್ ತಾಪ್ರೂಟ್.",
    "treatment": "ಪ್ಲಾಂಟ್ ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್; ಹಾರ್ವೆಸ್ಟ್ ಯಂಗ್ ಸ್ಟ್ಯಾಂಡ್ಸ್ ಕ್ಯಾರೆಫ್ಯೂಲ್ಯ್."
  },
  {
    "name": "ಬ್ರೌನ್ ಸ್ತೆಂ ರೊಟ್",
    "crop": "ಸೊಯಾಬೀನ್",
    "symptoms": "ಬ್ರೌನಿಂಗ್ ಆ ಪಿತ್ ಇನ್ಸೈಡ್ ಸ್ಟೆಮ್ಸ್; ಇಂಟರ್ವೆಇನಲ್ ಕ್ಲೋರೋಸಿಸ್ ಆನ್ ಲೇಅವೇಸ್.",
    "treatment": "ಕ್ರಾಪ್ ರೊಟೇಷನ್ ವಿಥ್ ನೋನ್-ಹೊಸ್ಟ್ಸ್ (ಕಾರ್ನ್); ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್."
  },
  {
    "name": "ಚಾರ್ಕೋಳ್ಳಿ ರೊಟ್",
    "crop": "ಸೊಯಾಬೀನ್ ಕಾರ್ನ್",
    "symptoms": "ಲೋಯರ್ ಸ್ತೆಂ ಅಂಡ್ ತಾಪ್ರೂಟ್ ಟರ್ನ್ ಸಿಲ್ವರ್-ಗ್ರೇಯ್ ವಿಥ್ ಟಿನಿ ಬ್ಲಾಕ್ ಮಿಕ್ರೋಸ್ಕಲೆರೋಟಿಯ.",
    "treatment": "ಇರ್ರಿಗತೆ ಟು ರೆಡ್ಯೂಸ್ ದ್ರೌಗ್ತ್ ಸ್ಟ್ರೆಸ್; ಲೋಯರ್ ಪ್ಲಾಂಟ್ ಪೊಪ್ಯೂಲತಿಒಂಸ್."
  },
  {
    "name": "ಕ್ರೌನ್ ರೂಸ್ಟ್",
    "crop": "ಓಟ್ಸ್",
    "symptoms": "ಆರೆಂಜ್-ಯಲ್ಲೋ ಪುಸ್ತುಲೆಸ್ ಆನ್ ಲೇತ್ವ್ಸ್.",
    "treatment": "ಎರಡಿಕ್ಯಾತೆ ಬುಕುಥಾರ್ನ್ ಅಳ್ತೇರ್ಣತೆ ಹೋಸ್ಟ್; ಪ್ಲಾಂಟ್ ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್."
  },
  {
    "name": "ಕರ್ನಲ್ ಬಂಟ್",
    "crop": "ವೀಟ್",
    "symptoms": "ಪಾರ್ಟಿಯಲ್ಯ್ ಸ್ಮುಟ್ಟೆಡ್ ಗ್ರಾಯ್ನ್ಸ್ ವಿಥ್ ಆ ಫಿಶ್ಯ್ ಓದೋರ್.",
    "treatment": "ಸ್ಟ್ರಿಕ್ಟ್ ಕ್ವಾರಂಟೈನ್; ಡಿಸೀಸ್-ಫ್ರೀ ಸೀಡ್; ಫುಣ್ಗಿಸಿಡಲ್ ಸೀಡ್ ಟ್ರೀಟ್ಮೆಂಟ್."
  },
  {
    "name": "ಸ್ನೋ ಮೊಲ್ಡ್",
    "crop": "ವೀಟ್",
    "symptoms": "ವೈಟ್ ಓರ್ ಪಿಂಕ್ ಕೊಟ್ಟೋನ್ಯ್ ಮೈಚೆಲಿಯಂ ಕವರಿಂಗ್ ಪ್ಲಾಂಟ್ಸ್ ಆಫ್ಟರ್ ಸ್ನೌಮೆಲ್ಟ್.",
    "treatment": "ಅವಾಯ್ಡ್ ಎಸ್ಸ್ಸ್ಸಿವೆ ನೈಟ್ರೋಜನ್ ಲೇಟ್ ಇನ್ ಫಾಲ್; ಕ್ರಾಪ್ ರೊಟೇಷನ್."
  },
  {
    "name": "ಸ್ತೆಂ ರೊಟ್",
    "crop": "ರೈಸ್",
    "symptoms": "ಬ್ಲಾಕ್ ಅಂಗುಲರ್ ಲೇಸಿಒನ್ಸ್ ಆನ್ ದಿ ಲೀಫ್ ಶೇತ್ತ್ ಅಟ್ ದಿ ವಾಟರ್ ಲೈನ್.",
    "treatment": "ಅಪ್ಲೈ ಪೊಟ್ಯಾಸಿಯಂ ಫರ್ಟಿಲೈಜರ್; ಡ್ರೈನ್ ಫೀಲ್ಡ್ಸ್ ಅಟ್ ದಿ ಎಂಡ್ ಆ ದಿ ಸೀಸನ್."
  },
  {
    "name": "ತುಂಗ್ರೋ ಡಿಸೀಸ್",
    "crop": "ರೈಸ್",
    "symptoms": "ಸ್ಟುನ್ಟ್ದ್ ಪ್ಲಾಂಟ್ಸ್ ಯಲ್ಲೋ-ಆರೆಂಜ್ ಲೇತ್ವ್ಸ್ ಫ್ರಮ್ ದಿ ಟಿಪ್ ಡೌನ್ವಾರ್ಡ್.",
    "treatment": "ಕಂಟ್ರೋಲ್ ಗ್ರೀನ್ ಲೇಅಫ್ಹೊಪ್ಪೆರ್ಸ್; ಸಿನ್ಛ್ರೋನಿಜ್ ಪ್ಲಾಂಟಿಂಗ್."
  },
  {
    "name": "ಬಸಿಟೇರಿಯಲ್ ಬಲೈಟ್",
    "crop": "ರೈಸ್",
    "symptoms": "ವಾಟರ್-ಸೂಕೆಡ್ ಸ್ತ್ರೀಫೇಸ್ ಆನ್ ಲೇಅವೇಸ್ ಟರ್ನಿಂಗ್ ಯಲ್ಲೋ-ವೈಟ್ ಅಂಡ್ ದ್ರಯಿಂಗ್.",
    "treatment": "ಅವಾಯ್ಡ್ ಫೀಲ್ಡ್ ಫ್ಲೂಡಿಂಗ್; ಉಷೆ ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್."
  },
  {
    "name": "ಚಸ್ಸವ ಬ್ರೌನ್ ಸ್ಟ್ರೀಕ್ ಡಿಸೀಸ್",
    "crop": "ಚಸ್ಸವ",
    "symptoms": "ಯಲ್ಲೋ ಕ್ಲೋರೋಸಿಸ್ ಅಲೋಂಗ್ ಲೀಫ್ ವೆಯ್ನ್ಸ್; ಡ್ರೈ ಬ್ರೌನ್ ನೆಕ್ರೋಟಿಕ್ ರೊಟ್ ಇನ್ ರೂಟ್ಸ್.",
    "treatment": "ಪ್ಲಾಂಟ್ ಸರ್ಟಿಫೈಡ್ ವೈರಸ್-ಫ್ರೀ ಕಟ್ಟಿಂಗ್ಸ್; ಕಂಟ್ರೋಲ್ ವಿಟ್ಫ್ಲಿಸ್."
  },
  {
    "name": "ಕೊಕೊನಟ್ ಲೆಥಲ್ ಎಲ್ಲೋವಿಂಗ್",
    "crop": "ಕೊಕೊನಟ್",
    "symptoms": "ಪ್ರೇಮಾತುರೇ ನ್ಯೂಟ್ ಡ್ರಾಪ್ ಬ್ಲಾಕನಿಂಗ್ ಆ ಫ್ಲವರ್ ಸ್ಟೇಲ್ಕ್ಸ್ ಎಲಲೊವಿಂಗ್ ಫ್ರಒಂದ್ಸ್.",
    "treatment": "ಇಂಜೆಕ್ಟ್ ಟ್ರನ್ಕ್ಸ್ ವಿಥ್ ಒಸ್ಯ್ತೆಟ್ರಾಸೈಕ್ಲಿನ್; ಪ್ಲಾಂಟ್ ರೆಸಿಸ್ಟನ್ಟ್ ವರಿಎಟಿಎಸ್."
  },
  {
    "name": "ಆಯಿಲ್ ಪಾಮ್ ಗಣೊಡೆರ್ಮ ರೊಟ್",
    "crop": "ಆಯಿಲ್ ಪಾಮ್",
    "symptoms": "ಲೋಯರ್ ಫ್ರಒಂದ್ಸ್ ಕಾಲಾಪ್ಸ್ ಶೆಲ್ಫ್-ಲೈಕ್ ಮುಷ್ರೂಮ್ಸ್ ಅಪೀರ್ ಅತ್ ಟ್ರಂಕ್ ಬೇಸ್.",
    "treatment": "ಟ್ರೆಂಚಿಂಗ್ ಟು ಐಸೋಲೇಟ್ ಡಿಸೀಜ್ಡ್ ಪಾಲ್ಮ್ಸ್; ಥರೋ ಸ್ಟಂಪ್ ರಿಮೂವಲ್."
  },
  {
    "name": "ಟೀ ಬಲಿಸ್ಟರ್ ಬಲೈಟ್",
    "crop": "ಟೀ",
    "symptoms": "ಟ್ರಾನ್ಸ್ಲ್ಯೂಸೆಂಟ್ ಸ್ಪೋಟ್ಸ್ ಟರ್ನಿಂಗ್ ಇಂಟು ವೈಟ್ ಬಲಿಸ್ಟರ್-ಲೈಕ್ ಸ್ವೇಲ್ಲಿಂಗ್ಸ್ ಆನ್ ಲೇತ್ವ್ಸ್.",
    "treatment": "ಅಡ್ಜಸ್ಟ್ ಶೇಡ್; ಫ್ರೆಕ್ಯುನ್ಟ್ ಹಾರ್ವೆಸ್ಟಿಂಗ್; ಕಾಪರ್ ಫುಣ್ಗಿಸಿದೆಸ್."
  },
  {
    "name": "ರಬ್ಬರ್ ಸೌತ್ ಅಮೆರಿಕನ್ ಲೀಫ್ ಬಲೈಟ್",
    "crop": "ರಬ್ಬರ್",
    "symptoms": "ಯಂಗ್ ಲೇತ್ವ್ಸ್ ಬ್ಲಾಕೆನ್ ಅಂಡ್ ಫಾಲ್; ಒಲ್ಡ್ರ್ ಲೇತ್ವ್ಸ್ ಹಾವೇ ಡಾರ್ಕ್ ಶಾಟ್-ಹೋಲ್ ಲೇಸಿಒನ್ಸ್.",
    "treatment": "ಸ್ಟ್ರಿಕ್ಟ್ ಕ್ವಾರಂಟೈನ್ (ಪ್ರೆವೆಂಟ್ ಸ್ಪ್ರೆಡ್ ಔಟ್ಸೈಡ್ ಸೌತ್ ಅಮೇರಿಕಾ); ಫುಣ್ಗಿಸಿದೆಸ್."
  }
];
const CATEGORIES = ["All", "Rice", "Wheat", "Tomato", "Potato", "Corn", "Citrus", "Fruit", "Vegetable"];
function getSeverity(treatment, symptoms) {
  const highRisk = ["destroy", "immediate", "death", "quarantine", "collapse", "ruin"];
  const text = (treatment + symptoms).toLowerCase();
  if (highRisk.some((word) => text.includes(word))) return "High";
  if (text.includes("fungicide") || text.includes("prune")) return "Medium";
  return "Low";
}
function LibraryPage() {
  const {
    t,
    i18n
  } = useTranslation();
  const [q, setQ] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(20);
  const currentLang = i18n.language;
  const activeDiseases = useMemo(() => {
    if (currentLang === "hi") return diseasesHi;
    if (currentLang === "kn") return diseasesKn;
    return diseases;
  }, [currentLang]);
  const filtered = useMemo(() => {
    return activeDiseases.filter((d, idx) => {
      const enRef = diseases[idx];
      const searchStr = (enRef.name + enRef.crop + enRef.symptoms).toLowerCase();
      const matchesSearch = searchStr.includes(q.toLowerCase());
      const matchesCategory = activeCategory === "All" || enRef.crop.toLowerCase().includes(activeCategory.toLowerCase()) || activeCategory === "Fruit" && ["Apple", "Mango", "Grapes", "Banana", "Citrus", "Orange"].some((f) => enRef.crop.includes(f)) || activeCategory === "Vegetable" && ["Tomato", "Potato", "Onion", "Cabbage", "Cucumber", "Pepper"].some((v) => enRef.crop.includes(v));
      return matchesSearch && matchesCategory;
    });
  }, [q, activeDiseases, activeCategory]);
  const visibleDiseases = filtered.slice(0, visibleCount);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-emerald-50/30 font-sans", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 py-12 md:py-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-16 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl font-display", children: t("Disease Library") }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-muted-foreground max-w-2xl mx-auto", children: t("A curated database of common crop diseases with symptoms and treatment plans.") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-40 mb-12 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative group max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" }),
        /* @__PURE__ */ jsx("input", { value: q, onChange: (e) => {
          setQ(e.target.value);
          setVisibleCount(20);
        }, placeholder: t("Search diseases, crops or symptoms…"), className: "w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-white shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-base font-medium transition-all" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-2", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsx("button", { onClick: () => {
        setActiveCategory(cat);
        setVisibleCount(20);
      }, className: `px-5 py-2 rounded-full text-xs font-bold transition-all border ${activeCategory === cat ? "bg-primary border-primary text-white shadow-md" : "bg-white border-gray-200 text-gray-500 hover:border-primary hover:text-primary"}`, children: t(cat) }, cat)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: visibleDiseases.map((d, idx) => {
      const enRef = diseases[activeDiseases.indexOf(d)];
      const severity = getSeverity(enRef.treatment, enRef.symptoms);
      return /* @__PURE__ */ jsxs("article", { className: "flex flex-col rounded-2xl border border-border bg-white p-6 transition-all hover:shadow-lg hover:border-primary/30", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/5 px-2.5 py-1 rounded-md", children: d.crop }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx("div", { className: `h-1.5 w-1.5 rounded-full ${severity === "High" ? "bg-red-500" : severity === "Medium" ? "bg-amber-500" : "bg-emerald-500"}` }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-tighter", children: severity })
          ] })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 leading-tight mb-4", children: d.name }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 flex-1", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1", children: t("Symptoms") }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 line-clamp-3 italic", children: [
              '"',
              d.symptoms,
              '"'
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-gray-50 border border-gray-100", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2", children: t("Treatment") }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 font-medium line-clamp-4", children: d.treatment })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 pt-4 border-t border-gray-50 flex justify-between items-center", children: /* @__PURE__ */ jsxs("button", { onClick: () => window.open(`https://www.google.com/search?q=${encodeURIComponent(enRef.name + " " + enRef.crop + " disease treatment")}`, "_blank"), className: "text-xs font-bold text-primary hover:underline flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Search, { className: "h-3 w-3" }),
          " ",
          t("Search Online")
        ] }) })
      ] }, d.name + d.crop + idx);
    }) }),
    visibleCount < filtered.length && /* @__PURE__ */ jsx("div", { className: "mt-16 text-center", children: /* @__PURE__ */ jsx("button", { onClick: () => setVisibleCount((prev) => prev + 21), className: "px-8 py-3 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all shadow-lg", children: t("Load More") }) }),
    filtered.length === 0 && /* @__PURE__ */ jsxs("div", { className: "mt-20 text-center py-12", children: [
      /* @__PURE__ */ jsx(Search, { className: "h-10 w-10 text-gray-200 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900", children: t("No results found") })
    ] })
  ] }) });
}
export {
  LibraryPage as component
};
