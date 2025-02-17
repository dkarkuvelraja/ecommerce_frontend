import { Container, Grid2 } from "@mui/material";
import { SectionHeader } from "admin/Navigation/Header/SectionHeader";
import { Button, ImageInput } from "assets/style";
import React, { useEffect, useRef, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { ToggleField } from "admin/fieldInputs/toggleField";
import { CREATE_AD, DELETE_AD } from "apollo/mutation";
import { useMutation, useQuery } from "@apollo/client";
import { validation } from "HelperFunctions/validation";
import { isValid, s3ImgUrl } from "HelperFunctions/basicHelpers";
import { GET_ALL_ADS } from "apollo/query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoaderHorse from "../../components/loaderHorse";

export function Advertisment() {
  const navigate = useNavigate()
  const [images, setImages] = useState<any>()
  const [errors,setErrors] = useState<any>()
  const [isOn, setIsOn] = useState<boolean>(false)
  const [createAd] = useMutation(CREATE_AD);
  const [deleteAd] = useMutation(DELETE_AD);
  const [progress,setProgress] = useState<boolean>(false)
        const { data, loading, error, refetch } = useQuery(GET_ALL_ADS);
  const fileInputRef = useRef<HTMLInputElement | any>(null);
  const handleDivClick = () => {
    // Trigger the file input's click event
    fileInputRef.current.click();
  };
  const { id } = useParams();
  useEffect(() => {
    if(data){
      const selectedAd = data.getAllAd?.response?.filter((it : any) => it._id === id)
      console.log("selectedAddd",selectedAd);
      if(selectedAd?.length > 0){
        setImages(`${s3ImgUrl}${selectedAd[0].imageUrl}`)
      }
    }
  },[data])
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
  const deleteBtn = async () => {
    setProgress(true)
    try{
const adDeleted =  await deleteAd({
  variables : {
    data : {
      id : id
    }
  }
}) 
if(adDeleted.data.deleteAd.status === 200){
     toast.success("Ad Deleted successfully!");
    setProgress(false)
     navigate("admin/adManagement")
  
}else{
  setProgress(false)
        toast.error("An error occurred while deleting the Ad.");
  
}
console.log(adDeleted.data.deleteAd.status);
    }catch{
      toast.error("An error occurred while deleting the Ad.");

    }
  }
  console.log("imagesss", errors);
  return (
     
    <Container className="admin-Content-view" maxWidth="xl">
      <div className="flex justify-between items-center w-full">
      {progress && <LoaderHorse />}
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
              <img className="mt-5 rounded-lg h-96 " src={images[0].preview || images} />
            </Grid2>
          </>
        }
        <Grid2 size={{ xs: 12, md: 12 }}>
          {id &&
          <div className="flex">
          <span className="my-5 mr-5">Status :</span><ToggleField isOn={isOn} handleToggle={handleToggle} />
          </div>
          }
        </Grid2>
        <Button saveBtn onClick={submit}>
          Save
        </Button>
        {id && 
        <Button cancelBtn onClick={deleteBtn}>
          Delete
        </Button>
        }

      </Grid2>
    </Container>
  );
}