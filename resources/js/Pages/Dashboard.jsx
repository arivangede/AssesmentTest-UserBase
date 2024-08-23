import Navbar from "@/Components/Navbar";
import UsersTable from "@/Components/UsersTable";
import api from "@/utils/axiosInstance";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const Dashboard = (props) => {
    const auth = props.auth.user;

    // useStates
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // functions
    const getUsersData = async () => {
        try {
            const response = await api.get("/api/users");
            setUsers(response.data.data);
        } catch (error) {
            alert(error.response.message);
            console.error(error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await api.delete(`/api/users/${userId}`);
            alert("User sucessfully deleted");
        } catch (error) {
            console.error(error);
            alert(error.response.data.message);
        }
    };

    const handleUpdateUser = async (userId, formData) => {
        try {
            await api.put(`/api/users/${userId}`, formData);
            alert("User sucessfully updated");
        } catch (error) {
            console.error(error);
            alert(error.response.data.message);
        }
    };

    useEffect(() => {
        getUsersData();
    }, [handleDeleteUser, handleUpdateUser]);

    return (
        <div>
            <Head title="Dashboard" />
            <Navbar auth={auth} />
            <div className="min-h-screen w-full flex flex-col justify-center items-center p-4 py-20">
                {loading ? (
                    <div className="flex flex-col justify-center items-center">
                        <span className="loading loading-dots loading-lg"></span>
                        <h3>Preparing Users List...</h3>
                    </div>
                ) : (
                    <UsersTable
                        data={users}
                        onDeleteUser={handleDeleteUser}
                        onUpdateUser={handleUpdateUser}
                    />
                )}
            </div>
        </div>
    );
};

export default Dashboard;
