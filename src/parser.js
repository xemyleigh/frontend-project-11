import axios from "axios";

const parser = (url) => {
  return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then(response => {
      console.log(response)
      console.log(response.status)
      return response
    })
}


export default parser

