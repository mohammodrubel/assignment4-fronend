
import { Button, Select, Table } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useDeleteOrderMutation, useGetAllOrderQuery, useUpdateSingleOrderMutation } from '../app/fetchers/order/orderApi';



const statusOptions = [
    { value: "PENDING", label: "PENDING" },
    { value: "PROCESSING", label: "PROCESSING" },
    { value: "SHIPPED", label: "SHIPPED" },
    { value: "DELIVERED", label: "DELIVERED" },
    { value: "CANCELLED", label: "CANCELLED" },
];


const OrderTable = () => {
    const { isLoading, data } = useGetAllOrderQuery(undefined)
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [deleteOrder] = useDeleteOrderMutation()
    const [updateData] = useUpdateSingleOrderMutation()
    const handleStatusChange = async (value: string, orderId: string) => {
        setLoadingId(orderId);
        try {
            const information: any = {
                mainData: { status: value },
                orderId: orderId
            }
            const res = await updateData(information).unwrap()
            if (res?.success) {
                toast.success(res?.message)
            }
        } catch (error) {

        }
        setLoadingId(null);
    };

    const handleDelete = async(id:string)=>{
        try{
            const res = await deleteOrder(id).unwrap()
            if(res?.success){
                toast.success(res?.message)
            }
        }
        catch(error){
            console.log(error)
        }
    }

    const columns = [

        {
            title: "Customer Name",
            dataIndex: ["customar", "name"],
            key: "customerName",
        },
        {
            title: "Email",
            dataIndex: ["customar", "email"],
            key: "email",
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
            render: (total: number) => `৳${total}`,
        },
        {
            title: "Payment Method",
            dataIndex: "payment_method",
            key: "paymentMethod",
        },
        {
            title: "Payment Status",
            dataIndex: "payment_status",
            key: "payment_status",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string, record: { _id: string }) => (
                <Select
                    value={status}
                    options={statusOptions}
                    onChange={(value) => handleStatusChange(value, record._id)}
                    style={{ width: 150 }}
                    loading={loadingId === record._id}
                />
            ),
        },


        {
            title: "Transaction ID",
            dataIndex: "transaction_id",
            key: "transactionId",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date: string) =>
                new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                }).format(new Date(date)),
        },
        {
            title: "ViewOrder",
            dataIndex: "_id",
            key: "_id",
            render: (link: string) => <Link to={`/dashboard/order/${link}`}>View Order</Link>
        },
        {
            title: "Delete Order",
            render:(data:any)=> <Button onClick={()=>handleDelete(data?._id)}>Delete Order</Button>
        },
    ];


    return (
        <Table
            scroll={{ x: "max-content" }}
            columns={columns}
            dataSource={data?.data}
            rowKey="_id"
            loading={isLoading}
        />
    );
};

export default OrderTable;