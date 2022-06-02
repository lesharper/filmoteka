import { selector } from "recoil"
import {getAllCategory} from "../../requests/categories";

export const categorySelector = selector({
    key: 'categorySelector',
    get: async () => {
        const response = await getAllCategory();
        return response;
    }
});