import React from 'react';
import {useRecoilValue} from "recoil";
import {ratingsSelector} from "../../store/selector/ratings";
import {ratingRound} from "../../utils";

const TopRating = () => {

    const ratings = useRecoilValue(ratingsSelector)
    const top = [...ratings].slice(0, 3).map((rating, key) =>
        <div className="flex justify-between p-2 mb-2">
            <span className="text-salad">{rating.title}</span>
            <span>{ratingRound(rating.rating)}</span>
        </div>
    )
    return (
        <div className="p-5 bg-zinc-100 shadow-md">
            <span className="flex text-xl mb-3 font-bold">Топ рейтинга</span>
            <div className="text-xl">
                {top}
            </div>
        </div>
    );
}

export default TopRating;