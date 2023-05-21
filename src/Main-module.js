import renderCard from './card.js';
import PhotosApiService from './Api.js';
import LoadmoreButtonSettings from './loadmore_btn.js';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

var lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});
lightbox.on('show.simplelightbox', function () {
  // do something…
});

const refs = {
  input: document.querySelector('.searsch_form_txt'),
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.form_main'),
};
refs.gallery.addEventListener('click', onclickOpenFullSize);
refs.form.addEventListener('submit', onSearch);

const PhotoApiService = new PhotosApiService();
const loadMorebuttonExample = new LoadmoreButtonSettings({
  selector: '#button_add',
  hidden: true,
});
loadMorebuttonExample.refs.button.addEventListener('click', loadMore);

function onSearch(ev) {
  ev.preventDefault();
  loadMorebuttonExample.show();
  PhotoApiService.query = ev.currentTarget.elements.query.value;
  if (PhotoApiService.query === '') {
    return console.log('Упс пустой инпут');
  }

  PhotoApiService.resetPage();

  loadMorebuttonExample.disable();
  resetPhotosMarkups();
  fetchPhotos1();
}

function fetchPhotos1(arguments) {
  loadMorebuttonExample.disable();
  PhotoApiService.fetchPhotos().then(photos => {
    addPhotosToArticles(photos);
    loadMorebuttonExample.enable();
  });
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
        element.downloads,
        element.largeImageURL
      )
    );
  });
  scroll();
}

function resetPhotosMarkups() {
  refs.gallery.innerHTML = '';
}
function loadMore() {
  fetchPhotos1();
}

function scroll() {
  window.scrollBy({
    top: 800,
    behavior: 'smooth',
  });
}

function onclickOpenFullSize() {
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  simpleLightbox.open();
}
