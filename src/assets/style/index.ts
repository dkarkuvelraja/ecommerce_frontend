import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { createGlobalStyle } from 'styled-components';


const mainColor = "#FE8315"
const targetColor = "#F68B29"

interface TextFieldBoxProps{
    searchBox?: boolean
    Text? : boolean
}
interface StyledHR{
  wid12? : boolean
}
interface ButtonProps{
  saveBtn? : boolean
  cancelBtn? : boolean
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
margin-top : 10px !important;
width :100%;}
.title{
font-weight : 500 !important;
font-size : 25px !important; }
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
padding: 8px;
  border-radius: 8px;
  cursor :pointer;
  }
  .black{
    background: black;
  color: white;
  }
`
export const StyledHR = styled.hr<StyledHR>`
border: 1px solid #FFC21B;
margin: ${(props : StyledHR) => props.wid12 ? '5px 0' : '20px 0' } ;
${(props : StyledHR) => props.wid12 && `
  width : 12%;
  `}
`

export const AdminSideBar = styled.div`
@media (max-width: 599px) {
  display: none;
}
background-color : #F1F1F1;
height : auto;
border-radius : 23px;
ul{
padding: 10px;
list-style-type : none;
text-align : center;
height : 100vh;
li{
padding : 10px;
margin : 10px;
color : black;
cursor : pointer;
}
.active{
  border-radius : 4px;
  background: ${targetColor};
  color : white;
}}`

export const ManageCategoryCss = styled.div`
.addBtn{
text-align : center;
padding: 10px;
  border-radius: 8px;
  cursor :pointer;
  border : 1px solid ${mainColor};
}
.categoryTitle{
font-size : 18px;
font-weight : 500;
margin : 10px 0px;}
.deleteContent{
text-align : right;
color : red;
font-size : 16px;
font-weight : 500; }
.d_flex{
display : flex;
justify-content : space-between;
align-items : center;}
`

export const CategoryDragTable = styled.div`
background: ${mainColor};
  border-radius: 10px;
  margin : 10px 10px 10px 15px;
  padding : 10px;
  .parentContent{
   display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-size : 18px;
  font-weight : 600;
  color : white;
  .arrow{
  font-size : 12px !important;
  padding-right : 30px;
  padding-top : 2px;}
  }
  .child{
  padding: 6px;
  border-radius: 5px;
  color : white;
  div{
  padding: 8px;
  marginBottom: 5px;
 }
   }`


export const TextInput = styled.input`
border : 1px solid ${mainColor};
width: 92%;
  padding: 10px 25px;
  border-radius: 10px;`

export const ImageInput = styled.div`
border : 1px solid ${mainColor};
width: 92%;
  padding: 18px 25px;
  border-radius: 10px;
  position: relative;
  .icon{
  position: absolute;
  right: 18px;
  color: white;
  background: ${mainColor};
  border-radius: 25px;
  top : 6px;
  }
`
export const SelectInput = styled.select`
border : 1px solid ${mainColor};
  padding: 10px 25px;
  border-radius: 10px;
  width : 30%;
`

export const Button = styled.button<ButtonProps>`
padding : 10px;
border : 1px solid ${mainColor};
width : 20%;
border-radius : 6px;
margin : 10px 5px;
${(props : ButtonProps) => props.saveBtn && `
  color : white;
  background : ${mainColor};
  `}
  ${(props : ButtonProps) => props.cancelBtn && `
    color : black;
    background : transparent;
    `}
`

export const AddListingCss = styled.div`
box-shadow: 1px 1px 9px 0 rgba(0, 0, 0, 0.21);
padding: 60px;
  margin: 40px 60px;`

export const ImagePreview = styled.div`
img{
margin-top: 10px;
  height: 100px;
  width: 100px;
  object-fit: cover;}
`