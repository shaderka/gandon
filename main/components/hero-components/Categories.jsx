"use client"
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "../../app/styles/general/categories.scss";
import clothes from "../../public/clotes.png"
import shoes from "../../public/shoes.png"
const Categories = () => {
    const cards = [
        { id: 1, title: "Обувь", description: "",img :shoes.src },
        { id: 2, title: "Одежда", description: "",img : clothes.src },
        { id: 3, title: "Аксессуары", description: "",img : "https://sun9-38.userapi.com/impg/vHRVhjGn_m3ZBu4bIsd-SEGYltxxEvUnnvE_gQ/kkutFqrIt7g.jpg?size=1024x1024&quality=95&sign=4e4e1bd11818b05884b4240e4c61c881&type=album" },
        {id : 4,title: "Сумки/чемоданы",description: "",img: "https://sun9-16.userapi.com/impg/Xlh5AEpSeURtasNjDVD-J4k2D2XguzRmQubyTQ/jI8Y6aj52X4.jpg?size=1024x1024&quality=95&sign=08f8b945dbb75161cd765e07f437579b&type=album"},
        { id: 5, title: "Часы", description: "",img : "https://sun9-14.userapi.com/impg/P28IwfUNK2jh6kOUeASOQqV1hRFmeppcZBcCMQ/ZfVMvdXYHm8.jpg?size=1024x1024&quality=95&sign=e174f57e407460445a3496696cc80d99&type=album" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const sliderRef = useRef(null);
    const cardRefs = useRef([]);

    const visibleCount = 3;


    useEffect(() => {
        gsap.from(cardRefs.current, {
            duration: 0.8,
            opacity: 0,
            y: 50,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.3
        });


        gsap.from(".navigation button", {
            duration: 0.6,
            opacity: 0,
            y: 20,
            stagger: 0.1,
            ease: "back.out(1.7)",
            delay: 0.8
        });
    }, []);



    const prev = () => setCurrentIndex(prev => Math.max(prev - 1, 0));
    const next = () => setCurrentIndex(prev => Math.min(prev + 1, cards.length - visibleCount));

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setTranslateX(-currentIndex * 620);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const currentX = e.clientX;
        const diff = currentX - startX;
        const newTranslateX = translateX + diff;

        const maxTranslate = -(cards.length - visibleCount) * 620;
        if (newTranslateX > 0 || newTranslateX < maxTranslate) return;

        gsap.to(sliderRef.current, {
            duration: 0.1,
            x: newTranslateX,
            ease: "power1.out"
        });
    };

    const handleMouseUp = (e) => {
        if (!isDragging) return;
        setIsDragging(false);

        const currentX = e.clientX;
        const diff = currentX - startX;

        if (Math.abs(diff) > 25) {
            diff > 0 ? prev() : next();
        } else {
            gsap.to(sliderRef.current, {
                duration: 0.4,
                x: -currentIndex * 620,
                ease: "power2.out"
            });
        }
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
            gsap.to(sliderRef.current, {
                duration: 0.4,
                x: -currentIndex * 620,
                ease: "power2.out"
            });
        }
    };

    return (
        <div className="categories-container">
            <div
                ref={sliderRef}
                className={`slider ${isDragging ? 'dragging' : ''}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            >
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        ref={el => cardRefs.current[index] = el}
                        className="card"
                        style={{ backgroundImage: `url("${card.img}")` }}
                    >
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                    </div>
                ))}
            </div>
            <div className="navigation">
                <button onClick={prev} disabled={currentIndex === 0}>
                    Prev
                </button>
                <button onClick={next} disabled={currentIndex >= cards.length - visibleCount}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Categories;