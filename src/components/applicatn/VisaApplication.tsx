import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { MdFlightTakeoff } from 'react-icons/md';

const VisaApplication = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    visa_type: '',
    country: '',
    message: '',
  });
  // const [passport, setPassport] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // if (e.target.files) setPassport(e.target.files[0]);
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Visa application submitted!');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-2xl space-y-6"
    >
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center justify-center gap-2">
          <MdFlightTakeoff className="text-3xl text-blue-500" />
          Visa Application
        </h2>
        <p className="text-sm text-gray-500">Please fill in the details below carefully</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label font-medium">Full Name</label>
          <input
            title='your name'
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="label font-medium">Email</label>
          <input
            title='your email'
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="label font-medium">Phone Number</label>
          <input
            title='your phone number'
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="label font-medium">Visa Type</label>
          <input
            title='choose visa type'
            name="visa_type"
            value={form.visa_type}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="label font-medium">Destination Country</label>
          <input
            title='selct country'
            name="country"
            value={form.country}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="label font-medium">Passport Upload (PDF or Image)</label>
          <input
            title='upload passport'
            type="file"
            // onChange={handleFileChange}
            accept="application/pdf,image/*"
            className="file-input file-input-bordered w-full"
            required
          />
        </div>
      </div>

      <div>
        <label className="label font-medium">Additional Message (Optional)</label>
        <textarea
          title='enter message'
          name="message"
          value={form.message}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full transition-all hover:scale-[1.02] active:scale-95"
      >
        Submit Application
      </button>
    </motion.form>
  );
};

export default VisaApplication;
