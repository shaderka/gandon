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

            </div>
        </div>
    );
};

export default Feedback;