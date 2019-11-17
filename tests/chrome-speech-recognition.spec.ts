import { IChromeSpeechRecognition } from '../src/interfaces/chrome-speech-recognition';
import { ChromeSpeechRecognition } from '../src/impl/chrome-speech-recognition';
import fs from 'fs';
import { IWindow } from '../src/interfaces/window';

// Define the HTML page that loads the bundle, that will be used to do the test
let testHTMLPage=`<!DOCTYPE html><HTML><head></head><body>chrome-speech-recognition test page (Jest + Puppeteer )</body></HTML>`;

describe('IChromeSpeechRecognition functions', () => {

  let recognition: IChromeSpeechRecognition;

  beforeAll(async () => {
    await page.goto('data:text/html,'+testHTMLPage);
    await page.addScriptTag({path: `${__dirname}/../dist/app.bundle.js`}).catch((err)=>console.error(err));
  })

  it('IsSpeechRecognitionSupported', async () => {
    let result = await page.evaluate(()=>{ return (window as any).ChromeSpeechRecognition.IsSpeechRecognitionSupported()})
    expect(result).toEqual(true);
  });

});