import React from 'react';
import styles from "../../app/styles/hero-page/card.module.css"
import Image from "next/image";

const Card = ({price,img,name,children}) => {


    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <Image
                    src={img}
                    alt={name}
                    fill
                    className={styles.image}

                />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{name}</h3>
                <p className={styles.price}>{price} ₽</p>
                {children && <div className={styles.buttonContainer}>{children}</div>}
            </div>
        </div>
    );
};

export default Card;