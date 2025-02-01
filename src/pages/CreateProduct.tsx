/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, InputNumber, Select } from "antd";
import { toast } from "sonner";
import { useCreateProductMutation } from "../app/fetchers/product/productApi";
interface ProductFormProps {
    name: string;
    brand: string;
    price: number;
    category: string;
    inStock: boolean;
    quantity: number;
    description: string;
    image: string
}

const ProductForm = () => {
    const [addNewProduct] = useCreateProductMutation();

    const onFinish = async (values: ProductFormProps) => {
        const information: ProductFormProps = { ...values, inStock: true };

        try {
            // Await the mutation result
            const res = await addNewProduct(information).unwrap();

            // Handle successful response
            if (res?.success) {
                toast.success(res?.message); // Display success message
            }
        } catch (error: any) {
            toast.error(error?.data?.message)
        }
    };


    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-[70%] p-10 z-10 shadow-md rounded-lg bg-white">
                <h1 className="text-bold text-4xl my-10">Add New Product</h1>
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: "Please upload an image!" }]}
                    >
                        <Input placeholder="Image URL Link" />
                    </Form.Item>
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: "Please enter the product name!" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Brand"
                            name="brand"
                            rules={[{ required: true, message: "Please select a category!" }]}
                        >
                            <Select>
                                <Select.Option value="Trek">Trek</Select.Option>
                                <Select.Option value="Giant">Giant</Select.Option>
                                <Select.Option value="Specialized">Specialized</Select.Option>
                                <Select.Option value="Cannondale">Cannondale</Select.Option>
                                <Select.Option value="Scott">Scott</Select.Option>
                                <Select.Option value="Santa Cruz">Santa Cruz</Select.Option>
                                <Select.Option value="Bianchi">Bianchi</Select.Option>
                                <Select.Option value="Cervélo">Cervélo</Select.Option>
                                <Select.Option value="Yeti">Yeti</Select.Option>
                                <Select.Option value="Merida">Merida</Select.Option>
                            </Select>
                        </Form.Item>

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4">
                        <Form.Item
                            label="Price ($)"
                            name="price"
                            rules={[{ required: true, message: "Please enter the price!" }]}
                        >
                            <InputNumber min={0} style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item
                            label="Quantity"
                            name="quantity"
                            rules={[{ required: true, message: "Please enter the quantity!" }]}
                        >
                            <InputNumber min={0} style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item
                            label="Category"
                            name="category"
                            rules={[{ required: true, message: "Please select a category!" }]}
                        >
                            <Select>
                                <Select.Option value="Road Bikes">Road Bikes</Select.Option>
                                <Select.Option value="Mountain Bikes">Mountain Bikes</Select.Option>
                                <Select.Option value="Hybrid Bikes">Hybrid Bikes</Select.Option>
                                <Select.Option value="Electric Bikes">Electric Bikes</Select.Option>
                                <Select.Option value="Folding Bikes">Folding Bikes</Select.Option>
                                <Select.Option value="Cruiser Bikes">Cruiser Bikes</Select.Option>
                                <Select.Option value="BMX Bikes">BMX Bikes</Select.Option>
                                <Select.Option value="Track Bikes">Track Bikes</Select.Option>
                                <Select.Option value="Touring Bikes">Touring Bikes</Select.Option>
                                <Select.Option value="Kids Bikes">Kids Bikes</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: "Please enter the description!" }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item>
                        <div className="mx-auto w-[50%]">
                            <Button className="w-full" type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>

    );
};

export default ProductForm;