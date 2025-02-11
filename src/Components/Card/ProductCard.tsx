import React from "react";
import { AddShoppingCartOutlined, CurrencyRupee, FavoriteBorderOutlined, Star } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, CardMedia, IconButton } from "@mui/material";

interface ProductCardProps {
  imageSrc: string;
  produtName: string;
  rating: any;
  ratingCount: any;
  actualprice: any;
  originalPrice: any;
}

function ProductCard({ imageSrc, produtName, rating, ratingCount, actualprice, originalPrice }: ProductCardProps) {
  return (
    <Card style={{ boxShadow: "none", borderRadius: 0 }}>
      <CardActionArea
        className="relative shadow-sm !rounded-sm sm:!rounded-md cart-action-area"
        classes={{
          focusHighlight: "!opacity-55 z-10 ",
        }}
        sx={{ "& .MuiTouchRipple-root": { display: "none" } }}
      >
        <CardMedia component="img" image={imageSrc} className="w-full rounded-sm sm:rounded-md" alt="Product Image" />
        <div className="flex flex-col space-y-2 items-center justify-center absolute top-2 sm:top-3 right-2 z-20">
          <IconButton size="small" className="hover:!bg-white card-action-button">
            <FavoriteBorderOutlined className="!text-xs sm:!text-base !fill-white icon-fav" />
          </IconButton>
          <IconButton size="small" className="hover:!bg-white  card-action-button">
            <AddShoppingCartOutlined className="!text-xs sm:!text-base !fill-white icon-cart" />
          </IconButton>
        </div>
      </CardActionArea>
      <CardContent className="text-xs sm:text-sm space-y-0.5 sm:space-y-1 mt-1 sm:mt-1.5" sx={{ "&.MuiCardContent-root": { padding: "6px", backgroundColor: "transparent" } }}>
        <div className="text-xs sm:text-sm">{produtName}</div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-1 items-center">
            <span>
              <CurrencyRupee className="!text-xs sm:!text-sm" />
              <span>{actualprice}</span>
            </span>
            <span className="line-through text-xs text-gray-400">{originalPrice}</span>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-1 text-xs">
              <span className="flex items-center rounded-md bg-primary text-white px-1">
                <Star className="!text-white !text-xs" />
                {rating}
              </span>
              <span>({ratingCount})</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
