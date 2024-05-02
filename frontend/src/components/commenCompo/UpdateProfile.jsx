import React, { useState, useEffect} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image from "../../image/curriculum-vitae.png"



const userId = localStorage.getItem("userId");

const UpdateProfile = ({ userId }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://localhost:5000/users/${userId}`;
                const { data } = await axios.get(url);
                setFormData({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email
                });
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchData();
    }, [userId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost:5000/users/${userId}`;
            const { data: updatedUser } = await axios.put(url, formData);
            toast.success('Your data updated!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                
                });
            console.log("User updated:", updatedUser);
           
        } catch (error) {
            toast.error('cannot update your data', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                
                });
            console.error("Failed to update user:", error);
            
        }
    };


    return (
        
        <div className="flex justify-start place-items-start h-screen p-10">
        <div className="bg-gray-100 flex justify-start place-items-center rounded-md">
        <div className="justify-center place-items-center rounded-xl bg-teal-500 p-7">
        <form onSubmit={handleSubmit} className="justify-center place-items-center">
            <h1 className="text-4xl mt-5 mb-5 text-white font-bold">Update your Account</h1>
            <label className="block text-white pl-3 text-xl" htmlFor="firstName">First Name:</label>
            <input className="border rounded-xl bg-gray-100 outline-none p-2 w-80"
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
            />

            <label className="block text-white pl-3 text-xl mt-2" htmlFor="lastName">Last Name:</label>
            <input className="border rounded-xl bg-gray-100 outline-none p-2 w-80"
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
            />

            <label className="block text-white pl-3 text-xl mt-2" htmlFor="email">Email:</label>
            <input className="border rounded-xl bg-gray-100 outline-none p-2 w-80"
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            
            <button className="block w-24 h-10 font-bold bg-white text-teal-500 rounded-md m-5 hover:bg-teal-700 hover:text-white" type="submit">
               Update
            </button>
            <ToastContainer />
        </form>
        
        </div>
        <img src={image} alt="" className="w-52 h-52 ml-20"/>
        </div>
    </div>
    
    );
};

export default UpdateProfile;
