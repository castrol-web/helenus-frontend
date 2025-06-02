import { LuMessagesSquare } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

type BlogProps = {
  title: string;
  id: string;
  excerpt: string;
  imageURl: string;
  date: string;
  count: number;
  slug: string;
  description: string;
};

function BlogCard({ title, excerpt, imageURl, date, count, slug, id }: BlogProps) {
  return (
    <div className="card bg-white w-full shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden">
      <figure className="w-full h-52 overflow-hidden">
        <img src={imageURl} alt={title} className="object-cover w-full h-full" />
      </figure>
      <div className="card-body px-4 py-3">
        <h2 className="text-xl text-center font-semibold mb-2 text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{excerpt}</p>
        <span className="text-xs mb-2 text-gray-500 justify-start flex-1">{slug}</span>
        <div className="flex justify-between text-sm text-gray-500 items-center">
          <div className="flex items-center gap-1">
            <FaRegCalendarAlt />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <LuMessagesSquare />
            <span>{count}</span>
          </div>
        </div>
        <div className="card-actions justify-end">
          <Link to={`/blogs/:${id}`} className="btn btn-primary">
            View more
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
