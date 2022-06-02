import React, {startTransition, useState} from 'react';
import {useRecoilRefresher_UNSTABLE, useRecoilValue} from "recoil";
import {categorySelector} from "../../store/selector/categories";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {contentSchema} from "./schema";
import styles from "./form.module.css";
import {addContents} from "../../requests/contents";
import {contentSelector} from "../../store/selector/contents";

const ContentPanel = () => {

    const categories = useRecoilValue(categorySelector)
    const {register, formState: {errors}, handleSubmit, reset} = useForm({
        mode: "onSubmit",
        resolver: yupResolver(contentSchema)
    })
    const refreshContents =  useRecoilRefresher_UNSTABLE(contentSelector);
    const [response, setResponse] = useState(null)
    const onSubmit =  async (data) => {
        const trailer = trailerHandler(data.trailer)
        const response = await addContents({...data, trailer})
        startTransition(() => {
            refreshContents()
        })
        setResponse(response)
        reset()
    }

    const trailerHandler = (link) => {
        const start = link.indexOf('=')
        return link.slice(start + 1, link.length)
    }

    return (
        <form className={styles.panel} onSubmit={handleSubmit(onSubmit)} >
            <input type="text" {...register('title')} placeholder="Название" className={styles.input}/>
            <span className={styles.error}>{errors?.title?.message}</span>

            <input type="text" {...register('director')} placeholder="Режиссер" className={styles.input}/>
            <span className={styles.error}>{errors?.director?.message}</span>

            <input type="text" {...register('timing')} placeholder="Время просмотра" className={styles.input}/>
            <span className={styles.error}>{errors?.timing?.message}</span>

            <input type="text" {...register('release')} placeholder="Дата релиза" className={styles.input}/>
            <span className={styles.error}>{errors?.release?.message}</span>

            <select name="categories" className={styles.input} {...register('category_id')}>
                {categories.map((category, key) =>
                    <option value={category.id} key={key}>
                        {category.category}
                    </option>)
                }
            </select>
            <span className={styles.error}>{errors?.category_id?.message}</span>

            <input type="text" {...register('country')} placeholder="Страна выпуска" className={styles.input}/>
            <span className={styles.error}>{errors?.country?.message}</span>

            <input type="text" {...register('genre')} placeholder="Жанр" className={styles.input}/>
            <span className={styles.error}>{errors?.genre?.message}</span>

            <input type="text" {...register('age_rating')} placeholder="Возрастное ограничение" className={styles.input}/>
            <span className={styles.error}>{errors?.age_rating?.message}</span>

            <textarea type="text" {...register('description')} placeholder="Описание" className={styles.text_area}/>
            <span className={styles.error}>{errors?.description?.message}</span>

            <input type="text" {...register('trailer')} placeholder="Ссылка на трейлер" className={styles.input}/>
            <span className={styles.error}>{errors?.trailer?.message}</span>

            <label className={styles.file }>
                <span>Загрузить постер</span>
                <input type="file" {...register('poster')} className="hidden"/>
            </label>

            <span className={styles.error}>{errors?.poster?.message}</span>

            <span className={styles.error}>{response?.errors}</span>
            <span className={styles.success}>{response?.message}</span>
            <button className={styles.btn}>Создать</button>
        </form>
    );
}

export default ContentPanel;