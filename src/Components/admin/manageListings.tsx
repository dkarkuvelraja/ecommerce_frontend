import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Grid2, TablePagination, Typography } from '@mui/material';
import AdminSideBarComponent from './adminSideBar';
import { useQuery } from '@apollo/client';
import { GET_ALL_LISTINGS } from 'apollo/query';
import { useEffect, useState } from 'react';
import { SortIcon } from 'assets/imageSvg/sortIcon';
import { Button, StyledHR } from 'assets/style';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function ManageListings() {
    const [variables, setVariables] = useState<any>({
        orderBy: { field: "likes", order: 1 },
        limit: 5,
        skip: 0,
      });
      const [apiDataCount,setApiDataCount] = useState(0)
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(5);
      const [totalCount, setTotalCount] = useState(0);
      const navigate = useNavigate();
    const [rows,setRows] = useState<any>()
      const { data, loading, error, refetch } = useQuery(GET_ALL_LISTINGS, {
        variables,
      });
  useEffect(() => {
    if(data){
        
        console.log("allCategories",data.getAllProductAdminTable )
        setRows(data.getAllProductAdminTable.responce)
        setTotalCount(data.getAllProductAdminTable.count)
    }
  },[data]) 
  const sort = (type : string) => {
    setVariables((prev : any) => ({
        ...prev,
        limit: 20, // Example: Change limit to 20
        orderBy: { field: type, order: variables.orderBy.field === type ?  variables.orderBy.order === 1 ? -1 : 1 : -1 }, // Example: Change sorting
      }));
  
      // Trigger refetch with the updated variables
      refetch();
  }
  function handleEditClick(id: any): void {
    navigate(`/admin/addlisting/${id}`); // Navigate to the addlisting page with ID
  }
    const handleChangeRowsPerPage = (event : any) => {
      console.log("eeeeeeeeeeeeee",event.target)
    setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
    setVariables((prev : any) => ({...prev,limit : parseInt(event.target.value)}) )
    refetch();
  };
  const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
    console.log("eeeeeeeeeeeeee123",newPage)
    setVariables((prev : any) => ({...prev,skip : newPage}) )
    refetch();

    setPage(newPage);
  };
  const handleTotalCountChange = (event : any) => {
    const changes = {
      orderBy: { field: "likes", order: 1 },
      limit: 10,
      skip: 0,
    }
    setVariables((prev : any) => ({...prev,limit : parseInt(event.target.value)}) )
    refetch();

    setTotalCount(parseInt(event.target.value, 10));
    // Logic to fetch data with the new total count can be added here
  };
  const handleAddFields = () => {
navigate("/admin/addlisting")
  }
// const handleEditClick = (id) => {
//   };
  return (
    <Container maxWidth = "lg">
    <Grid2 container>
        <Grid2 size={{ xs: 12, md: 3 }}>
      <AdminSideBarComponent page = {"listing"}/>
        </Grid2>
                
        <Grid2 size = {{xs: 12,md: 9}}>

        <Grid2  size = {{xs: 12, md : 12}}  sx = {{pt : 4,pl: 4,display : "flex",justifyContent: "space-between",alignItems: "center"}}>
                <div>
                <Typography className = "title">Listing Management</Typography>
                <StyledHR wid12/>
                </div>
<Button  cancelBtn onClick={handleAddFields}> + Add Listing</Button>
                </Grid2>
        <Grid2 size = {{xs: 12, md : 2}}  sx = {{pt : 4,pl: 4}}>
</Grid2>
        <TableContainer style={{boxShadow : "none",padding : "20px"}} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell onClick={() => sort("title")}><strong style={{display : "flex"}}>Title <span style={{marginTop : "5px",marginLeft : "5px"}}>{SortIcon}</span></strong></TableCell>
            <TableCell align="center" onClick={() => sort("category_name")}><strong style={{display : "flex"}}>Category Name <span style={{marginTop : "5px",marginLeft : "5px"}}>{SortIcon}</span></strong></TableCell>
            <TableCell align="center" onClick={() => sort("Likes")}><strong style={{display : "flex"}}>Likes <span style={{marginTop : "5px",marginLeft : "5px"}}>{SortIcon}</span></strong></TableCell>
            <TableCell align="center" onClick={() => sort("Sold Out Count")}><strong style={{display : "flex"}}>Sold Out Count <span style={{marginTop : "5px",marginLeft : "5px"}}>{SortIcon}</span></strong></TableCell>
            <TableCell align="center" onClick={() => sort("Total Available Count")}><strong style={{display : "flex"}}>Total Available Count <span style={{marginTop : "5px",marginLeft : "5px"}}>{SortIcon}</span></strong></TableCell>
            
            {/* <TableCell align="center"><strong>Likes</strong></TableCell>
            <TableCell align="center"><strong>Sold Out Count</strong></TableCell>*/}
            <TableCell align="center"><strong>Actions</strong></TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row : any, index : number) => (
            <TableRow key={index}>
              <TableCell>{row.title}</TableCell>
              <TableCell align="center">{row.category_name || "N/A"}</TableCell>
              <TableCell align="center">{row.likes}</TableCell>
              <TableCell align="center">{row.sold_out_count}</TableCell>
              <TableCell align="center">{row.total_available_count}</TableCell>
              <TableCell align="center" style={{ width: "150px", minWidth: "150px",cursor : "pointer" }} onClick={() => handleEditClick(row._id)}><EditIcon/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
            rowsPerPageOptions={[5, 10, 20,30,50]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
    </Grid2>
    </Grid2>
    </Container>
  );
}