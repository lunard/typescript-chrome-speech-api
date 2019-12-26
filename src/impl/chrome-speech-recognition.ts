import { IChromeSpeechRecognition } from '../interfaces/chrome-speech-recognition';
import { IWindow } from '../interfaces/window';

export class ChromeSpeechRecognition implements IChromeSpeechRecognition {
    public TSpeechRecognitionEngine: any;

    private extendedWindow: IWindow | undefined;
    private isSpeechRecognitionSupported = false;

    constructor() {
        try {
            if (typeof window !== 'undefined') {
                this.extendedWindow = (window as unknown) as IWindow;
                this.TSpeechRecognitionEngine = new this.extendedWindow.webkitSpeechRecognition();
                this.isSpeechRecognitionSupported = true;
            }
        } catch (err) {
            this.isSpeechRecognitionSupported = false;
        }
    }

    public IsSpeechRecognitionSupported(): boolean {
        return this.isSpeechRecognitionSupported;
    }

    public async RecognizeCompleteUtterance(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            if (!this.TSpeechRecognitionEngine) {
                reject('empty webkitSpeechRecognition');
                return;
            }

            this.TSpeechRecognitionEngine.continuous = false;
            this.TSpeechRecognitionEngine.interimResults = false;

            const speechRecognition = this.TSpeechRecognitionEngine;
            this.TSpeechRecognitionEngine.onresult = (event: any) => {
                let partialResult = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    partialResult += event.results[i][0].transcript;

                    if (event.results[i].isFinal) {
                        speechRecognition.stop();
                        resolve(partialResult);
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

    let lastPartialRecognizedText: string | undefined = '';

    speechRecognitionEngine.start();

    let result: [string, boolean] = ['', false];
    while (!result[1]) {
        let recognizeResult$ = await new Promise<[string, boolean]>((resolve, reject) => {
            speechRecognitionEngine.onresult = (event: any) => {
                try {
                    let partialResult = '';
                    let speechRecognitionEnded = false;
                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i][0].transcript && event.results[i][0].transcript != "") {
                            partialResult += event.results[i][0].transcript;

                            if (event.results[i].isFinal) {
                                speechRecognitionEnded = true;
                                speechRecognitionEngine.stop();
                            }
                        }
                    }

                    resolve([partialResult, speechRecognitionEnded]);

                } catch (err) {
                    reject(err);
                }
            };
        });

        try {
            result = await recognizeResult$;

            if (lastPartialRecognizedText !== undefined && lastPartialRecognizedText != result[0]) {
                lastPartialRecognizedText = result[0];

                yield lastPartialRecognizedText;
            }
        }
        catch (err) {
            console.error("Recognition error:", err);
            yield lastPartialRecognizedText;
        }
    }
}
