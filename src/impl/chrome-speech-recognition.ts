import { IChromeSpeechRecognition } from "../interfaces/chrome-speech-recognition";
import { IWindow } from "../interfaces/window";

export class ChromeSpeechRecognition implements IChromeSpeechRecognition {

    private extendedWindow: IWindow | undefined;
    private isSpeechRecognitionSupported = false;
    public TSpeechRecognition: any;

    constructor() {
        try {
            if (typeof window !== 'undefined') {
                this.extendedWindow = <IWindow><unknown>window;
                this.TSpeechRecognition = new this.extendedWindow.webkitSpeechRecognition();
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

            if(!this.TSpeechRecognition){
                reject("empty webkitSpeechRecognition");
                return;
            }

            this.TSpeechRecognition.continuous = false;
            this.TSpeechRecognition.interimResults = false;

            let speechRecognition = this.TSpeechRecognition;
            this.TSpeechRecognition.onresult = function (event: any) {
                var interim_transcript = '';
                for (var i = event.resultIndex; i < event.results.length; ++i) {

                    interim_transcript += event.results[i][0].transcript;

                    if (event.results[i].isFinal) {
                        speechRecognition.stop();
                        resolve(interim_transcript);
                    }
                }
            };

            this.TSpeechRecognition.start();
        });
    }
}