import React, {Suspense} from "react";
import { Outlet } from 'react-router';
import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer";
import {motion} from "framer-motion";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./layout.module.css"
import Loader from "../../components/Loader/Loader";

const Layout = () =>  {
    const contentVariants = {
        hidden: {x: -200},
        visible: {
            x: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                transition: {
                    duration: 0.2
                }
            }
        },
    }

    return (
        <>
            <Header/>
            <Suspense fallback={<Loader/>}>
                <div className={styles.page}>
                    <div className={styles.container}>
                        <motion.div className={styles.outlet} variants={contentVariants} initial='hidden' animate='visible'>
                            <Outlet/>
                        </motion.div>
                        <Sidebar/>
                    </div>
                </div>
            </Suspense>
            <Footer/>
        </>
    );
}

export default Layout;