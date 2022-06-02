import React, {useState, startTransition} from 'react';
import styles from "./checkbox.module.css";
import {useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue} from "recoil";
import {filterAtom} from "../../store/atoms/filter";
import {XCircleIcon} from "@heroicons/react/solid";
import {userAtom} from "../../store/atoms/user";
import {ADMIN_ROLE} from "../../constants";
import {deleteCategory} from "../../requests/categories";
import {categorySelector} from "../../store/selector/categories";
import Modal from "../Modal/Modal";
import {contentSelector} from "../../store/selector/contents";

const Checkbox = ({category}) => {

    const [filter, setFilter] = useRecoilState(filterAtom)
    const [response, setResponse] = useState(null)
    const contents = useRecoilValue(contentSelector)
    const refreshCategories = useRecoilRefresher_UNSTABLE(categorySelector);
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const countBindContent = contents.filter(item => item.category === category.category).length
    const user = useRecoilValue(userAtom)

    const checkedHandler = ({target}) => {
        if (target.checked)
            setFilter([...filter, target.value])
        else {
            setFilter(filter.filter(item => item!==target.value))
        }
    }
    const deleteHandler = async () => {
        const response = await deleteCategory(category.id)
        startTransition(() => {
            refreshCategories()
        })
        setResponse(response)
    }

    const modalHandler = () => setOpenDeleteModal(!openDeleteModal)

    return (
        <>
            <Modal active={openDeleteModal} setActive={setOpenDeleteModal}>
                <div className={styles.delete_hint}>
                    <header>Удаление категории</header>
                    <main>
                        Вы уверены что хотите удалить эту категорию?
                        <br/> Вся информация о ней будет стерта
                        <br/> Количество контента в данной категории: <b>{countBindContent}</b>
                        <br/> Они будут удалены вместе с ней
                    </main>
                    <footer>
                        <button onClick={deleteHandler}>Удалить</button>
                        <button onClick={modalHandler}> Отмена</button>
                    </footer>

                </div>
            </Modal>
            <label className={styles.filter}>
                <input type="checkbox" value={category.category} className="hidden" onChange={checkedHandler}/>
                <div>
                    <div/>
                </div>
                <span className={styles.category}>{category.category}</span>
                {user.roles_id === ADMIN_ROLE && <XCircleIcon className={styles.icon} onClick={modalHandler}/>}
            </label>
        </>

    );
}

export default Checkbox;