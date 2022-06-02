import React, {startTransition, useState} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {categorySchema} from "./schema";
import styles from "./form.module.css"
import {addCategory} from "../../requests/categories";
import {useRecoilRefresher_UNSTABLE} from "recoil";
import {categorySelector} from "../../store/selector/categories";

const CategoryPanel = () => {

    const {register, formState: {errors}, handleSubmit, reset} = useForm({
        mode: "onSubmit",
        resolver: yupResolver(categorySchema)
    })
    const refreshCategories =  useRecoilRefresher_UNSTABLE(categorySelector);
    const [response, setResponse] = useState(null)
    const onSubmit =  async (data) => {
        const response = await addCategory(data)
        startTransition(() => {
            refreshCategories()
        })
        setResponse(response)
        reset()
    }

    return (
        <form className={styles.panel} onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register('category')} placeholder="Категория" className={styles.input}/>
            <span className={styles.error}>{errors?.category?.message}</span>
            <span className={styles.error}>{response?.errors}</span>
            <span className={styles.success}>{response?.message}</span>
            <button className={styles.btn}>Создать</button>
        </form>
    );
}

export default CategoryPanel;