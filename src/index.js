import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let searchQuery = '';

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  gallery.innerHTML = '';
  page = 1;
  searchQuery = event.target.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    Notiflix.Notify.warning('Please enter a search term!');
    return;
  }

  try {
    const response = await fetchImages(searchQuery, page);
    handleImages(response.data.hits);

    const totalHits = response.data.totalHits;
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    
    if (response.data.hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    if (response.data.hits.length < 40) {
      loadMoreBtn.style.display = 'none';
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    } else {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.error('Error fetching images: ', error);
    Notiflix.Notify.failure('Oops! Something went wrong. Please try again.');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page++;

  try {
    const response = await fetchImages(searchQuery, page);
    handleImages(response.data.hits);

    const totalHits = response.data.totalHits;
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    
    if (response.data.hits.length < 40) {
      loadMoreBtn.style.display = 'none';
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.error('Error fetching more images: ', error);
    Notiflix.Notify.failure('Oops! Something went wrong while loading more images.');
  }
});

function fetchImages(query, page) {
  const API_KEY = '40888657-ae0ce11af3f2249fd91388a4c';
  const BASE_URL = 'https://pixabay.com/api/';
  const perPage = 40;

  return axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
}

function handleImages(images) {
  const lightbox = new SimpleLightbox('.gallery a');

  images.forEach(image => {
    const photoCard = document.createElement('div');
    photoCard.classList.add('photo-card');

    const imageLink = document.createElement('a');
    imageLink.href = image.largeImageURL;

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;
    img.loading = 'lazy';

    const info = document.createElement('div');
    info.classList.add('info');

    const infoItems = ['Likes', 'Views', 'Comments', 'Downloads'];
    infoItems.forEach(item => {
      const p = document.createElement('p');
      p.classList.add('info-item');
      p.innerHTML = `<b>${item}:</b> ${image[item.toLowerCase()]}`;
      info.appendChild(p);
    });

    imageLink.appendChild(img);
    photoCard.appendChild(imageLink);
    photoCard.appendChild(info);
    gallery.appendChild(photoCard);
  });

  lightbox.refresh();
}