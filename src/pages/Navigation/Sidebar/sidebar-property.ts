import { Category, List, Inventory } from "@mui/icons-material"

export const sidebarMenu = [
    {
        isList: true, title: 'Website Management', menu : [
            { 
                isNested: true , id:'category',isOpen: false, name: 'Manage Category', icon: Category, subMenu: 
                [
                    { name: 'Master category', icon: List, navigate: '/admin/manageCategory' },
                    { name: 'Sub category', icon: List, navigate: null }
                ] 
            },
            { 
                isNested: true, id:'product', isOpen: false, name: 'Manage Product', icon: Inventory, subMenu: 
                [
                    { name: 'Product', icon: List, navigate: '/admin/manageListings' },
                ] 
            },
        ] 
    },
    {
        isList: true, title: 'Order Management', menu : [
            { 
                isNested: true, id:'order', isOpen: false, name: 'Manage Order', icon: Category, subMenu: 
                [
                    { name: 'Master category', icon: List, navigate: null },
                    { name: 'Sub category', icon: List, navigate: null }
                ] 
            }
        ] 
    },
    {
        isList: true, title: 'User Management', menu : 
            [ 
                { name: 'Manage User', icon: Category, navigate: null }
            ] 
    },
    {
        isList: true, title: 'AD Management', menu : [
            { 
                isNested: true, id:'Ad', isOpen: false, name: 'Manage AD', icon: Category, subMenu: 
                [
                    { name: 'Master category', icon: List, navigate: null },
                    { name: 'Sub category', icon: List, navigate: null }
                ] 
            }
        ] 
    }
]