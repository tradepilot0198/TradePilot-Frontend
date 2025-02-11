import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserInfo.css";
import Footer from "../components/Footer";

const UserInfo = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editedUser, setEditedUser] = useState({});

    // ✅ Fetch users from backend
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // ✅ Handle input change when editing
    const handleChange = (e, id) => {
        setEditedUser({ ...editedUser, [id]: { ...editedUser[id], [e.target.name]: e.target.value } });
    };

    // ✅ Enable editing mode
    const handleEdit = (id) => {
        setEditingUserId(id);
        const user = users.find((user) => user.id === id);
        setEditedUser({ [id]: { ...user } });
    };

    // ✅ Save updated user details
    const handleSave = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/users/${id}`, editedUser[id]);
            setEditingUserId(null);
            fetchUsers(); // Refresh user list
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    // ✅ Delete user
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`http://localhost:5000/api/users/${id}`);
                fetchUsers(); // Refresh user list
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    return (
        <div>
            <div className="user-info-container">
                <h2>User Information</h2>
                <table>
                    <thead>
                        <tr style={{color:'black'}}>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Mobile No</th>
                            <th>Country</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>
                                    {editingUserId === user.id ? (
                                        <input type="text" name="name" value={editedUser[user.id]?.name || ""} onChange={(e) => handleChange(e, user.id)} />
                                    ) : (
                                        user.name
                                    )}
                                </td>
                                <td>
                                    {editingUserId === user.id ? (
                                        <input type="text" name="username" value={editedUser[user.id]?.username || ""} onChange={(e) => handleChange(e, user.id)} />
                                    ) : (
                                        user.username
                                    )}
                                </td>
                                <td>
                                    {editingUserId === user.id ? (
                                        <input type="email" name="email" value={editedUser[user.id]?.email || ""} onChange={(e) => handleChange(e, user.id)} />
                                    ) : (
                                        user.email
                                    )}
                                </td>
                                <td>
                                    {editingUserId === user.id ? (
                                        <input type="text" name="mobileno" value={editedUser[user.id]?.mobileno || ""} onChange={(e) => handleChange(e, user.id)} />
                                    ) : (
                                        user.mobileno
                                    )}
                                </td>
                                <td>
                                    {editingUserId === user.id ? (
                                        <input type="text" name="country" value={editedUser[user.id]?.country || ""} onChange={(e) => handleChange(e, user.id)} />
                                    ) : (
                                        user.country
                                    )}
                                </td>
                                <td>
                                    {editingUserId === user.id ? (
                                        <button className="save-btn" onClick={() => handleSave(user.id)}>Save</button>
                                    ) : (
                                        <button className="edit-btn" onClick={() => handleEdit(user.id)}>Edit</button>
                                    )}
                                    <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
};

export default UserInfo;
