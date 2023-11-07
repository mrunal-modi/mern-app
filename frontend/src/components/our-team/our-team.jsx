import "./our-team.scss";
import UserProfilePic from "../../components/user-profile-pic/user-profile-pic";
import { teamInfo } from "../../config/page-config-about-us";
import Title from "../title/title";

const OurTeam = ({ className }) => {
    return (
        
        <div className="team" id="team">
            <div className="container">

            
            <Title title="Our Team" />
            <div className="team-content">

            
            {teamInfo.map((el, i) => (
                <UserProfilePic key={i}
                    src={el.image}
                    fullName={el.fullName}
                    designation={el.role} />
            ))}
            </div>

            </div>
        </div>
    )
}

export default OurTeam;