import { selector } from "recoil"
import {getAllRatings} from "../../requests/ratings";

export const ratingsSelector = selector({
    key: 'ratingsSelector',
    get: async () => {
        const response = await getAllRatings();
        return response;
    }
});