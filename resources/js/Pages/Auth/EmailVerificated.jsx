import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import React from "react";

const EmailVerificated = () => {
    return (
        <div>
            <Head title="Verificated" />
            <Navbar />
            <div className="min-h-screen w-full flex justify-center items-center p-8">
                <h1 className="font-semibold text-3xl">
                    Email verified successfully! You can log in now.
                </h1>
            </div>
        </div>
    );
};

export default EmailVerificated;
