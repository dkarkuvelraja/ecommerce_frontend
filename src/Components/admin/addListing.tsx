import { Container, Grid2, Typography } from '@mui/material'
import React, { useState } from 'react'
import { AddListingCss, StyledHR } from '../../assets/style/index'
import AdminSideBarComponent from './adminSideBar'
import TextInputComponent from './fieldInputs/TextInput'

export default function AddListing() {
    const [inputs, setInputs] = useState<any>([
        { type: "text", placeholder: "Product Name", value: "", name: "productname" },
        { type: "number", placeholder: "Product Number", value: "", name: "productnum" },
        { type: "select", placeholder: "Category", value: "", name: "category", options: ["Electronics", "Clothing", "Accessories"] },
        { type: "radio", placeholder: "In Stock", value: "", name: "instock", options: ["Yes", "No"] },
        { type: "file", placeholder: "Product Image", value: "", name: "productimage" },
        { type: "text", placeholder: "Price", value: "", name: "price" }
      ]);   
    const [formData,setFormData] = useState<any>({})
            const changeFunction = (name: any, value: string) => {
                console.log("name",name,value)
            setInputs((prevInputs: any[]) =>
              prevInputs.map((input: any) =>
                input.name === name ? { ...input, value } : input
              )
            );
          };
    
  return (
    <div>
         <Container maxWidth = "lg">
    <Grid2 container>
        <Grid2 size={{ xs: 12, md: 3 }}>
      <AdminSideBarComponent page = {"listing"}/>
        </Grid2>
        <Grid2 size = {{xs: 12,md: 9}}>
            {/* <Grid2 container> */}
            <Grid2 size = {{xs: 12, md : 12}}  sx = {{pt : 4,pl: 4}}>
                <div>
                <Typography className = "title">Add Listing</Typography>
                <StyledHR wid12/>
                </div>
            {/* </Grid2> */}
            <Grid2 size = {{xs: 12,md: 12}}>
                <AddListingCss>
                <form>
      {inputs.map((input: any, index: React.Key | null | undefined) => (
        <>
          {input.type === "text" || input.type === "number" || input.type === "price" ? (
            <Grid2 container spacing={2} key={index}>
              {/* Label */}
              <Grid2 size = {{xs: 12,md: 3}}>
                <Typography variant="h6">{input.placeholder}:</Typography>
              </Grid2>

              {/* Input Field */}
              <Grid2 size = {{xs: 12,md: 9}}>
                <TextInputComponent
                  change={(e: { target: { value: any } }) => changeFunction(input.name, e.target.value)}
                  name={input.name}
                  value={inputs[input.name] || ''}
                  placeholder={input.placeholder}
                />
              </Grid2>
            </Grid2>
          ) : input.type === "select" ? (
            <Grid2 container spacing={2} key={index}>
              {/* Label */}
              <Grid2 size = {{xs: 12,md: 3}}>
                <Typography variant="h6">{input.placeholder}:</Typography>
              </Grid2>

              {/* Select Dropdown */}
              <Grid2 size = {{xs: 12,md: 9}}>
                <select
                  value={inputs[input.name] || ''}
                  onChange={(e) => changeFunction(input.name, e.target.value)}
                  name={input.name}
                >
                  <option value="" disabled>Select {input.placeholder}</option>
                  {input.options.map((option: any,idx : any) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Grid2>
            </Grid2>
          ) : input.type === "radio" ? (
            <Grid2 container spacing={2} key={index}>
              {/* Label */}
              <Grid2 size = {{xs: 12,md: 3}}>
                <Typography variant="h6">{input.placeholder}:</Typography>
              </Grid2>

              {/* Radio Buttons */}
              <Grid2 size = {{xs: 12,md: 9}}>
                {input.options.map((option: any, idx: React.Key | null | undefined) => (
                  <label key={idx}>
                    <input
                      type="radio"
                      name={input.name}
                      value={option}
                      checked={inputs[input.name] === option}
                      onChange={(e) => changeFunction(input.name, e.target.value)}
                    />
                    {option}
                  </label>
                ))}
              </Grid2>
            </Grid2>
          ) : input.type === "file" ? (
            <Grid2 container spacing={2} key={index}>
              {/* Label */}
              <Grid2 size = {{xs: 12,md: 3}}>
                <Typography variant="h6">{input.placeholder}:</Typography>
              </Grid2>

              {/* File Upload */}
              <Grid2 size = {{xs: 12,md: 9}}>
                <input
                  type="file"
                  onChange={(e : any) => changeFunction(input.name, e.target.files[0])}
                  name={input.name}
                />
              </Grid2>
            </Grid2>
          ) : null}
        </>
      ))}
    </form>
                </AddListingCss>
            </Grid2>
            </Grid2>
            </Grid2>
            </Grid2>
            </Container>
    </div>
  )
}
