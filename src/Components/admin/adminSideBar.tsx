import React from 'react'
import { AdminSideBar } from '../../assets/style/index.ts'
import { useNavigate } from 'react-router-dom'

export default function AdminSideBarComponent(props) {
    const navigate = useNavigate();

    const routerFunction = (url : string) => {
        navigate(url)
    }
  return (
    <div>
                <AdminSideBar>
            <ul>
                <li onClick={() => routerFunction("/admin/manageCategory")} className = {props.page === "category" ? "active" : ""}>ManageCategories</li>
                <li>User Management</li>
                <li onClick={() => routerFunction("/admin/addListing")} className = {props.page === "listing" ? "active" : ""}>Listing Management</li>
                <li>AD Management</li>
                {/* <li></li> */}
            </ul>
        </AdminSideBar>
    </div>
  )
}
