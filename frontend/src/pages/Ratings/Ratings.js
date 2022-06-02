import React from 'react';
import {useRecoilValue} from "recoil";
import {ratingsSelector} from "../../store/selector/ratings";
import {$BASE_URL} from "../../constants";
import styles from "./ratings.module.css"
import {ratingRound} from "../../utils";

const Ratings = () => {

    const ratings = useRecoilValue(ratingsSelector)

    const tableBody = ratings.map((rating, key) =>
        <tr key={key}>
            <td><img src={`${$BASE_URL}/${rating.poster}`} alt="poster" className="h-[200px] object-cover"/></td>
            <td>{rating.title}</td>
            <td>{rating.country}</td>
            <td>{rating.genre}</td>
            <td>{ratingRound(rating.rating)}</td>
        </tr>
    )
    console.log(ratings)
    return (
        <div className={styles.page}>
            <table className={styles.table}>
                <thead className={styles.header}>
                    <tr>
                        <th>Постер</th>
                        <th>Название</th>
                        <th>Страна</th>
                        <th>Жанр</th>
                        <th>Рейтинг</th>
                    </tr>
                </thead>
                <tbody className={styles.body}>
                    {tableBody}
                </tbody>
            </table>
        </div>
    );
}

export default Ratings;