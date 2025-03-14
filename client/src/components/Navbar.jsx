import { useEffect, useState } from "react";
import { IKImage } from "imagekitio-react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react";

function Navbar() {
  const [open, setOpen] = useState(false);
  //get the token
  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => console.log(token));
  }, []);

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* LOGO */}
      <Link>
        <div className="flex items-center gap-4 text-2xl font-bold">
          <IKImage
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
            path="./logo.png"
            loading="lazy"
            lqip={{ active: true, quality: 20 }}
            className="w-8 h-8"
          />
          <span>Myblog</span>
        </div>
      </Link>

      {/* MOBILE MENU */}
      <div className="md:hidden">
        <div className="cursor-pointer text-2xl" onClick={() => setOpen(!open)}>
          {open ? "❌" : "➕"}
        </div>
        {/* list view */}
        <div
          className={`w-full h-screen flex flex-col gap-9 font-medium text-lg items-center justify-center absolute transition-all ease-in-out top-14 bg-[#b7b7f7]
             ${open ? "-right-0" : "-right-[100%]"}`}
        >
          <Link to="/">Home</Link>
          <Link to="/">Trending</Link>
          <Link to="/">Most Popular</Link>
          <Link to="/">About</Link>
          <Link to="/">
            <button className="px-4 py-2 rounded-2xl bg-blue-800 text-white">
              Login 👋🏻
            </button>
          </Link>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/">About</Link>
        {/* <SignedOut> component will be rendered only if there's no User signed in to your application. */}
        <SignedOut>
          <Link to="/login">
            <button className="px-4 py-2 rounded-2xl bg-blue-800 text-white">
              Login 👋🏻
            </button>
          </Link>
        </SignedOut>
        {/* SignedIn component will work when user is signed in */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Navbar;
