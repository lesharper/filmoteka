import React, {useState} from 'react';
import {useRecoilValue} from "recoil";
import {userAtom} from "../../store/atoms/user";
import {avatarSlice, statusSubscribe} from "../../utils";
import styles from "./personal.module.css"
import Modal from "../Modal/Modal";
import UpdateProfile from "../Forms/UpdateProfile";
import {favoriteSelector} from "../../store/selector/favorites";
import {Link} from "react-router-dom";
import {$BASE_URL} from "../../constants";
import {XCircleIcon} from "@heroicons/react/solid";

const Personal = () => {

    const user = useRecoilValue(userAtom)
    const avatar = avatarSlice(user.login)
    const status = statusSubscribe(user.is_subscription)
    const [openModal, setOpenModal] = useState(false)
    const favorites = useRecoilValue(favoriteSelector)
    const modalHandler = () => setOpenModal(!openModal)

    //to={`/cinema/${favorite.content_id}`
    const previewFavorites = favorites.map((favorite, key) =>
        <Link to={`/cinema/${favorite.content_id}`} key={key} >
            <img className={styles.image} src={`${$BASE_URL}/${favorite.poster}`}/>
        </Link>)

    return (
        <>
            <Modal active={openModal} setActive={setOpenModal}>
                <div className="w-[400px]">
                    <UpdateProfile/>
                </div>
            </Modal>
            <div className={styles.container}>
                <div className={styles.profile_detail_container}>
                    <div className={styles.avatar_container}>
                        <div className={styles.avatar}>{avatar}</div>
                    </div>
                    <span className={styles.profile_detail}><b>Баланс:</b> {user.balance} ₽</span>
                    <span className={styles.profile_detail}><b>Подписка:</b> {status}</span>
                    <button className={styles.btn} onClick={() => console.log('Писька подписька')}>Оформить подписку</button>
                    <button className={styles.btn} onClick={modalHandler}>Изменить профиль</button>
                </div>
                <div className={styles.personal_detail_container}>
                    <span className={styles.title}>Персональные данные</span>
                    <div className={styles.wrapper}>
                        <span className={styles.personal_detail}><b>Имя:</b> {user.firstname}</span>
                        <span className={styles.personal_detail}><b>Фамилия:</b> {user.surname}</span>
                        <span className={styles.personal_detail}><b>Отчество:</b> {user.middlename}</span>
                        <span className={styles.personal_detail}><b>Логин:</b> {user.login}</span>
                    </div>

                    <span className={styles.title}>Избранное</span>

                    {!!previewFavorites.length &&
                        <div className={styles.favorites}>
                            {previewFavorites}
                        </div>
                    }

                    {!previewFavorites.length &&
                        <div className={styles.favorites}>
                            <div className={styles.hint}>
                                <span>Добавьте контент в избранное</span>
                                <Link to='/cinema'>Перейти в архив</Link>
                            </div>

                        </div>
                    }

                </div>
            </div>
        </>

    );
}

export default Personal;