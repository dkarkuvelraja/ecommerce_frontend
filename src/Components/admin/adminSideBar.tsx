import React from 'react'
import { AdminSideBar } from '../../assets/style/index'
import { useNavigate } from 'react-router-dom'

export default function AdminSideBarComponent(props : any) {
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
                <li onClick={() => routerFunction("/admin/manageListings")} className = {props.page === "listing" ? "active" : ""}>Listing Management</li>
                <li>AD Management</li>
                {/* <li></li> */}
            </ul>
        </AdminSideBar>
    </div>
  )
}
