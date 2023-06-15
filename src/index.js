import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import axios from 'axios';

const API_KEY = '37228080-31d2118f700db371d754d6a1e';
const input = document.querySelector('.search-input');
const elem = document.querySelector('.gallery');
const searchBtn = document.querySelector('button');
const loadMoreBtn = document.querySelector('.button-85');
loadMoreBtn.style.display = 'none';
const lightbox = new SimpleLightbox('.gallery a');

let page = 1;

async function search(event) {
  page = 1
  event.preventDefault();
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${input.value}&image_type=photo&page=${page}&per_page=40`;
  elem.innerHTML = '';

 await axios.get(url)
    .then(response => {
      const data = response.data;
      console.log(data.hits);

      if (data.hits.length === 0) {
        console.log('No results found');
        loadMoreBtn.style.display = 'none';
        Notiflix.Notify.failure('Sorry, there are no matching images :(');
      } else {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        data.hits.forEach(element => {
          const photoCard = document.createElement('div');
          photoCard.className = 'photo-card';
          photoCard.innerHTML = `
            <a class="photo-link" href="${element.webformatURL}" target="_blank">
              <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" width="360" />
            </a>
            <div class="info">
              <p class="info-item">
                <b>Likes:</b> ${element.likes}
              </p>
              <p class="info-item">
                <b>Views:</b> ${element.views}
              </p>
              <p class="info-item">
                <b>Comments:</b> ${element.comments}
              </p>
              <p class="info-item">
                <b>Downloads:</b> ${element.downloads}
              </p>
            </div>
          `;
          elem.appendChild(photoCard);
        });
        loadMoreBtn.style.display = 'block';

        lightbox.refresh();
        
      }
    })
    .catch(error => {
      console.error(error);
    });
}

searchBtn.addEventListener('click', search);


loadMoreBtn.addEventListener('click', () => {
  page++;
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${input.value}&image_type=photo&page=${page}&per_page=40`;

  axios.get(url)
    .then(response => {
      const data = response.data;
      console.log(data.hits);

      if (data.hits.length === 0) {
        console.log('No results found');
        Notiflix.Notify.failure('Sorry, there are no more images.');
        loadMoreBtn.style.display = 'none';
      } else {
        data.hits.forEach(element => {
          const photoCard = document.createElement('div');
          photoCard.className = 'photo-card';
          photoCard.innerHTML = `
            <a class="photo-link" href="${element.webformatURL}" target="_blank">
              <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" width="360" />
            </a>
            <div class="info">
              <p class="info-item">
                <b>Likes:</b> ${element.likes}
              </p>
              <p class="info-item">
                <b>Views:</b> ${element.views}
              </p>
              <p class="info-item">
                <b>Comments:</b> ${element.comments}
              </p>
              <p class="info-item">
                <b>Downloads:</b> ${element.downloads}
              </p>
            </div>
          `;
          elem.appendChild(photoCard);
        });
        
       
        lightbox.refresh();
      }
    })
    .catch(error => {
      console.error(error);
    });
});

