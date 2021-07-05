import galleryItems from './app.js';

const galleryRef = document.querySelector('.js-gallery');
const openModalRef = document.querySelector('.lightbox');
const closeModalRef = document.querySelector('[data-action=close-lightbox]');
const imageAtModal = document.querySelector('.lightbox__image');

// функция рендеринга галереи.
function galleryItemsRender(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
        </a>
    </li>
    `;
    })
    .join(' ');
}

//вставляеи код галереи в разметку
galleryRef.insertAdjacentHTML('afterbegin', galleryItemsRender(galleryItems));

galleryRef.addEventListener('click', event => {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  openModalRef.classList.add('is-open');
  imageAtModal.src = event.target.dataset.source;
  imageAtModal.alt = event.target.alt;
});

closeModalRef.addEventListener('click', event => {
  openModalRef.classList.remove('is-open');
  imageAtModal.src = '';
  imageAtModal.alt = '';
});
