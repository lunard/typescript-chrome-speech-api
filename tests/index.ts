import { ChromeSpeechRecognition, RecognizerGenerator } from '../src/';

if (typeof window !== 'undefined') {
  (window as any).ChromeSpeechRecognition = new ChromeSpeechRecognition();
  (window as any).RecognizerGenerator = RecognizerGenerator;
}