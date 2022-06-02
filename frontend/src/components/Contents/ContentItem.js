import React from 'react';
import styles from "./content.module.css"
import default_image from "../../images/default_image.svg"
import {$BASE_URL} from "../../constants";

const ContentItem = ({content}) => {

    const description = () => {
        if (content.description.length <= 50)
            return content.description
        else
            return `${content.description.slice(0, 50)}...`
    }

    return (
            <div  className={styles.item}>
                <img src={`${$BASE_URL}/${content.poster}`} alt='poster' className={styles.poster}/>
                <section className={styles.info}>
                    <header>
                        <span>{content.title}</span>
                        <span>{content.age_rating}</span>
                    </header>
                    <main>
                        <span>{description()}</span>
                    </main>
                    <footer>
                        <span>{content.genre}</span>
                        <span>{content.timing}</span>
                        <span>{content.category}</span>
                    </footer>
                </section>
            </div>
    );
}

export default ContentItem;