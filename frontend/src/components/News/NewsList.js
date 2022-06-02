import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from "framer-motion";
import styles from "./news.module.css";
import NewsItem from "./NewsItem";

const NewsList = ({news}) => {

    const newsVariants = {
        hidden: {y: -100, opacity: 0},
        visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.2
            }
        }),
        exit: {
            x: -100,
            opacity: 0,
            transition: {
                duration: 0.3
            }
        },
    }

    const allNews = news.map((news, key) =>
        <motion.div key={key} variants={newsVariants} initial='hidden' animate='visible' exit='exit' custom={key}>
            <NewsItem news={news}/>
        </motion.div>)
    return (
        <div className={styles.list}>
            <AnimatePresence>
                {allNews}
            </AnimatePresence>
        </div>
    );
}

export default NewsList;