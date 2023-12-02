 
const gallery = document.querySelector('.gallery');

function createInfoBlock(image) {
    const infoItems = ['Likes', 'Views', 'Comments', 'Downloads'];
    const infoWrapper = document.createElement('div');
    infoWrapper.classList.add('info-wrapper');
  
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
  
    const description = document.createElement('div');
    description.classList.add('description');
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
  
    const columnElements = columnContainers.map(column => {
      const columnContainer = document.createElement('div');
      columnContainer.classList.add('column-container');
      return columnContainer;
    });
  
    const photoCards = images.map(image => {
      const photoCard = document.createElement('div');
      photoCard.classList.add('photo-card');
  
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('image-container');
  
      const imgLink = document.createElement('a');
      imgLink.href = `${image.largeImageURL}`;
  
      const img = document.createElement('img');
      img.src = `${image.webformatURL}`;
      img.alt = `${image.tags}`;
      img.loading = 'lazy';
  
      imgLink.appendChild(img);
      imgContainer.appendChild(imgLink);
      photoCard.appendChild(imgContainer);
  
      const infoBlock = createInfoBlock(image);
      photoCard.appendChild(infoBlock);
  
      return photoCard;
    });
  
    const gallery = document.querySelector('.gallery');
  
    photoCards.forEach((photoCard, index) => {
      const columnIndex = index % columns;
      columnElements[columnIndex].appendChild(photoCard);
    });
  
    columnElements.forEach(columnElement => {
      const column = document.createElement('div');
      column.classList.add('column');
      column.appendChild(columnElement);
      gallery.appendChild(column);
    });
  
    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
  }
  

  export { handleImages, };