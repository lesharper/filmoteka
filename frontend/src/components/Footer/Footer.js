import React from 'react';
import styles from './footer.module.css'
import {links} from "../../constants";
import {Link} from "react-router-dom";

const Footer = () => {
    const navbar = links.map((link, index) => <Link to={link.link} key={index}><li className={styles.link}>{link.title}</li></Link>)
    return (
        <main className={styles.container}>
            <div className={styles.links}>
                <ol>
                    {navbar}
                </ol>
            </div>
            <section className={styles.detail}>
                Made by Aletrick Novetman
            </section>
        </main>
    );
}

export default Footer;


