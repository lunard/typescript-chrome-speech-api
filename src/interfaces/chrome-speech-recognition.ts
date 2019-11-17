export interface IChromeSpeechRecognition {
    IsSpeechRecognitionSupported(): boolean;
    RecognizeCompleteUttenrance(): Promise<string>;
}