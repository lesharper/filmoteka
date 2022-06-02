import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import styles from "./sidebar.module.css"
import SignUp from "../Forms/SignUp";
import SignIn from "../Forms/SignIn";
import {useRecoilValue} from "recoil";
import {isRegAtom} from "../../store/atoms/swapForm";
import SearchBar from "../SearchBar/SearchBar";
import Profile from "../Profile/Profile";
import {authSelector} from "../../store/selector/auth";
import {useLocation} from "react-router";
import Filter from "../Filter/Filter";
import Loader from "../Loader/Loader";
import TopRating from "../TopRating/TopRating";

const Sidebar = () => {

    let location = useLocation();
    const [isCinema, setIsCinema] = useState(false)

    useEffect(() => {
        setIsCinema(location.pathname === '/cinema')
    }, [location])

    const menuVariants = {
        hidden: {x: 200},
        visible: {
            x: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                duration: 0.1
            }
        },
    }

    const isReg = useRecoilValue(isRegAtom)
    const isAuth = useRecoilValue(authSelector)

    return (
        <>
            <motion.div className={styles.sidebar} variants={menuVariants} initial='hidden' animate='visible'>
                {isAuth
                    ? <Profile/>
                    : isReg
                        ? <SignIn/>
                        : <SignUp/>
                }
                {isCinema &&
                    <>
                        <div className={styles.search_container}>
                            <SearchBar/>
                        </div>
                        <div className="w-full mb-5">
                            <Filter/>
                        </div>
                    </>
                }
                <div className="w-full mb-5">
                    <TopRating/>
                </div>
            </motion.div>
        </>
    );
}

export default Sidebar;