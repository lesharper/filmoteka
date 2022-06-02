import React from 'react';
import {useRecoilValue} from "recoil";
import {contentSelector} from "../../store/selector/contents";
import ContentItem from "./ContentItem";
import {AnimatePresence, motion} from "framer-motion";
import styles from "./content.module.css"
import {Link} from "react-router-dom";

const ContentList = () => {

    const contents = useRecoilValue(contentSelector)

    const contentVariants = {
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

    const allContent = contents.map((content, key) =>
            <Link to={`/cinema/${content.id}`} key={key}>
                <motion.div  variants={contentVariants} initial='hidden' animate='visible' exit='exit' custom={key}>
                    <ContentItem content={content}/>
                </motion.div>
            </Link>)

    return (
        <div className={styles.list}>
            <AnimatePresence>
                {allContent}
            </AnimatePresence>
        </div>
    );
}

export default ContentList;