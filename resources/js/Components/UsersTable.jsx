import React, { useState } from "react";
import { FaPen } from "react-icons/fa";

const UsersTable = ({ data, onUpdateUser, onDeleteUser }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [userFormData, setUserFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (user) => {
        setSelectedUser(user);
        setUserFormData({
            name: user.name,
            email: user.email,
            phone: user.phone,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (selectedUser) {
            onUpdateUser(selectedUser.id, userFormData);
        }
        closeModal();
    };

    const handleDelete = () => {
        if (selectedUser) {
            onDeleteUser(selectedUser.id);
        }
        closeModal();
    };

    return (
        <div className="overflow-x-auto scroll w-full max-w-lg">
            <div className="relative overflow-y-auto max-h-[450px]">
                <table className="table w-full">
                    <thead className="sticky top-0 bg-primary-content text-primary z-10">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user) => (
                            <tr className="hover" key={user.id}>
                                <th>{user.id}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button
                                        className="btn"
                                        onClick={() => openModal(user)}
                                    >
                                        <FaPen />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <Modal
                    userFormData={userFormData}
                    handleInputChange={handleInputChange}
                    handleEditSubmit={handleEditSubmit}
                    handleDelete={handleDelete}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

const Modal = ({
    userFormData,
    handleInputChange,
    handleEditSubmit,
    handleDelete,
    closeModal,
}) => {
    return (
        <dialog open className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">User Details</h3>
                <form onSubmit={handleEditSubmit}>
                    <div className="mb-4 mt-4">
                        <label className="block mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={userFormData.name}
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userFormData.email}
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={userFormData.phone}
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn">
                            Save
                        </button>
                        <button
                            type="button"
                            className="btn"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            className="btn"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default UsersTable;
