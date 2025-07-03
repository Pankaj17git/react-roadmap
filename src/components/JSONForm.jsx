import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";

const UserForm = ({ onSubmit, isEdit, defaultValues,setIsEditing }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: defaultValues || {
      name: "",
      username: "",
      email: "",
      address: "",
      phone: "",
      website: "",
      photo: null,
      gender: "",
      dob: "",
      languages: [],
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setValue("photo", base64String);    // Save to form data
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setIsEditing(false);
  }
  const languageOptions = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "Go",
    "Rust",
    "TypeScript",
  ];

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
      className="container-sm mt-4 border rounded shadow p-4 bg-light"
      style={{ width: "60%" }}
    >
      <h4 className="mb-4 text-center text-primary">
        {isEdit ? "Edit User" : "Add New User"}
      </h4>

      <input type="hidden" {...register("id")} />

      {/* Name */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label fw-semibold">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter Name"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          {...register("name", {
            required: true,
            pattern: /^.{2,}$/,
          })}
        />
        {errors.name && (
          <div className="invalid-feedback">
            {errors.name.type === "required"
              ? "This field is required"
              : "Name must be at least 2 characters long"}
          </div>
        )}
      </div>

      {/* Username */}
      <div className="mb-3">
        <label htmlFor="username" className="form-label fw-semibold">
          Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="Enter Username"
          className={`form-control ${errors.username ? "is-invalid" : ""}`}
          {...register("username", {
            required: true,
            pattern: /^.{2,}$/,
          })}
        />
        {errors.username && (
          <div className="invalid-feedback">
            {errors.username.type === "required"
              ? "This field is required"
              : "Username must be at least 2 characters long"}
          </div>
        )}
      </div>

      {/* Email */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-semibold">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter Email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          {...register("email", {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
        />
        {errors.email && (
          <div className="invalid-feedback">
            {errors.email.type === "required"
              ? "This field is required"
              : "Email is not valid"}
          </div>
        )}
      </div>

      {/* Address */}
      <div className="inline">
        <label htmlFor="address" className="form-label fw-semibold">
          Address
        </label>
        <input
          type="text"
          id="address"
          placeholder="Enter Address"
          className="form-control"
          {...register("address", { required: true })}
        />
      </div>

      {/* Phone */}
      <div className="mb-3">
        <label htmlFor="phone" className="form-label fw-semibold">
          Phone
        </label>
        <input
          type="text"
          id="phone"
          placeholder="Enter Phone Number"
          className="form-control"
          {...register("phone", { required: true })}
        />
      </div>

      {/* Photo Upload */}
      <div className="mb-3">
        <label htmlFor="photo" className="form-label fw-semibold">
          Photo
        </label>
        <input
          type="file"
          id="photo"
          accept="image/*"
          className={`form-control ${errors.photo ? "is-invalid" : ""}`}
          onChange={handleImageChange}
        />
        {errors.photo && (
          <div className="invalid-feedback">This field is required</div>
        )}
      </div>

      {/* Website */}
      <div className="mb-3">
        <label htmlFor="website" className="form-label fw-semibold">
          Website
        </label>
        <input
          type="text"
          id="website"
          placeholder="Enter Website"
          className="form-control"
          {...register("website")}
        />
      </div>

      {/* Gender */}
      <div className="mb-3">
        <label className="form-label fw-semibold d-block">Gender</label>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            id="male"
            value="male"
            {...register("gender", { required: true })}
            className="form-check-input"
          />
          <label htmlFor="male" className="form-check-label">
            Male
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            id="female"
            value="female"
            {...register("gender", { required: true })}
            className="form-check-input"
          />
          <label htmlFor="female" className="form-check-label">
            Female
          </label>
        </div>
        {errors.gender && (
          <div className="text-danger mt-1">Gender is required</div>
        )}
      </div>

      {/* Date of Birth */}
      <div className="mb-3">
        <label htmlFor="dob" className="form-label fw-semibold">
          Date of Birth
        </label>
        <input
          type="date"
          id="dob"
          className={`form-control ${errors.dob ? "is-invalid" : ""}`}
          {...register("dob", { required: true })}
        />
        {errors.dob && (
          <div className="invalid-feedback">Date of birth is required</div>
        )}
      </div>

      {/* Languages */}
      <div className="mb-3">
        <label className="form-label fw-semibold d-block">Languages</label>
        {languageOptions.map((lang) => (
          <div key={lang} className="form-check form-check-inline">
            <input
              type="checkbox"
              id={lang}
              value={lang}
              {...register("languages")}
              className="form-check-input"
            />
            <label htmlFor={lang} className="form-check-label">
              {lang}
            </label>
          </div>
        ))}
      </div>

      <div className=" mt-4">
        <button
          type="submit"
          className={`btn btn-${isEdit ? "warning" : "primary"} px-4`}
        >
          {isEdit ? "Update" : "Submit"}
        </button>
        {isEdit && (
          <button
            type="button"
            className="btn btn-secondary ms-2 px-4"
            onClick={() => handleReset() }
          >
            Cancle
          </button>
        )}
      </div>
    </form>
  );
};

  export default UserForm;
