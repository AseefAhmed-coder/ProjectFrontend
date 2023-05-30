import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./ModelPopup.css";
import { axiosPut } from "../../axiosServices";

const validationSchema = Yup.object().shape({
    firstname: Yup.string()
        .required('First Name is required')
        .min(3, 'First Name must be at least 3 characters')
        .max(20, 'First Name must be at most 20 characters'),
    lastname: Yup.string()
        .required('Last Name is required')
        .min(3, 'Last Name must be at least 3 characters')
        .max(20, 'Last Name must be at most 20 characters'),
    image: Yup.string()
        .url('Please enter a valid image URL')
        .required('Image URL is required'),
    email: Yup.string()
        .email('Please enter a valid email')
        .required('Email is required'),
    phone: Yup.string()
        .matches(/^[0-9]+$/, 'Phone Number must only contain digits')
        .required('Phone Number is required'),
    activity: Yup.string()
        .required('Activity is required'),
    otherActivity: Yup.string()
        .min(5, 'Other Activity must be at least 5 characters')
        .max(20, 'Other Activity must be at most 20 characters'),
    description: Yup.string()
        .min(5, 'Description must be at least 5 characters')
        .max(250, 'Description must be at most 250 characters'),
    dateofjoining: Yup.date()
        .required('Date of Joining is required')
        .min(new Date(), 'Date of Joining must be today or a future date'),
});

const EditDetailsModal = ({ empById, setEditModal }) => {
    const [loading, setLoading] = useState(false);

    // Initialize form values with empById
    const formik = useFormik({
        initialValues: empById,
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const res = await axiosPut(`/client/${empById._id}`, values);
                setLoading(false);
                setEditModal(false);
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        },
    });

    useEffect(() => {
        formik.setValues(empById);
    }, [empById]);

    const activityOptions = [
        'Swimming',
        'Running',
        'Bicycle',
        'Walking',
        'Hiking',
        // Add more pre-defined options here
    ];

    const handleClose = () => {
        setEditModal(false);
    };

    return (
        <div className="modalContainer">
            <form onSubmit={formik.handleSubmit}>
                <div className="modalBox">
                    <button type="close" className="close" onClick={handleClose} > x </button>
                    <div className="modalHeader">
                        <h2>Edit Record Details</h2>
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
                        {formik.values.activity === 'Other' && (
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
                                {formik.touched.otherActivity && formik.errors.otherActivity && (
                                    <div className="error">{formik.errors.otherActivity}</div>
                                )}
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
                        <button className="add-btn" type="submit" disabled={loading}>
                            {loading ? 'Editing' : 'Edit and Save'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditDetailsModal;
