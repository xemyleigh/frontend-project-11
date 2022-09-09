import axios from 'axios';

const parser = (url) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`);

export default parser;
