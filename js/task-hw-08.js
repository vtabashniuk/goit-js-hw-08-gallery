import galleryItems from './app.js';

const galleryRef = document.querySelector('.js-gallery');

function galleryItemsRender(images) {
  return images
    .map(({ preview, description }) => {
      return `
    <li class="gallery__item">
        <a class="gallery__link">
            <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
    </li>
    `;
    })
    .join(' ');
}

galleryRef.insertAdjacentHTML('afterbegin', galleryItemsRender(galleryItems));