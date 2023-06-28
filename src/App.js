import './App.css'
import { connect } from "react-redux"
import { postAudio } from './components/actions'
import { useState } from 'react'
import { useRecordVoice } from './components/hooks'

const App = (props) => {
  const [isRecording, setIsRecording] = useState(false)
  const buttonBorderStyle = isRecording ? '5px solid rgb(220 49 49)' : 'solid 5px #f4f4f4'
  const { pauseButtonClickhandler, apiStatus } = useRecordVoice({
    setIsRecording,
    isRecording,
    props
  })
  
  const buttonInnerIcon = apiStatus === 'PENDING' ? 'bg-[#e2e2e2]' : (
    isRecording ? 'bg-white' : 'bg-red-500 rounded-full')

  return (
    <div className='app-body'>
      <div className="body-inner">
        
        <div style={{boxShadow: 'rgb(193 188 188) 0px 4px 20px 14px'}} 
          className='bg-white relative'>
          <div className="media-controls pt-4">
            <div className="media-controls-container">
              <div className="media-controls-buttons flex justify-center">
                <div style={{border: buttonBorderStyle}} onClick={pauseButtonClickhandler}
                  className={`record-button rounded-full h-[100px] w-[100px] border 
                  ${apiStatus !== 'PENDING' && 'cursor-pointer'} flex justify-center
                  items-center shadow-[0px_0px_8px_-2px_rgba(0,0,0,0.5)]
                  hover:scale-[0.9] duration-[0.6s] ${isRecording ? 'bg-500' : 'bg-[#f9f9f9]'}`}>
                    <div className={`record-button-dot ${buttonInnerIcon} duration-[0.2s] h-[25px] w-[25px]`}/>
                </div>
              </div>
            </div>
          </div>
          <div className="poems-container text-center p-4">
            <div className="poem-header font-bold text-[30px] pb-2">Ask a Question</div>
            <div className="media-controls-text p-[15px_10px] text-[13px]
              rounded-md bg-[#dfdfdf]">
              For example say, <u>Create a poem of a yellow duck</u>
            </div>
          </div>
        </div>

        <div className="poem-content overflow-hidden h-[60vh]
          w-[100%] flex justify-center">
            {apiStatus === 'PENDING' && (
              <div className='relative top-20'>Processing Your Question...</div>
            )}
            {apiStatus === 'SUCCESS' && (
              <div className='whitespace-break-spaces overflow-scroll
                p-[18px] pb-[100px] w-[max-content]'>
                <div className='bg-[#e9e9e9] p-[30px] rounded-lg' dangerouslySetInnerHTML={{__html: props.poems}}/>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default connect(
  ({ poems }) => ({ poems }), 
  (dispatch) => ({
    postAudio: (data, setApiStatus) => dispatch(postAudio(data, setApiStatus))
  }) 
)(App)
