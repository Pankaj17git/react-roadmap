import React from "react";
import { useForm } from "react-hook-form";


const UserForm = ({ onSubmit, isEdit, defaultValues }) => {

  const { register, handleSubmit, formState: { errors } } = useForm({ 
    mode: "onBlur",
    defaultValues: defaultValues || {
      name: "",
      username: "",
      email: "",
      address: "",
      phone: "",
      website: ""
    }
  });


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container-sm mt-4 border rounded" style={{ width: '60%', padding: '20px' }}>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Name"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`} {...register('name', { required: true, pattern: /^.{6,}$/ })}
        />
        {errors.name && <div className="invalid-feedback">
          {errors.name.type === 'required'
            ? 'This field is required'
            : 'Name must be at least 2 characters long'
          }
        </div>}
      </div>

      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter Username"
          className={`form-control ${errors.username ? 'is-invalid' : ''}`} {...register('username', { required: true, pattern: /^.{6,}$/ })}
        />
        {errors.username && <div className="invalid-feedback">
          {errors.username.type === 'required'
            ? 'This field is required'
            : 'username must be at least 2 characters long'
          }
        </div>}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`} {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
        />
        {errors.email && <div className="invalid-feedback">
          {errors.email.type === 'required'
            ? 'This field is required'
            : 'Email is not valid'
          }
        </div>}
      </div>

      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          placeholder="Enter Address"
          {...register('address', { required: true})}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          placeholder="Enter Phone Number"
          {...register('phone', { required: true})}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="website" className="form-label">
          Website
        </label>
        <input
          type="text"
          className="form-control"
          id="website"
          name="website"
          placeholder="Enter Website"
          {...register('website')}
        />
      </div>

      <button type="submit" className={`btn btn-${isEdit ? "warning" : "primary"}`}>
        {isEdit ? "Update" : "Submit"}

      </button>

    </form>
  );
};

export default UserForm;
