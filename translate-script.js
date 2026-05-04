import fs from 'fs';
import path from 'path';
import { translate } from '@vitalets/google-translate-api';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read diseases.ts
const diseasesPath = path.join(__dirname, 'src', 'data', 'diseases.ts');
let content = fs.readFileSync(diseasesPath, 'utf8');

// Extract the array
const arrayMatch = content.match(/export const diseases = (\[[\s\S]*?\]);/);
if (!arrayMatch) {
  console.error("Could not parse diseases array.");
  process.exit(1);
}

// Evaluate to get the JS array
let diseases;
try {
  diseases = eval(arrayMatch[1]);
} catch (e) {
  console.error("Failed to eval diseases:", e);
  process.exit(1);
}

async function run() {
  console.log(`Found ${diseases.length} diseases. Starting translation...`);
  // For speed and rate limits, we will translate all values joined by a unique separator
  const separator = " |SEP| ";
  
  // We'll process in chunks of 10 diseases to avoid huge payloads
  const hiDiseases = [];
  const knDiseases = [];
  
  const chunkSize = 50; // 50 diseases at a time
  
  for (let i = 0; i < diseases.length; i += chunkSize) {
    const chunk = diseases.slice(i, i + chunkSize);
    console.log(`Processing chunk ${i} to ${i + chunk.length}...`);
    
    // Flatten
    const textsToTranslate = [];
    chunk.forEach(d => {
      textsToTranslate.push(d.name, d.crop, d.symptoms, d.treatment);
    });
    
    const combinedText = textsToTranslate.join(separator);
    
    try {
      console.log("Translating to Hindi...");
      const hiRes = await translate(combinedText, { to: 'hi' });
      const hiParts = hiRes.text.split(separator).map(s => s.trim());
      
      console.log("Translating to Kannada...");
      const knRes = await translate(combinedText, { to: 'kn' });
      const knParts = knRes.text.split(separator).map(s => s.trim());
      
      for (let j = 0; j < chunk.length; j++) {
        hiDiseases.push({
          name: hiParts[j*4] || chunk[j].name,
          crop: hiParts[j*4 + 1] || chunk[j].crop,
          symptoms: hiParts[j*4 + 2] || chunk[j].symptoms,
          treatment: hiParts[j*4 + 3] || chunk[j].treatment
        });
        
        knDiseases.push({
          name: knParts[j*4] || chunk[j].name,
          crop: knParts[j*4 + 1] || chunk[j].crop,
          symptoms: knParts[j*4 + 2] || chunk[j].symptoms,
          treatment: knParts[j*4 + 3] || chunk[j].treatment
        });
      }
    } catch (err) {
      console.error("Translation error on chunk:", err);
      // Fallback to english for this chunk
      for (let j = 0; j < chunk.length; j++) {
        hiDiseases.push(chunk[j]);
        knDiseases.push(chunk[j]);
      }
    }
  }

  // Write out the new files
  const hiPath = path.join(__dirname, 'src', 'data', 'diseases-hi.ts');
  const knPath = path.join(__dirname, 'src', 'data', 'diseases-kn.ts');
  
  fs.writeFileSync(hiPath, `export const diseasesHi = ${JSON.stringify(hiDiseases, null, 2)};\n`, 'utf8');
  fs.writeFileSync(knPath, `export const diseasesKn = ${JSON.stringify(knDiseases, null, 2)};\n`, 'utf8');
  
  console.log("Translation complete!");
}

run();
