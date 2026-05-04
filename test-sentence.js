import https from 'https';

function transliterateSentence(text, langCode) {
  return new Promise((resolve) => {
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

async function test() {
  console.log("Sentence HI:", await transliterateSentence("Stunted, yellow-green plants; yellow/brown discoloration in taproot.", "hi"));
}
test();
