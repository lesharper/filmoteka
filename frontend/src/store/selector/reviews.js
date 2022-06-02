import { selector } from "recoil"
import {getAllReviewByContent} from "../../requests/reviews";
import {currentContentIdAtom} from "../atoms/currentContentId";

export const reviewsSelector = selector({
    key: 'reviewsSelector',
    get: async ({get}) => {
        const currentContentId = get(currentContentIdAtom)
        const response = await getAllReviewByContent(currentContentId);
        return response;
    }
});