import { Box, Divider } from '@mui/material';
import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './home.css'
import bannerImg from './assets/images/banner.png';
import enthiCollection from './assets/images/enthic_collection.png';
import festivalImg from './assets/images/festival_sale.png';
import bageImg from './assets/images/icons/badge.png';
import payementImg from './assets/images/icons/payment.png';
import dayReturnImg from './assets/images/icons/day_return.png';
import SectionHeader from './Components/Header/SectionHeader';
import { ProductCardSlider, RatingsSlider } from './Components/Slider';
import { LargeButtonArrow } from './Components/Buttons/Buttons';

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
        <Carousel containerClass="h-80 pb-7" itemClass="h-full" sliderClass='h-full' arrows={false} renderDotsOutside={true} responsive={responsive} showDots={true}>
          <div className='h-full'>
              <img src={bannerImg} alt='banner images' className='h-full w-full' />
          </div>
          <div className='h-full'>
            <img src={bannerImg} alt='banner images' className='h-full w-full' />
          </div>
          <div className='h-full'>
            <img src={bannerImg} alt='banner images' className='h-full w-full' />
          </div>
        </Carousel>
      </Box>
      <Box className='section'>
        <SectionHeader classStyles='mb-4' title='Explore Products' />
        <ProductCardSlider products={[]} />
      </Box>
      <Box className='section'>
        <SectionHeader classStyles='mb-4' title='New Arrivals' />
        <ProductCardSlider products={[]} />
        <div className='viewMore'>
            <LargeButtonArrow />
        </div>
      </Box>
      <Box className='section'>
        <SectionHeader classStyles='mb-4' title='Top Selling Products' />
        <ProductCardSlider products={[]} />
        <div className='viewMore'>
            <LargeButtonArrow />
        </div>
      </Box>
      <div className='h-96 relative bg-cover bg-no-repeat my-4' style={{ 
        backgroundImage: `url(${festivalImg})`
      }}>
      </div>
      <Box className='section'>
        <SectionHeader classStyles='mb-4' title='Clearance sale' />
        <ProductCardSlider products={[]} />
      </Box>
      <Box className='my-16 relative h-96'>
          <div className='absolute bottom-0 h-80 w-full'>
            <div className='h-full relative overflow-hidden' style={{ background: 'linear-gradient(to right, #F6D41C, #F68B29)' }}>
                <div className='bg-primary absolute h-48 w-48 rounded-full -top-16 -left-16'></div>
                <div className='bg-primary absolute h-8 w-8 rounded-full top-7' style={{ left: '56%' }}></div>
                <div className='bg-primary absolute h-48 w-48 rounded-full -bottom-24' style={{ left: '45%' }}></div>
                <div className='absolute h-52 w-52 rounded-full -bottom-12 -right-14' style={{ background: '#F6D41C' }} ></div>
            </div>
          </div>
          <div className='absolute overflow-hidden top-0' style={{ height: '450px', width: '48%', transform: 'translate(12%,-14.5%)'}}>
            <img src={enthiCollection} alt='ethnic collection' className='w-full top-0'  />
          </div>
      </Box>
      <Box className='section space-y-7'>
        <div className='grid grid-cols-3 gap-3'>
          <div className='step-action-div'>
            <img src={bageImg} alt='badge' />
            <h5>Premium Quality</h5>
            <p>All the clothing products are made from 100% premium quality fabric.</p>
          </div>
          <div className='step-action-div'>
            <img src={payementImg} alt='payment' />
            <h5>Secure Payments</h5>
            <p>Highly Secured SSL-Protected Payment Gateway.</p>
          </div>
          <div className='step-action-div'>
            <img src={dayReturnImg} alt='day_return' />
            <h5>7 Days Return</h5>
            <p>Return or exchange the orders within 7 days of delivery.</p>
          </div>
        </div>
        <Divider sx={{ borderWidth: 1 }} />
      </Box>
      <Box className='section'>
         <div className='flex justify-center'>
            <SectionHeader classStyles='mb-4' title='Let’s see How much love we got!' />
         </div>
         <div className='grid grid-cols-4 mt-4'>
            <div className='flex flex-col justify-center space-y-3'>
              <p className='font-medium text-xl mb-0'>Our customers</p>
              <div>
                <span className='font-medium text-4xl'>
                    <span className='text-primary'>4.5</span>/5
                </span>
                <p className='text-xs'>Based on 3768 reviews</p>
              </div>
              <button className='flex items-center justify-center text-xs p-1.5 px-3 border border-primary rounded mt-3 w-fit'>
                <span>
                  Leave your Review
                </span>
              </button>
            </div>
            <div className='col-span-3'>
              <div className='bg-primary py-5 px-4'>
                <RatingsSlider ratings={[]} />
              </div>
            </div>
         </div>
      </Box>

    </>
  )
}
