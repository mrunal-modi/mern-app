import SocialContact from "../social-contacts/social-contacts";
import "./footer.scss";
import {title,description} from "../../config/component-config-footer";

export default function Footer() {
  return (
    <footer className="footer">
      <section className="main-footer container">
        <div className="mr-auto logo-container">
          <div className="brand-name">
            {title}
          </div>
          <p>{description}</p>
        </div>
        <div className="social">
          <div className="title">
            Follow Us
          </div>
          <SocialContact showNames/>
        </div>
      </section>
      <section className="bottom-bar flex justify-center align-center">
      &copy; 2023 DevStackTutor.com All Rights Reserved
      </section>
      
    </footer>
  );
}
