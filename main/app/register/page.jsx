"use client"
import React, {useState} from 'react';
import "../styles/userregister/register.scss"
import Header from "@/components/general-components/Header";
import Footer from "@/components/general-components/Footer";
import {redirect, useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {setUser} from "@/app/store/slices/userInfo";
const Register = () => {
    const dispatch = useDispatch()
    const router = useRouter();

        const [form, setForm] = useState({
            name: '',
            email: '',
            password: '',
            confirm: '',
        });
        const [loginForm,setLoginForm] = useState({
            email : "",
            password : ""
        })

        const [error, setError] = useState('');
        const [isSwapped,Swap] = useState(false)

        const handleChange = (e) => {
            setForm({ ...form, [e.target.name]: e.target.value });
            setError('');
        };
        const loginChange = (e) => {
            setLoginForm({...loginForm,[e.target.name]:e.target.value});
        }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirm) {
            setError("Пароли не совпадают");
            return;
        }

        try {
            const res = await fetch("/api/regUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                }),
            });

            const data = await res.json();

            if (data.success) {
                console.log("Пользователь создан");
                console.log(data)


            } else {
                setError(data.message || "Ошибка при регистрации");
            }
        } catch (err) {
            console.error(err);
            setError("Что-то пошло не так");
        }
    };
        const goToLogin = ()=> {
            Swap(!isSwapped)

        }
    const LogIn = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/regLogin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: loginForm.email,
                    password: loginForm.password
                }),
            });

            if (!res.ok) throw new Error("Login failed");

            const data = await res.json();
            if (data.success) {
                dispatch(setUser(data.user))
                console.log("Login success:", data);
                localStorage.setItem('user', JSON.stringify(data.user));
                router.push("/user")
                }

        } catch (error) {
            console.error("Login error:", error);
            setError(error.message);
        }
    }

        return (
            <div className="register-container">
                <Header/>
                <div className="main-register">
                    <div className={`flip-card ${isSwapped ? 'flipped' : ''}`}>
                        <div className="flip-inner">

                            <form className="register-form front" onSubmit={handleSubmit}>
                                <button type="button" className="enter-button" onClick={goToLogin}>Войти</button>
                                <h2>Регистрация</h2>
                                <input name="name" placeholder="Имя" value={form.name} onChange={handleChange} required />
                                <input name="email" placeholder="Почта" value={form.email} onChange={handleChange} required />
                                <input type="password" name="password" placeholder="Пароль" value={form.password} onChange={handleChange} required />
                                <input type="password" name="confirm" placeholder="Подтверждение пароля" value={form.confirm} onChange={handleChange} required />
                                {error && <p className="error">{error}</p>}
                                <button type="submit" className="submit-button">Создать аккаунт</button>
                            </form>


                            <form className="register-form back">
                                <button type="button" className="enter-button" onClick={goToLogin}>Назад</button>
                                <h2>Вход</h2>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Почта"
                                    value={loginForm.email}
                                    onChange={loginChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Пароль"
                                    value={loginForm.password}
                                    onChange={loginChange}
                                    required
                                />
                                <button type="submit" className="submit-button" onClick={LogIn}>Войти</button>
                            </form>


                        </div>

                    </div>

                </div>
                <Footer/>
            </div>

        );
    }
export default Register;