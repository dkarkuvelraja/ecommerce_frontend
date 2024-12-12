import React, { useState } from 'react'
import { validation } from '../HelperFunctions/validation.ts';
import { isValid } from '../HelperFunctions/basicHelpers.ts';
import { useMutation } from '@apollo/client';
import { USER_LOGIN } from '../apollo/mutation.ts';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
interface Ilogin{
  email : string;
  password :string;
}
export default function Login() {
const [formData,setFormData] = useState<Ilogin>({email: "",password : ""})
const [errors,setErrors] = useState<Ilogin>({email: "",password : ""})
const [login,{data,loading,error}] = useMutation(USER_LOGIN);
const naviagate = useNavigate()
const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const errors = validation("login",formData)
  if(isValid(errors)){
try{
  const loginSubmission = await login({variables : {data : formData}})
  console.log("loginSubmission",loginSubmission.data.login)
  if(loginSubmission.data.login.status === 200){
    alert("hi")
    Cookies.set("accessToken",loginSubmission.data.login.response,7)
    naviagate('/home')
  }
}catch(e){
  console.error(e)
}
  }

}
const handleChange = (e) =>  {
const {name,value} = e.target;
setFormData((prevState) => ({
  ...prevState,
  [name] : value
}))
setErrors((prevState) => ({
  ...prevState,
  [name] : ""
}))
}
  return (
    <div><h1>Login</h1>
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
      <button type="submit">Submit</button>

      </form>
    </div>

  )
}
