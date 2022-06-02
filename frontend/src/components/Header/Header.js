import React from 'react';
import styles from './header.module.css'
import Menu from "../Menu/Menu";

const Header = () => {
    return (
        <main className={styles.container}>
            <section className={styles.promo}>
                <span className={styles.title}>Фильмотека</span>
                <span className={styles.detail}>Самый лучший в мире портал</span>
            </section>
            <Menu/>
        </main>
    );
}

export default Header;



