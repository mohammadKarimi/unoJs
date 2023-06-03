// Create wrapper element
const element = document.createElement('div');
// Create timer element
const timerElement = document.createElement('span');
const closeButton = document.createElement('span');
// Finalizing elements
const finalizedElements = async () => {
  // Finalized wrapper
  const finalizedWrapper = new Promise((resolve) => {
    // Wrapper styles
    element.style.position = 'fixed';
    element.style.left = '25px';
    element.style.bottom = '25px';
    element.style.height = '25px';
    element.style.backgroundColor = 'rgba(0, 0, 0, .75)';
    element.style.border = '1px solid rgba(255, 255, 255, 1)';
    element.style.borderRadius = '2px';
    element.style.padding = '8px 6px';
    element.style.display = 'flex';
    element.style.alignItems = 'center';
    element.style.color = 'white';
    element.style.fontFamily = '"Roboto mono",monospace';
    element.style.fontSize = '14px';
    resolve(element);
  });
  // Finalized timer
  const finalizedTimer = new Promise((resolve) => {
    timerElement.setAttribute('id', 'rs-timer');
    timerElement.style.marginRight = '4px';
    timerElement.innerText = '00:00';
    element.appendChild(timerElement);
    resolve(timerElement);
  });
  // Finalized close button
  const finalizedCloseButton = new Promise((resolve) => {
    closeButton.setAttribute('id', 'rs-close');
    closeButton.style.height = '12px';
    closeButton.style.width = '12px';
    closeButton.style.display = 'inline-flex';
    closeButton.style.alignItems = 'center';
    closeButton.style.justifyContent = 'center';
    closeButton.style.marginLeft = '4px';
    closeButton.style.cursor = 'pointer';
    closeButton.innerHTML = `<svg viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'><line x1='1' y1='11' x2='11' y2='1' stroke='white' stroke-width='2' /><line x1='1' y1='1' x2='11' y2='11' stroke='white' stroke-width='2' /></svg>`;
    element.appendChild(closeButton);
    resolve(true);
  });
  // Append wrapper to body
  const appendToBody = new Promise((resolve) => {
    document.body.appendChild(element);
    resolve(true);
  });
  return Promise.all([finalizedTimer, finalizedWrapper, finalizedCloseButton, appendToBody]);
};
export const createTimer = async (stopRecord) => {
  closeButton.onclick = () => stopRecord(true);
  // Return created element
  return new Promise((resolve) => finalizedElements().then(response => resolve(response[0])));
};
export const destroyTimer = () => {
  element.remove();
  timerElement.remove();
};