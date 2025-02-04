import { Button, Input } from "antd";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../app/fetchers/product/productApi";
import { addToCart, decrementQuantity } from "../app/fetchers/product/productSlice";
import { useAppDispatch } from "../app/hook";

// Define product type
interface Product {
    _id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    inStock: boolean;
    description: string;
    orderQuantity: number;
}

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Ensure correct TypeScript type
    const { data } = useGetSingleProductQuery(id);
    const dispatch = useAppDispatch();

    // Safely extract product data
    const singleProduct: Product | undefined = data?.data;

    const decrementHandler = (id: string) => {
        dispatch(decrementQuantity(id));
    };

    const addToCartHandler = (product: Product) => {
        dispatch(addToCart(product));
    };

    if (!singleProduct) return <p>Loading...</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="relative">
                    <img
                        src={singleProduct.image}
                        alt={singleProduct.name}
                        className="w-full h-auto object-contain"
                    />
                </div>

                {/* Product Details */}
                <div className="space-y-6 shadow p-10">
                    <h1 className="text-3xl font-bold text-[#2cb1ec]">{singleProduct.name}</h1>

                    <div className="space-y-2">
                        <p className="text-2xl text-green-700">Price: {singleProduct.price} Tk</p>
                        <p className="text-2xl">
                            Stock:{" "}
                            {singleProduct.quantity === 0 ? (
                                <span className="font-bold text-red-500">Stock not available</span>
                            ) : (
                                singleProduct.quantity
                            )}
                        </p>
                    </div>

                    {/* Add to Cart Section */}
                    <div className="flex space-x-4">
                        <div className="flex gap-2">
                            <Button
                                type="primary"
                                disabled={singleProduct.quantity === 0}
                                onClick={() => addToCartHandler(singleProduct)}
                            >
                                <i className="fa-solid fa-plus"></i>
                            </Button>

                            <Input style={{ width: "80px" }}  disabled value={singleProduct.orderQuantity} />
                            <Button
                                type="primary"
                                disabled={singleProduct.quantity === 0}
                                onClick={() => decrementHandler(singleProduct._id)}
                            >
                                <i className="fa-solid fa-minus"></i>
                            </Button>
                        </div>
                        <Button
                            onClick={() => addToCartHandler(singleProduct)}
                            disabled={singleProduct.quantity === 0}
                            type="primary"
                            className="flex-1 py-2 px-4 rounded-md"
                        >
                            BUY NOW
                        </Button>
                    </div>

                    {/* Benefits */}
                    <div className="grid grid-cols-3 gap-4 py-8">
                        {[
                            { label: "FREE DELIVERY", icon: "M5 13l4 4L19 7" },
                            { label: "30 DAY TRIAL", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
                            { label: "FREE RETURNS", icon: "M3 3h18v18H3z M16 8l-8 8 M8 8l8 8" }
                        ].map(({ label, icon }, index) => (
                            <div key={index} className="text-center space-y-2">
                                <div className="w-12 h-12 mx-auto text-[#2cb1ec]">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
                                        <path d={icon} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <p className="font-semibold text-sm">{label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Customer Support */}
                    <div className="flex items-center space-x-3 text-gray-600">
                        <p className="font-medium text-gray-800">{singleProduct.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
