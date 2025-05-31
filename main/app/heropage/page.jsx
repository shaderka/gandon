"use client";
import React, {useState} from 'react';
import "../styles/hero-page/heropage.scss"
import Header from "@/components/general-components/Header";
import MainContent from "@/components/hero-components/MainContent";
import Cart from "@/components/hero-components/Cart";
import Roulette from "@/components/hero-components/Roulette";
import Categories from "@/components/hero-components/Categories";
import Footer from "@/components/general-components/Footer";
import Conclusion from "@/components/hero-components/Conclusion";
import Link from "next/link";


const HeroPage = () => {

    const [isShown,setisShown] = useState(false);
    const Activate = () => {
        setisShown(!isShown)
    }

    return (
        <div className="containerr">
            <Header  setcallback = {Activate}/>

            <div className= {`main-container ${isShown ? "deactivated" : ""}`} onClick={() => isShown && setisShown(false)}
                 tabIndex={0}>
                <Roulette isShown = {isShown}/>
                <Link href="user">
                    ssss
                </Link>
               <Categories/>


                <div className="liner">

                </div>

        </div>

        <Cart isShown = {isShown} />
        <Conclusion/>
        <Footer/>
        </div>
    );
};

export default HeroPage;