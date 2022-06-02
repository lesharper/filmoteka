import React, {useRef, useState} from 'react';
import {XIcon} from "@heroicons/react/solid";
import {useSetRecoilState} from "recoil";
import {searchAtom} from "../../store/atoms/searchBar";
import styles from "./search.module.css"

const SearchBar = () => {

    const setSearch = useSetRecoilState(searchAtom)

    const [searchValue, setSearchValue] = useState('')

    const changeHandler = ({target}) => {
        setSearchValue(target.value)

        setTimeout(() => setSearch(target.value), 1500)
    }

    const resetHandler = () => {
        setSearchValue('')
    }
    return (
        <form className={styles.searchbar}>
            <input   type="text" className={styles.input} placeholder="Поиск" value={searchValue} onChange={changeHandler}/>
            <XIcon className={styles.icon} onClick={resetHandler}/>
        </form>
    );
}

export default SearchBar;