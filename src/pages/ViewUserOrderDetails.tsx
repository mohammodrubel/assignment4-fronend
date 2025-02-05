import { useParams } from "react-router-dom"
import { useGetSingleOrderQuery } from "../app/fetchers/order/orderApi"
import { Table } from "antd";
// interface Product {
//     _id: string;
//     name: string;
//     image: string;
//     orderQuantity: number;
//     brand: string;
//     category: string;
//     price: number;
//     inStock: boolean;
//     quantity: number;
//     description: string;
//     createdAt: string;
//     updatedAt: string;
//   }
function ViewUserOrderDetails() {
    const {id} = useParams()
    const {data} = useGetSingleOrderQuery(id as string)
   const maindata = data?.data?.products
   const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (src: string) => <img src={src} alt="product" width={50} height={50} />,
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
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `৳${price.toLocaleString()}`,
    },
    {
      title: "Stock",
      dataIndex: "inStock",
      key: "inStock",
      render: (inStock: boolean) => (inStock ? "In Stock" : "Out of Stock"),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

    return (
        <Table dataSource={maindata} columns={columns} rowKey="_id" />
    )
}

export default ViewUserOrderDetails