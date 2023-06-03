import completeRequest from './completeRequest.js';
import {hideModal} from './modal.js';

/* todo move store to separate file */
export const initialInfo = {
  store: {
    fullName: null,
    email: null,
    avatar: null,
    requestUrl: null,
    apiKey: null,
  },
  get info() {
    return this.store;
  },
  set info(info) {
    this.store = info ?? {
      fullName: undefined,
      email: undefined,
      avatar: undefined,
      requestUrl: undefined,
      apiKey: undefined,
    };
  },
};

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function createName() {
  const now = new Date();
  const yyyy = now.getFullYear();
  let mm = now.getMonth() + 1; // Months start at 0!
  let dd = now.getDate();
  let HH = now.getHours();
  let MM = now.getMinutes();
  let SS = now.getSeconds();

  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;
  if (HH < 10) HH = `0${HH}`;
  if (MM < 10) MM = `0${MM}`;
  if (SS < 10) SS = `0${SS}`;
  return `${yyyy}-${mm}-${dd}_-_${HH}:${MM}:${SS}`;
}

const fileName = createName();

const request = async (recordedBlob, values) => {

  const file = new File([recordedBlob], fileName);
  const formData = new FormData();

  const description = {
    'FullName': initialInfo.info.fullName,
    'Subject': values['subject'],
    'Description': values['description'],
    'Type': values['type'],
    'Priority': values['priority'],
    'apiKey': initialInfo.info.apiKey,
  };

  formData.append('File', file, `${fileName}.webm`);
  formData.append('Description', JSON.stringify(description));

  const response = await fetch(initialInfo.info.requestUrl, {
    method: 'POST',
    body: formData,
  });

  response.json().then(response => {
    console.log(response);
    console.info(`[avm-js] Response: ${response}`);
  }).catch(error => {
    console.error(`[avm-js] ${error}`);
  });
  hideModal();
};

const saveData = (function () {
  return function (recordedBlob) {
    const fileSize = formatBytes(recordedBlob.size, 2);
    completeRequest(initialInfo.info, {fileSize, fileName}, (values) => values && request(recordedBlob, values));
  };
}());

export default saveData;