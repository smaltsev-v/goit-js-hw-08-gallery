import gallery from './gallery-items.js';

const galleryListRef = document.querySelector('.js-gallery');
const modalImgRef = document.querySelector('.lightbox__image');
const modalRef = document.querySelector('.lightbox');
const buttonRef = document.querySelector('.lightbox__button');

const markup = gallery
  .map(
    ({ preview, original, description }, index) =>
      `<li class="gallery__item">
      <a class="gallery__link" href=''>
      <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" data-index="${index}"/> </a> </li>`,
  )
  .join('');

galleryListRef.innerHTML = markup;

const onOpenModalClick = e => {
  e.preventDefault();

  if (e.target.localName === 'img') {
    modalImgRef.src = e.target.dataset.source;
    modalImgRef.alt = e.target.alt;
    modalImgRef.dataset.index = e.target.dataset.index;

    modalRef.classList.add('is-open');
  }
};

const onKeyboardClick = e => {
  if (e.key === 'Escape') {
    modalRef.classList.remove('is-open');
  }
};

const onCloseModalClick = e => {
  if (e.target.localName !== 'img') {
    modalRef.classList.remove('is-open');

    modalImgRef.src = '';
    modalImgRef.alt = '';
  }
};

galleryListRef.addEventListener('click', onOpenModalClick);
window.addEventListener('keyup', onKeyboardClick);
window.addEventListener('click', onCloseModalClick);

window.addEventListener('keydown', e => {
  if (e.code === 'ArrowLeft') {
    onArrowLeft();
  }
  if (e.code === 'ArrowRight') {
    onArrowRight();
  }
});

function onArrowLeft() {
  let index = +modalImgRef.dataset.index;
  if (index === 0) {
    newSrc(gallery.length - 1);
    return;
  }
  newSrc(index, -1);
}
function onArrowRight() {
  let index = +modalImgRef.dataset.index;
  if (index === gallery.length - 1) {
    newSrc(0);
    return;
  }
  newSrc(index, 1);
}

function newSrc(index, step = 0) {
  modalImgRef.dataset.index = `${index + step}`;
  modalImgRef.src = gallery[index + step].original;
}
