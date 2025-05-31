"use client"
import { useState } from 'react';
import styles from '../../.././admin/app/styles/hero-page/feedback.module.css';

const Feedback = ({callback,setCallback}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        rating: 0,
        isSubmitting: false,
        isSuccess: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData(prev => ({ ...prev, isSubmitting: true }));

        // Здесь будет запрос к API
        await new Promise(resolve => setTimeout(resolve, 1500));

        setFormData(prev => ({ ...prev, isSubmitting: false, isSuccess: true }));
        setTimeout(() => {
            setFormData({
                name: '',
                email: '',
                message: '',
                rating: 0,
                isSubmitting: false,
                isSuccess: false
            });
        }, 3000);
    };

    return (
        <div className={`${styles.feedbackContainer} ${callback ? styles.feedbackContainerShown : ''}`}>
            <div className={styles.feedbackCard}>
                <button style={{position : "absolute",
                    top : 20,
                    left : 390,
                                }} onClick={setCallback}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
                <h2 className={styles.title}>Оставьте отзыв или запрос помощи</h2>

                {formData.isSuccess ? (
                    <div className={styles.successMessage}>
                        <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none"/>
                            <path className={styles.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                        <p>Спасибо! Ваше сообщение отправлено.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className={styles.feedbackForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.label}>Ваше имя</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                            <div className={styles.inputUnderline}></div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                            <div className={styles.inputUnderline}></div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="message" className={styles.label}>Ваше сообщение</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className={styles.textarea}
                                rows="5"
                                required
                            ></textarea>
                            <div className={styles.textareaUnderline}></div>
                        </div>

                        <div className={styles.ratingGroup}>
                            <p className={styles.ratingLabel}>Оцените наш сервис:</p>
                            <div className={styles.stars}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        className={`${styles.star} ${star <= formData.rating ? styles.active : ''}`}
                                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={formData.isSubmitting}
                        >
                            {formData.isSubmitting ? (
                                <span className={styles.spinner}></span>
                            ) : (
                                'Отправить'
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Feedback;