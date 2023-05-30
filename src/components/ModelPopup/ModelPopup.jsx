import React, { useState } from "react";
import "./ModelPopup.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosPost } from "../../axiosServices";

const validationSchema = Yup.object().shape({
    firstname: Yup.string()
        .min(3, "First Name must be at least 3 characters")
        .max(20, "First Name can be at most 20 characters")
        .matches(/^[A-Za-z ]*$/, "Only characters are allowed")
        .required("First Name is required"),
    lastname: Yup.string()
        .min(3, "Last Name must be at least 3 characters")
        .max(20, "Last Name can be at most 20 characters")
        .matches(/^[A-Za-z ]*$/, "Only characters are allowed")
        .required("Last Name is required"),
    activity: Yup.string().required("Activity is required"),
    description: Yup.string()
        .min(5, "Description must be at least 5 characters")
        .max(250, "Description can be at most 250 characters")
        .required("Description is required"),
    dateofjoining: Yup.date()
        .min(new Date(), "Date must be today or later")
        .required("Date of Joining is required"),
    phone: Yup.string()
        .matches(/^[0-9]*$/, "Phone Number must contain only digits")
        .required("Phone Number is required"),
    image: Yup.string()
        .url("Please enter a valid URL")
        .required("Image URL is required"),
    otherActivity: Yup.string()
        .min(5, "Other Activity must be at least 5 characters")
        .max(20, "Other Activity can be at most 20 characters"),
        email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

const ModelPopup = ({ setShowModal }) => {
    const [loading, setLoading] = useState(false);

    const createRecord = async (values) => {
        setLoading(true);
        try {
            const res = await axiosPost("/client", values);
            console.log(res);
            setLoading(false);
            setShowModal(false);
        } catch (err) {
            console.log(err);
        }
    };

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            activity: "",
            durations: "",
            description: "",
            dateofjoining: "",
            image: "",
        },
        validationSchema,
        onSubmit: (values) => {
            createRecord(values);
        },
    });

    const activityOptions = [
        "Swimming",
        "Running",
        "Bicycle",
        "walking",
        "hiking",
        // Add more pre-defined options here
    ];

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div className="modalContainer">
            <form action="" onSubmit={formik.handleSubmit}>
                <div className="modalBox">
                    <button type="close" className="close" onClick={handleClose}>
                        x
                    </button>
                    <div className="modalHeader">
                        <h2>New Record Details</h2>
                    </div>
                    <div className="modalInner">
                        <div className="input-container">
                            <div className="input-box">
                                <label htmlFor="firstname">First Name</label>
                                <input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    required
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.firstname}
                                />
                                {formik.touched.firstname && formik.errors.firstname && (
                                    <div className="error">{formik.errors.firstname}</div>
                                )}
                            </div>
                            <div className="input-box">
                                <label htmlFor="lastname">Last Name</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    required
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lastname}
                                />
                                {formik.touched.lastname && formik.errors.lastname && (
                                    <div className="error">{formik.errors.lastname}</div>
                                )}
                            </div>
                        </div>
                        <div className="input-box">
                            <label htmlFor="image">Image</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                required
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.image}
                            />
                            {formik.touched.image && formik.errors.image && (
                                <div className="error">{formik.errors.image}</div>
                            )}
                        </div>
                        <div className="input-box">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                required
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="error">{formik.errors.email}</div>
                            )}
                        </div>
                        <div className="input-container">
                            <div className="input-box">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="phone"
                                    id="phone"
                                    name="phone"
                                    required
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone}
                                />
                                {formik.touched.phone && formik.errors.phone && (
                                    <div className="error">{formik.errors.phone}</div>
                                )}
                            </div>
                            <div className="input-box">
                                <label htmlFor="activity">Activity</label>
                                <select
                                    id="activity"
                                    name="activity"
                                    required
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.activity}
                                >
                                    <option value="">Select an activity</option>
                                    {activityOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                    <option value="Other">Other (Add your own)</option>
                                </select>
                                {formik.touched.activity && formik.errors.activity && (
                                    <div className="error">{formik.errors.activity}</div>
                                )}
                            </div>
                        </div>
                        {formik.values.activity === "Other" && (
                            <div className="input-box">
                                <label htmlFor="otherActivity">Other Activity</label>
                                <input
                                    type="text"
                                    id="otherActivity"
                                    name="otherActivity"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.otherActivity}
                                />
                            </div>
                        )}
                        <div className="input-box">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                required
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                            />
                            {formik.touched.description && formik.errors.description && (
                                <div className="error">{formik.errors.description}</div>
                            )}
                        </div>
                        <div className="input-box">
                            <label htmlFor="durations">Durations</label>
                            <input
                                type="text"
                                id="durations"
                                name="durations"
                                required
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.durations}
                            />
                            {formik.touched.durations && formik.errors.durations && (
                                <div className="error">{formik.errors.durations}</div>
                            )}
                        </div>
                        <div className="input-box">
                            <label htmlFor="dateofjoining">Date of Joining</label>
                            <input
                                type="date"
                                id="dateofjoining"
                                name="dateofjoining"
                                required
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.dateofjoining}
                            />
                            {formik.touched.dateofjoining && formik.errors.dateofjoining && (
                                <div className="error">{formik.errors.dateofjoining}</div>
                            )}
                        </div>
                    </div>
                    <div className="modalFooter">
                        <button className="add-btn" type="submit">
                            {loading ? "Saving..." : "Save Details"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ModelPopup;
