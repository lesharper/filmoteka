import React, {useEffect, useState, startTransition} from 'react';
import {useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {contentSelector} from "../../store/selector/contents";
import {useLocation, useNavigate, useParams} from "react-router";
import styles from "./single_content.module.css"
import {$BASE_URL, ADMIN_ROLE} from "../../constants";
import {currentContentIdAtom} from "../../store/atoms/currentContentId";
import Reviews from "../../components/Reviews/Reviews";
import {HeartIcon as HeartOutline} from "@heroicons/react/outline";
import {HeartIcon as HeartSolid, XIcon} from "@heroicons/react/solid";
import {addFavorite, deleteFavorite} from "../../requests/favorites";
import {authSelector} from "../../store/selector/auth";
import {favoriteSelector} from "../../store/selector/favorites";
import {userAtom} from "../../store/atoms/user";
import {deleteContent} from "../../requests/contents";
import RatingStars from "../../components/RatingStars/RatingStars";
import {ratingsSelector} from "../../store/selector/ratings";
import Modal from "../../components/Modal/Modal";

const SingleContent = () => {
    let {content_id} = useParams();
    const location = useLocation()
    const navigate = useNavigate()

    const [response, setResponse] = useState(null)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const refreshFavorites = useRecoilRefresher_UNSTABLE(favoriteSelector);
    const refreshContents = useRecoilRefresher_UNSTABLE(contentSelector);
    const refreshRatings = useRecoilRefresher_UNSTABLE(ratingsSelector);

    const user = useRecoilValue(userAtom)
    const contents = useRecoilValue(contentSelector)
    const setCurrentContentId = useSetRecoilState(currentContentIdAtom)
    const content = contents.filter(item => item.id === content_id)[0]
    const isAuth = useRecoilValue(authSelector)
    const favorite = useRecoilValue(favoriteSelector)
    const isFavorite = favorite.some((item) => item.content_id == content_id)

    useEffect(() => {
        setCurrentContentId(content.id)
    }, [location])

    const addFavoriteHandler = async () => {
        const response = await addFavorite({content_id})
        startTransition(() => refreshFavorites())
        setResponse(response)
    }

    const deleteFavoriteHandler = async () => {
        const response = await deleteFavorite(content_id)
        startTransition(() => refreshFavorites())
        setResponse(response)
    }

    const deleteContentHandler = async () => {
        const response = await deleteContent(content_id)
        startTransition(() => {
            refreshContents()
            refreshRatings()
        })
        setResponse(response)
        navigate('/cinema')
    }

    const modalHandler = () => setOpenDeleteModal(!openDeleteModal)

    const iconFavorite = () => {
        if (isAuth && user.roles_id != ADMIN_ROLE) {
            if (isFavorite)
                return <HeartOutline className={styles.icon_favorite} onClick={deleteFavoriteHandler}/>
            else
                return <HeartSolid className={styles.icon_favorite} onClick={addFavoriteHandler}/>
        } else if ((isAuth && user.roles_id === ADMIN_ROLE)) {
                return <XIcon className={styles.icon_delete} onClick={modalHandler}/>
        }
    }

    return (
        <div className={styles.page}>
            <Modal active={openDeleteModal} setActive={setOpenDeleteModal}>
                <div className={styles.delete_hint}>
                    <header>Удаление контента</header>
                    <main>Вы уверены что хотите удалить этот контент? Вся информация о нем будет стерта</main>
                    <footer>
                        <button onClick={deleteContentHandler}>Удалить</button>
                        <button onClick={modalHandler}> Отмена</button>
                    </footer>

                </div>
            </Modal>
            <header>
                <span>{content.title}</span>
                <span>{content.age_rating}</span>
                {iconFavorite()}
            </header>
            <main>
                <section className={styles.info}>
                    <div>
                        <img src={`${$BASE_URL}/${content.poster}`} alt='poster' className={styles.poster}/>
                        <div className="flex flex-col">
                            <span className={styles.info_item}><b>Жанр:</b> {content.genre}</span>
                            <span className={styles.info_item}><b>Страна:</b> {content.country}</span>
                            <span className={styles.info_item}><b>Категория:</b> {content.category}</span>
                            <span className={styles.info_item}><b>Премьера:</b> {content.release}г.</span>
                            <span className={styles.info_item}><b>Режиссер:</b> {content.director}</span>
                            <span className={styles.info_item}><b>Хронометраж:</b> {content.timing}</span>
                        </div>
                    </div>

                    <div>
                        <span className={styles.title}>Описание</span>
                        <span className={styles.description}>{content.description}</span>
                    </div>
                </section>
                <section className={styles.info}>
                    <div className={styles.trailer}>
                        <iframe height="100%" width="100%" src={`https://www.youtube.com/embed/${content.trailer}`}
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                        </iframe>
                    </div>
                </section>
            </main>

            {isAuth && <RatingStars content_id={content_id}/>}

            <Reviews/>
        </div>
    );
}

export default SingleContent;