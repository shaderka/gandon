import React from 'react';
import "../styles/products/main.scss"
import Header from "@/components/general-components/Header";
import Footer from "@/components/general-components/Footer";
import Link from "next/link";
import Filter from "@/components/products-components/Filter";
import FilterContainer from "@/components/products-components/FilterContainer";
const Page = () => {

    return (
        <div className="products-main-container">
        <Header/>

<Link href="heropage">
    sss
</Link>
            <FilterContainer/>
            <Footer/>
        </div>
    );
};

export default Page;