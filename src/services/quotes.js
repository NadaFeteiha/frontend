
const BASE_URL = "https://api.unsplash.com/";
const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
/**
 * @param {string} orientation
 * @param {string} quote
 * @param {number} per_page
 * @description Fetch a quote image from Unsplash API
 */
export async function getQuoteImgs(orientation = "landscape", quote = "study quotes", per_page = 10) {
    try {
        const response = await fetch(`${BASE_URL}search/photos?query=${quote}&orientation=${orientation}&per_page=${per_page}&page=1&client_id=${API_KEY}`);
        if (!response.ok) {
            throw new Error("Failed to fetch quote");
        }

        const data = await response.json();
        const images = data.results
            .sort(() => 0.5 - Math.random())
            .slice(0, 2)
            .map(result => result.urls.regular);

        return images;
    } catch (error) {
        console.error(error);
    }
}

function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
}
