import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { v4 as uuidv4 } from "uuid";
import Header from "../components/header";
import UserForm from '../components/JSONForm';
import useUserStorage from "../hooks/useUserStorage";
import { useLocation } from "react-router-dom";



const JsonForm = () => {
  const URL = import.meta.env.VITE_BASE_URL;
  const location = useLocation();
  const [formData, setFormData] = useState({
    id: '',
    name: "",
    username: "",
    email: "",
    address: "",
    phone: "",
    website: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const { addUser, updateUser } = useUserStorage();

  useEffect(() => {
    const userToEdit = location.state?.userToEdit;
    const editing = location.state?.isEditing;

    if (editing && userToEdit) {
      setIsEditing(true);
      setFormData(userToEdit);
    } else {
      setIsEditing(false);
      resetFormData();
    }
  }, [location.state]);



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      ...formData,
      id: uuidv4().split("-")[0],
    };

    addUser(newUser, setFormData);

    console.log("Form submitted:", formData);
    resetFormData();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedUser = { ...formData };

    await updateUser(updatedUser.id, updatedUser, setFormData); // You must implement this in your storage hook

    alert("User updated successfully!");

    setIsEditing(false);
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({
      id: "",
      name: "",
      username: "",
      email: "",
      address: "",
      phone: "",
      website: "",
    });
  };



  useEffect(() => {
    console.log(URL);

    fetch(URL)
      .then(res => res.json())
      .then(data => console.log(data));
  }, [])

  return (
    <>
      <Header />
      <div className='container mt-4'>
        <div className="col-lg-12">
          <h1 className="alert alert-secondary text-center">
            User Registration
          </h1>
        </div>

        <div className="card" style={{ border: "none" }}>
          <div className="card-body">
            <UserForm formData={formData}
              handleChange={handleChange}
              handleSubmit={isEditing ? handleUpdate : handleSubmit}
              isEditing={isEditing}
              setFormData={setFormData}
            />
          </div>
        </div>

      </div>
    </>
  )
}

export default JsonForm;