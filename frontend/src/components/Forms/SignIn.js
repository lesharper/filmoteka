import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {authSchema} from "./schema";
import styles from "./form.module.css";
import {useSetRecoilState} from "recoil";
import {isRegAtom} from "../../store/atoms/swapForm";
import {authorization} from "../../requests/users";
import {userAtom} from "../../store/atoms/user";

const SignIn = () => {

    const setReg = useSetRecoilState(isRegAtom)
    const setUser = useSetRecoilState(userAtom)
    const [response, setResponse] = useState(null)

    const {register, formState: {errors}, handleSubmit, reset} = useForm({
        mode: "onSubmit",
        resolver: yupResolver(authSchema)
    })

    const onSubmit =  async (data) => {
        setResponse(null)
        const response = await authorization(data)
        setUser(response)
        setResponse(response)
        reset()
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <span className={styles.title}>Авторизация</span>
            <input type="text" {...register('login')} placeholder="Логин" className={styles.input}/>
            <span className={styles.error}>{errors?.login?.message}</span>
            <input type="password" {...register('password')} placeholder="Пароль" className={styles.input}/>
            <span className={styles.error}>{errors?.password?.message}</span>
            <span className="text-red-800">{response?.error}</span>
            <button className={styles.btn} type='submit'>Войти</button>
            <span className={styles.detail} onClick={() => setReg(false)}>Я здесь впервые</span>
        </form>
    );
}

export default SignIn;




