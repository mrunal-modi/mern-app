import "./product.scss";
import ContentItem from "../../components/content-item/content-item";
// import Title from "../../components/title/title";
import { useParams } from 'react-router-dom';
import { productsConfig } from "../../config/page-config-products";
import { useMemo } from "react";

const Product = () => {
    let { id } = useParams();
    let product = useMemo(() => {
        return productsConfig[id];
    }, [id]);
    if (!product) {
        return (
            <div className="container">
                <h1> The product you are looking for does not exist! </h1>
            </div>
        )
    }
    return (
            <div className="container">
                {/* <Title title={product.name} /> */}
                <div className="about-us-content">
                <ContentItem img={product.image} description={product.description} title={product.name} />
                </div>
            </div>

    )
}

export default Product;