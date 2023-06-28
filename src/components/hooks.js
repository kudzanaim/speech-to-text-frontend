import { useState } from "react"

export const useRecordVoice = ({ props, isRecording, setIsRecording}) => {
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [apiStatus, setApiStatus] = useState('UNINIT')
  const startRecordingVoice = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream)
          const audioChunks = []
          mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data)
          mediaRecorder.onstop = () => props.postAudio(new Blob(audioChunks), setApiStatus)
          mediaRecorder.start()
          setMediaRecorder(mediaRecorder)
        }).catch((err) => {
          alert(`The following getUserMedia error occurred: ${err}`)
        })
    } else {
      alert("getUserMedia not supported on your browser!")
    }
  }

  const pauseButtonClickhandler = () => {
    if(apiStatus !== 'PENDING') {
      !isRecording && startRecordingVoice()
      if(isRecording && mediaRecorder) {
        setMediaRecorder(null)
        mediaRecorder?.stop()
      }
      setIsRecording(!isRecording)
    }
  }

  return {
    pauseButtonClickhandler,
    apiStatus, 
  }
}