import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { countryList } from '../../utils/countries';

const url = import.meta.env.VITE_SERVER_URL;

const initialState = {
    visa_type: '',
    country: '',
    requirements: [] as string[],
    coverImage: '',
    processing_time: '',
    fee: ''
};

const visaType = ['Employment', 'Student', 'Tourist', 'Work Permit'];

const AddVisa = () => {
    const [form, setForm] = useState(initialState);
    const location = useLocation();
    const navigate = useNavigate();
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const { isAuthenticated, loading, user } = useAuth();
    const [Loading, setLoading] = useState(false);

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
        const data = new FormData();
        setLoading(true);

        if (!form || !coverImage || form.requirements.length === 0) {
            toast.warning("Please fill out all fields and add at least one requirement.");
            setLoading(false);
            return;
        }

        data.append("visa_type", form.visa_type);
        data.append("country", form.country);
        data.append("coverImage", coverImage);
        data.append("processing_time", form.processing_time);
        data.append("fee", form.fee);
        form.requirements.forEach((req) => data.append("requirements[]", req));

        try {
            const response = await axios.post(`${url}/api/admin/addVisa`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-access-token": `Bearer:${user.token}`
                }
            });
            if (response.status === 201) {
                toast.success("Visa added successfully");
                setForm(initialState);
                setCoverImage(null);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to post visa.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow space-y-6"
        >
            <h2 className="text-2xl font-semibold text-center flex items-center justify-center gap-2 text-blue-700">
                <MdOutlineWorkOutline className="text-3xl" />
                Add New Visa
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block mb-1 font-medium">Visa Type</label>
                    <select
                        title='select visa type'
                        name="visa_type"
                        value={form.visa_type}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="">Select Visa Type</option>
                        {visaType.map((type, index) => (
                            <option value={type} key={type + index}>{type}</option>
                        ))}
                    </select>
                </div>


                <div>
                    <label className="block mb-1 font-medium">Destination Country</label>
                    <select
                        title='select country'
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="">Select Country</option>
                        {countryList.map((country) => (
                            <option key={country.code} value={country.name}>
                                {country.flag} {country.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="block mb-1 font-medium">Upload Cover Image</label>
                    <input
                        title='upload cover photo'
                        type="file"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered w-full"
                        accept="image/*"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block mb-1 font-medium">Requirements</label>
                <div className="space-y-2">
                    {form.requirements.map((req, idx) => (
                        <div key={idx} className="flex gap-2">
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
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => setForm({ ...form, requirements: [...form.requirements, ""] })}
                        className="btn btn-outline btn-sm mt-2"
                    >
                        + Add Requirement
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block mb-1 font-medium">Processing Time</label>
                    <input
                        name="processing_time"
                        value={form.processing_time}
                        onChange={handleChange}
                        type="text"
                        placeholder="e.g. 15-30 days"
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Fee</label>
                    <input
                        name="fee"
                        value={form.fee}
                        onChange={handleChange}
                        type="number"
                        placeholder="e.g. 100"
                        className="input input-bordered w-full"
                    />
                </div>
            </div>

            <div className="pt-4">
                <button type="submit" className="btn btn-primary w-full text-lg">
                    {Loading ? "Submitting..." : "Submit Visa"}
                </button>
            </div>
        </motion.form>
    );
};

export default AddVisa;
