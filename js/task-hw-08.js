import galleryItems from './app.js';

const galleryRef = document.querySelector('.js-gallery');
const openModalRef = document.querySelector('.js-lightbox');
const imageAtModal = document.querySelector('.lightbox__image');

//вставляеи код галереи в разметку
galleryRef.insertAdjacentHTML('afterbegin', galleryItemsRender(galleryItems));

galleryRef.addEventListener('click', onClickOpenModal);

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
// функция открытия модального окна по клику на картинке
function onClickOpenModal(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  openModalRef.classList.add('is-open');
  imageAtModal.src = event.target.dataset.source;
  imageAtModal.alt = event.target.alt;
  openModalRef.addEventListener('click', onClickCloseModal);
  window.addEventListener('keydown', onKeyPressCloseModal);
}
// функция закрытия модального окна по клику мышкой
function onClickCloseModal(event) {
  if (
    event.target.classList.contains('lightbox__overlay') ||
    event.target.classList.contains('lightbox__button')
  ) {
    closeModal();
  }
}
// функция закрытия модального окна
function closeModal() {
  openModalRef.classList.remove('is-open');
  window.removeEventListener('keydown', onKeyPressCloseModal);
  imageAtModal.src = '';
  imageAtModal.alt = '';
}
// функция закрытия модального окна по нажатии кнопки
function onKeyPressCloseModal(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}
