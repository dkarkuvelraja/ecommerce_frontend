import { Box, Container, Grid2, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AdminSideBar, Button, CategoryDragTable, ImageInput, ImagePreview, ManageCategoryCss, SelectInput, StyledHR } from '../../assets/style/index'
import TextInputComponent from './fieldInputs/TextInput';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_CATEGORY } from '../../apollo/mutation';
import AdminSideBarComponent from './adminSideBar';
import { GET_ALL_CATEGORIES } from '../../apollo/query';
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
    // const [getAllCategory] = useQuery(GET_ALL_CATEGORIES)
    const [preview, setPreview] = useState<any>("");
    const [expanded, setExpanded] = useState<any>({ kids: true, adults: false, elders: false });
    const [formData,setFormData] = useState<any>({
      category_name: "",
      image: {},
      is_parent: true,
    });
    const { data: categoriesData, loading, error } = useQuery(GET_ALL_CATEGORIES);
    useEffect(() => {
      if (categoriesData) {
        console.log("Fetched categories:", categoriesData.getAllCategory.response);
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
        setData(parentData)
        console.log("parents",parents)
        // Optionally update local state or do further actions here
        // setData(categoriesData);
      }
    }, [categoriesData]);
    const fileInputRef  = useRef<HTMLInputElement | any>(null);
    const parentOptions = Object.values(initialData.parents).map((parent) => ({
      id: parent.id,
      title: parent.title,
    }));
    const handleDivClick = () => {
      // Trigger the file input's click event
      fileInputRef.current.click();
    };
    const onDragEnd = (result: { source: any; destination: any; }) => {
      const { source, destination } = result;
  
      if (!destination) return;
  
      const sourceParentId = source.droppableId;
      const destParentId = destination.droppableId;
  
      const sourceParent = data.parents[sourceParentId];
      const destParent = data.parents[destParentId];
  
      const draggedChildId = sourceParent.children[source.index];
  
      // Remove child from source parent
      const newSourceChildren = Array.from(sourceParent.children);
      newSourceChildren.splice(source.index, 1);
  
      // Add child to destination parent
      const newDestChildren = Array.from(destParent.children);
      newDestChildren.splice(destination.index, 0, draggedChildId);
  
      // Update state
      setData({
        ...data,
        parents: {
          ...data.parents,
          [sourceParentId]: {
            ...sourceParent,
            children: newSourceChildren,
          },
          [destParentId]: {
            ...destParent,
            children: newDestChildren,
          },
        },
      });
    };
  
    const toggleDropdown = (parentId: string) => {
      setExpanded({ ...expanded, [parentId]: !expanded[parentId] });
    };
    const changeFunction = (e: { target: { files?: any; name?: any; value?: any; }; }) => {
      const { name } = e.target;
  
      if (name === "image") {
        const files = e.target.files; // Corrected from `e.target` to `e.target.files`
        if (files && files.length > 0) {
          const file = files[0]; // Get the first file
          let FileObject : any = {};
      
          const reader = new FileReader(); // Initialize FileReader
          reader.onloadend = () => {
            // FileObject["image_name"] =  file.name; // Store file name
            FileObject["image"] = file; // Store the file object
            console.log("filessss",files)
            // Set preview for the image (Base64 data)
            setPreview(reader.result);
      
            // Update form data with the file object
            setFormData((prev: any) => ({
              ...prev,
              [name]: FileObject, // Dynamically update the field with name "image"
            }));
      
            console.log("FileObject:", FileObject);
          };
      
          reader.readAsDataURL(file); // Read file and trigger `onloadend`
        }
        // console.log("Selected File:", file);
        // const reader : any = new FileReader();
        // reader.onloadend = () => {
        //   setPreview(reader.result); // Set the preview URL
        // };
        // reader.readAsDataURL(file);
        // Update formData with the file object
      } else {
        const { value } = e.target;
        setFormData((prev : any) => ({
          ...prev,
          [name]: value,
        }));
      }
    };
    const submit = async () => {
      console.log("formDarta",formData)
      // delete formData.parent_id;
      const data = await createCategory({
        variables: {
          data: formData,
        },
      });
      // createCategory(formData)
    }
    console.log("formDataaaaa",preview)
  return (
    <>
    <ManageCategoryCss>

    <Container maxWidth = "lg">
    <Grid2 container>
        <Grid2 size={{ xs: 12, md: 3 }}>
      <AdminSideBarComponent page = {"category"}/>
        </Grid2>
        <Grid2 size = {{xs: 12,md: 9}}>
            <Grid2 container>
            <Grid2 size = {{xs: 12, md : 9}}  sx = {{pt : 4,pl: 4}}>
                <div>
                <Typography className = "title">Manage Categories</Typography>
                <StyledHR wid12/>
                </div>
            </Grid2>
            <Grid2 size = {{xs: 12, md : 3}} sx = {{pt : 4,pl: 4}}>
                <Typography className = "addBtn">Add Category</Typography>
            </Grid2>
            <Grid2 size = {{xs : 12,md :3}}>
                <CategoryDragTable>

            <DragDropContext onDragEnd={onDragEnd}>
        {Object.values(data.parents).map((parent : any) => (
          <div
            key={parent.id}
            style={{
              padding: "10px"
            }}
          >
            <div className = "parentContent" onClick={() => toggleDropdown(parent.id)}
            >
              <span>{parent.title}</span>
              <span className = "arrow">{expanded[parent.id] ? "▲" : "▼"}</span>
            </div>
            {expanded[parent.id] && (
             <Droppable droppableId={parent.id}>
             {(provided) => (
               <div
                 className="child"
                 ref={provided.innerRef}
                 {...provided.droppableProps}
               >
                 {parent.children.map((childId : any, index : any) => (
                   <Draggable key={childId} draggableId={childId} index={index}>
                     {(provided) => (
                       <div
                         ref={provided.innerRef}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         style={{
                           ...provided.draggableProps.style,
                         }}
                       >
                         {childId}
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
            <Grid2 size = {{xs : 12,md :9}} sx = {{padding : "20px"}}>
              <Typography variant='h6' className = "categoryTitle">Category Title</Typography>
              <TextInputComponent change = {changeFunction} name = "category_name" value = {formData.category_name} placeholder = "Category Title"/>  
              <Typography variant='h6' className = "categoryTitle">Image</Typography>
              <ImageInput onClick={handleDivClick}><input type = "file" name = "image" onChange = {changeFunction}  placeholder = "Image"  style={{ display: "none" }} ref={fileInputRef}/><AddOutlinedIcon className = "icon"/></ImageInput>
              {preview && 
              <ImagePreview>
              <img
            src={preview}
            style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '10px' }}
          />
              </ImagePreview> 
              }
              <Typography variant='h6' className = "categoryTitle">Category Type</Typography>
              <div className = "d_flex">
              <SelectInput onChange = {changeFunction} value ="parent_id">
                <option value ="" disabled>Select type</option>
                <option value ="none">Parent</option>

                {parentOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
                </SelectInput> 
                  <Typography variant='h6' className = "deleteContent">Delete</Typography>
              </div>
              <Box sx ={{display : "flex",marginTop : "10px"}}>
              <Button saveBtn onClick={submit}>Save</Button>
              <Button cancelBtn>Cancel</Button>
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
