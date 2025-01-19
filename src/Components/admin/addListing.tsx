import { Container, Grid2, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { AddListingCss, Button, DragIng, ImageInput, SelectInput, StyledHR } from '../../assets/style/index'
import AdminSideBarComponent from './adminSideBar'
import TextInputComponent from './fieldInputs/TextInput'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_CATEGORIES } from 'apollo/query'
import { GridContextProvider, GridDropZone, GridItem, swap } from "react-grid-dnd";
import CancelIcon from '@mui/icons-material/Cancel';
import { CREATE_PRODUCT } from 'apollo/mutation'
import { validation } from 'HelperFunctions/validation'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { isValid } from 'HelperFunctions/basicHelpers';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toast } from 'react-toastify'
export default function AddListing() {
    const [inputs, setInputs] = useState<any>([
        { type: "text", placeholder: "Product Name", value: "", name: "productname" },
        { type: "number", placeholder: "Product Number", value: "", name: "productnum" },
        { type: "select", placeholder: "Category", value: "", name: "category", options: ["Electronics", "Clothing", "Accessories"] },
        { type: "radio", placeholder: "In Stock", value: "", name: "instock", options: ["Yes", "No"] },
        { type: "file", placeholder: "Product Image", value: "", name: "productimage" },
        { type: "text", placeholder: "Price", value: "", name: "price" }
      ]);   
      const [images, setImages] = useState<any>([]);
      const [createProduct] = useMutation(CREATE_PRODUCT);
      const [items, setItems] = React.useState([1, 2, 3, 4]);
      const options : Array<any> =  ["Electronics", "Clothing", "Accessories"]
      const [parentOptions , setParentOptions] = useState<any>([])
      const [childOptions , setChildOptions] = useState<any>([])

    const [categoriesResponse, setCategoriesResponse] = useState<any>([])
    const [formData,setFormData] = useState<any>({parent_category : "",category_id : ""})
    const { data: categoriesData, loading, error } = useQuery(GET_ALL_CATEGORIES);
    const [fields, setFields] = useState([
      { available_count: "", discount: "", price: "", size: "" },
    ]);
    const [errors, setErrors] = useState<any>({});
  const fileInputRef = useRef<HTMLInputElement | any>(null);
  const handleDivClick = () => {
    // Trigger the file input's click event
    fileInputRef.current.click();
  };
    const handleAddFields = () => {
      setFields([...fields, { available_count: "", discount: "", price: "", size: "" }]);
    };
    useEffect(()=> {
      if(categoriesData){
        const categoriesResponse = categoriesData.getAllCategory.response
        const parents : any = {};

        categoriesResponse.forEach((parent: { category_name: any; children: any; }) => {
          const { category_name, children } = parent;
          const childNames = children.map((child: { category_name: any; }) => child.category_name);
      
          parents[category_name.toLowerCase()] = {
            id: category_name.toLowerCase(),
            title: category_name,
            children: childNames,
          };
        });
        const parentData : any = {parents : parents}
        const parentOptions = Object.values(parentData.parents).map((parent : any ) => ({
          id: parent.id,
          title: parent.title,
        }));
        setParentOptions(parentOptions)
        setCategoriesResponse(categoriesResponse)
        // options = parentOptions
      }
    },[categoriesData]) 
    const handleImageChange = (event: { target: { files: any } }) => {
      const files = Array.from(event.target.files);
  
      const newImages = files.map((file : any) =>
        Object.assign(file, {
          id: `${file.name}-${Date.now()}`, // Add unique ID for drag-and-drop
          preview: URL.createObjectURL(file), // Generate preview
        })
      );
  
      setImages((prevImages : any) => [...prevImages, ...newImages]);
    };
    const handleDragEnd = (sourceId: any, sourceIndex: number, targetIndex: number) => {
      const updatedImages = swap(images, sourceIndex, targetIndex);
      setImages(updatedImages);
    };
    const handleRemoveImage = (id: any) => {
      const updatedImages = images.filter((image: { id: any }) => image.id !== id);
  
      // Revoke preview URLs to free up memory
      const removedImage = images.find((image: { id: any }) => image.id === id);
      if (removedImage) {
        URL.revokeObjectURL(removedImage.preview);
      }
  
      setImages(updatedImages);
    };


    const handleDeleteField = (index: number) => {
      const updatedFields = fields.filter((_, i) => i !== index);
      setFields(updatedFields);
  
      // Remove associated errors
      const updatedErrors = { ...errors };
      delete updatedErrors[index];
      // setErrors(updatedErrors);
    };
    const handleInputChange = (index: number, field: string, value: string) => {
      const updatedFields : any = [...fields];
      updatedFields[index][field] = Number(value);
      setFields(updatedFields);
  
      // Clear error if input becomes valid
      const updatedErrors = { ...errors };
      if (value.trim() !== "") {
        delete updatedErrors[index]?.[field];
        if (Object.keys(updatedErrors[index] || {}).length === 0) {
          delete updatedErrors[index];
        }
      }
      // setErrors(updatedErrors);
    };
    const validateFields = (valid : any) => {
      const newErrors: { [key: number]: { [key: string]: any } } = {};
      fields.forEach((field : any, index) => {
        const fieldErrors: { [key: string]: any } = {};
        if (!field.available_count || field.available_count === 0) fieldErrors.available_count = "Available Count is required.";
        if (!field.discount ) fieldErrors.discount = "Discount is required.";
        if (!field.price) fieldErrors.price = "Price is required.";
        if (!field.size) fieldErrors.size = "Size is required.";
        if (Object.keys(fieldErrors).length > 0) {
          newErrors[index] = fieldErrors;
        }
      });
      setErrors((prev : any) => ({
        ...newErrors,...valid
      }));
      return Object.keys(newErrors).length === 0; // Return true if no errors
    };
            const changeFunction = (name: any, value: string) => {

            setInputs((prevInputs: any[]) =>
              prevInputs.map((input: any) =>
                input.name === name ? { ...input, value } : input
              )
            );
          };
         const changeFormData = (e: React.ChangeEvent<HTMLSelectElement>) => {
          const { name , value } = e.target;
          if(name === "parent_category"){
            const childCategory = categoriesResponse.find((parent : any) => parent.category_name === value)?.children || [];
            setChildOptions(childCategory)
          }
          setFormData((prev: any) => ({
            ...prev,[name] : value
          }))
          }
    const submit = async () => {
      const formDataStore = {...formData,image : images,size_and_price : fields};
      const valid = validation("addProduct",formData)
      // setErrors((prev : any) => ({...prev,...valid}))
      delete formDataStore.parent_category
      try {
        if (validateFields(valid)) {
          const data = await createProduct({
            variables: {
              data: formDataStore,
            },
          });
          toast.success("Product created successfully!");
        } else {
          toast.error("Validation failed. Please check the input fields.");
        }
      } catch (error) {
        toast.error("An error occurred while creating the product.");
      }
    }
    const onDragEnd = (result : any) => {
      if (!result.destination) return;
  
      const reorderedImages = Array.from(images);
      const [removed] = reorderedImages.splice(result.source.index, 1);
      reorderedImages.splice(result.destination.index, 0, removed);
  
      setImages(reorderedImages);
    };
    const onDragEndd = (result : any) => {
      if (!result.destination) return;
  
      const reorderedImages = Array.from(images);
      const [removed] = reorderedImages.splice(result.source.index, 1);
      reorderedImages.splice(result.destination.index, 0, removed);
  
      setImages(reorderedImages);
    };
    const removeImage = (index : any) => {
      setImages((prev : any) => prev.filter((_ : any, i : any) => i !== index));
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
                {/* <form> */}
                <Grid2 container spacing={2}>
              {/* Label */}
              <Grid2 size = {{xs: 12,md: 3}} className = "d-flex align-items-center">
                <Typography variant="h6" className = "font_16">Parent Category :</Typography>
              </Grid2>

              {/* Select Dropdown */}
              <Grid2 size = {{xs: 12,md: 9}}>
                <SelectInput wid100
                  value = {formData.parent_category}
                  onChange={(e) => changeFormData(e)}
                  name='parent_category'
                >
                  <option value="" disabled>Select Parent Category</option>
                  {/* <option value= "">Select Parent Category</option> */}
                  {parentOptions && parentOptions?.map((option: any,idx : any) => (
                    <option key={idx} value={option.title}>
                      {option.title}
                    </option>
                  ))}
                </SelectInput>
              </Grid2>
            </Grid2>
            {formData.parent_category !== "" ? childOptions.length > 0 ? 
            
            <Grid2 container spacing={2} className = "mtb10">
               <Grid2 size = {{xs: 12,md: 3}} className = "d-flex align-items-center">
                <Typography variant="h6" className = "font_16">Child Category :</Typography>
              </Grid2>
            <Grid2 size = {{xs: 12,md: 9}}>
                <SelectInput wid100
                  value = {formData.category_id}
                  onChange={(e) => changeFormData(e)}
                  name={'category_id'}
                >
                  <option value="" disabled>Select Child Category</option>
                  {/* <option value= "">Select Parent Category</option> */}
                  {childOptions && childOptions?.map((option: any,idx : any) => (
                    <option key={idx} value={option._id}>
                      {option.category_name}
                    </option>
                  ))}
                </SelectInput>
              </Grid2>
            </Grid2>
            : <>Need to Create a Child category for this parent</> : <></>
            }
            {formData.category_id &&
            <Grid2 container spacing={2} className = "mtb10">
              <Grid2 size = {{xs: 12,md: 3}} className = "d-flex align-items-center">
             <Typography variant="h6" className = "font_16">Title :</Typography>
           </Grid2>
           <Grid2 size = {{xs: 12,md: 9}}>

              <TextInputComponent
                    change={(e: React.ChangeEvent<HTMLSelectElement>) => changeFormData(e)}
                    name= "title"
                    value={formData.title}
                    placeholder= "Title"
                    wid100 = {true}
                    error = {errors.title}

                  />
                    {errors.title && <p style={{ color: "red", fontSize: "12px" }} className="marNone">{errors.title}</p>}

                  </Grid2>
                  <Grid2 size = {{xs: 12,md: 3}} className = "d-flex align-items-center">
             <Typography variant="h6" className = "font_16">Description :</Typography>
           </Grid2>
           <Grid2 size = {{xs: 12,md: 9}}>

              <TextInputComponent
                    change={(e: React.ChangeEvent<HTMLSelectElement>) => changeFormData(e)}
                    name= "description"
                    value={formData.description}
                    placeholder= "Description"
                    wid100 = {true}
                    error = {errors.description}
                  />
                  {errors.description && <p style={{ color: "red", fontSize: "12px" }} className="marNone">{errors.description}</p>}
                  </Grid2>
            <Grid2 size = {{xs: 12,md: 9}} className = "d-flex align-items-center">
             <Typography variant="h6" className = "font_16">Listing Pricing Detail :</Typography>
           </Grid2> 
           <Grid2 size = {{xs: 12,md: 3}} className = "mtb10">
                          <Button wid100 cancelBtn onClick={handleAddFields}> + Add Price</Button>
            
           </Grid2>
           {fields.map((field, index) => (
            <>
           <Grid2 size = {{xs: 12,md: 3}} >

           <TextInputComponent
                    change={(e: { target: { value: string } }) => handleInputChange(index, "size", e.target.value)}
                    // name={input.name}
                    value={field.size}
                    placeholder={"Size"}
                    error={!!errors[index]?.size}

                  />
                  </Grid2>
           <Grid2 size = {{xs: 12,md: 3}} >
           <TextInputComponent
                    change={(e: { target: { value: string } }) => handleInputChange(index, "price", e.target.value)}
                    // name={input.name}
                    value={field.price}
                    error={!!errors[index]?.price}
                    placeholder={"Price"}
                  />

                  </Grid2>
           <Grid2 size = {{xs: 12,md: 3}} >
           <TextInputComponent
                    change={(e: { target: { value: string } }) => handleInputChange(index, "discount", e.target.value)}
                    // name={input.name}
                    value={field.discount}
                    error={!!errors[index]?.discount}
                    placeholder={"Discount"}
                  />

                  </Grid2>
           <Grid2 size = {{xs: 12,md: 3}} className = "posRelative">
            
           <TextInputComponent
                    change={(e: { target: { value: string } }) => handleInputChange(index, "available_count", e.target.value)}
                    // name={input.name}
                    value={field.available_count}
                    placeholder={"Available Count"}
                    error={!!errors[index]?.available_count}
                  />

                  {index > 0 && 
                  <div className = "closeBtn" onClick = {() => handleDeleteField(index)}><CancelIcon/></div>}
                  
                  </Grid2>
            </>

           ))}
           {/* <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginBottom: "20px" }}
      /> */}
       <ImageInput onClick={handleDivClick}><input type="file" name="image" onChange={handleImageChange} placeholder="Image" style={{ display: "none" }} ref={fileInputRef} /><AddOutlinedIcon className="icon" /></ImageInput>
       {/* <DragIng count = {images.length}> */}
  
    <DragDropContext onDragEnd={onDragEndd}>
        <Droppable droppableId="imageGrid" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {images.map((src : any, index : any) => (
                <Draggable key={src} draggableId={src} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        position: "relative",
                        display: "inline-block",
                        ...provided.draggableProps.style,
                      }}
                    >
                      <img
                        src={src.preview}
                        alt="Draggable"
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: "cover",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                        }}
                      />

                      {/* Close Button */}
                      <button
                        onClick={() => removeImage(index)}
                        style={{
                          position: "absolute",
                          top: -5,
                          right: -5,
                          background: "red",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          cursor: "pointer",
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* </DragIng> */}
           </Grid2>
            }
      {/* {formData.category_id && inputs.map((input: any, index: React.Key | null | undefined) => (
        <>
          {input.type === "text" || input.type === "number" || input.type === "price" ? (
            <Grid2 container spacing={2} key={index}>
              <Grid2 size = {{xs: 12,md: 3}}>
                <Typography variant="h6">{input.placeholder}:</Typography>
              </Grid2>

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
              <Grid2 size = {{xs: 12,md: 3}}>
                <Typography variant="h6">{input.placeholder}:</Typography>
              </Grid2>

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
              <Grid2 size = {{xs: 12,md: 3}}>
                <Typography variant="h6">{input.placeholder}:</Typography>
              </Grid2>

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
              <Grid2 size = {{xs: 12,md: 3}}>
                <Typography variant="h6">{input.placeholder}:</Typography>
              </Grid2>

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
      ))} */}
                    <Button saveBtn onClick={submit}>Save</Button>
      
                </AddListingCss>
            </Grid2>
            </Grid2>
            </Grid2>
            </Grid2>
            </Container>
    </div>
  )
}
