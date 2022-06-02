import React, {useState, startTransition} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {reviewSchema} from "./schema";
import styles from "./form.module.css";
import {addReview} from "../../requests/reviews";
import {useRecoilRefresher_UNSTABLE, useRecoilValue} from "recoil";
import {currentContentIdAtom} from "../../store/atoms/currentContentId";
import {reviewsSelector} from "../../store/selector/reviews";

const AddReview = () => {
    const {register, formState: {errors}, handleSubmit, reset} = useForm({
        mode: "onSubmit",
        resolver: yupResolver(reviewSchema)
    })

    const currentContentId = useRecoilValue(currentContentIdAtom)
    const [response, setResponse] = useState(null)
    const refreshReviews =  useRecoilRefresher_UNSTABLE(reviewsSelector);
    const onSubmit =  async (data) => {
        const response = await addReview({content_id: currentContentId, ...data})
        startTransition(() => {
            refreshReviews()
        })
        setResponse(response)
        reset()
    }

    return (
        <form className={styles.panel} onSubmit={handleSubmit(onSubmit)}>
            <textarea type="text" {...register('review')} placeholder="Отзыв" className={styles.text_area}/>
            <span className={styles.error}>{errors?.review?.message}</span>
            <span className={styles.error}>{response?.errors}</span>
            <span className={styles.success}>{response?.message}</span>
            <button className={styles.btn}>Добавить</button>
        </form>
    );
}

export default AddReview;