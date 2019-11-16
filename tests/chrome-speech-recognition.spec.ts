import { expect } from 'chai';
import 'mocha';
import { IChromeSpeechRecognition } from '../src/interfaces/chrome-speech-recognition';
import { ChromeSpeechRecognition } from '../src/impl/chrome-speech-recognition';


describe('IChromeSpeechRecognition functions', () => {

    let recognition: IChromeSpeechRecognition = new ChromeSpeechRecognition();
    it('IsSpeechRecognitionSupported', () => {
      const result = recognition.IsSpeechRecognitionSupported();
      expect(result).to.eq(true, "Speech Recognition not supported");
    });
  });