import React, {useState} from 'react';
import {useRecoilState} from "recoil";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {registrationSchema} from "./schema";
import {updateProfile} from "../../requests/users";
import styles from "./form.module.css";
import {userAtom} from "../../store/atoms/user";

const UpdateProfile = () => {
    const [response, setResponse] = useState(null)
    const [user, setUser] = useRecoilState(userAtom)
    const {register, formState: {errors}, handleSubmit, reset} = useForm({
        mode: "onSubmit",
        resolver: yupResolver(registrationSchema)
    })

    const onSubmit =  async (data) => {
        setResponse(null)
        const response = await updateProfile(data)
        setResponse(response)
        setUser(response)
        reset()
    }

    return (
        <form className={styles.panel} onSubmit={handleSubmit(onSubmit)}>
            <span className={styles.title}>Обновление профиля</span>

            <input type="text" {...register('firstname')} defaultValue={user.firstname} placeholder="Имя" className={styles.input}/>
            <span className={styles.error}>{errors?.firstname?.message}</span>

            <input type="text" {...register('surname')} defaultValue={user.surname} placeholder="Фамилия" className={styles.input}/>
            <span className={styles.error}>{errors?.surname?.message}</span>

            <input type="text" {...register('middlename')} defaultValue={user.middlename} placeholder="Отчество" className={styles.input}/>
            <span className={styles.error}>{errors?.middlename?.message}</span>

            <input type="text" {...register('login')} defaultValue={user.login} placeholder="Логин" className={styles.input}/>
            <span className={styles.error}>{errors?.login?.message}</span>

            <input type="password" {...register('password')} placeholder="Пароль" className={styles.input}/>
            <span className={styles.error}>{errors?.password?.message}</span>

            <span className={styles.error}>{response?.error}</span>
            <span className={styles.success}>{response?.message}</span>
            <button className={styles.btn} type='submit'>Изменить</button>
        </form>
    );
}

export default UpdateProfile;