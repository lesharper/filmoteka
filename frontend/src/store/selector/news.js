import { selector } from "recoil"
import {getAllNews} from "../../requests/news";

export const newsSelector = selector({
    key: 'newsSelector',
    get: async () => {
        const response = await getAllNews();
        return response;
    }
});