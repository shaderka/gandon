"use client";
import React, {useState} from 'react';
import styles from "../styles/hero-page/heropage.module.css"
import Header from "@/components/hero-components/Header";
import MainContent from "@/components/hero-components/MainContent";
import Conclusion from "@/components/hero-components/Conclusion";
import Feedback from "@/components/hero-components/Feedback";
import Roulette from "@/components/hero-components/Roulette";


const HeroPage = () => {
    const [isShown,setisShown] = useState(false);
    const Activate = () => {
        setisShown(!isShown)
    }
    return (
        <div className={styles.container}>
            <Header  callback = {Activate}/>
        <Roulette/>
        <MainContent/>
        <Feedback callback = {isShown} setCallback = {Activate}/>



        </div>
    );
};

export default HeroPage;