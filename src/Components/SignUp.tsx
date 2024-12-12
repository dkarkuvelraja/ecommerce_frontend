import React, { useState } from 'react';
import { USER_RGN } from '../apollo/mutation.ts';
import { useMutation } from '@apollo/client';
import { validation } from '../HelperFunctions/validation.ts';
import { isValid } from '../HelperFunctions/basicHelpers.ts';

interface IFormData {
  firstName : string
  lastName : string
  email: string;
  gender: string
  age: number
  password: string;
  phone_number: string;
}

function SignUp() {
  const [formData, setFormData] = useState<IFormData>({
    firstName : "",
    lastName : "",
    email: "",
    gender: "",
    age: 0,
    password: "",
    phone_number: "",
  });
  const [errors, setErrors] = useState<IFormData>({
    firstName : "",
    lastName : "",
    email: "",
    gender: "",
    age: 0,
    password: "",
    phone_number: "",
  });
  const [submitForm, { data, loading, error }] = useMutation(USER_RGN);
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevData) => ({
      ...prevData,
      [name]: ""
    }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement >) {
    e.preventDefault(); // Prevent page reload
    console.log("Form submitted:", formData);
    const errors = validation("signUp", formData)
    setErrors(errors)
    console.log("errrors", errors)
    if (isValid(errors)) {
      console.log("Object.keys(errors).length > 0", Object.keys(errors))
      // const data = formData
      try {
        const submitData = await submitForm({ variables: { data: formData } });
        console.log("submitData", submitData)
        setFormData({
          firstName : "",
    lastName : "",
    email: "",
    gender: "",
    age: 0,
    password: "",
    phone_number: "",
        })
      } catch (e) {
        console.error(e)
      }
    }
    // Process the form data (e.g., send it to an API)
  }

  return (
    <form onSubmit={handleSubmit}>
    <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="firstName"
          />
        {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="last Name"
          />
        {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        {errors.phone_number && <p style={{ color: "red" }}>{errors.phone_number}</p>}
      </div>
      <div>
        <label>Gender:</label>
        <select name='gender' value={formData.gender} onChange={handleChange}>
        <option value={""} disabled>Gender</option>
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
          <option value={"others"}>Others</option>
        </select>
        {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
        />
        {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SignUp;
