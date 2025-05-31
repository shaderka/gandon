import React from 'react';
import "../../app/styles/hero-page/conclusion.scss"
import Image from "next/image";
import woman from "../../public/woman.png"
import Link from 'next/link';
const Conclusion = () => {
    return (
        <div className="conclusion-container">


            <div className="advantages-section">
                <h2 className="advantages-title">Наши предложения и преимущества</h2>
                <ul className="advantages-list">
                    <li className="advantages-item">
                        <svg className="advantages-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                        Работа по всей России
                    </li>
                    <li className="advantages-item">
                        <svg className="advantages-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                        Максимально ответственный подход к каждому клиенту
                    </li>
                    <li className="advantages-item">
                        <svg className="advantages-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                        Обратная связь почти 24/7
                    </li>
                    <li className="advantages-item">
                        <svg className="advantages-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                        Качество товара гарантируется
                    </li>
                    <li className="advantages-item">
                        <svg className="advantages-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                        Товары прямиком с маркетплейса POIZON
                    </li>
                </ul>
                <Link href="/products" className="products-button">
                    К продуктам
                    <svg className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default Conclusion;