import { IChromeSpeechRecognition } from "../interfaces/chrome-speech-recognition";
import { IWindow } from "../interfaces/window";

export class ChromeSpeechRecognition implements IChromeSpeechRecognition {

    private extendedWindow: IWindow | undefined;
    private isSpeechRecognitionSupported = false;
    public TSpeechRecognitionEngine: any;

    constructor() {
        try {
            if (typeof window !== 'undefined') {
                this.extendedWindow = <IWindow><unknown>window;
                this.TSpeechRecognitionEngine = new this.extendedWindow.webkitSpeechRecognition();
                this.isSpeechRecognitionSupported = true;
                console.log("ChromeSpeechRecognition initialited");
            }
        } catch (err) {
            console.error(err);
        }
    }

    IsSpeechRecognitionSupported(): boolean {
        return this.isSpeechRecognitionSupported;
    }

    async RecognizeCompleteUttenrance(): Promise<string> {

        return new Promise<string>((resolve, reject) => {

            if (!this.TSpeechRecognitionEngine) {
                reject("empty webkitSpeechRecognition");
                return;
            }

            this.TSpeechRecognitionEngine.continuous = false;
            this.TSpeechRecognitionEngine.interimResults = false;

            let speechRecognition = this.TSpeechRecognitionEngine;
            this.TSpeechRecognitionEngine.onresult = function (event: any) {
                var interim_transcript = '';
                for (var i = event.resultIndex; i < event.results.length; ++i) {

                    interim_transcript += event.results[i][0].transcript;

                    if (event.results[i].isFinal) {
                        speechRecognition.stop();
                        resolve(interim_transcript);
                    }
                }
            };

            this.TSpeechRecognitionEngine.start();
        });
    }
}

export async function* RecognizerGenerator(speechRecognitionEngine: any) {

    if (!speechRecognitionEngine) {
        return null;
    }

    speechRecognitionEngine.continuous = false;
    speechRecognitionEngine.interimResults = true;

    let recognitionPromise: Promise<String> = new Promise<String>((resolve) => { });

    let partialRecognizedText: string | undefined = "";
    speechRecognitionEngine.start();

    let result: [string, boolean] = ["", false];
    while (!result[1]) {
        result = await new Promise<[string, boolean]>((resolve, reject) => {
            speechRecognitionEngine.onresult = function (event: any) {
                var interim_transcript = '';
                for (var i = event.resultIndex; i < event.results.length; ++i) {

                    interim_transcript += event.results[i][0].transcript;

                    if (event.results[i].isFinal) {
                        speechRecognitionEngine.stop();
                    }

                    resolve([interim_transcript, event.results[i].isFinal]);
                }
            };
        });

        partialRecognizedText = result[0];
        if (partialRecognizedText != undefined)
            yield partialRecognizedText;
    }
}