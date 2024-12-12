import React, { useState } from 'react';
import { USER_RGN } from '../apollo/mutation.ts';
import { useMutation } from '@apollo/client';
import { validation } from '../HelperFunctions/validation.ts';
import { isValid } from '../HelperFunctions/basicHelpers.ts';

interface IFormData {
  email: string;
  password: string;
  phone_number: string;
}

function SignUp() {
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
    phone_number: "",
  });
  const [errors, setErrors] = useState<IFormData>({
    email: "",
    password: "",
    phone_number: "",
  });
  const [submitForm, { data, loading, error }] = useMutation(USER_RGN);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent page reload
    console.log("Form submitted:", formData);
    const errors = validation("signUp", formData)
    console.log("errrors", errors)
    if (isValid(errors)) {
      console.log("Object.keys(errors).length > 0", Object.keys(errors))
      // const data = formData
      try {
        const submitData = await submitForm({ variables: { data: formData } });
        console.log("submitData", submitData)
        setFormData({
          email: "",
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
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        {errors.phone_number && <p style={{ color: "red" }}>{errors.phone_number}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SignUp;
