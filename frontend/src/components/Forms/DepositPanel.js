import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {balanceSchema} from "./schema";
import {addCategory} from "../../requests/categories";
import styles from "./form.module.css";
import {updateBalance} from "../../requests/users";
import {useSetRecoilState} from "recoil";
import {userAtom} from "../../store/atoms/user";

const DepositPanel = () => {
    const {register, formState: {errors}, handleSubmit, reset} = useForm({
        mode: "onSubmit",
        resolver: yupResolver(balanceSchema)
    })

    const setUser = useSetRecoilState(userAtom)

    const onSubmit =  async (data) => {
        const response = await updateBalance(data)
        setUser(response)
        reset()
    }

    return (
        <form className={styles.panel} onSubmit={handleSubmit(onSubmit)}>

            <input type="text" {...register('balance')} placeholder="Баланс" className={styles.input}/>
            <span className={styles.error}>{errors?.balance?.message}</span>

            <button className={styles.btn}>Создать</button>
        </form>
    );
}

export default DepositPanel;