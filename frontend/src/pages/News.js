import React from 'react';
import NewsList from "../components/News/NewsList";
import {useRecoilValue} from "recoil";
import {newsSelector} from "../store/selector/news";
import Loader from "../components/Loader/Loader";

const News = () => {

    const news = useRecoilValue(newsSelector)

    return (
        <div className="min-h-screen mt-5 w-full">
            <NewsList news={news}/>
        </div>

    );
}

export default News;