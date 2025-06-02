import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const url = import.meta.env.VITE_SERVER_URL;

const initialState = {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    coverImage: "",
    authorName: "",
    avatar: "",
};


function CreateBlog() {
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [coverImage, setCoverImage] = useState<File | null>(null);

    //automatic generation of slug from the title given
    const generateSlug = (title: string) =>
        title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
            .replace(/\s+/g, "-")        // collapse whitespace to dash
            .replace(/-+/g, "-");        // collapse multiple dashes

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // If user is typing the title, also generate a slug
        if (name === "title") {
            const newSlug = generateSlug(value);
            setFormData((prev) => ({ ...prev, title: value, slug: newSlug }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (selectedFile && allowedImageTypes.includes(selectedFile.type)) {
            setCoverImage(selectedFile);
        } else {
            setCoverImage(null);
            setMessage("Invalid file type. Please select JPG or PNG.");
        }
    }


    //form submission function
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (!formData || !coverImage) {
            setMessage("Please fill out all fields and upload an image.");
            setLoading(false);
            return;
        }
        const data = new FormData();
        data.append("title", formData.title);
        data.append("slug", formData.slug);
        data.append("excerpt", formData.excerpt);
        data.append("content", formData.content);
        data.append("category", formData.category);
        data.append("tags", formData.tags);
        data.append("coverImage", coverImage);
        data.append("author[name]", formData.authorName);
        data.append("author[avatar]", formData.avatar);

        try {

            const response = await axios.post(`${url}/api/blogs/create-blog`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if(response.status === 201){
                toast.success("Blog submitted successfully")
                setMessage("Blog submitted successfully!");
                setFormData(initialState);
                setCoverImage(null);
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
            console.error("Error:", error);
            if (error.response && error.response.status === 404) {
                toast.error(error.response.data.message);
            } else if (error.response && error.response.status === 500) {
                toast.error('Server error. Please try again later.');
            } else {
                toast.error('An unexpected error occurred. Please try again later.');
                setMessage("Error submitting blog: " + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-20 mb-60 items-center justify-center">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create New Blog</h2>
            {message && <p className="mb-4 text-center text-sm">{message}</p>}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />
                <input
                    type="text"
                    name="slug"
                    placeholder="Slug (auto-generated)"
                    value={formData.slug}
                    className="input input-bordered w-full"
                    disabled
                />

                <input
                    type="text"
                    name="excerpt"
                    placeholder="Short Summary"
                    value={formData.excerpt}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
                <textarea
                    name="content"
                    placeholder="Full Blog Content"
                    value={formData.content}
                    onChange={handleChange}
                    className="textarea textarea-bordered h-32"
                    required
                />
                <input
                    type="file"
                    name="coverImage"
                    placeholder="Cover Image URL"
                    onChange={handleFileChange}
                    className="input input-bordered w-full"
                />
                <select title="blog category"
                    required
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                >
                    <option disabled={true} value="">Select Blog Category</option>
                    <option value="visa">Visa</option>
                    <option value="jobs">Jobs</option>
                    <option value="tips">Tips</option>
                    <option value="stories">Stories</option>
                </select>
                <input
                    type="text"
                    name="tags"
                    placeholder="Tags (comma-separated)"
                    value={formData.tags}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    name="authorName"
                    placeholder="Author's Name"
                    value={formData.authorName}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    name="avatar"
                    placeholder="Avatar URL"
                    value={formData.avatar}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
                <button
                    type="submit"
                    className="btn btn-info w-full"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit Blog"}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default CreateBlog;
