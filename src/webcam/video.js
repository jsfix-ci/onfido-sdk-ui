const MediaRecorder = window.MediaRecorder

const handleDataAvailable = (event, recordedBlobs) => {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data)
  }
}

const handleStop = (event) => {
  console.log('Recorder stopped: ', event)
}

const videoOptions = () => {
  // TODO, These values are the same the MediaRecorder should have by default.
  // We identified that in recent Safari versions the defaults were not being respected
  // thus we have to add them here to ensure we control the bitrate and keep file sizes reasonable.
  //
  // Future improvement would be to make these configurable thru the webcam component if we have
  // different scenarios that require different bitrates on the web sdk
  const bitRate = {
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
  }
  let mimeTypes = [
    'video/webm;codecs=vp8,opus',
    'video/webm;codecs=vp8',
    'video/webm;codecs=vp9',
    'video/webm',
  ]
  let mimeType = ''
  for (let type in mimeTypes) {
    if (MediaRecorder.isTypeSupported(mimeTypes[type])) {
      mimeType = mimeTypes[type]
      break
    } else {
      console.log(`${mimeTypes[type]} is not Supported`)
    }
  }
  return {
    ...bitRate,
    mimeType: mimeType ? mimeType : '',
  }
}

export const createMediaRecorder = (stream) => {
  let options = videoOptions()
  try {
    return new MediaRecorder(stream, options)
  } catch (e) {
    console.error(`Exception while creating MediaRecorder: ${e}`)
    return
  }
}

export const startRecording = (mediaRecorder) => {
  let recordedBlobs = []
  mediaRecorder.onstop = handleStop
  mediaRecorder.ondataavailable = (e) => handleDataAvailable(e, recordedBlobs)
  mediaRecorder.start(10) // collect 10ms of data
  console.log('MediaRecorder started', mediaRecorder)
  return recordedBlobs
}
