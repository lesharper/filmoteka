import React, {useState} from 'react';
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/solid";
import {motion} from "framer-motion"
import styles from "./profile.module.css"
import ProfileMenu from "./ProfileMenu";
import {useRecoilValue} from "recoil";
import {userAtom} from "../../store/atoms/user";
import {avatarSlice} from "../../utils";

const Profile = () => {

    const user = useRecoilValue(userAtom)
    const avatar = avatarSlice(user.login)
    const [openMenu, setOpenMenu] = useState(false)
    const menuHandler = () => setOpenMenu(!openMenu)
    return (
        <motion.div className={styles.profile}>
            <div className={styles.control_container}>
                <div className={styles.avatar}>
                    {avatar}
                </div>
                {
                    openMenu
                    ?  <ChevronUpIcon className={styles.icon} onClick={menuHandler}/>
                    :  <ChevronDownIcon className={styles.icon} onClick={menuHandler}/>
                }

            </div>
            <ProfileMenu openMenu={openMenu}/>
        </motion.div>
    );
}

export default Profile;