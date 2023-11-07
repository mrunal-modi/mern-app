import Link from "../link/link";
import { bannerTitle1, bannerTitle2, bannerDescription, bannerImage, bannerIsLft, bannerButtons } from "../../config/page-config-home";
import "./banner.scss";

const Banner = ({
    className = ""
}) => {
    return (
        <div id="banner" className={`${className} banner ${bannerIsLft ? "lft" : ""}`}>
            <div className="container">
                <div className="banner-content">
            {bannerImage && 
            <div className="left hidden-sm">
            <img src={bannerImage} className="bannerImage" alt="bannerImage" />
            </div>}
            <div className="right">
                <h3>
                    {bannerTitle1}
                </h3>
                <h1>
                    {bannerTitle2}
                </h1>
                <p>
                    {bannerDescription}
                </p>
                <div className="btn-container">
                    {bannerButtons.map((el, i) => (
                        <Link className="btn btn-primary" key={i} {...el}>
                            {el.label}
                        </Link>
                    ))}
                </div>
            </div>

            </div>

            </div>
        </div>
    )
}

export default Banner;