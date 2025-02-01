/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../app/fetchers/auth/authApi";
import { setUsers } from "../app/fetchers/auth/authSlice";
import { useAppDispatch } from "../app/hook";
import '../style/Register.css';
import jwtDecoded from "../utils/decodedToken";

interface LoginFormType {
    email: string;
    password: string;
}

const Login = () => {
    const [loginData] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: LoginFormType) => {
        setLoading(true);
        try {
            const res = await loginData(values).unwrap();
            if (res.success) {
                toast.success(res.message);
                const token:string = res?.data 
                const user = jwtDecoded(res.data)
                dispatch(setUsers({user,token}))
                navigate('/');
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="authBackground">
            <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-md p-6 z-10 shadow-md rounded-lg bg-white">
                    <h2 className="text-2xl font-bold text-center text-[#2cb1ec] mb-6">
                        Login
                    </h2>
                    <Form
                        name="login"
                        layout="vertical"
                        onFinish={handleSubmit}
                        autoComplete="off"
                        className="space-y-4"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Please input your email!" },
                            ]}
                        >
                            <Input placeholder="Enter your email" />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: "Please input your password!" },
                            ]}
                        >
                            <Input.Password placeholder="Enter your password" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full"
                                loading={loading}
                            >
                                Login
                            </Button>
                        </Form.Item>
                        <p className="font-medium mx-5">
                            If you don't have an account, please{" "}
                            <Link to="/register">Register</Link>.
                        </p>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
