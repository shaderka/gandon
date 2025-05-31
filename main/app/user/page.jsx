"use client"
import React from 'react';
import Header from "@/components/general-components/Header";
import Footer from "@/components/general-components/Footer";
import "../styles/userprofile/userprofile.scss"
import Sidebar from "@/components/userprofile-components/Sidebar";
import UserData from "@/components/userprofile-components/UserData";
import {useDispatch, useSelector} from "react-redux";
import Status from "@/components/userprofile-components/Status";
import Faq from "@/components/userprofile-components/Faq";
import Urist from "@/components/userprofile-components/Urist";
import Cart from "@/components/hero-components/Cart";

const UserProfile = () => {
    const choice = useSelector((state) => state.profile.choice);
    const renderContent = (choice) => {
        switch (choice) {
            case 'Мои данные':
                return <UserData />;
            case 'Статус заказов':
                return <Status />;
            case 'FAQ':
                return <Faq />;
            case 'Юридическая информация':
                return <Urist />;
            default:
                return <UserData />;
        }
    };
    return (
        <div className="profile-container">
            <Header />
            <main className="main-content">
                <Sidebar />
                {renderContent(choice)}
            </main>
            <Footer />
            <Cart/>
        </div>
    );
};

export default UserProfile;


