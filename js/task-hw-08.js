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
            <img class="gallery__image" loading="lazy" src="${preview}" data-source="${original}" alt="${description}" />
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
  window.addEventListener('keydown', onKeyPressEvent);
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

// функция обработки события нажатии кнопки на коавиатуре
function onKeyPressEvent(event) {
  const currenImagetIndex = getIndexOfCurrentImage(imageAtModal.alt);
  //   if (event.code === 'ArrowLeft') {
  //     renderPreviousImage(currenImagetIndex);
  //   } else if (event.code === 'ArrowRight') {
  //     renderNextImage(currenImagetIndex);
  //   } else if (event.code === 'Escape') {
  //     closeModal();
  //   }

  switch (event.code) {
    case 'ArrowLeft':
      renderPreviousImage(currenImagetIndex);
      break;
    case 'ArrowRight':
      renderNextImage(currenImagetIndex);
      break;
    case 'Escape':
      closeModal();
      break;
    default:
  }
}

// функция рендеринга предыдущей картинки
function renderPreviousImage(indexOfImage) {
  if (indexOfImage === 0) {
    indexOfImage = galleryItems.length;
  }
  const { original, description } = galleryItems.find(
    item => galleryItems.indexOf(item) === indexOfImage - 1,
  );

  imageAtModal.src = original;
  imageAtModal.alt = description;
}

// функция рендеринга следующей картинки
function renderNextImage(indexOfImage) {
  if (indexOfImage === galleryItems.length - 1) {
    indexOfImage = -1;
  }
  const nextElement = galleryItems.find(
    item => galleryItems.indexOf(item) === indexOfImage + 1,
  );

  imageAtModal.src = nextElement.original;
  imageAtModal.alt = nextElement.description;
}

// функция закрытия модального окна
function closeModal() {
  openModalRef.classList.remove('is-open');
  window.removeEventListener('keydown', onKeyPressEvent);
  imageAtModal.src = '';
  imageAtModal.alt = '';
}

// функция поиска индекса текущей картинки в массиве
function getIndexOfCurrentImage(currentImageAlt) {
  return galleryItems.findIndex(
    ({ description }) => description === currentImageAlt,
  );
}
