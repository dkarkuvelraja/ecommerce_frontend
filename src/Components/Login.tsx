import React, { useState } from 'react'
import { validation } from '../HelperFunctions/validation';
import { isValid } from '../HelperFunctions/basicHelpers';
import { useMutation } from '@apollo/client';
import { USER_LOGIN } from '../apollo/mutation';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Grid2, IconButton, Typography } from '@mui/material';
import { LoginPop, LoginSignUp, StyledHR } from '../assets/style/index';
import { SparklezLogo } from '../assets/imageSvg/SparklezLogo';
import { SparklezTitle } from '../assets/imageSvg/SparklezTitle';
import LoginImg from '../assets/images/loginImg.png'
import Box from '@mui/material/Box';
import TextField from './Fields/textField'
import { styled } from '@mui/material/styles';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import SignUp from './SignUp';
const CustomDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    width: '710px',
    maxWidth: '90%', // Adjust for responsiveness
    overflow: 'hidden',
  },
});
interface Ilogin {
  email: string;
  password: string;
}
export default function Login(props: any) {
  const [formData, setFormData] = useState<Ilogin>({ email: "", password: "" })
  const [errors, setErrors] = useState<Ilogin>({ email: "", password: "" })
  const [loginTab, setloginTab] = useState(true)
  const [login, { data, loading, error }] = useMutation(USER_LOGIN);
  const naviagate = useNavigate()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("formData")
    const errors = validation("login", formData)
    setErrors(errors)
    if (isValid(errors)) {
      try {
        const loginSubmission = await login({ variables: { data: formData } })
        console.log("loginSubmission", loginSubmission.data.login)
        if (loginSubmission.data.login.status === 200) {
          Cookies.set("accessToken", loginSubmission.data.login.response, { expires: 7 })
          props.popClose()
          naviagate('/admin/managelistings')

        } else {
          alert(loginSubmission.data.login.result)
        }
      } catch (e) {
        console.error(e)
      }
    }

  }
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log("sdssssssssssss", name, value)
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: ""
    }))
  }
  // const handleClose = () => {

  // }
  const moveToLogin = () => {
    setloginTab(true)
  }
  return (
    <div>
      <CustomDialog open={props.loginPopOpen} maxWidth={"sm"} fullWidth={true} >
        <LoginPop>
          <Grid2 container spacing={2} sx={{ height: "445px", overflow: "hidden" }}>
            <Grid2 sx={{ display: { xs: 'none', sm: 'block' } }} size={{ xs: 6, md: 6 }}>
              <div className="logo">
                {/* <MenuIcon /> */}
                {SparklezLogo}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {SparklezTitle}
                </Typography>
              </div>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: "white", fontWeight: "600", fontSize: "36px", padding: "5px 10px 0px 30px" }}>
                Welcome!
              </Typography>
              <Typography variant="body1" component="div" sx={{ flexGrow: 1, color: "white", fontWeight: "600", fontSize: "20px", padding: "5px 10px 20px 30px" }}>
                Register to avail the best deals!
              </Typography>
              <div className="popImg">
                <img src={LoginImg} alt="loginImg" className="posAbsolute" />
              </div>
              {/* Title */}
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
              <LoginSignUp>
                <CancelOutlinedIcon className="closeIcon" onClick={props.popClose} />
                <Box sx={{ display: "flex" }}>
                  <Typography variant="body2" onClick={() => setloginTab(!loginTab)} className={loginTab ? "logBtn black" : "logBtn"}>Login</Typography>
                  <Typography variant="body2" onClick={() => setloginTab(!loginTab)} className={!loginTab ? "logBtn black" : "logBtn"}>Signup</Typography>

                </Box>
                <StyledHR />
                {loginTab ?

                  <form onSubmit={handleSubmit}>
                    <TextField
                      // className = "wid100"
                      label={"Email"}
                      type="email"
                      name="email"
                      value={formData.email}
                      changeFunction={handleChange}
                      placeHolder="Email" />
                    {errors.email && <p style={{ color: "red", fontSize: "12px" }} className="marNone">{errors.email}</p>}

                    <TextField
                      // className = "wid100"
                      label={"Password"}
                      type="password"
                      name="password"
                      value={formData.password}
                      changeFunction={handleChange}
                      placeHolder="Password" />
                    {errors.password && <p style={{ color: "red", fontSize: "12px" }} className="marNone">{errors.password}</p>}

                    <Typography variant="body1" component="div" className="forgotPass">Forgot Password?</Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                      <Button type="submit" variant="outlined" className="submitBtn">Submit</Button>
                    </Box>
                  </form> :
                  <SignUp handleClose={props.handleClose} moveToLogin = {moveToLogin}/>
                }
              </LoginSignUp>
            </Grid2>
          </Grid2>
        </LoginPop>
      </CustomDialog>
    </div>

  )
}
