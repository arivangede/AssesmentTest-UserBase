import Navbar from "@/Components/Navbar";
import api from "@/utils/axiosInstance";
import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";

const Login = () => {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post("/login", {
                email: loginForm.email,
                password: loginForm.password,
            });
            localStorage.setItem("token", response.data.token);
            router.visit("/dashboard");
        } catch (error) {
            alert(error.response.data.message);
            console.error(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginForm({
            ...loginForm,
            [name]: value,
        });
    };
    return (
        <div>
            <Head title="Login" />
            <Navbar />
            <div className="min-h-screen w-full flex flex-col justify-center items-center p-8">
                <form
                    className="p-8 flex flex-col items-center gap-4 w-full max-w-sm"
                    onSubmit={handleSubmitLogin}
                >
                    <h2 className="font-semibold text-xl">Log in</h2>
                    <div className="flex flex-col justify-center items-center gap-2 w-full">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="input input-bordered input-primary w-full"
                            value={loginForm.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input input-bordered input-primary w-full"
                            value={loginForm.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                        Submit
                    </button>

                    <Link href="/register" className="font-semibold text-sm">
                        Dont have account yet?{" "}
                        <span className="underline">Sign Up</span>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
