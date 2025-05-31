"use client"
import React, {useEffect, useState} from 'react';
import "../../app/styles/hero-page/maincontent.scss"
import Card from "@/components/hero-components/Card";
import AddToCartButton from "@/components/general-components/AddToCartButton";

const MainContent = ({isShown}) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('/api/route')
            .then((res) => res.json())
            .then(setItems)
            .catch(console.error);
    }, []);

    return (
        <div className={`containerer ${isShown ? "deactivated" : ""}`}>

            {items.map((item) => (
                <Card  key={item.spuId} item={item} price="10" img={item.imagesUrl[0]} name={item.title} >
                        <button className="purchase-btn">

                            <AddToCartButton item={item} text="В корзину" />
                        </button>




                </Card>
            ))}
        </div>
    );
}

export default MainContent;