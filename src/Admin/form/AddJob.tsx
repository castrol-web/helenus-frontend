import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { MdWork } from 'react-icons/md';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { countryList } from '../../utils/countries';

const url = import.meta.env.VITE_SERVER_URL;

const initialState = {
    title: '',
    location: '',
    region: '',
    coverImage: '',
    description: '',
    industry: '',
    requirements: [] as string[],
    employer_name: '',
    contract_duration: '',
    salary: ''
};

const AddJob = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [Loading, setLoading] = useState(false);
    const { isAuthenticated, loading, user } = useAuth();
    const [form, setForm] = useState(initialState);

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate("/login", { state: { from: location } });
        }
    }, [isAuthenticated, loading, navigate, location]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (selectedFile && allowedImageTypes.includes(selectedFile.type)) {
            setCoverImage(selectedFile);
        } else {
            setCoverImage(null);
            toast.error("Invalid file type. Please upload a JPG or PNG.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!form || !coverImage || form.requirements.length === 0) {
            toast.warning("Please fill out all fields and add at least one requirement.");
            setLoading(false);
            return;
        }

        const data = new FormData();
        data.append("title", form.title);
        data.append("location", form.location);
        data.append("region", form.region);
        data.append("description", form.description);
        data.append("coverImage", coverImage);
        data.append("industry", form.industry);
        data.append("employer_name", form.employer_name);
        data.append("contract_duration", form.contract_duration);
        data.append("salary", form.salary.toString());
        form.requirements.forEach((req) => data.append("requirements[]", req));

        try {
            const response = await axios.post(`${url}/api/admin/addjob`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-access-token": `Bearer:${user.token}`
                }
            });
            if (response.status === 201) {
                toast.success("Job added successfully!");
                setForm(initialState);
                setCoverImage(null);
            }
        } catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.message || "Failed to post job.");
            } else {
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6"
        >
            <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                <MdWork className="text-green-600" />
                Add New Job
            </h2>

            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block font-semibold mb-1">Job Title</label>
                    <input title='Enter the name of the job' name="title" value={form.title} onChange={handleChange} className="input input-bordered w-full" required />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Location (Country)</label>
                    <select
                        title='choose location'
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="">Select Country</option>
                        {countryList.map((country) => (
                            <option key={country.code} value={country.name}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block font-semibold mb-1">Region</label>
                    <select title='select region' name="region" value={form.region} onChange={handleChange} className="select select-bordered w-full" required>
                        <option value="">Select Region</option>
                        <option value="Africa">Africa</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Gulf">Gulf</option>
                    </select>
                </div>
                <div>
                    <label className="block font-semibold mb-1">Upload Cover Image</label>
                    <input title='upload cover image' type="file" name="coverImage" onChange={handleFileChange} accept="image/*" className="input input-bordered w-full" required />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Industry</label>
                    <input title='select industry' name="industry" value={form.industry} onChange={handleChange} className="input input-bordered w-full" required />
                </div>
            </fieldset>

            <div>
                <label className="block font-semibold mb-1">Job Description</label>
                <textarea title='describe the job offered' name="description" value={form.description} onChange={handleChange} className="textarea textarea-bordered w-full" rows={4} required />
            </div>

            {/* Requirements */}
            <div>
                <label className="block font-semibold mb-1">Requirements</label>
                <div className="space-y-2">
                    {form.requirements.map((req, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                            <input
                                value={req}
                                onChange={(e) => {
                                    const updated = [...form.requirements];
                                    updated[idx] = e.target.value;
                                    setForm({ ...form, requirements: updated });
                                }}
                                placeholder={`Requirement ${idx + 1}`}
                                className="input input-bordered w-full"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const updated = form.requirements.filter((_, i) => i !== idx);
                                    setForm({ ...form, requirements: updated });
                                }}
                                className="btn btn-error"
                            >×</button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => setForm({ ...form, requirements: [...form.requirements, ""] })}
                        className="btn btn-outline btn-sm"
                    >
                        + Add Requirement
                    </button>
                </div>
            </div>

            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block font-semibold mb-1">Employer Name</label>
                    <input title='employer name' name="employer_name" value={form.employer_name} onChange={handleChange} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Contract Duration</label>
                    <input title='contract duration' name="contract_duration" value={form.contract_duration} onChange={handleChange} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Salary</label>
                    <input title='salary ' type="number" name="salary" value={form.salary} onChange={handleChange} className="input input-bordered w-full" />
                </div>
            </fieldset>

            <div className="pt-4">
                <button type="submit" className="btn btn-success w-full text-white text-lg">
                    {Loading ? "Posting Job..." : "Post Job"}
                </button>
            </div>
            <ToastContainer />
        </motion.form>
    );
};

export default AddJob;
