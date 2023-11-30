import axios from 'axios';

const API_KEY = '40888657-ae0ce11af3f2249fd91388a4c';
const BASE_URL = 'https://pixabay.com/api/';
const perPage = 40;

async function fetchImages(query, page) {
  try {
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching images');
  }
}

export { fetchImages };