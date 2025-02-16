import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../apollo/mutation";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Dialog, DialogContent, DialogTitle, Divider, IconButton } from "@mui/material";

import logoName from "../assets/images/logo/logo-name-light.png";
import logo from "../assets/images/logo/logo-light.png";

import LoginImg from "../assets/images/loginImg.png";
import { TextFieldWithLabel } from "./input/TextField";
import { OutlinedButton } from "./Buttons/Button";
import { X } from "lucide-react";
import { loginSuccess } from "HelperFunctions/message";
import { sucessToast } from "HelperFunctions/utils";

interface loginProps{
  onClose: Function
}

export default function Login({ onClose } : loginProps) {
  const [tabActive, setTabActive] = useState({ islogin: true, isSignup: false });
  const [loginData, setLoginData] = useState<{ email: string; password: string }>({ email: "", password: "" });
  const [isLogin, setLogin]= useState<boolean>(false);
  const [signupData, setSignupData] = useState<{ fullName: string; email: string; password: string; mobileNo: string }>({ fullName: "", email: "", password: "", mobileNo: "" });
  const [login, { data, loading: logingLoader, error }] = useMutation(USER_LOGIN);
  const navigate = useNavigate();


  const handleChangeLogin = (value: string, condition: { isEmail?: boolean; isPassword?: boolean }) => {
    const { isEmail, isPassword } = condition;
    if (isEmail) {
      setLoginData((prev) => ({ ...prev, email: value }));
    }
    if (isPassword) {
      setLoginData((prev) => ({ ...prev, password: value }));
    }
  };

  const handleChangeSignup = (value: string, condition: { isFullName?: boolean; isMobileNumber?: boolean }) => {
    const { isFullName, isMobileNumber } = condition;
    if (isFullName) {
      setSignupData((prev) => ({ ...prev, fullName: value }));
    }
    if (isMobileNumber) {
      setSignupData((prev) => ({ ...prev, mobileNo: value }));
    }
  };

  const handleSubmit = async () => {
    if (tabActive.islogin) {
      if (loginData.email !== "" && loginData.password !== "") {
        try {
          setLogin(true);
          const loginSubmission = await login({ variables: { data: loginData } });
          if (loginSubmission.data.login.status === 200) {
            localStorage.setItem("loginUserToken", loginSubmission.data.login.response)
            Cookies.set("accessToken", loginSubmission.data.login.response, { expires: 7 });
            const message = loginSuccess('Praveen');
            sucessToast(message);
            setTimeout(()=>{
              onClose();
              // navigate("/admin/managelistings");
              setLogin(false);
            }, 200)
          }
        } catch (e) {
          setLogin(false);
          console.error(e);
        }
      }
    }
  };

  return (
    <Dialog
      open={true}
      maxWidth="md"
      fullWidth
      PaperProps={{
        classes: { root: "!bg-gradient-to-r from-primary to-secondary !max-w-2xl !rounded-md md:!h-3/5 !overflow-hidden relative" },
      }}
    >
      <DialogTitle className="absolute -top-1 !p-0 right-2">
        <IconButton onClick={() => onClose(false)} size="small" className="!p-0.5 !bg-white">
          <X stroke="red" size={16} />
        </IconButton>
      </DialogTitle>
      <DialogContent className="!p-2.5 !px-4">
        <div className="grid md:grid-cols-2 h-full">
          <div className="text-white space-y-5 p-5 px-2 hidden md:block">
            <div className="flex gap-2 items-center">
              <img className="h-6" src={logo} alt="logo" />
              <img className="h-6" src={logoName} alt="company name" />
            </div>
            <div className="tracking-wide">
              <h2 className="text-4xl font-semibold">Welcome!</h2>
              <p className="text-sm font-medium">Register to avail the best deals!</p>
            </div>
            <div className="absolute -bottom-11">
              <img src={LoginImg} alt="welcome-image" />
            </div>
          </div>
          <div className="bg-white rounded-md h-full p-5 px-2 space-y-6">
            <div className="grid grid-cols-2 tracking-wide">
              <button onClick={() => setTabActive({ islogin: true, isSignup: false })} className={`broder font-medium rounded-md p-2 log-modal-tab-${tabActive.islogin ? "active" : "inactive"}`}>
                Login
              </button>
              <button onClick={() => setTabActive({ isSignup: true, islogin: false })} className={`broder font-medium rounded-md p-2 log-modal-tab-${tabActive.isSignup ? "active" : "inactive"}`}>
                Signup
              </button>
            </div>
            <Divider className="!border-primary !border" />
            {tabActive?.islogin ? (
              <div className="grid gap-4">
                <TextFieldWithLabel label="Email Id" placeHolder="Email" type="email" handleOnChange={(e: any) => handleChangeLogin(e.target.value, { isEmail: true })} />
                <TextFieldWithLabel label="Password" placeHolder="Password" type="password" handleOnChange={(e: any) => handleChangeLogin(e.target.value, { isPassword: true })} />
                <div className="text-end">
                  <Link to="/" className="text-primary text-sm">
                    Forget Password?
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-3">
                  <TextFieldWithLabel label="Full name" placeHolder="Full name" type="text" handleOnChange={(e: any) => handleChangeSignup(e.target.value, { isFullName: true })} />
                  <TextFieldWithLabel label="Mobile number" placeHolder="Mobile number" type="text" handleOnChange={(e: any) => handleChangeSignup(e.target.value, { isMobileNumber: true })} />
                </div>
                <TextFieldWithLabel label="Email Id" placeHolder="Email" type="email" handleOnChange={(e: any) => handleChangeLogin(e.target.value, { isEmail: true })} />
                <TextFieldWithLabel label="Password" placeHolder="Password" type="password" handleOnChange={(e: any) => handleChangeLogin(e.target.value, { isPassword: true })} />
              </div>
            )}
            <div className="flex justify-center w-full">
              <OutlinedButton propoerty={{ 
                isLoader: isLogin,
                isDisable: isLogin
              }} name={`${tabActive.islogin ? "Submit" : "SignUp"}`} handleClick={handleSubmit} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
