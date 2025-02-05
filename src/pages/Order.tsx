
import {  Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { useGetAllOrderQuery } from '../app/fetchers/order/orderApi';





const OrderTable = () => {
    const { isLoading, data } = useGetAllOrderQuery(undefined)


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
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={status === "PENDING" ? "orange" : "green"}>{status}</Tag>
            ),
        },
        {
            title: "Payment Status",
            dataIndex: "payment_status",
            key: "payment_status",
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