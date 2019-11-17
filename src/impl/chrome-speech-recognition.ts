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
}