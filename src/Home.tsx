import { Box } from '@mui/material';
import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Home() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <>
      <Box className='relative'>
        <Carousel containerClass="container h-80 pb-6" itemClass="h-full" sliderClass='h-full' arrows={false} renderDotsOutside={true} responsive={responsive} showDots={true}>
          <div className='bg-primary h-full'>Item 1</div>
          <div className='bg-purple-400  h-full'>Item 2</div>
          <div className='bg-pink-600  h-full'>Item 3</div>
          <div className='bg-blue-700  h-full'>Item 4</div>
        </Carousel>
      </Box>

    </>
  )
}
