import React, {useEffect, useState, startTransition} from 'react';
import  Rating  from 'react-rating'
import {StarIcon} from "@heroicons/react/solid";
import {getRatingByContent, setupRating} from "../../requests/ratings";
import {useRecoilRefresher_UNSTABLE} from "recoil";
import {ratingsSelector} from "../../store/selector/ratings";

const RatingStars = ({content_id}) => {

    const [rating, setRating] = useState(0)
    const refreshRatings = useRecoilRefresher_UNSTABLE(ratingsSelector);

    const handleRating = (rate) => {
        setup(rate)
    }

    useEffect(() => {
       const getRating = async () => {
           const response = await getRatingByContent(content_id)
           setRating(response.rating)

       }

        getRating()
    }, [])

    const setup = async (rate) => {
        await setupRating({content_id, rating: rate })
        startTransition(() => refreshRatings())
    }

    return (
        <div className="flex flex-col justify-center items-center p-6 bg-violet-800 ">
            <span className="text-xl font-bold mb-5 text-white">Оценка</span>
            <Rating
                stop={10}
                emptySymbol={<StarIcon className='block h-10 text-zinc-400'/>}
                fullSymbol={<StarIcon className="block h-10 text-yellow-400"/>}
                initialRating={rating}
                onClick={handleRating}/>
        </div>

    );
}

export default RatingStars;