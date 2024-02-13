"use client";
import { getUserData } from "@/app/service/data";
import { Image, Table } from "antd";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState(null);

  const columns = [
    {
      title: "Profile Picture",
      dataIndex: "profilepicture",
      key: "profilepicture",
      render: (src:any) => (
        <Image src={process.env.NEXT_PUBLIC_BASE_API+'images/'+src} alt={src} width={50} />
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const data = await getUserData(token!);

    if (data != null) {
      console.log(data);
      const formatData = data.map((user:any) => ({
        key: user.ID,
        profilepicture: user.profilepicture,
        name: user.fullname,
        username: user.username,
        email: user.email,
      }));
      setData(formatData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Table dataSource={data!} columns={columns} />
    </>
  );
};

export default Page;
