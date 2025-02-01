import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import { toast } from "sonner";
import { useGetAllProductQuery } from "../app/fetchers/product/productApi";
import { addToCart } from "../app/fetchers/product/productSlice";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { product } from "../types/globalTypes";

const CustomSlider = () => {
    const user = useAppSelector((state) => state?.auth?.user)
    const dispatch = useAppDispatch()
    const { data } = useGetAllProductQuery(undefined)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        doted: false,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    const sliderData = data?.data
    const addToCartProduct = (data: product) => {
        if (!user) {
            return toast.error('Please log in to add products to your cart.');
        }
        dispatch(addToCart(data));
    };
    return (
        <SlickSlider {...settings}>
            {
                sliderData?.map((item, index) => <div key={index} className="px-4 flex justify-center items-center"> {/* Add padding for spacing */}
                    <Card
                        className="bg-transparent! "
                        cover={
                            <img
                                alt="example"
                                src={item.image}
                                className="object-fill h-[250px]"
                            />
                        }
                    >
                        <Meta
                            title={<div className="text-white">{item.name}</div>}
                        />
                        <div className="flex justify-between items-center">
                            <div className="text-white"><b>Stock:{item?.quantity === 0 ? <span className='text-red-500'>out of stock</span> : <span className='text-green-500 mx-2'>{item?.quantity}</span>}</b></div>
                            <div className="text-white">Price:{item.price}</div>
                        </div>
                        <Button onClick={() => addToCartProduct(item)} disabled={item?.quantity === 0} type='primary'><i className="fa-solid fa-cart-shopping"></i> Add To Cart</Button>
                    </Card>
                </div>)
            }
        </SlickSlider>
    );
};

export default CustomSlider;
