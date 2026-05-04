import fs from 'fs';
import path from 'path';

const inputPath = path.join(process.cwd(), 'src/data/diseases.ts');
let content = fs.readFileSync(inputPath, 'utf-8');

// We will use regex to replace img: leafspot/mildew/rust with a pollinations URL based on the name and crop.

// The regex will find objects like { img: ..., name: "...", crop: "...", ... }
const regex = /{ img: [^,]+, name: "([^"]+)", crop: "([^"]+)", symptoms: "([^"]+)", treatment: "([^"]+)" }/g;

let newContent = content.replace(regex, (match, name, crop, symptoms, treatment) => {
  const prompt = `Close up realistic macro photography of ${name} disease on ${crop.split(',')[0]} plant leaf or fruit, agriculture`;
  const imgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=600&height=400&nologo=true`;
  return `{ img: "${imgUrl}", name: "${name}", crop: "${crop}", symptoms: "${symptoms}", treatment: "${treatment}" }`;
});

// Remove the import statements at the top since we don't need them anymore
newContent = newContent.replace(/import leafspot from .*\n/g, '');
newContent = newContent.replace(/import mildew from .*\n/g, '');
newContent = newContent.replace(/import rust from .*\n/g, '');

fs.writeFileSync(inputPath, newContent);
console.log("Successfully updated diseases.ts with Pollinations AI image URLs.");
