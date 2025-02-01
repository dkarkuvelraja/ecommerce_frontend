import React from "react";
// components
import { Box, Divider } from "@mui/material";
import ProductCard from "../Components/Card/ProductCard";
// styles
import "./products.css";
import { productList } from "utils";

export default function Products() {
  return (
    <>
      <div className="bg-primary text-white p-3 text-center">
        <h2 className="text-2xl font-medium">Kurthis</h2>
      </div>
      <Box className='section grid grid-cols-3 md:grid-cols-4 gap-4'>
        <div className="flex flex-col">
            <div className="flex justify-between mb-3">
                <h3 className="text-lg font-medium">Filters</h3>
                <span className="text-primary cursor-pointer select-none">Reset</span>
            </div>
            <Divider />
        </div>
        <div className="col-span-2 md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            {
                productList.map((item)=>(
                    <ProductCard imageSrc={item?.src} produtName={"Slim Fit T-Shirt"} rating={4.3} ratingCount={470} actualprice={500} originalPrice={700} />
                ))
            }
        </div>
      </Box>
    </>
  );
}
