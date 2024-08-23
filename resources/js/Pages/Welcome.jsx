import React from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";

const Welcome = () => {
    return (
        <div>
            <Head title="Wellcome" />
            <Navbar />

            <div className="min-h-screen w-full flex flex-col justify-center items-center gap-4 p-8">
                <div className="flex flex-col justify-center items-center gap-4 max-w-md">
                    <div>
                        <h2 className="font-semibold text-2xl text-secondary">
                            UserBase
                        </h2>
                        <h1 className="font-bold text-4xl">
                            Take Full Control of Your Users
                        </h1>
                    </div>
                    <p className="font-light">
                        "Manage your users effortlessly with powerful tools for
                        viewing, editing, and deleting. Your ultimate admin
                        dashboard is here."
                    </p>
                    <Link
                        href="/register"
                        className="btn btn-outline self-start"
                    >
                        Sign Up Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
