import UseBlogStore from "../../zustand/UseBlogStore";
import { useEffect } from "react";
import BlogCard from "./BlogCard";

function BlogContainer() {
    const { blogs, fetchBlogs, errorMessage } = UseBlogStore();
    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="items-center justify-center mx-auto mt-20 bg-blue-50">
            <div className="items-center justify-center mx-auto">
                <h1 className="text-center justify-center mx-auto text-4xl uppercase">Stay Informed with the Latest Updates on Visas, Jobs & Migration</h1>
                <p className="items-center text-sm lg:mx-72 sm:mx-10">At Helenus, we believe knowledge is your greatest asset on the
                    journey abroad. Our blog delivers timely insights, expert advice, and important news about visa policies,
                    job opportunities, and migration trends worldwide — empowering you to make confident decisions every step
                    of the way.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-4 lg:mx-20 sm:mx-10 pb-10">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <BlogCard
                            key={blog._id}
                            title={blog.title}
                            excerpt={blog.excerpt}
                            imageURl={blog.coverImage}
                            slug={blog.slug}
                            date={new Date(blog.createdAt || "").toLocaleDateString()}
                            count={Math.floor(Math.random() * 100)} // replace with comment count if available
                            description={blog.content}
                            id={blog._id as string} />
                    ))
                ) : (
                    <div className="col-span-full text-center text-red-500">{errorMessage || "No blogs found."}</div>
                )}
            </div>
        </div>

    );
}

export default BlogContainer;
