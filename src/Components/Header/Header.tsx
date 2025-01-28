import { AppBar, Autocomplete, Box, Button, IconButton, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SparklezLogo } from '../../assets/imageSvg/SparklezLogo';
import { Heart, Search, ShoppingCart } from 'lucide-react';
import Login from '../../Components/Login'
import { getCookie } from 'HelperFunctions/basicHelpers';
import { useNavigate } from 'react-router-dom';
function Header() {
  const navigate = useNavigate()
  const [open , setOpen] = useState<boolean>(false)
  const popClose = () => {
    setOpen(false)
  }
  useEffect(() => {
    setTimeout(() => {
      setOpen(true)
    },5000)
  },[])
  const logOut = () => {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    navigate('/')
  }
  return (
    <>
    {open && <Login loginPopOpen = {open} popClose = {popClose}/> }
    
       <Box className="bg-primary flex flex-grow justify-center p-2 text-sm"> 
         <span className='text-white'>Get Exclusive Offerss !!!</span>
       </Box>
       <Box sx={{ flexGrow : 1 }}>
          <AppBar className='border-b p-3 px-20' elevation={0} sx={{ position: 'relative' }}>
              <div className='grid grid-cols-2'>
                <div className='flex gap-2 items-center'>
                  {SparklezLogo} <span className='text-lg italic'>Li sparklez</span>
                </div>
                <div className='flex items-center justify-end gap-16'>
                  <Autocomplete
                    className='w-3/6'  
                    freeSolo
                    size="small"
                    disableClearable
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '50px', // Adjust the border radius
                        padding: '3px 10px !important'
                      },
                    }}
                    renderOption={() => <p>hi</p>}
                    options={[]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <>
                              {params.InputProps.endAdornment}
                              <Search size={20} />
                            </>
                          ),
                        }}
                        placeholder="Search"
                      />
                    )}
                  />
                  <div className='flex items-center gap-2'>
                    <IconButton>
                      <Heart  size={20} />
                    </IconButton>
                    <IconButton>
                    <ShoppingCart  size={20} />
                    </IconButton>
                    {!getCookie("accessToken") ?
                    <Button sx={{ '&.MuiButton-root': { color: '#000 !important', textTransform: 'capitalize', fontSize: '14px'  } }} size='small' className='text-black lowercase' onClick={() => setOpen((curr) => !curr)}>Login</Button> : <Button sx={{ '&.MuiButton-root': { color: '#000 !important', textTransform: 'capitalize', fontSize: '14px'  } }} size='small' className='text-black lowercase' onClick={() => logOut()}>LogOut</Button>
                    }
                  </div>
                </div>
              </div>
          </AppBar> 
       </Box>
       <Box className='flex items-center justify-around p-3 px-20 border-b text-sm' sx={{ flexGrow: 1 }}>
           <span className='cursor-pointer' role='button'>Home</span>
           <span className='cursor-pointer' role='button'>Kurthis</span>
           <span className='cursor-pointer' role='button'>Tops</span>
           <span className='cursor-pointer' role='button'>T-shirts</span>
           <span className='cursor-pointer' role='button'>Shirts</span>
           <span className='cursor-pointer' role='button'>Jeans</span>
           <span className='cursor-pointer' role='button'>Skirts</span>
           <span className='cursor-pointer' role='button'>Bottom Wears</span>
           <span className='cursor-pointer' role='button'>Loungwear</span>
           <span className='cursor-pointer' role='button'>Shape Wear</span>
       </Box>
    </>
  )
}

export default Header