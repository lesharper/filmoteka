import React from 'react';
import {useRecoilValue} from "recoil";
import {previewContentsSelector} from "../../store/selector/previewContents";
import {$BASE_URL} from "../../constants";
import styles from "./preview_contents.module.css"
import {Link} from "react-router-dom";

const PreviewContents = () => {

    const preview = useRecoilValue(previewContentsSelector)

    const previewSerials = preview['сериалы'].map((serial, key) =>
        <Link to={`/cinema/${serial.id}`} key={key}>
            <img className={styles.item} src={`${$BASE_URL}/${serial.poster}`}/>
        </Link>
    )

    const previewFilms = preview['фильмы'].map((film, key) =>
        <Link to={`/cinema/${film.id}`} key={key}>
            <img className={styles.item} src={`${$BASE_URL}/${film.poster}`}/>
        </Link>
    )

    return (
        <div className={styles.contents}>
            <div className={styles.items}>
                <span>Новые сериалы</span>
                {!previewSerials.length && <div className="flex justify-center items-center bg-violet-200 h-[300px] text-xl">Скоро</div>}
                {!!previewSerials.length && <div>{previewSerials}</div>}

            </div>
            <div className={styles.items}>
                <span>Новые фильмы</span>
                {!previewFilms.length && <div className="flex justify-center items-center bg-violet-200 h-[300px] text-xl">Скоро</div>}
                {!!previewFilms.length && <div>{previewFilms}</div>}
            </div>

        </div>
    );
}

export default PreviewContents;