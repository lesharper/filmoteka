import { selector } from "recoil"
import {getAllContents} from "../../requests/contents";
import {filterAtom} from "../atoms/filter";
import {searchAtom} from "../atoms/searchBar";

export const contentSelector = selector({
    key: 'contentSelector',
    get: async ({get}) => {
        const response = await getAllContents();
        const filters = get(filterAtom)
        const search = get(searchAtom)

        if (search.length)
            return response.filter(item => item.title.includes(search))

        if (filters.length)
            return response.filter(item => filters.includes(item.category))

        return response;
    }
});