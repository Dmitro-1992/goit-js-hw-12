import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more-btn");

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});
export function createGallery(images) {
  const markup = images.map(
    ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <a href="${largeImageURL}" class="gallery-link">
      <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p><span>❤️ Likes:</span><span>${likes}</span></p>
          <p><span>👁 Views:</span><span>${views}</span></p>
          <p><span>💬 Comments:</span><span>${comments}</span></p>
          <p><span>⬇ Downloads:</span><span>${downloads}</span></p>
        </div>
      </div>
    </a>
  `
  ).join("");

  galleryContainer.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}
export function clearGallery() {
  galleryContainer.innerHTML = "";
}

export function showLoader() {
  loader.classList.add("visible");
}

export function hideLoader() {
  loader.classList.remove("visible");
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.add("visible");
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.remove("visible");
}