import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diseasesPath = path.join(__dirname, 'src', 'data', 'diseases.ts');
let content = fs.readFileSync(diseasesPath, 'utf8');

const arrayMatch = content.match(/export const diseases = (\[[\s\S]*?\]);/);
let diseases = eval(arrayMatch[1]);

function transliterateSentence(text, langCode) {
  return new Promise((resolve) => {
    // API has a limit on text length per request. We split by sentences or punctuation if it's too long.
    // For our data, max length is ~150 chars, which is fine for one request.
    const url = `https://inputtools.google.com/request?text=${encodeURIComponent(text)}&itc=${langCode}-t-i0-und&num=1`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed[0] === 'SUCCESS') {
            const result = parsed[1].map(r => r[1][0]).join('');
            resolve(result);
          } else {
            resolve(text);
          }
        } catch (e) {
          resolve(text);
        }
      });
    }).on('error', () => resolve(text));
  });
}

async function run() {
  console.log("Starting reliable transliteration...");
  const hiDiseases = [];
  const knDiseases = [];
  
  for (let i = 0; i < diseases.length; i++) {
    console.log(`Transliterating ${i+1}/${diseases.length}: ${diseases[i].name}`);
    const d = diseases[i];
    
    hiDiseases.push({
      name: await transliterateSentence(d.name, 'hi'),
      crop: await transliterateSentence(d.crop, 'hi'),
      symptoms: await transliterateSentence(d.symptoms, 'hi'),
      treatment: await transliterateSentence(d.treatment, 'hi')
    });
    
    knDiseases.push({
      name: await transliterateSentence(d.name, 'kn'),
      crop: await transliterateSentence(d.crop, 'kn'),
      symptoms: await transliterateSentence(d.symptoms, 'kn'),
      treatment: await transliterateSentence(d.treatment, 'kn')
    });
  }

  const hiPath = path.join(__dirname, 'src', 'data', 'diseases-hi.ts');
  const knPath = path.join(__dirname, 'src', 'data', 'diseases-kn.ts');
  
  fs.writeFileSync(hiPath, `export const diseasesHi = ${JSON.stringify(hiDiseases, null, 2)};\n`, 'utf8');
  fs.writeFileSync(knPath, `export const diseasesKn = ${JSON.stringify(knDiseases, null, 2)};\n`, 'utf8');
  
  console.log("Done!");
}

run();
