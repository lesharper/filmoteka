import { selector } from "recoil"
import {getAllFavorite} from "../../requests/favorites";
import {authSelector} from "./auth";

export const favoriteSelector = selector({
    key: 'favoriteSelector',
    get: async ({get}) => {
        const isAuth = get(authSelector)
        if (isAuth) {
            const response = await getAllFavorite();
            return response;
        } else return []
    }
});