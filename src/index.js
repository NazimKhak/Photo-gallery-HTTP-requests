import renderCard from './card.js';
import PhotosApiService from './Api.js';

const refs = {
  input: document.querySelector('.search_form_txt'),
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.form_main'),
  loadMorebutton: document.querySelector('.loadmore_btn'),
};

refs.form.addEventListener('submit', onSearch);
const PhotoApiService = new PhotosApiService();

refs.loadMorebutton.addEventListener('click', onLoadMore);

function onSearch(ev) {
  ev.preventDefault();
  resetPhotosMarkups();
  PhotoApiService.query = ev.currentTarget.elements.query.value;
  if (PhotoApiService.query === '') {
    return console.log('Упс пустой инпут');
  }
  let promise = PhotoApiService.fetchPhotos();
  promise.then(photos => {
    resetPhotosMarkups();
    addPhotosToArticles(photos);
  });
  PhotoApiService.resetPage();
}

function onLoadMore() {
  PhotoApiService.fetchPhotos().then(photos => {
    addPhotosToArticles(photos);
  });
  console.log('sfsfsf');
}

function addPhotosToArticles(array) {
  array.forEach(element => {
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      renderCard(
        element.webformatURL,
        element.tags,
        element.likes,
        element.views,
        element.comments,
        element.downloads
      )
    );
  });
}

function resetPhotosMarkups() {
  refs.gallery.innerHTML = '';
}
