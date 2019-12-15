import { ChromeSpeechRecognition, RecognizerGenerator } from './impl/chrome-speech-recognition';

if (typeof window !== 'undefined') {
  (window as any).ChromeSpeechRecognition = new ChromeSpeechRecognition();
  (window as any).RecognizerGenerator = RecognizerGenerator;
}
