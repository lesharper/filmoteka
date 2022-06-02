import React, {startTransition} from 'react';
import styles from "./reviews.module.css";
import AddReview from "../Forms/AddReview";
import {useRecoilRefresher_UNSTABLE, useRecoilValue} from "recoil";
import {authSelector} from "../../store/selector/auth";
import {ADMIN_ROLE} from "../../constants";
import {userAtom} from "../../store/atoms/user";
import {reviewsSelector} from "../../store/selector/reviews";
import {XIcon} from "@heroicons/react/solid";
import {deleteReview} from "../../requests/reviews";
import {AnimatePresence, motion} from "framer-motion";

const Reviews = () => {

    const user = useRecoilValue(userAtom)
    const isAuth = useRecoilValue(authSelector)
    const isAllowDelete = (login) => user.login === login || user.roles_id === ADMIN_ROLE
    const refreshReviews = useRecoilRefresher_UNSTABLE(reviewsSelector);
    const deleteHandler = async (id) => {
        await deleteReview(id)
        startTransition(() => {
            refreshReviews()
        })
    }

    const reviewsVariants = {
        hidden: {y: -100, opacity: 0},
        visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.2
            }
        }),
        exit: {
            x: -100,
            opacity: 0,
            transition: {
                duration: 0.3
            }
        },
    }
    const reviews = useRecoilValue(reviewsSelector)
    const allReview = reviews.map((review, key) =>
        <motion.div key={key} className={styles.review} variants={reviewsVariants} initial='hidden' animate='visible' exit='exit' custom={key}>
            <span>
                {review.login}
                {isAllowDelete(review.login) &&
                    <XIcon className={styles.icon} onClick={() => deleteHandler(review.id)}/>}
            </span>
            <div>{review.review}</div>
        </motion.div>)

    return (
        <>
            {isAuth
                ? <div className={styles.container}>
                    <span className={styles.title}>Отзывы</span>
                    <AnimatePresence>
                        {allReview}
                    </AnimatePresence>
                    <AddReview/>
                </div>
                : <div className={styles.hint}>
                    <span className={styles.title}>Чтобы оставить/увидеть отзывы, необходимо авторизоваться</span>
                </div>
            }
        </>
    );
}

export default Reviews;