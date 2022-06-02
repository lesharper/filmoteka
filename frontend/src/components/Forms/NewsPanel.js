import React, {startTransition, useState} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {newSchema} from "./schema";
import {useRecoilRefresher_UNSTABLE} from "recoil";
import {newsSelector} from "../../store/selector/news";
import {addNews} from "../../requests/news";
import styles from "./form.module.css";

const NewsPanel = () => {

    const {register, formState: {errors}, handleSubmit, reset} = useForm({
        mode: "onSubmit",
        resolver: yupResolver(newSchema)
    })

    const refreshCategories =  useRecoilRefresher_UNSTABLE(newsSelector);
    const [response, setResponse] = useState(null)

    const onSubmit =  async (data) => {
        setResponse(null)
        const response = await addNews(data)
        startTransition(() => {
            refreshCategories()
        })
        setResponse(response)
        reset()
    }

    return (
        <form className={styles.panel} onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register('title')} placeholder="Название" className={styles.input}/>
            <span className={styles.error}>{errors?.title?.message}</span>

            <textarea type="text" {...register('body')} placeholder="Новость" className={styles.text_area}/>
            <span className={styles.error}>{errors?.body?.message}</span>

            <span className={styles.error}>{response?.errors}</span>
            <span className={styles.success}>{response?.message}</span>
            <button className={styles.btn}>Создать</button>
        </form>
    );
}

export default NewsPanel;