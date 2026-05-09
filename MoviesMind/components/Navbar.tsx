import { Link, useLocation } from "react-router-dom";

function Navbar() {

  const location = useLocation();

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Movies",
      path: "/movies",
    },
    {
      name: "Recommendations",
      path: "/recommendations",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">

            <span className="text-white text-xl font-bold">
              M
            </span>

          </div>

          <div>

            <h1 className="text-white text-2xl md:text-3xl font-extrabold">

              Movies
              <span className="text-red-600">
                Mind
              </span>

            </h1>

            {/* <p className="text-zinc-500 text-xs hidden md:block">
              Smart Movie Recommendations
            </p> */}

          </div>

        </div>

        {/* NAV LINKS */}
        <div className="flex items-center gap-3">

          {navLinks.map((link) => {

            const isActive =
              location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`
                  px-4 py-2 rounded-xl text-sm md:text-base font-medium transition-all duration-300

                  ${
                    isActive
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  }
                `}
              >
                {link.name}
              </Link>
            );
          })}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;