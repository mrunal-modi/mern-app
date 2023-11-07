
import "./social-contacts.scss";
import { socialInfo } from "../../config/component-config-footer";

const SocialContact = ({ showNames = false }) => {
  return (
    <div className="contacts">
      {socialInfo.map((el, i) =>
        <a className="contactIcons" href={el.link} key={i}>
          <i className={`bi bi-${el.icon}`} />{showNames ? el.label : ""}
        </a>
      )}
    </div>
  );
}

export default SocialContact;