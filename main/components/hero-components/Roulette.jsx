    'use client'
    import React, {useRef, useEffect, useState, useLayoutEffect} from 'react';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import "../../app/styles/hero-page/roulette.css"
    gsap.registerPlugin(ScrollTrigger);
    import "../../components/general-components/AddToCartButton"
    const Roulette = ({isShown}) => {
        const useIsomorphicLayoutEffect =
            typeof window !== "undefined" ? useLayoutEffect : useEffect;
        const [currentSlide, setCurrentSlide] = useState(0);
        const sliderRef = useRef(null);
        const slides = [
            {
                title: "Новая коллекция Asics Porno ",
                subtitle: "Весна-Лето 2025",
                desc: "Скидка 20% на первую покупку",
                bgColor: "white",
                cta: "Смотреть новинки",
                imgs : ["http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F20220213%2F0ababe18c60a41caba56e195e1ba3a88.jpg&w=1920&q=75"]
            },
            {
                title: "Бестселлеры",
                subtitle: "Топ продаж этого месяца",
                desc: "Бесплатная доставка при заказе от 5000000₽",
                bgColor: "white",
                cta: "Выбрать сейчас",
                imgs: ["http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F20230310%2F477da63723304e73baba7a46c53ece05.jpg&w=1920&q=75",
                    "http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F2025012410%2F78d5f4b7dfb6188a26611d0cf8f34024.jpg&w=1920&q=75",
                    "http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F2025031223%2Fcded4cc6187ab27f68fa40dfe42d7085.jpg&w=1920&q=75"
                ],
                imgDescriptions: [
                    "Asics Gel-Preleus - Бестселлер сезона",
                    "Nike P-6000  - Технология Anus",
                    "Футболка UNIQLO  - Классическая модель"
                ]
            },
            {
                title: "Ограниченная серия",
                subtitle: "Эксклюзивные модели",
                desc: "Только 10 штук в наличии",
                bgColor: "white",
                cta: "Успей купить",
                imgs: ["http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.poizon.com%2Fpro-img%2Forigin-img%2F20221123%2F1b7daf5608d24339a7b6569e0864c4df.jpg&w=1920&q=75"]
            }
        ];


        useIsomorphicLayoutEffect(() => {
            const slides = gsap.utils.toArray(".slide");

            slides.forEach((slide, i) => {
                gsap.from(slide, {
                    scrollTrigger: {
                        trigger: slide,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    },
                    x: i % 2 === 0 ? -100 : 100,
                    opacity: 0,
                    duration: 0.8
                });

                gsap.from(`.slide-content-${i} > *`, {
                    scrollTrigger: {
                        trigger: slide,
                        start: "top 60%",
                    },
                    y: 50,
                    opacity: 0,
                    stagger: 0.2,
                    delay: 0.3
                });
            });
        }, []);



        return (
            <div className={`product-showcase ${isShown ? "deactivated" : ""}`} ref={sliderRef}>
                <div className="slider-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="slide"
                            style={{ backgroundColor: slide.bgColor }}
                        >
                            <div className={`slide-content slide-content-${index}`}>
                                <span className="slide-subtitle">{slide.subtitle}</span>
                                <h2 className="slide-title">{slide.title}</h2>
                                <p className="slide-desc">{slide.desc}</p>
                                <button className="slide-button">{slide.cta}</button>
                            </div>
                            <div className="slide-image">
                                {slide.imgs.length === 1 ? (
                                    <img src={slide.imgs[0]} alt={slide.title} />
                                ) : (
                                    slide.imgs.map((img, imgIndex) => (
                                        <div className="img-container" key="12">
                                        <img key={imgIndex} src={img} alt={`${slide.title} ${imgIndex + 1}`}/>
                                            <span className="img-description">{slide.imgDescriptions[imgIndex]}</span>
                                            <button className= "buy">
                                               +

                                            </button>
                                        </div>
                                    ))
                                )}
                                <div className="parallax-bg"></div>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="slider-dots">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>



            </div>
        );
    };

    export default Roulette;