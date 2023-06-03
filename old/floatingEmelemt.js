import {maskIcon, muteIcon, recordIcon, recordingIcon, stopRecordIcon, unmuteIcon} from './svg.js';

// wrapper element
const wrapper = document.createElement('div');
// Timer element
const timerWrapper = document.createElement('div');
const timerElement = document.createElement('span');
// Close Element
const closeButton = document.createElement('span');
// Mic Element
const muteWrapper = document.createElement('div');
const muteStartButton = document.createElement('span');
const muteStopButton = document.createElement('span');
// Mask Element
const maskWrapper = document.createElement('div');
const maskStartButton = document.createElement('span');
const maskStopButton = document.createElement('span');
// Record Elements
const recordWrapper = document.createElement('div');
const recordingButton = document.createElement('span');
const startRecordButton = document.createElement('span');
const stopRecordButton = document.createElement('span');
// Blink timeout variable
let blinkIntervalId;
const mouseEnterWrapper = () => {
  // Show close button
  closeButton.style.visibility = 'visible';
  closeButton.style.opacity = '1';
};
const mouseOutWrapper = () => {
  // Hide close button
  closeButton.style.visibility = 'hidden';
  closeButton.style.opacity = '0';
};
const blinkStopButton = () => {
  blinkIntervalId = setInterval(() => {
    const opacity = getComputedStyle(recordingButton).opacity;
    if (opacity === '1') recordingButton.style.opacity = '0';
    else recordingButton.style.opacity = '1';
  }, 500);
};
const finalizedElements = async () => {
  // Initial wrapper
  const initWrapper = new Promise((resolve) => {
    // Wrapper styles
    wrapper.style.position = 'fixed';
    wrapper.style.left = '25px';
    wrapper.style.bottom = '25px';
    wrapper.style.height = '55px';
    wrapper.style.backgroundColor = 'rgba(256, 256, 256, 1)';
    wrapper.style.border = '1px solid #8685E0';
    wrapper.style.borderRadius = '6px';
    wrapper.style.padding = '10px 20px';
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.color = 'black';
    wrapper.style.fontFamily = '"Roboto mono",monospace';
    wrapper.style.fontSize = '20px';
    wrapper.style.direction = 'ltr';
    // Hover wrapper
    wrapper.addEventListener('mouseover', mouseEnterWrapper);
    wrapper.addEventListener('mouseout', mouseOutWrapper);
    resolve(wrapper);
  });
  // Finalize timer
  const initTimerWrapper = new Promise((resolve)=>{
    // Timer ID
    timerWrapper.setAttribute('id', 'rs-timer-wrapper');
    // Timer styles
    timerWrapper.style.margin = '0 20px 0 0';
    timerWrapper.style.display = 'flex';
    timerWrapper.style.alignItems = 'center';
    timerWrapper.style.lineHeight = '1.2';
    timerWrapper.style.position = 'relative';
    // Append to wrapper
    wrapper.appendChild(timerWrapper);
    resolve(true);
  })
  const initTimer = new Promise((resolve) => {
    // Timer ID
    timerElement.setAttribute('id', 'rs-timer');
    // Timer styles
    timerElement.style.fontSize = '20px';
    timerElement.innerText = '00:00';
    // Append to wrapper
    timerWrapper.appendChild(timerElement);
    resolve(timerElement);
  });
  // Initial recording button
  const initRecordingButton = new Promise((resolve)=>{
    recordingButton.setAttribute('id','rs-recording');
    recordingButton.style.opacity = '0';
    recordingButton.style.transition = 'all .3s ease';
    recordingButton.style.position = 'absolute';
    recordingButton.style.right = '-20px';
    recordingButton.style.lineHeight = '1';
    recordingButton.innerHTML = recordingIcon;
    timerWrapper.appendChild(recordingButton);
    resolve(true);
  })
  // Initial record wrapper
  const initRecordWrapper = new Promise((resolve) => {
    recordWrapper.setAttribute('id', 'rs-record-wrapper');
    recordWrapper.style.marginLeft = '15px';
    recordWrapper.style.display = 'flex';
    recordWrapper.style.alignItems = 'center';
    recordWrapper.style.justifyContent = 'center';
    wrapper.appendChild(recordWrapper);
    resolve(true);
  });
  const initStartRecordButton = new Promise((resolve) => {
    startRecordButton.setAttribute('id', 'rs-start-record');
    startRecordButton.innerHTML = recordIcon;
    startRecordButton.style.cursor = 'pointer';
    startRecordButton.style.lineHeight = '1';
    recordWrapper.appendChild(startRecordButton);
    resolve(true);
  });
  const initStopRecordButton = new Promise((resolve) => {
    stopRecordButton.setAttribute('id', 'rs-stop-record');
    stopRecordButton.innerHTML = stopRecordIcon;
    stopRecordButton.style.cursor = 'pointer';
    stopRecordButton.style.lineHeight = '1';
    resolve(true);
  });
  // Initial mute wrapper
  const initMuteWrapper = new Promise((resolve) => {
    muteWrapper.setAttribute('id', 'rs-mute-wrapper');
    muteWrapper.style.margin = '0 15px';
    muteWrapper.style.display = 'flex';
    muteWrapper.style.alignItems = 'center';
    muteWrapper.style.justifyContent = 'center';
    wrapper.appendChild(muteWrapper);
    resolve(true);
  });
  const initMuteStartButton = new Promise((resolve) => {
    // Mask start button ID
    muteStartButton.setAttribute('id', 'rs-mute-start');
    muteStartButton.innerHTML = muteIcon;
    muteStartButton.style.cursor = 'not-allowed';
    muteStartButton.style.lineHeight = '1';
    muteWrapper.appendChild(muteStartButton);
    resolve(true);
  });
  const initMuteStopButton = new Promise((resolve) => {
    // Mask stop button ID
    muteStopButton.setAttribute('id', 'rs-mute-stop');
    muteStopButton.innerHTML = unmuteIcon;
    muteStopButton.style.cursor = 'not-allowed';
    muteStopButton.style.lineHeight = '1';
    resolve(true);
  });
  // Initial mask wrapper
  const initMaskWrapper = new Promise((resolve) => {
    // Mask wrapper ID
    maskWrapper.setAttribute('id', 'rs-mask');
    // Mask wrapper style
    maskWrapper.style.display = 'flex';
    maskWrapper.style.alignItems = 'center';
    maskWrapper.style.paddingLeft = '15px';
    maskWrapper.style.borderLeft = '1px solid #C9C9C9';
    // Append to wrapper
    wrapper.appendChild(maskWrapper);
    resolve(true);
  });
  const initMaskStartButton = new Promise((resolve) => {
    // Mask start button ID
    maskStartButton.setAttribute('id', 'rs-mask-start');
    maskStartButton.innerHTML = maskIcon;
    maskStartButton.style.cursor = 'pointer';
    maskStartButton.style.lineHeight = '1';
    maskWrapper.appendChild(maskStartButton);
    resolve(true);
  });
  const initMaskStopButton = new Promise((resolve) => {
    // Mask stop button ID
    maskStopButton.setAttribute('id', 'rs-mask-stop');
    maskStopButton.innerHTML = maskIcon;
    maskStopButton.style.cursor = 'pointer';
    maskStopButton.style.lineHeight = '1';
    resolve(true);
  });
  // Initial close button
  const initCloseButton = new Promise((resolve) => {
    // Close button ID
    closeButton.setAttribute('id', 'rs-close');
    closeButton.onclick = destroyElement;
    // Close button styles
    closeButton.style.height = '16px';
    closeButton.style.width = '16px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.position = 'absolute';
    closeButton.style.right = '0';
    closeButton.style.top = '0';
    closeButton.style.transform = 'translate(6px, -6px)';
    closeButton.style.border = '1px solid black';
    closeButton.style.backgroundColor = 'white';
    closeButton.style.borderRadius = '50%';
    closeButton.style.color = 'black';
    closeButton.style.fontSize = '8px';
    closeButton.style.display = 'flex';
    closeButton.style.alignItems = 'center';
    closeButton.style.justifyContent = 'center';
    closeButton.style.transition = 'all .3s ease';
    closeButton.style.visibility = 'hidden';
    closeButton.style.opacity = '0';
    closeButton.innerText = '✖';
    // Append to wrapper
    wrapper.appendChild(closeButton);
    resolve(true);
  });
  // Append wrapper to body
  const appendToBody = new Promise((resolve) => {
    document.body.appendChild(wrapper);
    resolve(true);
  });
  return Promise.all([
    initWrapper,

    initTimerWrapper,
    initTimer, // index[2] for resolve

    initRecordingButton,

    initRecordWrapper,
    initStartRecordButton,
    initStopRecordButton,

    initMuteWrapper,
    initMuteStartButton,
    initMuteStopButton,

    initMaskWrapper,
    initMaskStartButton,
    initMaskStopButton,

    initCloseButton,
    appendToBody,
  ]);
};
export const createElement = async (closeElement, startRecord, stopRecord, startMask, stopMask) => {
  maskStartButton.onclick = () => {
    startMask(true);
    maskStartButton.remove();
    maskWrapper.appendChild(maskStopButton);
  };
  maskStopButton.onclick = () => {
    stopMask(true);
    maskStopButton.remove();
    maskWrapper.appendChild(maskStartButton);
  };
  closeButton.onclick = () => closeElement(true);
  startRecordButton.onclick = () => {
    startRecord(true);
    startRecordButton.remove();
    recordWrapper.appendChild(stopRecordButton);
    blinkStopButton();
  };
  stopRecordButton.onclick = () => {
    stopRecord(true);
    stopRecordButton.remove();
    recordWrapper.appendChild(startRecordButton);
    clearInterval(blinkIntervalId);
  };
  // Return created element
  return new Promise((resolve) => finalizedElements().then(response => resolve(response[2])));
};
export const destroyElement = () => {
  clearInterval(blinkIntervalId);
  wrapper.remove();
  timerWrapper.remove();
  timerElement.remove();
  closeButton.remove();
  muteWrapper.remove();
  muteStartButton.remove();
  muteStopButton.remove();
  maskWrapper.remove();
  maskStartButton.remove();
  maskStopButton.remove();
  recordWrapper.remove();
  recordingButton.remove();
  startRecordButton.remove();
  stopRecordButton.remove();
};