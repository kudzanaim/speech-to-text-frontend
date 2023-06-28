import axios from 'axios'

export const postAudio = (audioBuffer, setApiStatus) => async(dispatch) => {
  try {
    const bodyFormData = new FormData()
    bodyFormData.append('file', audioBuffer)
    setApiStatus('PENDING')
    
    const posts = await axios({
      headers: { "Content-Type": "multipart/form-data" },
      data: bodyFormData,
      method: "post",
      url: "https://speech-to-text-chatgpt-backend-ug7x7udhmq-pd.a.run.app/processAudio"
    })
    .then(response => response)
    .catch(e => { throw e.message })

    posts.data?.poem && setApiStatus('SUCCESS')

    return dispatch({
      type: 'SET_POSTS',
      payload: posts.data?.poem
    })
  } catch (e) {
    setApiStatus('ERROR')
    return e.message
  }
}