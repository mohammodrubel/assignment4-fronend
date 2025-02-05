import { Table } from "antd";
import { useParams } from "react-router-dom";
import { useGetSingleOrderQuery } from "../app/fetchers/order/orderApi";

function ViewOrder() {
    const { id } = useParams()
    const { isLoading, data } = useGetSingleOrderQuery(id!)
    console.log(data)
    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image: string) => <img width={50} src={image} alt="product" />,
        },
        {
            title: "Product Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Brand",
            dataIndex: "brand",
            key: "brand",
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price: number) => `৳${price}`,
        },
        {
            title: "Order Quantity",
            dataIndex: "orderQuantity",
            key: "orderQuantity",
        },
        {
            title: "In Stock",
            dataIndex: "inStock",
            key: "inStock",
            render: (inStock: boolean) => (inStock ? "Yes" : "No"),
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
    ];

    const mainProduct = data?.data?.products

    return (
        <Table scroll={{ x: "max-content" }} columns={columns} dataSource={mainProduct} loading={isLoading} rowKey="_id" />
    )
}

export default ViewOrder