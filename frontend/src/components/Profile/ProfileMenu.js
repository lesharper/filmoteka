import React, {useState} from 'react';
import {AnimatePresence, motion} from "framer-motion";
import styles from "./profile.module.css";
import {logout} from "../../requests/users";
import {useRecoilState, useSetRecoilState} from "recoil";
import {userAtom} from "../../store/atoms/user";
import {ADMIN_ROLE} from "../../constants";
import Modal from "../Modal/Modal";
import Tabs from "../Tabs/Tabs";
import {Link} from "react-router-dom";
import DepositPanel from "../Forms/DepositPanel";

const ProfileMenu = ({openMenu}) => {

    const menuVariants = {
        hidden: {
            y: -10,
            opacity: 0,
            transition: {duration: 0.3}
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {duration: 0.3}

        },
        exit: {
            y: -10,
            opacity: 0,
            transition: {duration: 0.3}
        }
    }

    const itemVariants = {
        visible: (i) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: i * 0.2
            }
        }),
        hidden: {x: -10, opacity: 0}
    }

    const [user, setUser] = useRecoilState(userAtom)
    const [openModalAdmin, setOpenModalAdmin] = useState(false)
    const [openModalBalance, setOpenModalBalance] = useState(false)
    const logoutHandler = async () => {
        await logout()
        setUser({})
    }
    const modalAdminHandler = () => setOpenModalAdmin(!openModalAdmin)
    const modalBalanceHandler = () => setOpenModalBalance(!openModalBalance)
    return (
        <>
            <AnimatePresence>
                {openMenu &&
                    <motion.div className={styles.menu} variants={menuVariants} initial='hidden' animate='visible'
                                exit='exit'>

                        {user.roles_id === ADMIN_ROLE
                            ? <motion.li variants={itemVariants} initial='hidden' animate='visible' custom={1}
                                         onClick={modalAdminHandler}>
                                Управление
                            </motion.li>
                            :
                            <>
                                <motion.li variants={itemVariants} initial='hidden' animate='visible' custom={1}>
                                    <Link to='/profile'>
                                        Личный кабинет
                                    </Link>
                                </motion.li>
                                <motion.li variants={itemVariants} initial='hidden' animate='visible' custom={2} onClick={modalBalanceHandler}>
                                        Пополнить баланс
                                </motion.li>
                            </>


                        }
                        <motion.li variants={itemVariants} initial='hidden' animate='visible' custom={3}
                                   onClick={logoutHandler}>
                            Выйти
                        </motion.li>
                    </motion.div>
                }
            </AnimatePresence>
            <Modal active={openModalAdmin} setActive={setOpenModalAdmin}>
                <div>
                    <Tabs/>
                </div>
            </Modal>

            <Modal active={openModalBalance} setActive={setOpenModalBalance}>
                <div className="w-[400px]">
                    <DepositPanel/>
                </div>
            </Modal>
        </>

    );
}

export default ProfileMenu;