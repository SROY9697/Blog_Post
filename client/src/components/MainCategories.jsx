import { Link } from "react-router-dom";
import Search from "./Search";

function MainCategories() {
  return (
    <div className="hidden md:flex gap-8 rounded-3xl lg:rounded-full shadow-lg p-4 bg-white items-center justify-center">
      {/* links */}
      <div className="flex-1 flex items-center justify-between flex-wrap border-r-2 border-black">
        <Link
          to="/posts"
          className="bg-blue-800 text-white px-4 py-2 rounded-full"
        >
          All Posts
        </Link>
        <Link
          to="/posts?cat=web-design"
          className="hover:bg-blue-50 px-4 py-2 rounded-full"
        >
          Web Design
        </Link>
        <Link
          to="/posts?cat=development"
          className="hover:bg-blue-50 px-4 py-2 rounded-full"
        >
          Development
        </Link>
        <Link
          to="/posts?cat=databases"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          Databases
        </Link>
        <Link
          to="/posts?cat=seo"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          Search Engines
        </Link>
        <Link
          to="/posts?cat=marketing"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          Marketing
        </Link>
      </div>

      {/* search */}
      <Search />
    </div>
  );
}

export default MainCategories;
