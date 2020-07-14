import axios from 'axios'
import env from '../config/Environment'

const URL = env.apiHost

class Api {
  get = async (path) => {
    try {
      let response = await axios({
        method: 'GET',
        url: `${URL}${path}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response
    } catch(err) {
      return err.response
    }
  }
}

let api = new Api()
export default api