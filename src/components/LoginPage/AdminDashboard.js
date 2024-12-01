import React, {useEffect, useState} from "react";
import axios from "axios";

const AdminDashboard = ({token, onLogout}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/admin/dashboard", {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setData(response.data);
            } catch (err) {
                console.error("Failed to fetch admin data", err);
            }
        };
        fetchData();
    }, [token]);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={onLogout}>Logout</button>
            <div>
                <h2>Data:</h2>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </div>
    );
};

export default AdminDashboard;
