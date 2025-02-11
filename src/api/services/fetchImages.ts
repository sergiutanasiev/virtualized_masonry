import { API_CONFIG } from "../../config/apiConfig";

const API_KEY = API_CONFIG.PEXEL.PEXEL_API_KEY;
const BASE_URL = API_CONFIG.PEXEL.PEXEL_BASE_URL;

export const fetchImages = async(query: string) => {
    try {
        const response = await fetch(`${BASE_URL}search?query=art&per_page=${query}`, {
            headers: {
                Authorization: API_KEY
            }
        })

        if (!response.ok) {
            throw new Error("FAILED FETCH IMAGES REQ !");
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}