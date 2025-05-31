"use client"
import React from 'react';
import "../../app/styles/userprofile/sidebar.scss";
import {useDispatch, useSelector} from "react-redux";
import {setChoice} from "@/app/store/slices/profileSlice";
import userData from "@/components/userprofile-components/UserData";
import {useRouter} from "next/navigation";
const Sidebar = () => {
    const dispatch = useDispatch()
    const choice = useSelector((state) => state.profile.choice)
    const UserName = useSelector((state) => state.userinfo.userdata?.name)
    const UserData = useSelector((state) => state.userinfo)
    const router = useRouter()
    const handleClick = (value) => {
       dispatch(setChoice(value))
    }
    const handleDelete = ()=> {
        localStorage.removeItem("user")
        router.push("/register")

    }
    const menuItems = [
        'Мои данные',
        'Статус заказов',
        'FAQ',
        'Юридическая информация',
    ];
    return (
        <aside className="sidebar">
            <div className="sidebar-header">Здравствуйте,{UserName? UserName : "гость"}</div>
            <ul className="sidebar-menu">
                {menuItems.map((item) => (
                    <li
                        key={item}
                        className={`sidebar-item ${choice === item ? 'active' : ''}`}
                        onClick={() => handleClick(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>

            <div className="sidebar-header logout">
                <button style={{width: "100%",height : "100%"}} onClick={handleDelete}>
                    {UserName? "Выйти" : "Войти"}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;