import initialModal, {addTitle, showModal} from './modal.js';
import {attachmentIcon, avatarIcon, submitIcon} from './svg.js';

/* todo add validation for form */
/* todo add loading for submit button */
/* todo destroy elements after reject permission */

const storeValues = {
  type: '1',
  priority: '3',
};

const onChangeValue = (event) => {
  const {name, value} = event.target;
  storeValues[name] = value;
};
const completeRequest = ({fullName, email, avatar}, {fileSize, fileName}, onSubmit) => {
  initialModal().then((modalContent) => {
    createModalContent({fullName, email, avatar}, {
      fileSize,
      fileName,
    }, onSubmit).then(([content, title, footer]) => {
      modalContent.appendChild(content).appendChild(footer);
      addTitle(title);
      showModal();
    });
  });
};
// Modal Sections
const createModalContent = async ({fullName, email, avatar}, {fileSize, fileName}, onSubmit) => {
  const content = new Promise((resolve) => resolve(createContent({fullName, email, avatar})));
  const title = new Promise((resolve) => resolve(createTitle()));
  const footer = new Promise((resolve) => resolve(createFooter({fileSize, fileName}, onSubmit)));
  return Promise.all([content, title, footer]);
};
const createContent = ({fullName, email, avatar}) => {
  const content = document.createElement('div');
  content.appendChild(createForm({fullName, email, avatar}));
  return content;
};
const createTitle = () => {
  const title = document.createElement('h1');
  title.style.fontSize = '20px';
  title.innerText = 'ارسال بازخورد';
  return title;
};
const createFooter = ({fileSize, fileName}, onSubmit) => {
  const footer = document.createElement('div');
  footer.style.display = 'flex';
  footer.style.justifyContent = 'space-between';
  footer.style.alignItems = 'center';
  // Attachment
  const attachmentWrapper = document.createElement('div');
  attachmentWrapper.style.display = 'flex';
  attachmentWrapper.style.alignItems = 'center';
  // Attachment Icon
  const icon = document.createElement('span');
  icon.innerHTML = attachmentIcon;
  attachmentWrapper.appendChild(icon);
  // Attachment Name
  const attachmentName = document.createElement('span');
  attachmentName.style.marginRight = '.5rem';
  attachmentName.style.direction = 'ltr';
  attachmentName.style.fontSize = '.75rem';
  attachmentName.innerText = `${fileName}.mp4`;
  attachmentWrapper.appendChild(attachmentName);
  // Attachment Time
  const attachmentSize = document.createElement('span');
  attachmentSize.style.marginRight = '.5rem';
  attachmentSize.style.direction = 'ltr';
  attachmentSize.style.fontSize = '.75rem';
  attachmentSize.style.color = '#646464';
  attachmentSize.innerText = fileSize;
  attachmentWrapper.appendChild(attachmentSize);
  footer.appendChild(attachmentWrapper);
  // Button Element
  const button = document.createElement('button');
  button.style.textAlign = 'center';
  button.style.whiteSpace = 'nowrap';
  button.style.padding = '0.375rem 0.75rem';
  button.style.color = '#FFF';
  // Accept Button
  const acceptButton = button.cloneNode(true);
  const acceptButtonText = document.createElement('span');
  const acceptButtonIcon = document.createElement('span');
  acceptButtonText.innerText = 'ارسال بازخورد';
  acceptButtonIcon.innerHTML = submitIcon;
  acceptButton.appendChild(acceptButtonText);
  acceptButton.appendChild(acceptButtonIcon);
  acceptButton.style.backgroundColor = '#3A86F2';
  acceptButton.style.border = '1px solid #3A86F2';
  acceptButton.style.borderRadius = '10px';
  acceptButton.onclick = () => onSubmit(storeValues);
  footer.appendChild(acceptButton);
  return footer;
};
// Form and Inputs
const createInput = (row, col, inputLabel, label, name, initialValue, hasPlaceholder) => {
  // Input
  const input = document.createElement('input');
  //// Input styles
  input.style.width = '100%';
  input.style.height = '2rem';
  //// Input properties
  input.setAttribute('id', name);
  input.setAttribute('name', name);
  input.setAttribute('type', 'text');
  if (hasPlaceholder) input.setAttribute('placeholder', label);
  input.style.border = '1px solid #E1E1E1';
  input.style.borderRadius = '6px';
  input.style.outline = 'none';
  input.style.height = '36px';
  input.style.lineHeight = '36px';
  input.style.on = '36px';
  input.onchange = onChangeValue;
  if (initialValue) input.value = initialValue;

  input.addEventListener('focus', function () {
    this.style.borderColor = '#5150AE';
  });

  // Label
  inputLabel.innerText = label;
  inputLabel.setAttribute('for', name);
  // Input and Label append to col
  col.appendChild(inputLabel);
  col.appendChild(input);
  // Col append to wrapper
  row.appendChild(col);
};
/*const createSelect = (row, col, selectLabel, options, label, name) => {
 // Select
 const select = document.createElement('select');
 //// Select styles
 select.style.width = '100%';
 select.style.height = '2rem';
 //// Select property
 select.setAttribute('id', name);
 select.setAttribute('name', name);
 select.onchange = onChangeValue;
 // Options
 const option = document.createElement('option');
 options.forEach(item => {
 const clone = option.cloneNode(true);
 clone.value = item.value;
 clone.innerText = item.label;
 select.appendChild(clone);
 });
 // Label
 selectLabel.innerText = label;
 selectLabel.setAttribute('for', name);
 // Select and Label append to col
 col.appendChild(selectLabel);
 col.appendChild(select);
 // Col append to wrapper
 row.appendChild(col);
 };*/
