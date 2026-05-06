/**
 * Transliterates English text to a target language script (e.g., Hindi, Kannada)
 * using the Google Input Tools API. This is used for "English in Local Script" 
 * as requested by the user.
 */
export async function transliterate(text: string, langCode: string): Promise<string> {
  if (!text || langCode === "en") return text;
  
  try {
    const url = `https://inputtools.google.com/request?text=${encodeURIComponent(text)}&itc=${langCode}-t-i0-und&num=1`;
    const res = await fetch(url);
    if (!res.ok) return text;
    
    const data = await res.json();
    if (data[0] === "SUCCESS") {
      // The API returns a complex structure: ["SUCCESS", [["word", ["translit"]]]]
      return data[1].map((r: any) => r[1][0]).join("");
    }
    return text;
  } catch (err) {
    console.error("Transliteration failed:", err);
    return text;
  }
}
