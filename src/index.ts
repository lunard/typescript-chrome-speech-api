import { ChromeSpeechRecognition } from "./impl/chrome-speech-recognition";

if (typeof window !== 'undefined') 
    (<any>window).ChromeSpeechRecognition = new ChromeSpeechRecognition();