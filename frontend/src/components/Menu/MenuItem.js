import React from 'react';
import {motion} from 'framer-motion'
import styles from "./menu.module.css"
import {Link} from "react-router-dom";

const MenuItem = ({item, link, isSelected, handleClick}) => {
    return (
        <Link to={link}>
            <motion.div
                onClick={handleClick}
                className={styles.link}
            >
                {isSelected && <motion.div layoutId="activeItem" className={styles.active}/>}
                {item}
            </motion.div>
        </Link>
    );
}

export default MenuItem;