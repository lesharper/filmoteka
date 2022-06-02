import React, {useState} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {categorySelector} from "../../store/selector/categories";
import styles from "./filter.module.css"
import {filterAtom} from "../../store/atoms/filter";
import {motion} from "framer-motion"
import Checkbox from "../Checkbox/Checkbox";

const Filter = () => {

    const categories = useRecoilValue(categorySelector)

    const filters = categories.map((category, key) => <Checkbox  key={key} category={category} categories={categories}/>)

    return (
        <form className={styles.form}>
            <span className={styles.title}>Категории</span>
            {filters}
        </form>
    );
}

export default Filter;