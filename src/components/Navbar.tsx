import { NavLink, useNavigate } from "react-router-dom";
import hospitalLogo from "../assets/images/logo.jpg";
import { HOME, PROFILES } from "../constants";
import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import { Type } from "../enum/enum";

function Navbar() {
  const authentication = useContext(AuthContext);
  const { loginState, loginDispatch } = authentication;
  const navigate = useNavigate();

  const handleLogout = () => {
    loginDispatch({ type: Type.LOGOUT });
    navigate(HOME);

  };

  return (
    <>
      <nav className="bg-white border-gray-200 py-2.5 dark:bg-sky-700 fixed z-50 top-0">
        <div className="flex flex-wrap items-center justify-between w-screen px-4 mx-auto">
          <a href="#" className="flex items-center">
            <img
              src={hospitalLogo}
              className="h-6 mr-3 sm:h-9"
              alt="Landwind Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Medicina
            </span>
          </a>
          <div className="flex items-center lg:order-2 gap-3">
            {!loginState.isAutheticated ? (
              <>
                <div className="flex items-center gap-3">
                  <NavLink
                    to="/login"
                    className="h-10 text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 flex items-center justify-center"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="h-10 text-gray-900 bg-white hover:bg-gray-100 mr-5 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 flex items-center justify-center"
                  >
                    Register
                  </NavLink>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogout}
                  className="h-10 mr-5 text-gray-900 bg-white hover:bg-white focus:ring-4 focus:ring-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2"
                >
                  Logout
                </button>
              </>
            )}
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="true"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 gap-2">
              <li>
                <NavLink
                  to={HOME}
                  className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={PROFILES}
                  className="block py-2 pl-3 pr-4 text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-xl lg:p-0"
                >
                  Doctors
                </NavLink>
              </li>
              {loginState.isAutheticated && (
                <li>
                  <NavLink
                    to="/appointments"
                    className="block py-2 pl-3 pr-4 text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-xl lg:p-0"
                  >
                    Appointments
                  </NavLink>
                </li>
              )}
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-xl lg:p-0"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-xl lg:p-0"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-xl lg:p-0"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
