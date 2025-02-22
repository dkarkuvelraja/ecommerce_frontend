import { Container, Grid2, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { AddListingCss, Button, DragIng, ImageInput, SelectInput, StyledHR } from "../../assets/style/index";
import AdminSideBarComponent from "../Navigation/Sidebar/adminSideBar";
import TextInputComponent from "../fieldInputs/TextInput";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES, GET_PRODUCT_BY_ID } from "apollo/query";
import { GridContextProvider, GridDropZone, GridItem, swap } from "react-grid-dnd";
import CancelIcon from "@mui/icons-material/Cancel";
import { CREATE_PRODUCT, EDIT_CATEGORY } from "apollo/mutation";
import { validation } from "HelperFunctions/validation";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { isValid, s3ImgUrl } from "HelperFunctions/basicHelpers";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { ChromePicker, ColorResult } from "react-color";
import { SectionHeader } from "admin/Navigation/Header/SectionHeader";
import { ToggleField } from "admin/fieldInputs/toggleField";
import LoaderHorse from "components/loaderHorse";

export default function AddListing() {
  const [inputs, setInputs] = useState<any>([
    { type: "text", placeholder: "Product Name", value: "", name: "productname" },
    { type: "number", placeholder: "Product Number", value: "", name: "productnum" },
    { type: "select", placeholder: "Category", value: "", name: "category", options: ["Electronics", "Clothing", "Accessories"] },
    { type: "radio", placeholder: "In Stock", value: "", name: "instock", options: ["Yes", "No"] },
    { type: "file", placeholder: "Product Image", value: "", name: "productimage" },
    { type: "text", placeholder: "Price", value: "", name: "price" },
  ]);
  const navigate = useNavigate()
  const [images, setImages] = useState<any>([]);
  const [oldImages, setOldImages] = useState<any>()
  const [color, setColor] = useState("#FF0000");
  const [deletedImages, setDeletedImages] = useState<any>([]);
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [editProduct] = useMutation(EDIT_CATEGORY);
  const [items, setItems] = React.useState([1, 2, 3, 4]);
  const options: Array<any> = ["Electronics", "Clothing", "Accessories"];
  const [parentOptions, setParentOptions] = useState<any>([]);
  const [childOptions, setChildOptions] = useState<any>([]);
  const [fields, setFields] = useState([
    {
      size: "",
      price: "",
      discount: "",
      colors: [{ color: "Color", available_count: "" }],
    },
  ]);
  const [editedData, setEditedData] = useState<any>([]);
  const [showPicker, setShowPicker] = useState<any>(null);
  const pickerRefs: any = useRef([]); // Ref for multiple pickers
  const inputRefs: any = useRef([]); // Ref for multiple input areas
  const [categoriesResponse, setCategoriesResponse] = useState<any>([]);
  const [formData, setFormData] = useState<any>({ parent_category: "", category_id: "" });
  const [listingToogles, setListingToogles] = useState({ "top_selling_products": false, "clearance_sale": false, "new_arrivals": false, "explore_products": false })
  const { data: categoriesData, loading, error } = useQuery(GET_ALL_CATEGORIES);
  const [loader,setLoader] = useState<boolean>(false)
  // const {data : productById} = useQuery(GET_PRODUCT_BY_ID)
  // const [fields, setFields] = useState([
  //   { available_count: "", discount: "", price: "", size: "",color : "#000000" },
  // ]);
  const [errors, setErrors] = useState<any>({});
  const fileInputRef = useRef<HTMLInputElement | any>(null);
  const { id } = useParams();
  const handleDivClick = () => {
    // Trigger the file input's click event
    fileInputRef.current.click();
  };
  const handleAddFields = () => {
    setFields([
      ...fields,
      {
        size: "",
        price: "",
        discount: "",
        colors: [{ color: "Color", available_count: "" }],
      },
    ]);
  };

  const variables = { getProductByIdId: id };
  const { data, refetch } = useQuery(GET_PRODUCT_BY_ID, {
    variables,
    skip: !id,
  });
  useEffect(() => {
    setLoader(true)
    if (categoriesData && data) {
      const editData = data.getProductById.responce;
      const categoriesResponse = categoriesData.getAllCategory.response;
      setEditedData(editData);
      const result = categoriesResponse.find((parent: { children: any[] }) => parent.children.some((child) => child._id === editData.category_id));
      const formData = { parent_category: result._id, category_id: editData.category_id, title: editData.title, description: editData.description};
      setListingToogles({ "top_selling_products": editData.top_selling_products, "clearance_sale": editData.clearance_sale, "new_arrivals": editData.new_arrivals, "explore_products": editData.explore_products })
      const filedData = transformData(editData.size_and_price);
      setFields(filedData);
      setFormData(formData);
      setChildOptions(result.children);
      setOldImages(editData.image);
    }
    setLoader(false)
  }, [data]);
  useEffect(() => {
    setLoader(true)
    if (categoriesData) {
      const categoriesResponse = categoriesData.getAllCategory.response;
      const parents: any = {};

      categoriesResponse.forEach((parent: { category_name: any; children: any }) => {
        const { category_name, children } = parent;
        const childNames = children.map((child: { category_name: any }) => child.category_name);

        parents[category_name.toLowerCase()] = {
          id: category_name.toLowerCase(),
          title: category_name,
          children: childNames,
        };
      });
      const parentData: any = { parents: parents };
      const parentOptions = Object.values(parentData.parents).map((parent: any) => ({
        id: parent.id,
        title: parent.title,
      }));
      setParentOptions(parentOptions);
      setCategoriesResponse(categoriesResponse);
      // options = parentOptions
    }
    setLoader(false)
  }, [categoriesData]);
  const handleChangeComplete = (color: ColorResult, fieldIndex: any, colorIndex: number, field: string) => {
    setColor(color.hex);
    const updatedFields: any = [...fields];
    updatedFields[fieldIndex].colors[colorIndex][field] = color.hex;
    setFields(updatedFields);
    // handleColorChange(fieldIndex, colorIndex, "color", color.hex); // Update form data
  };

  const handleClick = (colorIndex: number | boolean | ((prevState: boolean) => boolean)) => {
    setShowPicker(showPicker === colorIndex ? null : colorIndex); // Toggle for specific index
  };

  const handleOutsideClick = (event: { target: any }) => {
    if (showPicker !== null && inputRefs.current[showPicker] && !inputRefs.current[showPicker].contains(event.target) && pickerRefs.current[showPicker] && !pickerRefs.current[showPicker].contains(event.target)) {
      setShowPicker(null); // Close any open picker
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showPicker]); // Add showPicker to dependency array

  const transformData = (data: any) => {
    return data.map((item: any) => ({
      size: item.size,
      price: item.price,
      discount: item.discount,
      colors: item.colors.map((color: any) => ({
        color: color.color,
        available_count: color.available_count,
      })),
    }));
  };
  const handleImageChange = (event: { target: { files: any } }) => {
    const files = Array.from(event.target.files);

    const newImages = files.map((file: any) =>
      Object.assign(file, {
        id: `${file.name}-${Date.now()}`, // Add unique ID for drag-and-drop
        preview: URL.createObjectURL(file), // Generate preview
      })
    );
    if (id) {
      setOldImages((prevImages: any) => [...prevImages, ...newImages])
      setImages((prevImages: any) => [...prevImages, ...newImages]);
    } else {
      setImages((prevImages: any) => [...prevImages, ...newImages]);
    }
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
    const updatedFields: any = [...fields];
    const sanitizedValue: any = value.replace(/[^0-9]/g, "");
    updatedFields[index][field] = !["price", "discount"].includes(field) ? value : sanitizedValue === "" || sanitizedValue === 0 ? 0 : Number(value);
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

  const handleToggle = (key: string) => {
    setListingToogles((prevState: any) => ({
      ...prevState,
      [key]: !prevState[key], // Toggle the value
    }));
  };
  const validateFields = (valid: any) => {
    const newErrors: { [key: number]: { [key: string]: any } } = {};

    fields.forEach((field: any, fieldIndex: number) => {
      const fieldErrors: { [key: string]: any } = {};

      // Validate top-level fields
      if (!field.size) fieldErrors.size = "Size is required.";
      if (!field.price) fieldErrors.price = "Price is required.";
      if (!field.discount) fieldErrors.discount = "Discount is required.";

      // Validate `colors` array
      if (field.colors?.length > 0) {
        field.colors.forEach((color: any, colorIndex: number) => {
          if (!color.color || color.color.trim() === "") {
            if (!fieldErrors.colors || fieldErrors.colors === "Color") fieldErrors.colors = {};
            fieldErrors.colors[colorIndex] = {
              ...(fieldErrors.colors[colorIndex] || {}),
              color: "Color is required.",
            };
          }
          if (!color.available_count || color.available_count === 0) {
            if (!fieldErrors.colors) fieldErrors.colors = {};
            fieldErrors.colors[colorIndex] = {
              ...(fieldErrors.colors[colorIndex] || {}),
              available_count: "Available count is required.",
            };
          }
        });
      } else {
        fieldErrors.colors = "At least one color is required.";
      }

      // Add field errors if any
      if (Object.keys(fieldErrors).length > 0) {
        newErrors[fieldIndex] = fieldErrors;
      }
    });

    setErrors((prev: any) => ({
      ...newErrors,
      ...valid,
    }));

    const validate = isValid(valid)
    return validate && Object.keys(newErrors).length === 0; // Return true if no errors
  };
  const changeFunction = (name: any, value: string) => {
    setInputs((prevInputs: any[]) => prevInputs.map((input: any) => (input.name === name ? { ...input, value } : input)));
  };
  const changeFormData = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "parent_category") {
      const childCategory = categoriesResponse.find((parent: any) => parent.category_name === value)?.children || [];
      setChildOptions(childCategory);
    }
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const submit = async () => {
    const formDataStore = { ...formData, image: images, size_and_price: fields };
    const editFormDataStore = { ...formData, image: images, size_and_price: fields, delete_image: deletedImages, id: id };
    const valid = validation("addProduct", { ...formData, id: id });
    // setErrors((prev : any) => ({...prev,...valid}))
    delete formDataStore.parent_category;
    delete editFormDataStore.parent_category;
    const formDataWithToggle = {...formDataStore,...listingToogles}
    const editFormDataStoreToggle = {...editFormDataStore,...listingToogles}
    setLoader(true)
    try {
      if (validateFields(valid)) {
        const data = id
          ? await editProduct({
            variables: {
              data: editFormDataStoreToggle,
            },
          })
          : await createProduct({
            variables: {
              data: formDataWithToggle,
            },
          });
        setLoader(false)
        toast.success(id ? "Product updated successfully!" : "Product created successfully!");
        navigate("/admin/manageListings")
      } else {
    setLoader(false)
        toast.error("Validation failed. Please check the input fields.");
      }
    } catch (error) {
    setLoader(false)
      toast.error("An error occurred while creating the product.");
    }
  };
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(images);
    const [removed] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, removed);

    setImages(reorderedImages);
  };
  const onDragEndd = (result: any) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(images);
    const [removed] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, removed);

    setImages(reorderedImages);
  };
  const removeImage = (index: any) => {
    if (id) {
      const image = images.filter((_: any, id: any) => id === index);
      if (editedData.image.includes(image[0])) {
        setDeletedImages((prev: any) => [...prev, ...image]);
      }
    }
    setImages((prev: any) => prev.filter((_: any, i: any) => i !== index));
  };
  const handleAddColor = (fieldIndex: number) => {
    const updatedFields: any = [...fields];
    updatedFields[fieldIndex].colors.push({
      color: "", // Default color
      available_count: 0, // Default available count
    });
    setFields(updatedFields);
  };
  const handleRemoveColor = (fieldIndex: number, colorIndex: number) => {
    const updatedFields: any = [...fields];
    updatedFields[fieldIndex].colors.splice(colorIndex, 1);
    setFields(updatedFields);
  };
  const handleColorChange = (fieldIndex: number, colorIndex: number, field: string, value: string) => {
    const updatedFields: any = [...fields];
    updatedFields[fieldIndex].colors[colorIndex][field] = field === "color" ? value : Number(value);
    setFields(updatedFields);
  };
  const restrictPasteToNumbers = (e: React.ClipboardEvent) => {
    const pastedData = e.clipboardData.getData("Text");
    if (!/^\d*$/.test(pastedData)) {
      e.preventDefault();
    }
  };
  const restrictToNumbers = (e: React.KeyboardEvent) => {
    const charCode = e.key;

    if (!/^\d$/.test(charCode)) {
      e.preventDefault();
    }
  };
  const numberRestrictions = (event: any) => {
    if ((event.charCode >= 40 && event.charCode <= 57) || event.charCode === 46) {
      return true;
    } else {
      event.preventDefault();
    }
  };
  const imagesMap = id ? oldImages : images
  return (
    <div>
      {loader && <LoaderHorse />}
      <Container className="admin-Content-view" maxWidth="xl">
        <div className="flex justify-between items-center w-full">
          <SectionHeader title="Add Listing" />
        </div>
        <Grid2 container>
          <Grid2 size={{ xs: 12, md: 12 }}>
            {/* </Grid2> */}
            <Grid2 size={{ xs: 12, md: 12 }}>
              <AddListingCss>
                {/* <form> */}
                <Grid2 container spacing={2}>
                  {/* Label */}
                  <Grid2 size={{ xs: 12, md: 3 }} className="d-flex align-items-center">
                    <Typography variant="h6" className="font_16">
                      Parent Category :
                    </Typography>
                  </Grid2>

                  {/* Select Dropdown */}
                  <Grid2 size={{ xs: 12, md: 9 }}>
                    <SelectInput wid100 value={formData.parent_category} onChange={(e) => changeFormData(e)} name="parent_category">
                      <option value="" disabled>
                        Select Parent Category
                      </option>
                      {/* <option value= "">Select Parent Category</option> */}
                      {parentOptions &&
                        parentOptions?.map((option: any, idx: any) => (
                          <option key={idx} value={option.title}>
                            {option.title}
                          </option>
                        ))}
                    </SelectInput>
                  </Grid2>
                </Grid2>
                {formData.parent_category !== "" ? (
                  childOptions.length > 0 || formData.category_id !== "" ? (
                    <Grid2 container spacing={2} className="mtb10">
                      <Grid2 size={{ xs: 12, md: 3 }} className="d-flex align-items-center">
                        <Typography variant="h6" className="font_16">
                          Child Category :
                        </Typography>
                      </Grid2>
                      <Grid2 size={{ xs: 12, md: 9 }}>
                        <SelectInput wid100 value={formData.category_id} onChange={(e) => changeFormData(e)} name={"category_id"}>
                          <option value="" disabled>
                            Select Child Category
                          </option>
                          {/* <option value= "">Select Parent Category</option> */}
                          {childOptions &&
                            childOptions?.map((option: any, idx: any) => (
                              <option key={idx} value={option._id}>
                                {option.category_name}
                              </option>
                            ))}
                        </SelectInput>
                      </Grid2>
                    </Grid2>
                  ) : (
                    <p style={{ color: "red", textAlign: "center" }}>Need to Create a Child category for this parent</p>
                  )
                ) : (
                  <></>
                )}
                {formData.category_id && (
                  <Grid2 container spacing={2} className="mtb10">
                    <Grid2 size={{ xs: 12, md: 3 }} className="d-flex align-items-center">
                      <Typography variant="h6" className="font_16">
                        Title :
                      </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 9 }}>
                      <TextInputComponent change={(e: React.ChangeEvent<HTMLSelectElement>) => changeFormData(e)} name="title" value={formData.title} placeholder="Title" wid100={true} error={errors.title} />
                      {errors.title && (
                        <p style={{ color: "red", fontSize: "12px" }} className="marNone">
                          {errors.title}
                        </p>
                      )}
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 3 }} className="d-flex align-items-center">
                      <Typography variant="h6" className="font_16">
                        Description :
                      </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 9 }}>
                      <TextInputComponent change={(e: React.ChangeEvent<HTMLSelectElement>) => changeFormData(e)} name="description" value={formData.description} placeholder="Description" wid100={true} error={errors.description} />
                      {errors.description && (
                        <p style={{ color: "red", fontSize: "12px" }} className="marNone">
                          {errors.description}
                        </p>
                      )}
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 9 }} className="d-flex align-items-center">
                      <Typography variant="h6" className="font_16">
                        Listing Pricing Detail :
                      </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 3 }} className="mtb10">
                      <Button wid100 cancelBtn onClick={handleAddFields}>
                        {" "}
                        + Add Price
                      </Button>
                    </Grid2>
                    {fields.map((field, fieldIndex) => (
                      // <div key={fieldIndex}>
                      <>
                        <Grid2 size={{ xs: 12, md: 12 }}>
                          <div style={{ position: "relative" }}>
                            {fieldIndex !== 0 && <CloseOutlinedIcon onClick={() => handleDeleteField(fieldIndex)} className="closeIconBtn" style={{ position: "absolute" }} />}
                            <StyledHR />
                          </div>
                        </Grid2>

                        <Grid2 size={{ xs: 12, md: 4 }}>
                          <TextInputComponent
                            change={(e: { target: { value: string } }) => handleInputChange(fieldIndex, "size", e.target.value)}
                            wid100={true}
                            value={field.size}
                            placeholder={"Size"}
                            error={!!errors[fieldIndex]?.size}
                          // onPaste={(e: React.ClipboardEvent<Element>) => restrictPasteToNumbers(e)}
                          />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 4 }}>
                          <TextInputComponent change={(e: { target: { value: string } }) => handleInputChange(fieldIndex, "price", e.target.value)} wid100={true} value={field.price} placeholder={"Price"} error={!!errors[fieldIndex]?.price} onKeyPress={(e: React.KeyboardEvent<Element>) => numberRestrictions(e)} />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 4 }}>
                          <TextInputComponent change={(e: { target: { value: string } }) => handleInputChange(fieldIndex, "discount", e.target.value)} wid100={true} value={field.discount} placeholder={"Discount"} error={!!errors[fieldIndex]?.discount} onKeyPress={(e: React.KeyboardEvent<Element>) => numberRestrictions(e)} />
                        </Grid2>

                        {/* Colors Section */}
                        {field.colors.map((colorField, colorIndex) => (
                          // <div key={colorIndex} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <>
                            <Grid2 size={{ xs: 12, md: 4 }}>
                              {/* <div  className = { !!errors[fieldIndex]?.colors?.[colorIndex]?.color ? "errorRed colorBox" : "colorBox"}>
            <input
              type="color"
              value={colorField.color}
              onChange={(e) =>
                handleColorChange(fieldIndex, colorIndex, "color", e.target.value)
              }
             
              // error={!!errors[fieldIndex]?.colors?.[colorIndex]?.color}
            />
            <p>{colorField.color}</p>
          </div> */}
                              <div onClick={() => handleClick(colorIndex)} ref={(el: any) => (inputRefs.current[colorIndex] = el)} style={{ cursor: "pointer" }} className={!!errors[fieldIndex]?.colors?.[colorIndex]?.color ? "errorRed colorBox" : "colorBox"}>
                                <input
                                  className={!!errors[fieldIndex]?.colors?.[colorIndex]?.color ? "errorRed colorBox" : "colorBox"}
                                  type="text"
                                  value={colorField.color} // Use the common color state
                                  readOnly
                                // Use colorField.color here
                                />
                              </div>

                              {showPicker === colorIndex && ( // Show picker only for clicked input
                                <div style={{ position: "absolute", zIndex: "1" }} ref={(el: any) => (pickerRefs.current[colorIndex] = el)}>
                                  <ChromePicker color={color} onChangeComplete={(c: any) => handleChangeComplete(c, fieldIndex, colorIndex, "color")} /> {/* Pass colorIndex */}
                                </div>
                              )}
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 4 }}>
                              <div style={{ position: "relative" }}>
                                <TextInputComponent change={(e: { target: { value: string } }) => handleColorChange(fieldIndex, colorIndex, "available_count", e.target.value)} wid100={true} value={colorField.available_count} placeholder={"Available"} error={!!errors[fieldIndex]?.colors?.[colorIndex]?.available_count} onKeyPress={(e: React.KeyboardEvent<Element>) => numberRestrictions(e)} />
                                <div>
                                  {/* <div onClick={handleClick} ref={inputRef} style={{cursor: 'pointer'}}> Make the input area clickable */}

                                  {/* </div> */}
                                </div>
                                {colorIndex !== 0 && (
                                  <button onClick={() => handleRemoveColor(fieldIndex, colorIndex)}>
                                    <CloseOutlinedIcon className="closeBtn" />
                                  </button>
                                )}
                              </div>
                            </Grid2>
                            {field.colors.length - 1 === colorIndex ? (
                              <Grid2 size={{ xs: 12, md: 4 }}>
                                <Button className="btnMargin" wid100 cancelBtn onClick={() => handleAddColor(fieldIndex)}>
                                  Add Color
                                </Button>
                              </Grid2>
                            ) : (
                              <Grid2 size={{ xs: 12, md: 4 }}></Grid2>
                            )}
                          </>
                        ))}
                      </>
                    ))}
                    {/* <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginBottom: "20px" }}
      /> */}
                    <ImageInput onClick={handleDivClick}>
                      <input type="file" name="image" onChange={handleImageChange} placeholder="Image" style={{ display: "none" }} ref={fileInputRef} />
                      <p>Image</p>
                      <AddOutlinedIcon className="icon" />
                    </ImageInput>
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
                            {imagesMap.map((src: any, index: any) => (
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
                                      src={src.preview || `${s3ImgUrl}${src}`}
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
                )}
                {id && (
                  <>
                    <Grid2 container>
                      <Grid2 size={{ xs: 12, md: 3 }} className="d-flex align-items-center">
                        <Typography variant="h6" className="font_16">
                          Status :
                        </Typography>
                      </Grid2>
                      <Grid2 size={{ xs: 12, md: 9 }}>
                        <>
                          <SelectInput wid100 onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeFormData(e)} name="status" value={formData.status || ""}>
                            <option value="" disabled>
                              Select Status
                            </option>
                            <option value="Active">Active</option>
                            <option value="InActive">In-Active</option>
                          </SelectInput>
                          {errors.status && (
                            <p style={{ color: "red", fontSize: "12px" }} className="marNone">
                              {errors.status}
                            </p>
                          )}
                        </>
                      </Grid2>
                    </Grid2>
                  </>
                )}
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
      {formData.category_id && (
                <Grid2 container>
                  <Grid2 size={{ xs: 12, md: 3 }} className="d-flex align-items-center">
                    <Typography variant="h6" className="font_16">
                      Top Selling Products :
                    </Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 9 }}>

                    <ToggleField
                      isOn={listingToogles.top_selling_products}
                      handleToggle={() => handleToggle("top_selling_products")}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, md: 3 }} className="d-flex align-items-center">
                    <Typography variant="h6" className="font_16">
                      Clearance Sale :
                    </Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 9 }}>

                    <ToggleField
                      isOn={listingToogles.clearance_sale}
                      handleToggle={() => handleToggle("clearance_sale")}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 3 }} className="d-flex align-items-center">
                    <Typography variant="h6" className="font_16">
                      New Arrivals :
                    </Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 9 }}>
                    <ToggleField
                      isOn={listingToogles.new_arrivals}
                      handleToggle={() => handleToggle("new_arrivals")}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 3 }} className="d-flex align-items-center">
                    <Typography variant="h6" className="font_16">
                      Explore Products :
                    </Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 9 }}>
                    <ToggleField
                      isOn={listingToogles.explore_products}
                      handleToggle={() => handleToggle("explore_products")}
                    />

                  </Grid2>
                <Button saveBtn onClick={submit}>
                  Save
                </Button>
                </Grid2>

      )}

              </AddListingCss>
            </Grid2>
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
}
