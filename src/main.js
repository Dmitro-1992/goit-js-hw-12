import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from "./js/render-functions.js";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more-btn");

let currentPage = 1;
let currentQuery = "";
let totalHits = 0;

form.addEventListener("submit", handleSubmit);
loadMoreBtn.addEventListener("click", loadMoreImages);

async function handleSubmit(event) {
  event.preventDefault();
  const query = event.target.elements["search-text"].value.trim();
  if (!query) return;

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.warning({ title: "No results", message: "Sorry, no images found." });
      hideLoader();
      return;
    }

    createGallery(data.hits);

    if (currentPage * 15 < totalHits) showLoadMoreButton();
  } catch {
    iziToast.error({ title: "Error", message: "Failed to fetch images." });
  } finally {
    hideLoader();
  }
}

async function loadMoreImages() {
  currentPage++;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);

    const { height: cardHeight } = document.querySelector(".gallery a").getBoundingClientRect();
    window.scrollBy({ top: cardHeight * 2, behavior: "smooth" });

    if (currentPage * 15 >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({ title: "End", message: "We're sorry, but you've reached the end of search results." });
    } else showLoadMoreButton();
  } catch {
    iziToast.error({ title: "Error", message: "Failed to fetch more images." });
  } finally {
    hideLoader();
  }
}