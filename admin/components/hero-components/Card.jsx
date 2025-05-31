import React from 'react';
import styles from "../../app/styles/hero-page/card.module.css"
import Image from "next/image";

const Card = ({price,img,name}) => {


    return (
        <div className={styles.cardcontainer}>
            <Image src={img} alt={name} height={280} width={300} style={{marginBottom:-50
            }}/>
        <h1 className={styles.desc}>{name}</h1>

            <p className={styles.price}>{price}</p>
        </div>
    );
};

export default Card;