// IMPORTANT: before run the test, create the bundle using npm run bundle

// Define the HTML page that loads the bundle, that will be used to do the test
let testHTMLPage=`<!DOCTYPE html><HTML><head></head><body>chrome-speech-recognition test page (Jest + Puppeteer )</body></HTML>`;

describe('IChromeSpeechRecognition functions', () => {

  beforeAll(async () => {
    await page.goto('data:text/html,'+testHTMLPage);
    await page.addScriptTag({path: `${__dirname}/../dist/app.bundle.js`}).catch((err)=>console.error(err));
  })

  it('IsSpeechRecognitionSupported', async () => {
    let result = await page.evaluate(()=>{ return (window as any).ChromeSpeechRecognition.IsSpeechRecognitionSupported()})
    expect(result).toEqual(true);
  });

});