import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { v4 as uuidv4 } from "uuid";
import Header from "../components/header";
import UserForm from '../components/JSONForm';
import { useUser } from "../context/UserContext";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";




const JsonForm = () => {
  const [defaultValues, setDefaultValues] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { addUser, updateUser } = useUser();
  const URL = import.meta.env.VITE_BASE_URL;
  const location = useLocation();
  const navigate = useNavigate();


  // Reset form data when the component mounts or when location.state changes
  useEffect(() => {
    const userToEdit = location.state?.userToEdit;
    const editing = location.state?.isEditing;

    if (editing && userToEdit) {
      setIsEditing(true);
      setDefaultValues(userToEdit);
    } else {
      setIsEditing(false);
      setDefaultValues(null);
    }
  }, [location.state]);


  // Handle form submission
  // If isEditing is true, update the user; otherwise, add a new user
  const handleSubmit = async (data) => {

    if (isEditing) {
      //update existing user
      await updateUser(data.id, data);
      navigate("/userForm");
      setDefaultValues('');
      setIsEditing(false);
      alert("User updated successfully!");
    } else {
      //add new user
      const newUser = { ...data, id: uuidv4().split("-")[0] };
      addUser(newUser, setDefaultValues)
    }
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
            <UserForm 
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
              isEdit={isEditing}
            />
          </div>
        </div>

      </div>
    </>
  )
}

export default JsonForm;