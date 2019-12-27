# Description
This project aims to create a Typescript wrapper for the W3C Speech API implemented by Google Chrome

# Usage
The NPM package is made to be used in your personal TypeScript application.

You can for example create a new TypeScript application and define a class like this:

```
import { ChromeSpeechRecognition, RecognizerGenerator } from "typescript-chrome-speech-api";

export class SpeechRecognizer {

    private chromeSpeechRecognition: ChromeSpeechRecognition;

    constructor() {
        this.chromeSpeechRecognition = new ChromeSpeechRecognition();
    }

    public async startRecognizer(partialResultCallback: any) {
        for await (const textPart of RecognizerGenerator(this.chromeSpeechRecognition.TSpeechRecognitionEngine)) {
            partialResultCallback(textPart);
        };
        partialResultCallback(null);
    }
}
```

After you created a bundle via Webpack (for example using library='myLibrary', libraryTarget='var') you can start a recognition session 
by using the startRecognizer function:

```
myLibrary.speechRecognizer.startRecognizer((txt)=>console.log(txt))
```

# About the tests
I use Jest and Puppeteer to run the tests on a headless Chrome browser.
Please refer to this nice intro on how configure the environment: https://medium.com/better-programming/how-to-use-puppeteer-with-jest-typescript-530a139ffe40

Another important reference is the jest-puppeteer preset documentation, in particular for the global variables browser, page and context: 
https://github.com/smooth-code/jest-puppeteer.