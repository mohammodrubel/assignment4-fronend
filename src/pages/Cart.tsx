import { Button, Input, Table } from "antd";
import { decrementQuantity, incrementQuantity, removeProduct } from "../app/fetchers/product/productSlice";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { product } from "../types/globalTypes";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";


const Cart = () => {
    const token = useAppSelector((state)=> state?.auth?.token)
    const data = useAppSelector((state) => state.products.cartItem)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const handleRemove = (id: String) => {
        dispatch(removeProduct(id))
    }
    useEffect(() => {
        (async () => {
          if (!token) {
            navigate("/");
          }
        })();
      }, [token, navigate]); 
    const incrementHandler = (id: String) => {
        if(!token){
            toast.warning('Please log in to add items to your cart.')
            return
        }
        dispatch(incrementQuantity(id))
    }
    const decrementHandler = (id: String) => {
        if(!token){
            toast.warning('Please log in to add items to your cart.')
            return
        }
        dispatch(decrementQuantity(id))
    }
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
            dataIndex: 'orderQuantity',
            render: (text: number, record: product) => <div className="flex gap-2 items-center">
                {record.quantity >= record.orderQuantity ? <i onClick={() => incrementHandler(record._id)} className="fa-solid fa-plus"></i>
                : <i className="fa-solid fa-plus"></i>    
            }
                <Input style={{ width: '80px' }} min={1} disabled value={text} max={record.quantity} />
               {
                record.quantity >= record.orderQuantity ? <i onClick={() => decrementHandler(record._id)} className="fa-solid fa-minus"></i> :
                <i onClick={() => decrementHandler(record._id)} className="fa-solid fa-minus"></i>
               }
            </div>
        },
        {
            title: "Delete",
            key: "delete",
            render: (_info: number, record: product) => (
                <Button onClick={() => handleRemove(record._id)} color="danger" variant="solid">
                    Remove
                </Button>
            )
        }

    ];

    const totalPrice = data.reduce(
        (acc, item) => acc + item.orderQuantity * item.price,
        0
    );
    const length = data.reduce(
        (acc, item) => acc + item.orderQuantity,
        0
    );


    return (
        <div>
            <div className="bg-gray-200 h-[40vh] flex justify-center items-center uppercase text-4xl md:text-6xl lg:text-8xl font-bold">Cart</div>
            <div className="container mx-auto">
                <Table dataSource={data} scroll={{ x: screenX }} columns={columns} pagination={false} />
                <div className="flex flex-col items-end pt-10 border-t border-gray-100 my-5">
                    <p className="font-medium ">Total Quantity : {length}</p>
                    <p className="font-medium ">Delivery Charge :60 </p>
                    <p className="font-bold ">total Price : {totalPrice}</p>
                    <hr />
                    <p className="font-bold text-2xl  ">Grand Total : {totalPrice + 60} </p>
                    <br />
                    <Button type="primary" disabled={!data.length} variant="solid">
                        <Link to='/checkout'>CheckOut</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
