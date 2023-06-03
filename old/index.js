// Load Styles
// import '../scss/main.scss';
import {createElement, destroyElement} from './floatingEmelemt.js';
import Observable from './Observable.js';
import {initialInfo} from './saveData.js';
import {runTimer, stopTimer} from './timer.js';
import ScreenMask from './screenMask.js';
import ScreenRecorder from './screenRecorder.js';

class avmJSBuilder {
  constructor() {
    this.options = null;
    this.startButton = null;
    this.screenRecorder = new ScreenRecorder();
    this.screenMask = new ScreenMask();
    this.timerWrapper = null;
  }

  /* todo change name and sort of arguments: data, id, options */
  initialize({options, startButtonId}) {
    if (!options) {
      console.error('Options not set.');
      return;
    }
    if (!startButtonId) {
      console.error('Start button not set.');
      return;
    }
    console.info('[avm-js] Package initialized!');

    this.options = options;
    this.startButton = document.getElementById(startButtonId);

    initialInfo.info = {
      fullName: this.options.fullName,
      email: this.options.email,
      avatar: this.options.avatar,
      requestUrl: this.options.requestUrl,
      apiKey: this.options.apiKey,
    };

    if (this.startButton) {
      this.startButton.addEventListener('click', this.createElement.bind(this));
    } else {
      console.error(`Element with ID '${startButtonId}' not found.`);
    }
  }

  startRecording() {
    Observable.subscribe(this.clearElements.bind(this));
    this.screenRecorder.start().then(() => {
      console.info('[avm-js] Record started');
      runTimer(this.timerWrapper, this.observeTime.bind(this));}
    );
  }

  stopRecording() {
    console.info('[avm-js] Record stopped!');
    this.screenRecorder.stopRecording();
  }

  closeElement() {
    this.screenRecorder.stopRecording();
  }

  clearElements() {
    stopTimer();
    destroyElement();
    this.screenMask.removeAllElements();
    Observable.unsubscribe(this.clearElements.bind(this));
  }

  startMask() {
    this.screenMask.init(true);
  }

  stopMask() {
    this.screenMask.init(false);
  }

  observeTime({minutes}) {
    if (minutes === 1) {
      this.stopRecording();
    }
  }

  createElement() {
    createElement(this.closeElement.bind(this), this.startRecording.bind(this), this.stopRecording.bind(this), this.startMask.bind(this), this.stopMask.bind(this)).then(element => {
      this.timerWrapper = element;
    });
  }
}

const avmJS = new avmJSBuilder();
export default avmJS;

// // Usage example:
// const options = {
//   fullName: 'John Doe',
//   email: 'n.kaviyani@asax.ir',
//   avatar: null,
//   requestUrl: '',
// };
//
// const startButtonId = 'startButton';
//
// avmJS.initialize({options, startButtonId});