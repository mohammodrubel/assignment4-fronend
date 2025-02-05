
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../app/fetchers/auth/authApi";

interface ChangePasswordType {
    oldPassword: string;
    newPassword: string;
}


const ChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [changePasswordData] = useChangePasswordMutation()
    const handleSubmit = async (values: ChangePasswordType) => {
        try {
            const res = await changePasswordData(values).unwrap()
            console.log(res)
            if(res?.success){
                toast.success(res?.message)
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center h-[80vh]">
                <div className="w-full max-w-md p-6 z-10 shadow-md rounded-lg bg-white">
                    <h2 className="text-2xl font-bold text-center text-[#2cb1ec] mb-6">
                        Change password
                    </h2>
                    <Form
                        name="login"
                        layout="vertical"
                        onFinish={handleSubmit}
                        autoComplete="off"
                        className="space-y-4"
                    >
                        <Form.Item
                            label="Current Password"
                            name="oldPassword"
                            rules={[
                                { required: true, message: "Please input your Current Password!" },
                            ]}
                        >
                            <Input placeholder="Enter your Current Password" />
                        </Form.Item>
                        <Form.Item
                            label="New Password"
                            name="newPassword"
                            rules={[
                                { required: true, message: "Please input your New Password!" },
                            ]}
                        >
                            <Input.Password placeholder="Enter your new password" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full"
                                loading={loading}
                            >
                                Change Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
