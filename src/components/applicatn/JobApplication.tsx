import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { MdBusinessCenter } from 'react-icons/md';
// import axios from 'axios';

const initialState = {
    applicant_name: '',
    email: '',
    job_id: "",
    cv_file_url: "",
    passport_file_url: "",
    phone: '',
    job_title: '',
    additional_info: '',
}

const JobApplication = () => {
    const [form, setForm] = useState(initialState);
    // const [cv, setCv] = useState<File | null>(null);
    // const [passport, setPassport] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // const handleFileChange = (
    //     e: React.ChangeEvent<HTMLInputElement>,
    //     setFile: React.Dispatch<React.SetStateAction<File | null>>
    // ) => {
    //     if (e.target.files) setFile(e.target.files[0]);
    // };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        // const response = await axios.post(``)
        toast.success('Job application submitted!');
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-2xl space-y-6"
        >
            <h2 className="text-2xl font-semibold text-center flex items-center justify-center gap-2 text-gray-800">
                <MdBusinessCenter className="text-3xl text-accent" /> Job Application
            </h2>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="label">Full Name</label>
                    <input
                        title='your name'
                        name="applicant_name"
                        value={form.applicant_name}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="label">Email</label>
                    <input
                        title='email address'
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="label">Phone</label>
                    <input
                        title='phone number'
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="label">Job Title</label>
                    <input
                        title='job title'
                        name="job_title"
                        value={form.job_title}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="label">Upload CV (PDF or Image)</label>
                    <input
                        title='upload cv'
                        type="file"
                        // onChange={(e) => handleFileChange(e, setCv)}
                        accept="application/pdf,image/*"
                        className="file-input file-input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="label">Upload Passport (PDF or Image)</label>
                    <input
                        title='upload passport'
                        type="file"
                        // onChange={(e) => handleFileChange(e, setPassport)}
                        accept="application/pdf,image/*"
                        className="file-input file-input-bordered w-full"
                        required
                    />
                </div>
            </div>

            {/* Additional Info */}
            <div>
                <label className="label">Additional Information</label>
                <textarea
                    title='additional information'
                    name="additional_info"
                    value={form.additional_info}
                    onChange={handleChange}
                    rows={4}
                    className="textarea textarea-bordered w-full"
                />
            </div>

            <button type="submit" className="btn btn-accent w-full">
                Submit Application
            </button>
        </motion.form>
    );
};

export default JobApplication;
