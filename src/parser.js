import axios from "axios";

const parser = (url) => {
  return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .catch(console.log)
}


export default parser

