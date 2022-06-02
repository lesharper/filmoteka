import React, {useState} from 'react';
import {registrationSchema} from "./schema";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import styles from "./form.module.css"
import {useSetRecoilState} from "recoil";
import {isRegAtom} from "../../store/atoms/swapForm";
import {registration} from "../../requests/users";

const SignUp = () => {

    const setReg = useSetRecoilState(isRegAtom)
    const [response, setResponse] = useState(null)

    const {register, formState: {errors}, handleSubmit, reset} = useForm({
        mode: "onSubmit",
        resolver: yupResolver(registrationSchema)
    })

    const onSubmit =  async (data) => {
        setResponse(null)
        const response = await registration(data)
        setResponse(response)
        reset()
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <span className={styles.title}>Регистрация</span>

            <input type="text" {...register('firstname')} placeholder="Имя " className={styles.input}/>
            <span className={styles.error}>{errors?.firstname?.message}</span>

            <input type="text" {...register('surname')} placeholder="Фамилия " className={styles.input}/>
            <span className={styles.error}>{errors?.surname?.message}</span>

            <input type="text" {...register('middlename')} placeholder="Отчество " className={styles.input}/>
            <span className={styles.error}>{errors?.middlename?.message}</span>

            <input type="text" {...register('login')} placeholder="Логин " className={styles.input}/>
            <span className={styles.error}>{errors?.login?.message}</span>

            <input type="password" {...register('password')} placeholder="Пароль " className={styles.input}/>
            <span className={styles.error}>{errors?.password?.message}</span>

            <span className={styles.error}>{response?.error}</span>
            <span className={styles.success}>{response?.message}</span>

            <button className={styles.btn} type='submit'>Создать</button>
            <span className={styles.detail} onClick={() => setReg(true)}>Я зарегистрирован</span>
        </form>
    );
}

export default SignUp;