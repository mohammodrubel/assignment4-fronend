/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import '../style/Register.css';
import { useRegisterMutation } from "../app/fetchers/auth/authApi";
import { toast } from "sonner";

interface RegisterForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const navigate = useNavigate()
    const [registerData] = useRegisterMutation()
    const handleSubmit = async (values: RegisterForm) => {
        const { name, email, password, confirmPassword } = values;

        if (password !== confirmPassword) {
            message.error("Passwords do not match!");
            return;
        }

        try{
            const res = await registerData({name,email,password}).unwrap()
            if(res.success){
                toast.success(res.message)
                navigate('/login')
            }
       
        }catch(error:any){
            toast.error(error?.data?.message)
        }

       
    };

    return (
        <div className="authBackground">
            <div className="flex items-center justify-center h-screen ">
                <div className="w-full max-w-md p-6  z-10 shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold text-center text-[#2cb1ec] mb-6">
                    Register
                    </h2>
                    <Form
                        name="register"
                        layout="vertical"
                        onFinish={handleSubmit}
                        autoComplete="off"
                        className="space-y-4"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: "Please input your name!" }]}
                        >
                            <Input  placeholder="Enter your name" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Please input your email!" },
                            
                            ]}
                        >
                            <Input  placeholder="Enter your email" />
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
                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            rules={[
                                { required: true, message: "Please confirm your password!" },
                            ]}
                        >
                            <Input.Password  placeholder="Confirm your password" />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full"
                                // loading={loading}
                            >
                                Register
                            </Button>
                        </Form.Item>
                        <p className="font-medium mx-5">if you have already account please <Link to='/login'>Login</Link></p>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Register;
