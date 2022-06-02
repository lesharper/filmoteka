 CREATE DATABASE filmoteka;
\connect filmoteka

CREATE TABLE roles (
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    role VARCHAR(15) NOT NULL
);

CREATE TABLE categories (
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    category VARCHAR(25) NOT NULL
);

INSERT INTO roles (role) VALUES ('администратор'),('пользователь');

 CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(30) NOT NULL,
    surname VARCHAR(30) NOT NULL,
    middlename VARCHAR(30) NOT NULL,
    login VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(350) NOT NULL,
    balance NUMERIC(9,2) DEFAULT 0.00,
    is_subscription BOOLEAN NOT NULL DEFAULT FALSE,
    roles_id INT NOT NULL DEFAULT 2,
    FOREIGN KEY (roles_id) REFERENCES roles (id) ON DELETE CASCADE
);

 CREATE TABLE contents (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    director VARCHAR(45) NOT NULL,
    timing TIME NOT NULL,
    release INTEGER NOT NULL,
    description TEXT NOT NULL,
    country VARCHAR(25) NOT NULL,
    genre TEXT NOT NULL,
    age_rating VARCHAR(5) NOT NULL,
    category_id INTEGER NOT NULL,
    trailer TEXT NOT NULL,
    poster TEXT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);


CREATE TABLE ratings (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    content_id INT NOT NULL,
    rating INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (content_id) REFERENCES contents (id) ON DELETE CASCADE

);

CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    content_id INT NOT NULL,
    review VARCHAR(450) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (content_id) REFERENCES contents (id) ON DELETE CASCADE
);

CREATE TABLE favorites (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    content_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (content_id) REFERENCES contents (id) ON DELETE CASCADE
);

CREATE TABLE news (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL
);

Поменять и проверить кодировку БД
{
    psql \! chcp 1251
    set client_encoding='win1251';
    SHOW SERVER_ENCODING;
}




