import { Button } from 'antd';
import { useState } from 'react';
import { toast } from 'sonner';
import { userCurrentInformation } from '../../app/fetchers/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import '../../style/Card.css';
import { product } from '../../types/globalTypes';
import { addToCart } from '../../app/fetchers/product/productSlice';
import { Link } from 'react-router-dom';

function Card({ item }: { item: product }) {
    const [isHovered, setIsHovered] = useState(false);
    const user = useAppSelector(userCurrentInformation)
    const dispatch = useAppDispatch()

    const addToCartProduct = (product: product) => {
        if (!user) {
            return toast.error('Please log in to add products to your cart.');
        }
        dispatch(addToCart(product))
    }
    return (
        <div
            className="max-w-sm mt-5 mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="px-6 py-4">
                <div className="w-[280px] h-[250px] mx-auto">
                   <Link to={`/${item._id}`}> <img src={item?.image} alt="image" className="w-full h-full object-cover" /></Link>
                </div>
                <Link to={`/${item._id}`}><div className="font-bold text-xl mb-2">{item.name}</div></Link>
                <div className='flex justify-between items-center'>
                    <p className={item?.quantity === 0 ? "text-red-500 font-bold my-1" : "text-green-700 font-bold my-1"}>
                        {item?.quantity === 0 ? "Out of Stock" : `Stock: ${item?.quantity}`}
                    </p>

                    <p className='font-bold my-1'>Price:{item.price}</p>
                </div>
                <Button type="primary" onClick={()=>addToCartProduct(item)} disabled={item.quantity === 0}>Add To Cart</Button>
            </div>

            {/* Smooth Transition for Description */}
            <div
                className={`px-6 py-4 bg-gray-100 overflow-hidden transition-all duration-500 ease-in-out ${isHovered ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}
            >
                <div>
                    <p className="text-gray-700 text-base">
                    {item?.description?.slice(0, 200) || "No description available"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Card;
