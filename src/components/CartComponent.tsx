import { Button, Input, Table } from "antd";
import { decrementQuantity, incrementQuantity, removeProduct } from "../app/fetchers/product/productSlice";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { product } from "../types/globalTypes";
import Container from "./ui/Container";
import { ShippingFormData } from "../pages/CheckOut";
import { useCreateOrderMutation } from "../app/fetchers/order/orderApi";
interface CartComponentProps {
    shippingData: ShippingFormData | null;
}

const CartComponent: React.FC<CartComponentProps> = ({ shippingData }) => {
    const [createOrder] = useCreateOrderMutation()
    const data = useAppSelector((state) => state.products.cartItem);
    const customar = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();

    const handleRemove = (id: string) => {
        dispatch(removeProduct(id));
    };

    const incrementHandler = (id: string) => {
        dispatch(incrementQuantity(id));
    };

    const decrementHandler = (id: string) => {
        dispatch(decrementQuantity(id));
    };

    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (text: string) => <img src={text} alt="Product" width={50} />,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Brand",
            dataIndex: "brand",
            key: "brand",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price: number) => `৳ ${price}`,
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "In Stock",
            dataIndex: "inStock",
            key: "inStock",
            render: (inStock: boolean) => (inStock ? "Yes" : "No"),
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Order Quantity",
            dataIndex: "orderQuantity",
            key: "orderQuantity",
        },
        {
            title: "Order",
            key: "increment-decrement",
            dataIndex: "orderQuantity",
            render: (text: number, record: product) => (
                <div className="flex gap-2 items-center">
                    <i onClick={() => incrementHandler(record._id)} className="fa-solid fa-plus cursor-pointer"></i>
                    <Input style={{ width: "80px" }} disabled value={text} />
                    <i onClick={() => decrementHandler(record._id)} className="fa-solid fa-minus cursor-pointer"></i>
                </div>
            ),
        },
        {
            title: "Delete",
            key: "delete",
            render: (_info: number, record: product) => (
                <Button onClick={() => handleRemove(record._id)} danger>
                    Remove
                </Button>
            ),
        },
    ];

    const totalPrice = data.reduce((acc, item) => acc + (item.orderQuantity || 0) * item.price, 0);
    const length = data.reduce((acc, item) => acc + (item.orderQuantity || 0), 0);

    const handleSubmit = async() => {
        const modifyData = {
            customar: customar?.id ,
            products: data,
            shippingAddress: shippingData,
            payment_method: "SSLCOMMERZ",
            grandTotal: totalPrice + 60,
            total: totalPrice,
        };
        try{
            const res =await createOrder(modifyData)
            console.log(res)
        }catch(error){
            console.log(error)
        }
    };

    return (
        <Container>
            <Table scroll={{ x: "max-content" }} dataSource={data} className="mt-10" columns={columns} pagination={false} />
            <div className="flex flex-col items-end pt-10 border-t border-gray-100 my-5">
                <p className="font-medium">Total Quantity : {length}</p>
                <p className="font-medium">Delivery Charge : 60</p>
                <p className="font-bold">Total Price : {totalPrice}</p>
                <hr />
                <p className="font-bold text-2xl">Grand Total : {totalPrice + 60}</p>
                <br />
                <Button type="primary" onClick={handleSubmit} disabled={!shippingData || !data.length}>
                    Place Order
                </Button>
            </div>
        </Container>
    );
};

export default CartComponent;
