import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import octagonIcon from '../img/bi_x-octagon.svg';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const ulElem = document.querySelector('ul.gallery');
let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
export const showError = text => {
  iziToast.show({
    message: text,
    position: 'center',
    iconUrl: octagonIcon,
    iconColor: '#FFFFFF',
    backgroundColor: '#EF4040',
    messageColor: '#FFFFFF',
    progressBarColor: '#B51B1B',
  });
};
export const showGallery = images => {
  function imageTemplate({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) {
    return `
<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img
      class="gallery-image"
      src="${webformatURL}"
      alt="${tags}"
    />
  </a>
  <div class = "image-info-block">
    <div class = "image-info-block-part">
      <p class="bold">Likes</p>
      <p></p>${likes}</p>
  </div>
    <div class = "image-info-block-part">
    <p class="bold">Views</p>
    <p>${views}</p>
  </div>
  <div class = "image-info-block-part">
    <p class="bold">Comments</p>
    <p>${comments}</p>
  </div>
  <div class = "image-info-block-part">
    <p class="bold">Downloads</p>
    <p>${downloads}</p>
  </div>
</div>
</li>
`;
  }
  ulElem.innerHTML = images.map(imageTemplate).join('');
  gallery.refresh();
};

export const clearGallery = () => {
  ulElem.innerHTML = '';
};
