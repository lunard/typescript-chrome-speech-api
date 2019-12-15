# Description
This project aims to create a Typescript wrapper for the W3C Speech API implemented by Google Chrome

# Introduction
Example of incremental recognition usage

```
for await (const textpart of window.RecognizerGenerator(window.ChromeSpeechRecognition.TSpeechRecognitionEngine)) {
    console.log(`Partial text:'${textpart}'`);
};
console.warn("Utterance complete!");
```

# About the tests
I use Jest and Puppeteer to run the tests on a headless Chrome browser.
Please refer to this nice intro on how configure the environment: https://medium.com/better-programming/how-to-use-puppeteer-with-jest-typescript-530a139ffe40

Another important reference is the jest-puppeteer preset documentation, in particular for the global variables browser, page and context: 
https://github.com/smooth-code/jest-puppeteer.