const createRadio = (row, col, options, active, label, name) => {

  // Create label
  const span = document.createElement('span');
  const groupLabel = span.cloneNode(true);
  groupLabel.innerText = `${label}:`;
  groupLabel.style.display = 'inline-block';
  groupLabel.style.marginLeft = '10px';

  // Create radio input
  const input = document.createElement('input');
  input.setAttribute('type', 'radio');
  input.setAttribute('name', name);
  input.style.visibility = 'hidden';
  input.style.position = 'absolute';
  input.onchange = onChangeValue;

  // Create radio label
  const radioLabel = document.createElement('label');
  radioLabel.style.marginLeft = '10px';
  radioLabel.style.height = '24px';
  radioLabel.style.border = `1px solid #D0D0D0`;
  radioLabel.style.padding = '0 8px';
  radioLabel.style.lineHeight = '24px';
  radioLabel.style.borderRadius = '6px';
  radioLabel.style.fontSize = '80%';
  radioLabel.style.display = 'inline-flex';
  radioLabel.style.alignItems = 'center';

  // Create badge
  const badge = span.cloneNode(true);
  badge.style.display = 'inline-block';
  badge.style.height = '8px';
  badge.style.width = '8px';
  badge.style.borderRadius = '50%';

  // Wrapper
  const div = document.createElement('div');
  div.style.display = 'flex';
  div.style.alignItems = 'center';
  div.style.position = 'relative';
  div.appendChild(groupLabel);

  // Reset all label styles to default
  const resetLabelsStyle = () => {
    options.forEach((item) => {
      const label = document.querySelector(`label[for="id-${name}-${item.value}"]`);
      label.style.borderColor = '#D0D0D0';
    });
  };
  const changeLabelStyle = (input, label) => {
    if (input.checked) {
      label.style.borderColor = '#5150AE';
    } else {
      label.style.borderColor = '#D0D0D0';
    }
  };

  options.forEach((item, index) => {

    const cloneInput = input.cloneNode(true);
    cloneInput.value = item.value;
    cloneInput.onchange = onChangeValue;
    cloneInput.setAttribute('id', `id-${name}-${item.value}`);

    const cloneLabel = radioLabel.cloneNode(true);

    if (item.color) {
      const cloneBadge = badge.cloneNode(true);
      cloneBadge.style.backgroundColor = item.color;
      cloneBadge.style.marginLeft = '5px';
      cloneLabel.appendChild(cloneBadge);
    }

    if (index === active ?? 0) {
      cloneInput.setAttribute('checked', 'checked');
      cloneLabel.style.borderColor = '#5150AE';
    }

    const cloneSpan = span.cloneNode(true);
    cloneSpan.innerText = item.label;

    cloneLabel.appendChild(cloneSpan);
    cloneLabel.setAttribute('for', `id-${name}-${item.value}`);

    div.appendChild(cloneInput);
    div.appendChild(cloneLabel);
    cloneInput.onclick = () => {
      resetLabelsStyle();
      changeLabelStyle(cloneInput, cloneLabel);
    };
  });

  col.appendChild(div);
  // Col append to wrapper
  row.appendChild(col);
};
const createTextArea = (row, col, textAreaLabel, label, name, hasPlaceholder) => {
  // TextArea
  const textArea = document.createElement('textarea');
  //// TextArea styles
  textArea.style.width = '100%';
  //// TextArea property
  textArea.setAttribute('id', name);
  textArea.setAttribute('name', name);
  textArea.setAttribute('rows', '6');
  if (hasPlaceholder) textArea.setAttribute('placeholder', label);
  textArea.style.border = '1px solid #E1E1E1';
  textArea.style.borderRadius = '6px';
  textArea.style.outline = 'none';
  textArea.onchange = onChangeValue;

  textArea.addEventListener('focus', function () {
    this.style.borderColor = '#5150AE';
  });

  // Label
  textAreaLabel.innerText = label;
  textAreaLabel.setAttribute('for', name);
  // TextArea and Label append to col
  col.appendChild(textAreaLabel);
  col.appendChild(textArea);
  // Col append to wrapper
  row.appendChild(col);
};
const createSenderInformation = (row, col, label, {fullName, avatar, email}) => {
  const div = document.createElement('div');
  div.style.marginBottom = '1rem';
  div.style.display = 'flex';
  div.style.alignItems = 'center';
  const span = document.createElement('span');
  // Label
  const labelSpan = span.cloneNode(true);
  labelSpan.innerText = label + ':';
  labelSpan.style.display = 'inline-block';
  labelSpan.style.marginLeft = '15px';
  // Avatar
  const localAvatar = avatarIcon;
  const img = document.createElement('img');
  img.setAttribute('alt', 'avatar');
  img.setAttribute('width', '36');
  img.setAttribute('height', '36');
  img.setAttribute('src', avatar ?? 'data:image/svg+xml;base64,' + btoa(localAvatar));
  img.style.borderRadius = '50%';
  img.style.marginLeft = '15px';
  // Information
  const infoSpan = span.cloneNode(true);
  infoSpan.style.display = 'inline-flex';
  infoSpan.style.flexDirection = 'column';
  // Full name
  const fullNameSpan = span.cloneNode(true);
  fullNameSpan.style.fontSize = '11px';
  fullNameSpan.style.color = '#7B7B7B';
  fullNameSpan.innerText = fullName;
  // Email
  const emailSpan = span.cloneNode(true);
  emailSpan.innerText = email;
  emailSpan.style.fontSize = '12px';

  infoSpan.appendChild(emailSpan);
  infoSpan.appendChild(fullNameSpan);

  div.appendChild(labelSpan);
  div.appendChild(img);
  div.appendChild(infoSpan);

  col.appendChild(div);
  row.appendChild(col);
};
const createRadioWrapper = (row, col) => {
  const div = document.createElement('div');
  const container = div.cloneNode(true);
  const wrapper = div.cloneNode(true);
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'center';
  wrapper.style.justifyContent = 'space-between';
  const innerCol = div.cloneNode(true);

  // kind
  ///// Bug: 1
  ///// Report: 2
  const kindOptions = [
    {label: 'باگ', value: '1', color: '#EF0303'},
    {label: 'گزارش', value: '2', color: '#0FE800'},
  ];
  createRadio(wrapper, innerCol.cloneNode(true), kindOptions, 0, 'نوع بازخورد', 'type');

  // Priority
  //// highest: 1
  //// high: 2
  //// medium: 3
  //// low: 4
  //// lowest: 5
  //// critical: 6
  const priorityOptions = [
    {label: 'کم', value: '4', color: '#F79008'},
    {label: 'متوسط', value: '3', color: '#2A70FE'},
    {label: 'زیاد', value: '2', color: '#E14EB6'},
  ];
  createRadio(wrapper, innerCol.cloneNode(true), priorityOptions, 1, 'اولویت', 'priority');
  container.appendChild(wrapper);
  col.appendChild(container);
  // Col append to wrapper
  row.appendChild(col);
};
const createForm = ({fullName, email, avatar}) => {
  // Wrapper
  const wrapper = document.createElement('div');
  //// Wrapper styles
  wrapper.style.width = '100%';
  wrapper.style.paddingRight = '15px';
  wrapper.style.paddingLeft = '15px';
  wrapper.style.marginRight = 'auto';
  wrapper.style.marginLeft = 'auto';
  // Row
  const row = document.createElement('div');
  //// Row styles
  row.style.display = 'flex';
  row.style.flexWrap = 'wrap';
  row.style.marginRight = '-30px';
  row.style.marginLeft = '-30px';
  row.style.marginBottom = '1rem';
  wrapper.appendChild(row);
  // Col
  const col = document.createElement('div');
  //// Col styles
  col.style.position = 'relative';
  col.style.width = '100%';
  col.style.paddingRight = '15px';
  col.style.paddingLeft = '15px';
  col.style.maxWidth = '100%';
  col.style.flexGrow = '1';
  col.style.flexBasis = '0';
  col.style.marginBottom = '1rem';
  // Divider
  const divider = document.createElement('div');
  //// Divider styles
  divider.style.width = '100%';
  // Input Label
  const inputLabel = document.createElement('label');
  //// Input Label styles
  inputLabel.style.marginBottom = '.5rem';
  // Create sender information
  createSenderInformation(row, col.cloneNode(true), 'فرستنده', {
    fullName,
    avatar,
    email,
  });
  row.appendChild(divider.cloneNode(true));
  createRadioWrapper(row, col.cloneNode(true));
  row.appendChild(divider.cloneNode(true));
  // Subject
  createInput(row, col.cloneNode(true), inputLabel.cloneNode(true), 'موضوع', 'subject', '');
  row.appendChild(divider.cloneNode(true));
  // Description
  createTextArea(row, col.cloneNode(true), inputLabel.cloneNode(true), 'توضیحات', 'description');
  return wrapper;
};
export default completeRequest;