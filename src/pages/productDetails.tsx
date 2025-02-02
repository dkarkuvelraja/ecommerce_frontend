import React, { useState } from 'react'
// components
import { Box, Divider } from '@mui/material';
import SectionHeader from '../Components/Header/SectionHeader';
import ProductCard from '../Components/Card/ProductCard';
// styles
import './products.css'
// images
import { LargeButtonArrow } from '../Components/Buttons/Buttons';
import { ChartColumnBig } from 'lucide-react';
import { productList } from '../utils';
import { InputNumber } from '../Components/input/InputRange';


export default function ProductDetails() {
  const [activeImg, setActiveImg] = useState(0);
  const [productSize, setProductSize]= useState('s');
  const [productCount, setProductCount] = useState(1);
  const defaultSize = ['s', 'm', 'l', 'xl', 'xxl'];

  const handleAddQuanity = () =>{
     setProductCount((count) => count +1);
  }
  
  const handleRemoveQuanity = () =>{
    if(productCount > 1){
      setProductCount((count) => count-1);
    }
  }

  return (
    <>
      <Box className="section">
         <div className='grid md:grid-cols-2 gap-4 md:gap-0'>
            <div className='flex justify-center md:justify-start gap-4'>
              <div className='flex flex-col gap-4 order-last md:order-first'>
                {
                  productList.slice(0,5).map((item : any, index: number) => {
                    if(activeImg === index) return <></>;
                    return (<img onClick={()=>setActiveImg(index)} className='h-10 md:h-20 rounded-sm cursor-pointer' src={item.src} alt='product' />)
                  })
                }
              </div>
              <div className=''>
                <img className='rounded-sm h-60 md:h-5/6' src={productList[activeImg].src} alt='product' />
              </div>
            </div>
            <div className='p-1 md:p-3'>
              <div className='space-y-4'>
                <div className='space-y-1.5'>
                  <h3 className='text-lg md:text-2xl font-medium'>Trendy yellow kurthi</h3>
                  <p className='text-xs'>A vibrant yellow kurthi that radiates warmth and elegance, perfect for adding a cheerful touch to any occasion. Its lightweight fabric ensures comfort while maintaining a stylish, contemporary look.</p>
                </div>
                <div>
                  <ul className='flex space-x-2'>
                    <li>₹ 640</li>
                    <li className='space-x-1'><span className='line-through text-gray-400'>₹999</span><span className='text-red-700'>(30% off)</span></li>
                  </ul>
                </div>
                <div className='flex items-center'>
                  <div className='font-medium text-xs md:text-sm mr-2'>Size :</div>
                  <ul className='productSize'>
                    {defaultSize.map((size) => (
                      <li onClick={()=>setProductSize(size)} className={`${size === productSize ? 'active' : ''}`}>{size}</li>
                    ))}
                  </ul>
                </div>
                <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-7 text-xs md:text-sm'>
                  <div className='flex items-center'>
                    <div className='font-medium mr-2'>Quanity :</div>
                    <div>
                      <InputNumber value={productCount} addQuanity={handleAddQuanity} removeQuanity={handleRemoveQuanity} />
                    </div>
                  </div>
                  {/* <div className='flex items-center'>
                    <div className='font-medium mr-2'>Size Chart :</div>
                    <div><ChartColumnBig height={14} width={14} stroke='#F68B29' /></div>
                  </div> */}
                </div>
                <div className='flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0'>
                  <button className='px-8 p-2 border border-primary rounded-md text-sm'>Add to cart</button>
                  <button className='bg-primary text-white px-8 p-2 border border-primary rounded-md text-sm'>Buy Now</button>
                </div>
                <div>
                  <p className='text-xs'><span className='font-medium'>Estimated Delivery :</span> 23th Dec - 26th Dec</p>
                </div>
              </div>
            </div>
         </div>
      </Box>
      <Box className='section'>
          <div className='border rounded p-4 space-y-5 pb-6'>
            <section className='space-y-3'>
              <div>
                <h3 className='text-md font-medium'>Product Details</h3>
                <span className='border-b-2 border-primary block mt-2 w-20'></span>
              </div>
              <div className='space-y-2.5'>
                <p className='text-xs'>Made from high-quality fabrics, our kurtis ensure both comfort and style, making them ideal for all-day wear. Whether you're attending a festive celebration, a formal event, or simply want to elevate your everyday look, our versatile kurtis are the perfect choice.</p>
                <ul className='text-sm space-y-2'>
                  <li><span className='font-medium'>Pattern :</span><span>Salwar set</span></li>
                  <li><span className='font-medium'>Fabric :</span><span>Soft cotton Kurti</span></li>
                  <li><span className='font-medium'>Height :</span><span>52 inch</span></li>
                  <li><span className='font-medium'>Pant Height :</span><span>36 inch</span></li>
                  <li><span>Salwar Set (Kurti + Pant + Dupatta)</span></li>
                </ul>
              </div>
            </section>
            <Divider sx={{ borderWidth: 1 }} />
            <section className='space-y-3'>
              <div>
                <h3 className='text-md font-medium'>Shipping & Returns</h3>
                <span className='border-b-2 border-primary block mt-2 w-20'></span>
              </div>
              <div>
                <ul className='text-sm space-y-1.5'>
                  <li><span className='font-medium'>Delivery :</span></li>
                  <li><span>Dispatch :</span><span>Within 1-3 days</span></li>
                  <li><span>Delivery time :</span><span>1-5* business days</span></li>
                </ul>
              </div>
              <div>
              <p className='text-sm'><span className='font-medium'>Returns :</span>While unpacking the product, Kindly capture a video(without pause) of the opening of the product. This helps in making the initiation of a return if in case you are receiving a damaged product. Please note that a return will only be initiated with the opening video. Requesting to please understand and cooperate.</p>
              </div>
            </section>
          </div>
      </Box>
      <Box className='section'>
        <SectionHeader classStyles='mb-4' title='Related Products' />
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 py-5 mb-5'>
          {
            productList.map((item: any)=> (
              <ProductCard imageSrc={item.src} produtName={"Slim Fit T-Shirt"} rating={4.3} ratingCount={470} actualprice={500} originalPrice={700} />
            ))
          }
        </div>
        <div className='flex justify-center w-100'>
          <LargeButtonArrow />
        </div>
      </Box>
    </>
  )
}
