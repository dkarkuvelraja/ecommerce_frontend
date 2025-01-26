import { Box, Container, Grid2, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AdminSideBar, Button, CategoryDragTable, ImageInput, ImagePreview, ManageCategoryCss, SelectInput, StyledHR } from '../../assets/style/index'
import TextInputComponent from './fieldInputs/TextInput';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from '../../apollo/mutation';
import AdminSideBarComponent from './adminSideBar';
import { GET_ALL_CATEGORIES } from '../../apollo/query';
import LoaderHorse from '../../Components/loaderHorse';
import { toast } from 'react-toastify';
import { validation } from 'HelperFunctions/validation';
import { isValid } from 'HelperFunctions/basicHelpers';
const initialData = {
  parents: {
    kids: { id: "kids", title: "Kids", children: ["kurthis", "tops", "tshirts", "jeans"] },
    adults: { id: "adults", title: "Adults", children: ["shirts", "trousers"] },
    elders: { id: "elders", title: "Elders", children: ["sweaters", "scarves"] },
  },
};

export default function ManageCategory() {
  const [data, setData] = useState<any>(initialData);
  const [createCategory] = useMutation(CREATE_CATEGORY);
  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  const [deleteCategoryData] = useMutation(DELETE_CATEGORY)
  const [errors,setErrors] = useState<any>({})
  const [isParent, setIsParent] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true)
  // const [getAllCategory] = useQuery(GET_ALL_CATEGORIES)
  const [preview, setPreview] = useState<any>("");
  const [parentOptions, setParentOptions] = useState<any>([])
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<any>({ kids: true, adults: false, elders: false });
  const [formData, setFormData] = useState<any>({
    category_name: "",
    image: "",
    is_parent: true,
  });
  const { data: categoriesData, loading, error, refetch } = useQuery(GET_ALL_CATEGORIES);
  useEffect(() => {
    if (categoriesData) {
      const categoriesResponse = categoriesData.getAllCategory.response
      const parents: any = {};
      let parent_data: any = []
      categoriesResponse.forEach((parent: { category_name: any; children: any; _id: any; }) => {
        const { category_name, children, _id } = parent;
        const childNames = children.map((child: { category_name: any; _id: string }) => {
          const childCat = { categoryName: child.category_name, "id": child._id };
          return childCat
        });
        parents[category_name.toLowerCase()] = {
          id: _id,
          title: category_name,
          children: childNames,
        };
        const parentStructure = { title: category_name, id: _id }
        parent_data.push(parentStructure)
      });
      const parentData: any = { parents: parents }
      setData(parentData)
      setLoader(false)
      setParentOptions(parent_data)
    }
  }, [categoriesData]);
  const fileInputRef = useRef<HTMLInputElement | any>(null);

  const handleDivClick = () => {
    // Trigger the file input's click event
    fileInputRef.current.click();
  };
  const onDragEnd = (result: { source: any; destination: any; }) => {
    // const { source, destination } = result;

    // if (!destination) return;

    // const sourceParentId = source.droppableId;
    // const destParentId = destination.droppableId;

    // const sourceParent = data.parents[sourceParentId];
    // const destParent = data.parents[destParentId];

    // const draggedChildId = sourceParent.children[source.index];

    // // Remove child from source parent
    // const newSourceChildren = Array.from(sourceParent.children);
    // newSourceChildren.splice(source.index, 1);

    // // Add child to destination parent
    // const newDestChildren = Array.from(destParent.children);
    // newDestChildren.splice(destination.index, 0, draggedChildId);

    // // Update state
    // setData({
    //   ...data,
    //   parents: {
    //     ...data.parents,
    //     [sourceParentId]: {
    //       ...sourceParent,
    //       children: newSourceChildren,
    //     },
    //     [destParentId]: {
    //       ...destParent,
    //       children: newDestChildren,
    //     },
    //   },
    // });
  };

  const toggleDropdown = (parentId: string) => {
    setExpanded({ ...expanded, [parentId]: !expanded[parentId] });
  };
  const changeFunction = (e: { target: { files?: any; name?: any; value?: any; }; }) => {
    const { name } = e.target;

    if (name === "image") {
      const { files } = e.target; // Corrected from `e.target` to `e.target.files`
      const files1: any = Array.from(files)
      if (files1.length > 0) {
        const reader = new FileReader(); // Initialize FileReader
        reader.onloadend = () => {
          setPreview(reader.result);
          setFormData((prev: any) => (isEdit ? { ...prev, [name]: files1[0], isNewImage: true } : {
            ...prev,
            [name]: files1[0], // Dynamically update the field with name "image"
          }));
          setErrors((prev :any) => ({...prev,[name] : ""}))
        }
        reader.readAsDataURL(files1[0]); // Read file and trigger `onloadend`
      }
    } else if (name === "parent_id") {
      const { value } = e.target;
      setFormData((prev: any) => ({
        ...prev,
        [name]: value, is_parent: false
      }));
    } else {
      const { value } = e.target;
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
      setErrors((prev :any) => ({...prev,[name] : ""}))

    }
  };
  const submit = async () => {
    // delete formData.parent_id;
    // const formDataa = {...formData}
    const valid = validation("manageCategory",formData);
    console.log("valid",valid)
    setErrors(valid)
    if(isValid(valid)){
      
      try {
      setLoader(true);
      const data = isEdit
        ? await updateCategory({
          variables: {
            data: formData,
          },
        })
        : await createCategory({
          variables: {
            data: formData,
          },
        });
      await refetch();
      toast.success("Success! The operation completed successfully.");
    } catch (error) {
      toast.error("Error! Something went wrong.");
    } finally {
      setLoader(false); // Ensure the loading spinner stops
    }
    }
    // createCategory(formData)
  }
  const handleParentClick = (parentId: any) => {
    const categoriesResponse = categoriesData.getAllCategory.response
    const parent = categoriesResponse.find((item: any) => item._id === parentId)
    const formData = {
      id: parent._id,
      category_name: parent.category_name,
      image: parent.image,
      is_parent: true,
      status: "Active"

      // parent_id : parent._id
    }
    setFormData(formData)
    setPreview(parent.image)
    setIsEdit(true)
    setIsParent(true)
  };

  const handleChildClick = (childId: any) => {
    const categoriesResponse = categoriesData.getAllCategory.response
    let selectedParent: any = null;
    let selectedChild: any = null;

    // Iterate through the parents to find the child and its corresponding parent
    categoriesResponse.forEach((parent: { children: any[]; }) => {
      const child = parent.children.find((child) => child._id === childId);
      if (child) {
        selectedParent = parent;
        selectedChild = child;
      }
    });

    // setSelectedParent(selectedParent); // Update parent state
    // setSelectedChild(selectedChild); // Update child state
    const formData = {
      id: selectedChild._id,
      category_name: selectedChild.category_name,
      image: selectedChild.image,
      is_parent: false,
      parent_id: selectedParent._id,
      status: "Active"
    }
    setFormData(formData)
    setPreview(selectedChild.image)
    setIsParent(false)
    setIsEdit(true)
  };
  const deleteCategory = async () => {
    try {
      setLoader(true);

      await deleteCategoryData({ variables: { data: { id: formData.id } } })
      await refetch();
      toast.success("Success! The operation completed successfully.");
    } catch (e) {
      // alert("Ann error occured please try again later")
      toast.error("Error! Something went wrong.");
    } finally {
      setLoader(false)
    }
  }
  const reset = () => {
    const formData = {
      category_name: "",
      image: "",
      is_parent: true,
    }
    setIsEdit(false)
    setIsParent(false)
    setFormData(formData)
    setPreview("")
  }
  return (
    <>
      {loader &&
        <LoaderHorse />
      }
      <ManageCategoryCss>

        <Container maxWidth="lg">
          <Grid2 container>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <AdminSideBarComponent page={"category"} />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 9 }}>
              <Grid2 container>
                <Grid2 size={{ xs: 12, md: 9 }} sx={{ pt: 4, pl: 4 }}>
                  <div>
                    <Typography className="title">Manage Categories</Typography>
                    <StyledHR wid12 />
                  </div>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 3 }} sx={{ pt: 4, pl: 4 }}>
                  <Typography className="addBtn" onClick={reset}>Add Category</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 3 }}>
                  <CategoryDragTable>

                    <DragDropContext onDragEnd={onDragEnd}>
                      {Object.values(data.parents).map((parent: any) => (
                        <div
                          key={parent.id}
                          style={{
                            padding: "10px",
                          }}
                        >
                          {/* Parent Click */}
                          <div
                            className="parentContent"
                            onClick={() => {
                              handleParentClick(parent.id);
                              toggleDropdown(parent.id);
                            }}
                          >
                            <span>{parent.title}</span>
                            <span className="arrow">{expanded[parent.id] ? "▲" : "▼"}</span>
                          </div>

                          {expanded[parent.id] && (
                            <Droppable droppableId={parent.id}>
                              {(provided) => (
                                <div
                                  className="child"
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                >
                                  {parent.children.map((childId: any, index: number) => (
                                    <Draggable
                                      key={childId.id}
                                      draggableId={childId.categoryName}
                                      index={index}
                                    >
                                      {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            ...provided.draggableProps.style,
                                          }}
                                          // Child Click
                                          onClick={() => handleChildClick(childId.id)}
                                        >
                                          {childId.categoryName}
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          )}
                        </div>
                      ))}
                    </DragDropContext>
                  </CategoryDragTable>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 9 }} sx={{ padding: "20px" }}>
                  <Typography variant='h6' className="categoryTitle">Category Title</Typography>
                  <TextInputComponent wid100={true} change={changeFunction} name="category_name" value={formData.category_name} placeholder="Category Title" />
                  {errors.category_name && <p style={{ color: "red", fontSize: "12px" }} className="marNone">{errors.category_name}</p>}

                  <Typography variant='h6' className="categoryTitle">Image</Typography>
                  <ImageInput onClick={handleDivClick}><input type="file" name="image" onChange={changeFunction} placeholder="Image" style={{ display: "none" }} ref={fileInputRef} /><AddOutlinedIcon className="icon" /></ImageInput>
                  {errors.image && <p style={{ color: "red", fontSize: "12px" }} className="marNone">{errors.image}</p>}
                  {preview &&
                    <ImagePreview>
                      <img
                        src={preview}
                        style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '10px' }}
                      />
                    </ImagePreview>
                  }
                  {!isParent &&
                    <>
                      <Typography variant='h6' className="categoryTitle">Category Type</Typography>
                      <div className="d_flex">
                        <SelectInput wid100 onChange={changeFunction} name="parent_id" value={formData.parent_id}>
                          <option value="" disabled>Select type</option>
                          <option value="none">Parent</option>

                          {parentOptions.map((option: any) => (
                            <option key={option.id} value={option.id}>
                              {option.title}
                            </option>
                          ))}
                        </SelectInput>
                        {/* {isEdit && 
                  <Typography variant='h6' className = "deleteContent">Delete</Typography> 
                } */}
                      </div>
                    </>
                  }
                  {isEdit &&
                    <>
                      <Typography variant='h6' className="categoryTitle">Status</Typography>

                      <SelectInput wid100 onChange={changeFunction} name="status" value={formData.status}>
                        <option value="" disabled>Select Status</option>
                        <option value="Active">Active</option>
                        <option value="InActive">In-Active</option>

                        {parentOptions.map((option: any) => (
                          <option key={option.id} value={option.id}>
                            {option.title}
                          </option>
                        ))}
                      </SelectInput>
                    </>
                  }
                  <Box sx={{ display: "flex", marginTop: "10px" }}>
                    <Button saveBtn onClick={submit}>{isEdit ? "Update" : "Save"}</Button>
                    <Button cancelBtn onClick={isEdit ? deleteCategory : reset}>{isEdit ? "Delete" : "Cancel"} </Button>
                  </Box>
                </Grid2>
              </Grid2>
            </Grid2>
            {/* <div>ManageCategory</div> */}
          </Grid2>
        </Container>
      </ManageCategoryCss>
    </>
  )
}
