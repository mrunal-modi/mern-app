import "./home.scss";
import React from "react";
import Banner from "../../components/banner/banner";
import Crud from "../../features/crud/crud";

const Home = () => {
    return (
        <div className="landing-page">
            <Banner />
            <Crud/>
        </div>
    );
};

export default Home;
