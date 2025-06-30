import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Header from "../components/header";
import UserForm from '../components/JSONForm';

const JsonForm = () => {
  const URL = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState({
    id: Date.now().toString(),
    name: "",
    username: "",
    email: "",
    address: "",
    phone: "",
    website: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addUser(formData);
    clearForm();
    console.log("Form submitted:", formData);
  };

  const addUser = async (newUser) => {
    // eslint-disable-next-line no-debugger
    debugger;
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });
    const data = await res.json();
    setFormData(data);
  };

  const clearForm = () => {
    setFormData({
      id: '',
      name: "",
      username: "",
      email: "",
      address: "",
      phone: "",
      website: "",
    })
  }


  useEffect(() => {
    console.log(URL);

    fetch(URL)
      .then(res => res.json())
      .then(data => console.log(data)

      );
  }, [])

  // const handleDelete = () => {
  //   fetch('http://localhost:3001/users/4', {
  //     method: 'DELETE',
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     if (response.status === 204) {
  //       console.log('Deleted successfully, no content returned.');
  //       return null;
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     if (data) {
  //       console.log('Response data:', data);
  //     }
  //   })
  //   .catch(err => {
  //     console.log('Error:', err.message);
  //   });
  // };



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
              handleSubmit={handleSubmit}
            />
          </div>
        </div>

      </div>
    </>
  )
}

export default JsonForm;