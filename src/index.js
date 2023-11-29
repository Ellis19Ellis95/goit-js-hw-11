import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';


const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');


let page = 1;
let searchQuery = '';


form.addEventListener('submit', handleSubmit);


async function handleSubmit(event) {
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

    handleEndOfResults(response.data.hits.length);
    smoothScrollToNextGroup();
  } catch (error) {
    handleFetchError(error);
  }
}

loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleLoadMore() {
    page++;
    
    try {
      const response = await fetchImages(searchQuery, page);
      const newImages = response?.data?.hits;
    
      if (!response || !newImages || newImages.length === 0) {
        throw new Error('No valid response or new images found.');
      }
    
      handleImages(newImages);
    
      handleEndOfResults(response.data.hits.length);
      scrollToNewImages();
    } catch (error) {
      console.error('Error fetching more images: ', error);
      Notiflix.Notify.failure('Oops! Something went wrong while loading more images.');
    }
  }
  
  function handleLoadMoreError(error) {
    console.error('Error fetching more images: ', error);
    Notiflix.Notify.failure('Oops! Something went wrong while loading more images.');
  }

function fetchImages(query, page) {
  const API_KEY = '40888657-ae0ce11af3f2249fd91388a4c';
  const BASE_URL = 'https://pixabay.com/api/';
  const perPage = 40;

  return axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
}

function createInfoBlock(image) {
    const description = document.createElement('div');
    description.classList.add('description');
  
    const infoWrapper = document.createElement('div');
  
    const infoItems = ['Likes', 'Views', 'Comments', 'Downloads'];
  
    infoItems.forEach(item => {
      const infoItem = document.createElement('span');
      infoItem.classList.add('info-item');
      infoItem.innerHTML = `<b>${item}:</b>`;
  
      const infoValue = document.createElement('span');
      infoValue.classList.add('info-value');
      infoValue.textContent = image[item.toLowerCase()];
  
      infoWrapper.appendChild(infoItem);
      infoWrapper.appendChild(infoValue);
    });
  
    infoWrapper.classList.add('info-wrapper');
    description.appendChild(infoWrapper);
  
    return description;
  }
  
  function handleImages(images) {
    const columns = 4;
    const columnContainers = Array.from({ length: columns }, () => {
      const column = document.createElement('div');
      column.classList.add('column');
      return column;
    });
  
    images.forEach((image, index) => {
      const photoCard = document.createElement('div');
      photoCard.classList.add('photo-card');
  
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('image-container');
  
      const imgLink = document.createElement('a');
      imgLink.href = image.largeImageURL;
  
      const img = document.createElement('img');
      img.src = image.webformatURL;
      img.alt = image.tags;
      img.loading = 'lazy';
  
      imgLink.appendChild(img);
      imgContainer.appendChild(imgLink);
      photoCard.appendChild(imgContainer);
  
      const infoBlock = createInfoBlock(image); 
      photoCard.appendChild(infoBlock);
  
      const columnIndex = index % columns;
      columnContainers[columnIndex].appendChild(photoCard);
    });
  
    columnContainers.forEach(column => {
      const columnContainer = document.createElement('div');
      columnContainer.classList.add('column-container');
      columnContainer.appendChild(column);
      gallery.appendChild(columnContainer);
    });
  
    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
  }

function handleEndOfResults(imagesLength) {
  if (imagesLength < 40) {
    loadMoreBtn.style.display = 'none';
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

function scrollToNewImages() {
  const firstNewImage = document.querySelector('.column-container:last-child');
  if (firstNewImage) {
    firstNewImage.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function smoothScrollToNextGroup() {
  
}
 async function handleSubmit(event) {
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
    
    if (response.data.hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    handleImages(response.data.hits);

    const totalHits = response.data.totalHits;
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

    handleEndOfResults(response.data.hits.length);
    smoothScrollToNextGroup();
  } catch (error) {
    handleFetchError(error);
  }
}

function handleFetchError(error) {
  console.error('Error fetching images: ', error);
  Notiflix.Notify.failure('Oops! Something went wrong. Please try again.');
}

loadMoreBtn.style.display = 'none';  