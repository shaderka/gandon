"use client"
import React, {useState} from 'react';
import "../../app/styles/hero-page/header.scss"
import Logo from "../../public/ChatGPT Image May 18, 2025, 02_53_07 PM.png"
import Image from "next/image";
import {useRouter} from "next/navigation";
const Header = ({setcallback}) => {
    const router = useRouter()
            const handleActivate = ()=> {

                setcallback(true)
            }
            const GotoProfile = () => {
        router.push("/user")
            }
    return (
        <div className="header">
            <div className="left-container">
                <button onClick={()=> {router.push("/feedback")}}>ОТЗЫВЫ</button>
                <button>ПОМОЩЬ</button>
                <button>НУГАЕВ</button>
            </div>
        <Image src={Logo} alt={"logo"} width={200} onClick={()=> router.push("/heropage")}/>
            <div className="right-container">
                <button onClick={GotoProfile}>ПРОФИЛЬ</button>
                <button>ИЗБРАННОЕ</button>
                <button onClick={handleActivate}>КОРЗИНА</button>

            </div>
        </div>
    );
};

export default Header;