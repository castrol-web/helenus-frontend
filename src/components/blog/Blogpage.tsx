import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import axios from "axios";

const url = import.meta.env.VITE_SERVER_URL;

interface BlogData {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  category: string;
  comments: number;
}

interface RawBlog {
  article: {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    category: string;
  };
  coverImage: string;
}

function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [latestBlogs, setLatestBlogs] = useState<BlogData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get<{ blogArray: RawBlog[] }>(`${url}/api/blogs/all`);
        const blogs = response.data.blogArray;

        // Prepare categories
        const uniqueCategories: string[] = [
          ...new Set(blogs.map((b) => b.article.category)),
        ];
        setCategories(uniqueCategories);

        // Prepare latest blogs (top 3)
        const sorted = blogs
          .sort(
            (a, b) =>
              new Date(b.article.createdAt).getTime() -
              new Date(a.article.createdAt).getTime()
          )
          .map((item): BlogData => ({
            _id: item.article._id,
            title: item.article.title,
            content: item.article.content,
            imageUrl: item.coverImage,
            createdAt: item.article.createdAt,
            category: item.article.category,
            comments: Math.floor(Math.random() * 100),
          }));

        setLatestBlogs(sorted.slice(0, 3));

        // Find the blog to display
        const cleanId = id?.startsWith(":") ? id.slice(1) : id;
        let blogToShow: BlogData | undefined;

        if (cleanId) {
          blogToShow = sorted.find((b) => b._id === cleanId);
        } else {
          blogToShow = sorted[0]; // Default to latest blog
        }

        if (blogToShow) {
          setBlog(blogToShow);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);


  if (!blog) return <div className="text-center py-10">Loading blog...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-10 mt-24">
      {/* Blog Content */}
      <article className="lg:col-span-2 space-y-6">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-[400px] object-cover rounded-xl"
        />
        <h1 className="text-4xl font-bold text-gray-800">{blog.title}</h1>
        <div className="flex gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <FaRegCalendarAlt />
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <LuMessagesSquare />
            {blog.comments || 0} likes
          </span>
        </div>
        <div className="prose prose-lg max-w-none text-gray-700">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </article>

      {/* Sidebar */}
      <aside className="space-y-8">
        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold border-b pb-2 mb-2">Categories</h2>
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Latest Blogs */}
        <div>
          <h2 className="text-lg font-semibold border-b pb-2 mb-2">Latest Blogs</h2>
          <div className="space-y-4">
            {latestBlogs.map((b) => (
              <Link to={`/blogs/${b._id}`} key={b._id} className="flex gap-4 items-start hover:bg-gray-100 p-2 rounded">
                <img src={b.imageUrl} alt="latest" className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <h3 className="text-sm font-medium">{b.title}</h3>
                  <p className="text-xs text-gray-400">{new Date(b.createdAt).toLocaleDateString()}</p>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </aside>
    </div>
  );
}

export default BlogPage;
