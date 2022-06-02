import React, {useEffect, useState} from 'react';
import {AnimateSharedLayout} from "framer-motion";
import MenuItem from "./MenuItem";
import styles from "./menu.module.css"
import {links} from "../../constants";
import {useLocation} from "react-router";

const Menu = () => {

    const location = useLocation()

    const [activeLink, setActiveLink] = useState(location.pathname);

    useEffect(() => {
        setActiveLink(location.pathname)
    }, [location])

    useEffect(() => {
        const link = localStorage.getItem('activeLink')
        if (link) {
            setActiveLink(link)
        }
    }, [])

    const menuHandler = (link) => {
        setActiveLink(link)
        localStorage.setItem('activeLink', link)
    }

    const navbar = links.map((item, index) =>
        <MenuItem
            key={index}
            item={item.title}
            link={item.link}
            isSelected={activeLink === item.link}
            handleClick={() => menuHandler(item.link)}
        />)
    return (
        <div className={styles.links}>
            <AnimateSharedLayout>
                <ol>
                    {navbar}
                </ol>
            </AnimateSharedLayout>
        </div>
    );
}

export default Menu;