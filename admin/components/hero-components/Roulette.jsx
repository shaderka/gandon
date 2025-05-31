    'use client'
import React, { useEffect, useRef,useState} from 'react';
import styles from "../.././app/styles/hero-page/roulette.module.css"
    import Tilt from 'react-parallax-tilt';

const Roulette = () => {
    const nums = 3;
    const [pos,setPos] = useState(0)
    const NextPos = () => {
        setPos((prev) => (prev + 1) % nums);
    }

    return (
        <div className={styles.TiltContainer}>
            {Array(nums)
                .fill()
                .map((_, i) => (
                    <Tilt
                        key={i}
                        tiltMaxAngleX={15}
                        tiltMaxAngleY={15}
                        perspective={1000}
                        scale={1.05}
                        transitionSpeed={400}
                        glareEnable={false}
                        className={`${styles.tiltCard} ${i === 1 ? styles.active : ''}`}
                    >
                        <div className={styles.cardInner}>
                            <h2>{i}
                                {pos}</h2>
                            <p>Описание или дополнительная информация.</p>
                        </div>
                    </Tilt>
                ))}

            <button onClick={NextPos} className={styles.nextButton}>
                Следующий
            </button>
        </div>
    );
}
export default Roulette;