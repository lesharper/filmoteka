import React from 'react';
import {motion} from "framer-motion"
import styles from "./loader.module.css"

const Loader = () => {
    const circles = [1, 2, 3]

    const circleVariants = {
        hidden: {y: -50},
        visible: (i) => ({
            y: 0,
            transition: {
                repeat: Infinity,
                repeatType: 'reverse',
                delay: i * 0.075
            }
        })
    }


    return (
        <div className={styles.loader}>
            {circles.map((circle, key) =>
                <motion.div className={styles.circle}  key={key} variants={circleVariants} initial='hidden' animate='visible' custom={key}/>
            )}
        </div>
    );
}

export default Loader;