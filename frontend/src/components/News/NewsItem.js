import React, {useState, startTransition, useEffect} from 'react';
import styles from "./news.module.css";
import {XIcon} from "@heroicons/react/solid";
import {useRecoilRefresher_UNSTABLE, useRecoilValue} from "recoil";
import {newsSelector} from "../../store/selector/news";
import {deleteNews} from "../../requests/news";
import {userAtom} from "../../store/atoms/user";
import {ADMIN_ROLE} from "../../constants";
import {useLocation} from "react-router";
import {Link} from "react-router-dom";
import Modal from "../Modal/Modal";

const NewsItem = ({news}) => {

    const user = useRecoilValue(userAtom)
    const [response, setResponse] = useState(null)
    const refreshNews = useRecoilRefresher_UNSTABLE(newsSelector);
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const location = useLocation()
    const [isHome, setIsHome] = useState(false)

    const modalHandler = () => setOpenDeleteModal(!openDeleteModal)

    const newsBodyHandler = () => {
        if (isHome)
            return `${news.body.slice(0, 50)}...`
        else
            return news.body
    }
    useEffect(() => {
        if (location.pathname === '/')
            setIsHome(true)
        else
            setIsHome(false)
    }, [location])

    const deleteHandler = async () => {
        const response = await deleteNews(news.id)
        startTransition(() => refreshNews())
        setResponse(response)
    }

    return (
        <div className={styles.item} id={news.id}>
            <Modal active={openDeleteModal} setActive={setOpenDeleteModal}>
                <div className={styles.delete_hint}>
                    <header>Удаление новости</header>
                    <main>Вы уверены что хотите удалить эту новость? Вся информация о ней будет стерта</main>
                    <footer>
                        <button onClick={deleteHandler}>Удалить</button>
                        <button onClick={modalHandler}> Отмена</button>
                    </footer>

                </div>
            </Modal>
            <section className={styles.new}>
                <header>
                    <span>{news.title}</span>
                    {user.roles_id === ADMIN_ROLE && <XIcon className={styles.icon} onClick={modalHandler}/>}
                </header>
                <main>
                    <span>{newsBodyHandler()}</span>
                </main>
                {isHome &&
                    <footer>
                        <Link to='/news' href={news.id}>Читать далее</Link>
                    </footer>
                }
            </section>
        </div>
    );
}

export default NewsItem;