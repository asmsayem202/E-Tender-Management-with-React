import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    // <div className="grid h-screen place-content-center bg-white px-4">
    //   <h1 className="uppercase tracking-widest text-gray-500">
    //     404 | Not Found
    //   </h1>
    // </div>

    <div className="min-h-screen  overflow-y-auto flex justify-center items-center p-10">
      <div className="w-full flex flex-col items-center">
        <div className="mt-16 text-center">
          <div className="text-2xl md:text-4xl lg:text-5xl font-semibold text-black">
            Ops! Page Not Found
          </div>
          <div className="mt-3 text-black text-sm md:text-base">
            The page you are looking for might have been removed had <br /> its
            name changed or is temporarily unavailable.
          </div>

          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center font-semibold ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-0 disabled:opacity-50 whitespace-nowrap disabled:pointer-events-none cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 h-11 rounded-md px-[18px] py-[10px] text-base mt-9 md:min-w-[300px]"
          >
            <span>Go to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
