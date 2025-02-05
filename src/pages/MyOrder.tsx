import { Table } from "antd";
import { Link } from "react-router-dom";
import { useMyOrderQuery } from "../app/fetchers/myOrder/myOrder";
interface Order {
  _id: string;
  transaction_id: string;
  customar: string;
  grandTotal: number;
  payment_method: string;
  payment_status: string;
  status: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    address2?: string;
  };
  createdAt: string;
}

function MyOrder() {
  const { data } = useMyOrderQuery(undefined)
  const mainData = data?.data
  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transaction_id",
      key: "transaction_id",
    },
    {
      title: "Customer ID",
      dataIndex: "customar",
      key: "customar",
    },
    {
      title: "Grand Total",
      dataIndex: "grandTotal",
      key: "grandTotal",
      render: (total: number) => `$${total.toFixed(2)}`,
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Shipping Address",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      render: (address: Order["shippingAddress"]) =>
        `${address.fullName}, ${address.phone}, ${address.address} ${address.address2 ? ", " + address.address2 : ""}`,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "ViewProduct",
      key: "viewOrder",
      render: (text:Order) => <Link to={text?._id}>View Order</Link>,
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={mainData} rowKey="_id" />
    </>
  )
}

export default MyOrder