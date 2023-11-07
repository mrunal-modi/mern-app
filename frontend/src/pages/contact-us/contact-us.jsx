import "./contact-us.scss";
import React from "react";
import ContactUsForm from "../../components/contact-us-form/contact-us-form";
// import ContentItem from "../../components/content-item/content-item";
// import {contactUsContentConfig} from "../../config/contact-us-page-config";

const ContactUs = () => {
    return (
        <div className="landing-page">
            <ContactUsForm />
            {/* <div className="contact-us-content">
                    {contactUsContentConfig.map((el, i) => (
                        <ContentItem img={el.image} description={el.description} title={el.title} isLft={i%2 === 1} key={i} />
                    ))}
                </div> */}
        </div>
    );
};

export default ContactUs;
