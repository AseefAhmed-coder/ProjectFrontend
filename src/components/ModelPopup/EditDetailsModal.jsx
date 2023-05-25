import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import "./ModelPopup.css";
import { axiosPut } from "../../axiosServices";

const EditDetailsModal = ({ empById, setEditModal }) => {
    const [loading, setLoading] = useState(false);

    // Initialize form values with empById
    const formik = useFormik({
        initialValues: empById,
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
                                    value={formik.values.firstname}
                                />
                            </div>
                            <div className="input-box">
                                <label htmlFor="lastname">Last Name</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    required
                                    onChange={formik.handleChange}
                                    value={formik.values.lastname}
                                />
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
                                value={formik.values.image}
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                required
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
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
                                    value={formik.values.phone}
                                />
                            </div>
                            <div className="input-box">
                                <label htmlFor="activity">Activity</label>
                                <select
                                    id="activity"
                                    name="activity"
                                    required
                                    onChange={formik.handleChange}
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
                                value={formik.values.description}
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="durations">Durations</label>
                            <input
                                type="text"
                                id="durations"
                                name="durations"
                                required
                                onChange={formik.handleChange}
                                value={formik.values.durations}
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="dateofjoining">Date of Joining</label>
                            <input
                                type="date"
                                id="dateofjoining"
                                name="dateofjoining"
                                onChange={formik.handleChange}
                                value={formik.values.dateofjoining}
                            />
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
