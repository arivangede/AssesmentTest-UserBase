import React from "react";
import ThemeBtn from "./ThemeBtn";
import { Link, router } from "@inertiajs/react";
import api from "@/utils/axiosInstance";

const Navbar = ({ auth }) => {
    const handleLogout = async () => {
        try {
            const response = await api.post("/logout");
            alert(response.data.message);
            router.replace("/");
        } catch (error) {
            alert(error.response.data.message);
            console.error(error);
        }
    };
    return (
        <div className="navbar bg-base-100 fixed top-0 left-0 z-50">
            <div className="navbar navbar-start">
                <Link href="/" className="btn btn-ghost text-xl">
                    UserBase
                </Link>
            </div>
            <div className="navbar navbar-end gap-2">
                <ThemeBtn />
                {auth && (
                    <details className="dropdown dropdown-end">
                        <summary className="btn btn-ghost m-1 max-w-24">
                            {auth.name}
                        </summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li>
                                <button
                                    className="btn btn-outline btn-primary"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </details>
                )}
            </div>
        </div>
    );
};

export default Navbar;
