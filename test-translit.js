import https from 'https';

function transliterate(word, langCode) {
  return new Promise((resolve, reject) => {
    const url = `https://inputtools.google.com/request?text=${encodeURIComponent(word)}&itc=${langCode}-t-i0-und&num=1`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed[0] === 'SUCCESS') {
            resolve(parsed[1][0][1][0]);
          } else {
            resolve(word);
          }
        } catch (e) {
          resolve(word);
        }
      });
    }).on('error', () => resolve(word));
  });
}

async function test() {
  console.log("Apple Scab in Hindi:", await transliterate("Apple", "hi"), await transliterate("Scab", "hi"));
  console.log("Apple Scab in Kannada:", await transliterate("Apple", "kn"), await transliterate("Scab", "kn"));
}

test();
