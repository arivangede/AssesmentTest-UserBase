import Navbar from "@/Components/Navbar";
import api from "@/utils/axiosInstance";
import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";

const Register = () => {
    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);

    const handleSubmitRegister = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (registerForm.confirmPassword !== registerForm.password) {
            setLoading(false);
            return alert("Password and Confirm Password must be identical!");
        }

        try {
            const response = await api.post("/register", {
                name: registerForm.name,
                email: registerForm.email,
                phone: registerForm.phone,
                password: registerForm.password,
            });
            alert(response.data.message);
            router.replace("/login");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegisterForm({
            ...registerForm,
            [name]: value,
        });
    };

    return (
        <div>
            <Head title="Sign-Up" />
            <Navbar />

            <div className="min-h-screen w-full flex flex-col justify-center items-center p-8">
                <form
                    className="p-8 flex flex-col items-center gap-4 w-full max-w-sm"
                    onSubmit={handleSubmitRegister}
                >
                    <h2 className="font-semibold text-xl">Sign Up</h2>
                    <div className="flex flex-col justify-center items-center gap-2 w-full">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="input input-bordered input-primary w-full"
                            value={registerForm.username}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="input input-bordered input-primary w-full"
                            value={registerForm.email}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            className="input input-bordered input-primary w-full"
                            value={registerForm.phone}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input input-bordered input-primary w-full"
                            value={registerForm.password}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="input input-bordered input-primary w-full"
                            value={registerForm.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading loading-dots loading-lg"></span>
                        ) : (
                            "Submit"
                        )}
                    </button>
                    <Link href="/login" className="font-semibold text-sm">
                        Already have an account?{" "}
                        <span className="underline">Login now</span>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Register;
