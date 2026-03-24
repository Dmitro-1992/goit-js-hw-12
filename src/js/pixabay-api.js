import axios from "axios";

const API_KEY = "29372998-77c4088f99339c8fc310ed4d5";
const BASE_URL = "https://pixabay.com/api/";
const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page: PER_PAGE,
      },
    });

    // Возвращаем именно data, как требует задание
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
