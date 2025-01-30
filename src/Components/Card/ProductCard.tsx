import { Card, CardActionArea, CardContent, CardMedia, IconButton } from '@mui/material'
import { Heart, IndianRupee, Star } from 'lucide-react'
import React from 'react'

interface ProductCardProps {
    imageSrc: string,
    produtName: string,
    rating: any,
    ratingCount: any,
    actualprice: any, 
    originalPrice: any
}

function ProductCard({ imageSrc, produtName, rating, ratingCount, actualprice, originalPrice } : ProductCardProps) {
  return (
    <Card style={{ boxShadow: 'none', borderRadius: 0 }}>
        <CardActionArea className='relative shadow-sm'>
            <CardMedia
                component="img"
                image={imageSrc}
                className='w-full rounded-sm'
                alt="Product Image"
            />
            <IconButton size='small' sx={{ '&.MuiIconButton-root': { position: 'absolute', bgcolor: '#fff', border: '1px solid #4747474D' } }} classes={{ root: 'top-1.5 md:top-4 right-1 md:right-3' }}>
                <Heart className='relative' style={{ top: '0.5px', left: '0.3px' }} height={14} width={14} strokeWidth={2}  stroke='#4747474D'/>
            </IconButton>
            {/* <div className='absolute top-4 right-3 ring ring-1 ring-slate-200 bg-white rounded-full p-1'>
                <Heart height={18} width={18} strokeWidth={2}  stroke='gray'/>
            </div> */}
        </CardActionArea>
        <CardContent className='text-sm space-y-2 md:space-y-3 mt-3' sx={{ '&.MuiCardContent-root': { padding: '6px', backgroundColor: 'transparent' } }}>
            <div className='flex flex-col md:flex-row justify-between mb-1 font-medium'>
                <div className='text-xs md:text-sm'>{produtName}</div>
                <div className='hidden md:block'>
                    <div className='flex items-center'>
                        <span className='flex items-center text-sm mr-1.5'>
                            <Star className='mr-1' fill='yellow' height={15} width={15} stroke='none' />
                            {rating}
                        </span>
                        <span className='text-sm'>({ratingCount})</span>
                    </div>
                </div>
            </div>
            <div className='flex justify-start text-xs md:text-sm'>
                <div className='flex items-center mr-1'>
                    <IndianRupee className='mr-0.5' height={12} width={12} />
                    <span className='font-medium' style={{ lineHeight: 0 }}>{actualprice}</span>
                </div>
                <div className='flex items-center line-through text-slate-400'>
                    <IndianRupee height={12} width={12} />
                    <span style={{ lineHeight: 0 }}>{originalPrice}</span>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default ProductCard