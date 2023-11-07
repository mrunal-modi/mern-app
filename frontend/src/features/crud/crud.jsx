import "./crud.scss";
import React, { useEffect, useState, useRef } from "react";

import Title from "../../components/title/title";
import * as services from "../../services/services";

import Form from "../form/form";
import EditItemUI from "../edit-item/edit-item";

const Crud = () => {

    const [success, setSuccess] = useState(false);
    const [backendConnected, setBackendConnected] = useState(true);
    const [error, setError] = useState();
    const [submitting, setSubmitting] = useState();
    // eslint-disable-next-line
    const [loading, setLoading] = useState();
    const successTimeout = useRef();
    const errorTimeout = useRef();
    const [data, setData] = useState(null);
    const [resetInput, setResetInput] = useState(false);

    useEffect(() => {
        readData();
    }, []); // Empty Array ensures the useEffect will only run Once!

    useEffect(() => {
        if (errorTimeout.current) {
            clearTimeout(errorTimeout.current)
        }
        errorTimeout.current = setTimeout(() => {
            setError(false)
        }, 3000)
    }, [error]);

    useEffect(() => {
        if (successTimeout.current) {
            clearTimeout(successTimeout.current)
        }
        successTimeout.current = setTimeout(() => {
            setSuccess(false)
        }, 3000)
    }, [success]);

    // Create
    const handlePOST = async (d) => {
        try {
            setSuccess(false);
            setResetInput(false);
            setError(false);
            setSubmitting(true);
            const res = await services._create(d.email);;
            if (res.status === 200) {
                setSuccess(true);
                setResetInput(true);
                console.log(res.data);
                setData([...data, res.data]);
            }
            setSubmitting(false);
        } catch (err) {
            setSubmitting(false);
            setError(err?.response?.data?.error);
            console.log(err.response);
        }
    }

    // Read
    const readData = async () => {
        try {
            setLoading(true);
            const res = await services._read();
            console.log(res.data);
            setData(res.data);
            setLoading(false);

        }
        catch (err) {
            setLoading(false);
            setError(err?.response?.data?.error);
            setBackendConnected(false);
            console.log(err.response);
        }

    };

    // Update
    const handleChange = async (email, value) => {
        try {
            const res = await services._update(email, value);
            const d = [...data];
            const i = d.findIndex((el) => el.email === email);
            if (i !== -1) {
                d[i] = res.data;
            }
            setData(d);

        } catch (err) {
            setLoading(false);
            setError(err?.response?.data?.error);
            console.log(err.response);
        }
    };

    // Delete
    const deleteData = async (email) => {
        try {
            setLoading(true);
            const res = await services._delete(email);
            console.log(res.data);
            const d = [...data];
            const i = d.findIndex((el) => el.email === email);
            if (i !== -1) {
                d.splice(i, 1);
            }
            setData(d);
            setLoading(false);

        }
        catch (err) {
            setLoading(false);
            setError(err?.response?.data?.error);
            console.log(err.response);
        }
    };

    if (!backendConnected) {
        return (
            <div style={{padding:20}}>
                <div className="crud-item card margin-bottom-20">
                    <h1 style={{textAlign: "center"}} >
                    No Backend Connected
                    </h1>
                </div></div>)

    }

    return (
        <div className="crud-page">
            <div className="column">
                <Title title="Create" />
                <Form className="post-form"
                    resetInput={resetInput}
                    formInputs={
                        [
                            {
                                label: "",
                                type: "text",
                                validation: "email",
                                name: "email",
                                placeholder: "Enter Text"
                            }
                        ]
                    }
                    onSubmit={handlePOST}
                    error={error}
                    // success={success}
                    buttonLabel={submitting ? "Submitting" : "Submit"}
                />
            </div>
            <div className="column">
                <Title title="Read | Update | Delete" />

                {data?.map((el, i) => (
                    <EditItemUI
                        onChange={(value) => {
                            handleChange(el.email, value);
                        }}
                        onDelete={() => {
                            deleteData(el.email);
                        }}
                        item={el.email}
                        key={i}
                    />
                ))}
            </div>

        </div>
    )
}

export default Crud;