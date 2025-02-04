import { Button, Form, Input } from "antd";
import { useState } from "react";
import Container from "../components/ui/Container";
import CartComponent from "../components/CartComponent";

// ✅ Rename to avoid conflict with built-in FormData
export type ShippingFormData = {
    fullName: string;
    phone: string;
    address: string;
    address2: string;
};

function CheckOut() {
    const [formData, setFormData] = useState<ShippingFormData | null>(null);

    const onFinish = (values: ShippingFormData) => {
        setFormData(values);
    };

    return (
        <>
            <div className="bg-gray-200 h-[40vh] flex justify-center items-center uppercase text-4xl md:text-6xl lg:text-8xl font-bold">Payment</div>
            <Container>
                <div className="grid mt-5 grid-cols-1 md:grid-cols-2 mx-auto items-center">
                    <div className="shadow" style={{ padding: "20px" }}>
                        <h2 className="text-2xl font-bold text-blue-950">Shipping Address</h2>
                        <div className="m-5">
                            <Form
                                className="mt-5"
                                name="userForm"
                                onFinish={onFinish}
                                layout="vertical"
                                initialValues={{
                                    fullName: "John Doe",
                                    phone: "1234567890",
                                    address: "123 Main Street, Cityville",
                                    address2: "Apt 4B",
                                }}
                            >
                                <Form.Item
                                    label="Full Name"
                                    name="fullName"
                                    rules={[{ required: true, message: "Please input your full name!" }]}
                                >
                                    <Input size="large" />
                                </Form.Item>

                                <Form.Item
                                    label="Phone"
                                    name="phone"
                                    rules={[{ required: true, message: "Please input your phone number!" }]}
                                >
                                    <Input size="large" />
                                </Form.Item>

                                <Form.Item
                                    label="Address"
                                    name="address"
                                    rules={[{ required: true, message: "Please input your address!" }]}
                                >
                                    <Input size="large" />
                                </Form.Item>

                                <Form.Item label="Address Line 2" name="address2">
                                    <Input size="large" />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <div>
                        <CartComponent shippingData={formData} />
                    </div>
                </div>
            </Container>
        </>
    );
}

export default CheckOut;