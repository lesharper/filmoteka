import React, {useEffect, Suspense} from 'react';
import {Routes, Route} from "react-router";
import Home from "./pages/Home";
import Layout from "./pages/Layout/Layout";
import News from "./pages/News";
import Ratings from "./pages/Ratings/Ratings";
import Cinema from "./pages/Cinema";
import {authentication} from "./requests/users";
import { useRecoilValue, useSetRecoilState} from "recoil";
import {userAtom} from "./store/atoms/user";
import SingleContent from "./pages/SingleContent/SingleContent";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/Layout/ProtectedRoute";
import {authSelector} from "./store/selector/auth";

const App = () => {

    const setUser = useSetRecoilState(userAtom)
    const isAuth = useRecoilValue(authSelector)

    useEffect(() => {
        const check = async () => {
            const response = await authentication()
            if (response) setUser(response)
        }

        check()
    }, [])

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route
                        path="/profile"
                        element={
                        <ProtectedRoute isAllowed={isAuth} redirectPath='/'>
                            <Profile/>
                        </ProtectedRoute>
                        }/>
                    <Route path="/cinema" element={<Cinema/>}/>
                    <Route path="/cinema/:content_id" element={<SingleContent/>}/>
                    <Route path="/ratings" element={<Ratings/>}/>
                    <Route path="/news" element={<News/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;





