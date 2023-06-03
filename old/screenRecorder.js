import Observable from './Observable.js';
import saveData from './saveData.js';

class ScreenRecorder {
  constructor(options) {
    // Declare constraints
    this.displayMediaConstraints = options?.displayMediaConstraints ?? {audio: true, video: true};
    this.userMediaConstraints = options?.userMediaConstraints ?? {
      audio: {
        sampleSize: 100,
        frameRate: {max: 30},
        channelCount: 2,
      },
    };
    // Declare mime type
    this.mimeType = options?.mimeType ?? 'video/webm';
  }

  // Declare Stats
  videoStreamState;
  audioStreamState;
  // Start recording function
  startRecording = (stream) => {
    // Create a media recorder
    const recorder = new MediaRecorder(stream);
    // The stream data is stored in this array
    let data = [];
    // Push frames to array
    recorder.ondataavailable = (event) => data.push(event.data);
    // Start media recorder
    recorder.start();
    // Check if stream is stopped
    let stopped = new Promise((resolve, reject) => {
      recorder.onstop = resolve;
      recorder.onerror = (event) => reject(event.name);
    });
    // When stream is stopped, return data
    return Promise.all([stopped]).then(() => data);
  };
  renderStream = (stream) => {
    // Check if stream is stopped with browser button
    stream.getVideoTracks()[0].onended = () => this.stopRecording();
    this.startRecording(stream).then((recordedChunks) => {
      const mimeType = this.mimeType;
      // Create Blob and video file
      const recordedBlob = new Blob(recordedChunks, {type: mimeType});
      // Fire observer
      Observable.fire('stopped');
      // Test of File
      saveData(recordedBlob);
      console.info(`[avm-js] Successfully recorded ${recordedBlob.size} bytes of ${recordedBlob.type} media.`);
    });
  };
  // Stop recording function
  stopRecording = () => {
    // Stop every track of each stream
    if (this.videoStreamState) this.videoStreamState.getTracks().forEach((track) => track.stop());
    if (this.audioStreamState) this.audioStreamState.getTracks().forEach((track) => track.stop());
  };
  // Create mixed stream from display media and user media
  createStream = async () => {
    // Get display media
    this.videoStreamState = await navigator.mediaDevices.getDisplayMedia(this.displayMediaConstraints);
    // Get user media (Just Audio)
    try {
      this.audioStreamState = await navigator.mediaDevices.getUserMedia(this.userMediaConstraints);
      // Get Audio track of this moment
      const audioTrack = this.audioStreamState.getAudioTracks()[0];
      // Add microphone audio to display video
      this.videoStreamState.addTrack(audioTrack);
    } catch {
      // do nothing
      console.error('[avm-js] Microphone or system audio not found!')
    }
    // Return mixed stream
    return this.videoStreamState;
  };
  // Start get permission
  start = async () => {
    // Create recorded chunks and wait for stop
    await this.createStream().then((stream) => {
      this.renderStream(stream);
      return true;
    }).catch((error) => {
      if (error.name === 'NotFoundError') {
        console.error('Camera or microphone not found. Can\'t record.');
      } else {
        console.error(error);
      }
    });
  };
}

export default ScreenRecorder;