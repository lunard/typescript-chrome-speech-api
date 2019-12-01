import { ChromeSpeechRecognition, RecognizerGenerator as RecognizerGenerator } from "./impl/chrome-speech-recognition";

if (typeof window !== 'undefined'){
    (<any>window).ChromeSpeechRecognition = new ChromeSpeechRecognition();
    (<any>window).RecognizerGenerator = RecognizerGenerator; 
}