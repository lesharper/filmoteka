import * as Yup from "yup";

export const registrationSchema = Yup.object().shape({
    firstname: Yup.string()
        .required('Имя обязательно')
        .min(2, 'Не менее двух символов')
        .max(30, 'Не более тридацти пяти символов'),
    surname: Yup.string()
        .required('Фамилия обязательна')
        .min(2, 'Не менее двух символов')
        .max(30, 'Не более тридацти пяти символов'),
    middlename: Yup.string()
        .required('Отчество обязательно')
        .min(2, 'Не менее двух символов')
        .max(30, 'Не более тридацти пяти символов'),
    login: Yup.string()
        .required('Логин обязателен')
        .min(5, 'Не менее пяти символов')
        .max(30, 'Не более тридцати символов'),
    password: Yup.string()
        .required('Пароль обязателен')
        .min(5, 'Не менее пяти символов'),
})

export const authSchema = Yup.object().shape({
    login: Yup.string()
        .required('Логин обязателен')
        .min(5, 'Не менее пяти символов')
        .max(30, 'Не более тридцати символов'),
    password: Yup.string()
        .required('Пароль обязателен')
        .min(5, 'Не менее пяти символов'),
})


export const categorySchema = Yup.object().shape({
    category: Yup.string()
        .required('Категория обязательна')
        .min(3, 'Не менее трех символов')
})

export const balanceSchema = Yup.object().shape({
    balance: Yup.number()
        .typeError('Необходимо ввести число')
        .required('Баланс обязателен')
        .positive('Необходимо положительное число')
})

export const reviewSchema = Yup.object().shape({
    review: Yup.string()
        .required('Отзыв обязателен')
        .min(3, 'Не менее трех символов')
})

export const newSchema = Yup.object().shape({
    title: Yup.string()
        .required('Название обязательно')
        .min(3, 'Не менее трех символов'),
    body: Yup.string()
        .required('Новости обязательна')
        .min(5, 'Не менее пяти символов')
})


export const contentSchema = Yup.object().shape({
    title: Yup.string()
        .required('Название обязательно')
        .min(3, 'Не менее трех символов')
        .max(30, 'Не более тридцати символов'),
    director: Yup.string()
        .required('Режиссер обязателен')
        .min(5, 'Не менее пяти символов')
        .max(40, 'Не более сорока символов'),
    timing: Yup.string()
        .required('Время просмотра обязательно'),
    release: Yup.string()
        .required('Дата релиза обязательна'),
    description: Yup.string()
        .required('Описание обязательно')
        .min(5, 'Не менее пяти символов'),
    country: Yup.string()
        .required('Время просмотра обязательно')
        .min(3, 'Не менее трех символов'),
    genre: Yup.string()
        .required('Жанр обязателен'),
    age_rating: Yup.string()
        .required('Возрастное ограничение обязательно'),
    category_id: Yup.string()
        .required('Категория обязательна'),
    trailer: Yup.string()
        .required('Трейлер обязателен'),
    poster: Yup.mixed()
        .required()

})