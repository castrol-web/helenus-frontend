import { NavLink } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../assets/logo.jpeg";
import { useAuth } from '../../hooks/useAuth';
const url = import.meta.env.VITE_SERVER_URL;

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [applicationCount, setApplicationCount] = useState(0);
    const [applicationStatus, setApplicationStatus] = useState("Unknown");
    const { isAuthenticated, user } = useAuth();
    const toggleMenu = () => setMenuOpen(!menuOpen);

    useEffect(() => {
        const fetchApplicationSummary = async () => {
            try {
                if (!user?.token) return;

                const res = await axios.get(`${url}/api/user/myapplication/count`, {
                    headers: { Authorization: `Bearer ${user?.token}` },
                });

                setApplicationCount(res.data.total || 0);
                setApplicationStatus(`Job: ${res.data.job}, Visa: ${res.data.visa}`);
            } catch (error) {
                console.error("Failed to fetch application summary", error);
                setApplicationCount(0);
                setApplicationStatus("Unavailable");
            }
        };

        fetchApplicationSummary();
    }, [user?.token]);


    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `inline-block px-4 py-2 rounded-md transition font-medium 
                    ${isActive
                            ? "text-white bg-[#948979]"
                            : "text-white/80 hover:text-white hover:bg-orange-500/20"}`
                    }
                >
                    HOME
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `inline-block px-4 py-2 rounded-md transition font-medium 
                    ${isActive
                            ? "text-white bg-[#EB5B00]"
                            : "text-white/80 hover:text-white hover:bg-orange-500/20"}`
                    }
                >
                    ABOUT
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/blogs"
                    className={({ isActive }) =>
                        `inline-block px-4 py-2 rounded-md transition font-medium 
                    ${isActive
                            ? "text-white bg-[#EB5B00]"
                            : "text-white/80 hover:text-white hover:bg-orange-500/20"}`
                    }
                >
                    BLOG
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        `inline-block px-4 py-2 rounded-md transition font-medium 
                    ${isActive
                            ? "text-white bg-[#EB5B00]"
                            : "text-white/80 hover:text-white hover:bg-orange-500/20"}`
                    }
                >
                    CONTACT
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar shadow-sm px-4 py-2 fixed top-0 left-0 w-full z-50 bg-[#393E46] text-[#DFD0B8]">
            {/* Logo - Left */}
            <div className="flex-1">
                <NavLink to="/">
                    <img alt="helenus logo" src={logo} className="rounded-full h-12" />
                </NavLink>
            </div>

            {/* Centered nav links (desktop only) */}
            <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
                <ul className="menu menu-horizontal space-x-4">{navLinks}</ul>
            </div>

            {/* Cart Dropdown - Right */}
            {isAuthenticated && <div className="dropdown dropdown-end mr-2">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        <span className="badge badge-sm indicator-item">{applicationCount}</span>
                    </div>
                </div>
                <div
                    tabIndex={0}
                    className="mt-3 z-[1] card card-compact dropdown-content w-60 bg-base-100 shadow"
                >
                    <div className="card-body">
                        <span className="font-bold text-lg">
                            {applicationCount} Application{applicationCount !== 1 ? "s" : ""}
                        </span>
                        <p className="text-info">
                            Status: <span className="text-gray-700">{applicationStatus}</span>
                        </p>
                        <div className="card-actions">
                            <NavLink to="/myapplications" className="btn btn-primary btn-block">
                                View Cart
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>}

            {/* Mobile toggle */}
            <div className="lg:hidden">
                <button type="button" title="menu" onClick={toggleMenu} className="btn btn-ghost">
                    {menuOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
                </button>
            </div>

            {/* Mobile nav menu */}
            {menuOpen && (
                <div className="absolute top-full right-4 mt-2 w-48 shadow-md rounded-lg p-4 z-40 lg:hidden bg-[#393E46] text-[#DFD0B8]">
                    <ul className="flex flex-col space-y-3">{navLinks}</ul>
                </div>
            )}
        </div>
    );
}

export default Navbar;
