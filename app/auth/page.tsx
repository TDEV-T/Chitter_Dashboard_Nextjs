"use client";
import {
  Form,
  Input,
  Button,
  ConfigProvider,
  theme as ThemeAntd,
  notification,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useTheme } from "next-themes";
import { loginAdmin } from "../service/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const onFinish = async (values: any) => {
    const res = await loginAdmin(values);
    const resp = await res.json();
    console.log(resp);
    if (res.status === 200) {
      notification.success({
        message: resp.message,
        description: "You have successfully logged in.",
      });

      localStorage.setItem("token", resp.token);

      router.push("/dashboard");
    } else if (res.status === 401) {
      notification.error({
        message: resp.message,
      });
    }
  };

  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className=" flex items-center justify-center h-screen w-screen">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Chitter
          </h5>

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button bg-blue-500"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
