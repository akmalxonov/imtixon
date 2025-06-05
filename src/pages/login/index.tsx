import "../login/login.scss";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();

  const login = async (values: { email: string; password: string }) => {
    try {
      const response = await axios({
        url: "https://admin-crm.onrender.com/api/auth/sign-in",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: values.email,
          password: values.password,
        },
      });

      const token = response.data?.data?.token;
      localStorage.setItem("token", token);
      console.log(token, "token");
      console.log(response.data);
      navigate("/");
    } catch (error: any) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h1>Hush kelibsiz</h1>
        <Form onFinish={login}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Iltimos, to'g'ri email kiriting",
              },
            ]}
          >
            <Input placeholder="Email" allowClear />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Iltimos, to'g'ri parol kiriting",
              },
            ]}
          >
            <Input.Password placeholder="Parol" allowClear />
          </Form.Item>

          <Button className="btn" htmlType="submit">
            Yuborish
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
