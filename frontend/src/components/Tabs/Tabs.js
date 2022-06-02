import React, {useState} from 'react';
import styles from "./tab.module.css"
import CategoryPanel from "../Forms/CategoryPanel";
import Loader from "../Loader/Loader";
import ContentPanel from "../Forms/ContentPanel";
import NewsPanel from "../Forms/NewsPanel";

const tabs = [
    {
        title: "Категории",
        sections: <CategoryPanel/>
    },
    {
        title: "Контент",
        sections: <ContentPanel/>
    },
    {
        title: "Новости",
        sections: <NewsPanel/>
    },
]

const Tabs = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <>
            <div className={styles.tabs}>
                {tabs.map((tab, index) =>
                    <div className={activeIndex === index ? styles.tabs_item_active : styles.tabs_item}
                         onClick={() => setActiveIndex(index)} key={index}>
                        <span>{tab.title}</span>
                    </div>
                )}
            </div>
            {tabs[activeIndex].sections}
        </>
    );
}

export default Tabs;