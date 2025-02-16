import { Container, Grid2 } from "@mui/material";
import { SectionHeader } from "admin/Navigation/Header/SectionHeader";
import { Button, ImageInput } from "assets/style";
import React, { useRef, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { ToggleField } from "admin/fieldInputs/toggleField";
import { CREATE_AD } from "apollo/mutation";
import { useMutation } from "@apollo/client";
import { validation } from "HelperFunctions/validation";
import { isValid } from "HelperFunctions/basicHelpers";

export function Advertisment() {
  const [images, setImages] = useState<any>()
  const [errors,setErrors] = useState<any>()
  const [isOn, setIsOn] = useState<boolean>(false)
  const [createAd, { loading, error, data }] = useMutation(CREATE_AD);
  const fileInputRef = useRef<HTMLInputElement | any>(null);
  const handleDivClick = () => {
    // Trigger the file input's click event
    fileInputRef.current.click();
  };
  const handleImageChange = (event: { target: { files: any } }) => {
    const files = Array.from(event.target.files);

    const newImages = files.map((file: any) =>
      Object.assign(file, {
        id: `${file.name}-${Date.now()}`, // Add unique ID for drag-and-drop
        preview: URL.createObjectURL(file), // Generate preview
      })
    );
    setErrors({image : ""});
    setImages(newImages);
  };
  const submit = async () => {
    const validate = validation("adManagement",{images})
    setErrors(validate)
    if(isValid(validate)){
      await createAd({
        variables : {
          data : {
            image : images
          }
        }
      }) 
    }
  }
  const handleToggle = () => {
    setIsOn((prev: boolean) => !prev)
  }
  const deleteBtn = () => {

  }
  console.log("imagesss", errors);
  return (
    <Container className="admin-Content-view" maxWidth="xl">
      <div className="flex justify-between items-center w-full">
        <SectionHeader title="Add Advertisement" />
      </div>
      <Grid2 container>
        <ImageInput onClick={handleDivClick}>
          <input type="file" name="image" onChange={handleImageChange} placeholder="Image" style={{ display: "none" }} ref={fileInputRef} />
          <p>Image</p>
          <AddOutlinedIcon className="icon" />
        </ImageInput>
        {errors?.image &&
        <p className = "text-red-500">Image is Required!</p>}
        {images?.length > 0 &&
          <>
            <Grid2 size={{ xs: 12, md: 12 }}>
              <img className="mt-5 rounded-lg h-96 " src={images[0].preview} />
            </Grid2>
          </>
        }
        <Grid2 size={{ xs: 12, md: 12 }}>

          <ToggleField isOn={isOn} handleToggle={handleToggle} />
        </Grid2>
        <Button saveBtn onClick={submit}>
          Save
        </Button>
        <Button cancelBtn onClick={deleteBtn}>
          Delete
        </Button>

      </Grid2>
    </Container>
  );
}