import "./contact-us-form.scss";
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { emailJsInfo } from "../../config/page-config-contact-us";
// import Title from "../title/title";

const form = [
    {
        label: "Full Name",
        type: "text",
        validation: "required",
        name: "full_name",
        placeholder: "Full Name",
    },
    {
        label: "Email",
        type: "text",
        validation: "email",
        name: "email",
        placeholder: "jhone@example.com"
    },
    {
        label: "Describe your query",
        type: "textarea",
        placeholder: "Describe your query (optional)",
        name: "description"
    }
]

const ContactUsForm = ({ className }) => {

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState({ full_name: "", email: "", description: "" });
    const [error, setError] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(loading) return false;
        setLoading(true);
        emailjs.sendForm(emailJsInfo.serviceID, emailJsInfo.templateID, e.target, emailJsInfo.publicKey)
            .then((result) => {
                setSuccess(true);
                setData({ full_name: "", email: "", description: "" });
                setLoading(false);
                console.log(result.text);
            }, (error) => {
                setLoading(false);
                setError(error.text);
                console.log(error.text);
            });
    }

    const validateInput = (e, el) => {
        if (el.validation.includes("number") && e) {
            var charCode = (e.which) ? e.which : e.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                return e.preventDefault();
        }
        return true;
    }



    return (
        <div className="container" id="contact-us">
{/* <Title title="Contact" /> */}
        
        <form className={`${className} contact-us-form`} onSubmit={handleSubmit}>
            {(success) && 
            <div className="col-12">
                <div className="alert alert-success ">
                Contact Successful!
                </div>
                </div>}

                {(error) && 
            <div className="col-12">
                <div className="alert alert-danger ">
                {error}
                </div>
                </div>}

            {form.map((el, i) =>
                <label key={i} style={{ width: el.width || "100%", marginBottom: 20, padding: "0 15px" }}>
                    <span>
                        {el.label}
                    </span>
                    {
                        el.type === "textarea" ?
                            <textarea
                                {...el}
                                onChange={(e) => setData({ ...data, [el.name]: e.target.value })}
                                value={data[el.name]}
                                className="form-control"
                            /> :
                            <input
                                {...el}
                                onChange={(e) => setData({ ...data, [el.name]: e.target.value })}
                                value={data[el.name]}
                                className="form-control"
                                onKeyDown={e => validateInput(e, el)}
                            />
                    }
                </label>
            )}
            <div className="btn-container">
                <button className="btn">
                    {loading? "Submitting": "Submit"}
                </button>
            </div>
        </form>

        </div>

    )
}

export default ContactUsForm;