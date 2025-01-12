import React from "react";
import Carousel from "react-multi-carousel";
import ProductImage from "../Card/ProductImage";
import productImage from "../../assets/images/products/product-1.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./slider.css";
import RatingCard from "../Card/RatingCard";

interface SliderProps {
  products: any;
}

const LeftArrow = ({ onClick, classStyles }: any) => {
  return (
    <button onClick={() => onClick()} className={`${classStyles}`}>
      <ChevronLeft className="slider-arrow" height={18} width={18} />
    </button>
  );
};

const RightArrow = ({ onClick, classStyles }: any) => {
  return (
    <button onClick={() => onClick()} className={`${classStyles}`}>
      <ChevronRight className="slider-arrow" height={18} width={18} />
    </button>
  );
};

export const ProductCardSlider = ({ products }: SliderProps) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Carousel customLeftArrow={<LeftArrow classStyles={'slider-arrow-button left-0'} />} renderButtonGroupOutside customRightArrow={<RightArrow classStyles={'slider-arrow-button right-0'} />} infinite={true} autoPlay={false} swipeable={true} arrows={true} itemClass="h-full flex justify-center" sliderClass="h-full z-0" responsive={responsive} showDots={false}>
      <ProductImage imageSrc={productImage} produtName={"Slim Fit T-Shirt"} rating={4.3} ratingCount={470} actualprice={500} originalPrice={700} />
      <ProductImage imageSrc={productImage} produtName={"Slim Fit T-Shirt"} rating={4.3} ratingCount={470} actualprice={500} originalPrice={700} />
      <ProductImage imageSrc={productImage} produtName={"Slim Fit T-Shirt"} rating={4.3} ratingCount={470} actualprice={500} originalPrice={700} />
      <ProductImage imageSrc={productImage} produtName={"Slim Fit T-Shirt"} rating={4.3} ratingCount={470} actualprice={500} originalPrice={700} />
      <ProductImage imageSrc={productImage} produtName={"Slim Fit T-Shirt"} rating={4.3} ratingCount={470} actualprice={500} originalPrice={700} />
    </Carousel>
  );
};

interface RatingsSliderProps {
  ratings: any;
}

export const RatingsSlider = ({ ratings }: RatingsSliderProps) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 30
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 20
    },
  };

  return (
    <Carousel partialVisbile={true} customLeftArrow={<LeftArrow classStyles={'rating-arrow-button -left-3'} />} renderButtonGroupOutside customRightArrow={<RightArrow  classStyles={'rating-arrow-button -right-3'}/>} infinite={true} autoPlay={false} swipeable={true} arrows={true} itemClass="h-full flex justify-center" sliderClass="h-full z-0" responsive={responsive} showDots={false}>
      <RatingCard name="Robin" rating={5} message="Looks exactly the same as in the photo" />
      <RatingCard name="Robin" rating={5} message="Looks exactly the same as in the photo" />
      <RatingCard name="Robin" rating={5} message="Looks exactly the same as in the photo" />
      <RatingCard name="Robin" rating={5} message="Looks exactly the same as in the photo" />
      <RatingCard name="Robin" rating={5} message="Looks exactly the same as in the photo" />
      <RatingCard name="Robin" rating={5} message="Looks exactly the same as in the photo" />
    </Carousel>
  );
};
