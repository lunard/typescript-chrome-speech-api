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

  public async RecognizeCompleteUttenrance(): Promise<string> {
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

  let partialRecognizedText: string | undefined = '';
  speechRecognitionEngine.start();

  let result: [string, boolean] = ['', false];
  while (!result[1]) {
    result = await new Promise<[string, boolean]>((resolve, reject) => {
      speechRecognitionEngine.onresult = (event: any) => {
        let partialResult = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          partialResult += event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            speechRecognitionEngine.stop();
          }

          resolve([partialResult, event.results[i].isFinal]);
        }
      };
    });

    partialRecognizedText = result[0];
    if (partialRecognizedText !== undefined) {
      yield partialRecognizedText;
    }
  }
}
