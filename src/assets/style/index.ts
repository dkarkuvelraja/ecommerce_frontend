import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { createGlobalStyle } from 'styled-components';


const mainColor = "#FE8315"

interface TextFieldBoxProps{
    searchBox?: boolean
    Text? : boolean
}
export const GlobalStyle = createGlobalStyle`
  .minWidth45{
  min-width : 45px !important;
  }
  .marNone{
  margin : 0px !important;}
  .errorText{
  color : red;
font-size : 12px;
margin:0px !important;}
.padLR5{
padding : 0px 5px !important;}
.sideBarContent{
background-color : #ffa50033 !important;
border-radius : 10px !important;
margin-top : 10px !important;}
`;
export const TextFieldBox = styled(TextField)<TextFieldBoxProps>`
${(props : TextFieldBoxProps) => props.searchBox &&`
   .MuiInputBase-root{
   border : 0px solid #CECECE !important;
   border-radius : 20px !important;}
   .MuiInputBase-input{
   padding : 10px 4px !important; 
   font-size : 12px;
   } 
    `}
 ${(props : TextFieldBoxProps) => props.Text &&`
  .MuiInputBase-input{
   padding : 10px 4px !important; 
   font-size : 12px;
   }
   .MuiTextField-root{
   width : 100%;
   } 
   width : 100%;
   margin : 10px 0px !important;
   padding : 0px 5px !important;
  `}   
`

export const LoginPop = styled.div`
background-color : ${mainColor};
border-radius : 8px;
height : 450px;
.logo{
display : flex;
padding : 30px  30px 20px 30px;
svg{
margin-right : 10px;}
}
.logo svg, g, path{
fill : white;
}
.popImg{
position : relative;
bottom : -10px;
left : 50px;
img{
width :70%;
}
}
`

export const LoginSignUp = styled.div`
background-color : white;
padding : 20px;
margin: 10px;
border-radius: 10px;
height : 388px;
position : relative;
.closeIcon{
cursor :pointer;
position : absolute;
top : 0px;
right : 0px;
path{
fill : black !important;
}
}
.forgotPass{
color : ${mainColor};
text-align : right;
font-size : 12px;
font-weight : 600;
}
.submitBtn{
border-color : ${mainColor};
color : black;
font-weight : 500;
padding : 5px 50px;
display : flex;
justify-content : center;
}
.logBtn{
width : 50%;
text-align : center;
padding: 10px;
  border-radius: 8px;
  cursor :pointer;
  }
  .black{
    background: black;
  color: white;
  }
`
export const StyledHR = styled.hr`
border: 1px solid #FFC21B;
margin: 20px 0;
`