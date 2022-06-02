import { selector } from "recoil"
import {getAllContents} from "../../requests/contents";

export const previewContentsSelector = selector({
    key: 'previewContentsSelector',
    get: async ({get}) => {
        const response = await getAllContents();
        const films = response.filter(item => item.category === 'фильм')
        const serials = response.filter(item => item.category === 'сериал')
        const freshFilms = [...films].reverse().slice(0, 3)
        const freshSerials = [...serials].reverse().slice(0, 3)

        return {
            сериалы: freshSerials,
            фильмы: freshFilms
        };
    }
});