import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { MdBusinessCenter } from 'react-icons/md';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
const url = import.meta.env.VITE_SERVER_URL;

const initialState = {
    applicant_name: '',
    email: '',
    job_id: '',
    phone: '',
    additional_info: '',
};

type Job = {
    _id: string;
    title: string;
};

const JobApplication = () => {
    const [form, setForm] = useState(initialState);
    const [cv, setCv] = useState<File | null>(null);
     const [coverletter, setCoverLetter] = useState<File | null>(null);
    const [passport, setPassport] = useState<File | null>(null);
    const [jobs, setJobs] = useState<Job[]>([]);
    const { isAuthenticated, loading, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate("/login", { state: { from: location } });
        }
    }, [isAuthenticated, loading, navigate, location]);

    useEffect(() => {
        const getJob = async () => {
            try {
                const response = await axios.get(`${url}/api/user/jobs`);
                if (response.status === 200) {
                    setJobs(response.data)
                }
            } catch (error: any) {
                console.error("failed to fetch jobs", error.response)
            }
        }
        getJob();
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'cv' | 'passport' | "coverletter") => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            toast.error('Only PDF or Word documents are allowed.');
            return;
        }

        if (type === 'cv') setCv(file);
        if (type === 'passport') setPassport(file);
        if (type === 'coverletter') setCoverLetter(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!cv || !passport || !coverletter) {
            toast.error('Please upload both your CV and Passport.');
            return;
        }

        const formData = new FormData();
        formData.append('applicant_name', form.applicant_name);
        formData.append('email', form.email);
        formData.append('job_id', form.job_id);
        formData.append('phone', form.phone);
        formData.append('coverletter',coverletter);
        formData.append('additional_info', form.additional_info);
        formData.append('cv_file', cv);
        formData.append('passport_file', passport);

        try {
            const response = await axios.post(`${url}/api/user/job/${form.job_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': user?.token || '',
                },
            });
            console.log(response.data)
            if (response.status === 201) {
                toast.success('Job application submitted successfully!');
                setForm(initialState)
                setCv(null)
                setPassport(null)
            }

        } catch (error: any) {
            if (error.response?.status === 401) {
                toast.error('Session expired. Please log in again.');
                setTimeout(() => {
                    navigate('/login');
                }, 1500)
            } else {
                const msg = error?.response?.data?.message;
                if (error.response?.status === 400 && msg) {
                    toast.error(msg);
                } if (error.response?.status === 404 && msg) {
                    toast.error(msg);
                } else if (error.response?.status === 500) {
                    toast.error("Server error. Please try again later.");
                } else {
                    toast.error("Failed to submit Application.");
                }
            }
        }
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="label">Full Name</label>
                    <input
                        title='enter fullname'
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
                        title='enter email'
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
                        title='enter phone number'
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="label">Choose Job</label>
                    <select title='choose job type'
                        className="select select-bordered w-full text-slate-50"
                        onChange={handleChange}
                        name="job_id"
                        required>
                        <option value="">Choose visa type</option>
                        {jobs.map((j, index) => (
                            <option key={index + j.title} value={j._id}>{j.title}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="label">Upload CV</label>
                    <input
                        title='upload cv'
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange(e, 'cv')}
                        className="file-input file-input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="label">Upload Passport</label>
                    <input
                        title='upload passport document'
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange(e, 'passport')}
                        className="file-input file-input-bordered w-full"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="label">Upload Cover Letter</label>
                <input
                    title='upload passport document'
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, 'coverletter')}
                    className="file-input file-input-bordered w-full"
                    required
                />
            </div>

            <button type="submit" className="btn btn-accent w-full">
                Submit Application
            </button>
            <ToastContainer />
        </motion.form>
    );
};

export default JobApplication;
