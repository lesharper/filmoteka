import React from 'react';
import {useRecoilValue} from "recoil";
import {newsSelector} from "../store/selector/news";
import NewsList from "../components/News/NewsList";
import PreviewContents from "../components/PreviewContents/PreviewContents";

const Home = () => {

    const news = useRecoilValue(newsSelector)

    const freshNews = [...news].reverse().slice(0, 3)

    return (
        <div className="min-h-screen mt-5 w-full bg-zinc-100">
                <PreviewContents/>
                <NewsList news={freshNews}/>
        </div>
    );
}

export default Home;





