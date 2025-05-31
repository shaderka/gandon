"use client"
import React, {useState} from 'react';
import Header from "@/components/general-components/Header";
import Footer from "@/components/general-components/Footer";
import "../styles/feedback/main.scss"
import {useRouter} from "next/navigation";

const Feedback = () => {
    const router = useRouter();
    const [feedbackText, setFeedbackText] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка авторизации
        if (!localStorage.getItem("user")) {
            router.push("/register");
            return;
        }

        if (!feedbackText.trim()) {
            setError('Пожалуйста, введите текст отзыва');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/saveFeedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ feedback: feedbackText }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Ошибка при отправке отзыва');
            }

            const data = await res.json();
            console.log('Отзыв успешно сохранен:', data);

            setIsSubmitted(true);
            setFeedbackText('');
        } catch (err) {
            console.error('Ошибка при отправке отзыва:', err);
            setError(err.message || 'Произошла ошибка при отправке');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setIsSubmitted(false);
        setFeedbackText('');
        setError(null);
    };

    return (
        <div className="feedback-container">
            <Header />
            <div className="main-content">
                <div className="feedback-box">
                    <h2>Форма обратной связи</h2>
                    <p className="description">
                        Мы будем рады вашему отзыву! Поделитесь впечатлениями или предложениями — это поможет нам стать лучше.
                    </p>

                    {isSubmitted ? (
                        <div className="success-message">
                            <p>Спасибо за ваш отзыв! Мы ценим ваше мнение.</p>
                            <button onClick={handleReset}>Оставить новый отзыв</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="feedback">Ваш отзыв или предложение</label>
                                <textarea
                                    id="feedback"
                                    value={feedbackText}
                                    onChange={(e) => setFeedbackText(e.target.value)}
                                    disabled={isLoading}
                                    className={error ? 'error' : ''}
                                />
                                {error && <p className="error-message">{error}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !feedbackText.trim()}
                                className="submit-button"
                            >
                                {isLoading ? 'Отправка...' : 'Отправить отзыв'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
    }

export default Feedback;