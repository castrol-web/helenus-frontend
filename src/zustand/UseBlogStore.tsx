import { create } from "zustand";
import axios from "axios";
const url = import.meta.env.VITE_SERVER_URL;

interface Blog {
    _id?: string;
    title: string;
    excerpt: string;
    content: string;
    slug: string;
    coverImage: string;
    category: string;
    tags: string[];
    author: {
        name: string;
        avatar: string;
    };
    createdAt?: string;
}

interface BlogState {
    blogs: Blog[];
    loading: boolean;
    errorMessage: string;
    fetchBlogs: () => Promise<void>;
}

const UseBlogStore = create<BlogState>((set) => ({
    blogs: [],
    errorMessage: '',
    loading: false,
    fetchBlogs: async () => {
        try {
            set({ loading: true });
            const response = await axios.get(`${url}/api/blogs/all`);

            if (response.status === 201) {
                const rawBlogArray = response.data.blogArray;

                // Map raw blog objects to match Blog interface
                const blogs = rawBlogArray.map((item: any) => {
                    const article = item.article;
                    return {
                        ...article,
                        coverImage: item.coverImage // override with signed URL
                    };
                });

                set({ blogs });
            }
        } catch (error: any) {
            set({ errorMessage: error.response?.data?.message || 'Failed to fetch blogs' });
            console.error("Error fetching blogs:", error);
        } finally {
            set({ loading: false });
        }
    }

}))

export default UseBlogStore;