import React from 'react'
import { useNavigate } from 'react-router-dom'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { sidebarMenu } from './sidebar-property';

export default function AdminSideBarComponent(props : any) {
  const navigate = useNavigate();

  const CustomListItem = ({ key, handleRounte, Icon, listName } : { key: string, handleRounte: string, Icon: any, listName: string }) =>{
    return(
      <ListItem className='!p-2' key={key}>
          <ListItemButton className='!rounded-md hover:!bg-white hover:!text-black hover:shadow-md sidebar-menu' onClick={() => handleRounte !== '' ? navigate(handleRounte) : console.log()} >
            <ListItemIcon className='!min-w-8'><Icon className='icon text-white' /></ListItemIcon>
            <ListItemText className='!flex-initial' sx={{ '& .MuiTypography-root': { fontSize: { sm: '0.875rem' }, width: 'fit-content' } }}>{listName}</ListItemText>
          </ListItemButton>
      </ListItem>
    )
  }

  return (
    <div className='h-full bg-primary text-white rounded-md shadow-sm overflow---scroll'>
      <List>
        {
          sidebarMenu.map((menuitem, index: number) => {
            const key = `menu-item-${index}`;
            return(
              <>
                <CustomListItem key={key} handleRounte={menuitem.navigate} Icon={menuitem.icon} listName={menuitem.name} />
              </>
            )
          })
        }
      </List>
    </div>
  )
}
