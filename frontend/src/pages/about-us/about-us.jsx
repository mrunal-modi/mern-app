import "./about-us.scss";
import ContentItem from "../../components/content-item/content-item";
import OurTeam from "../../components/our-team/our-team";
import { aboutUsConfig } from "../../config/page-config-about-us";

const AboutUs = () => {
    return (


            <div className="container">
                <OurTeam />
                <div className="about-us-content">
                    {aboutUsConfig.map((el, i) => (
                        <ContentItem img={el.image} description={el.description} title={el.title} isLft={i%2 === 1} key={i} />
                    ))}
                </div>
            </div>
    )
}

export default AboutUs;