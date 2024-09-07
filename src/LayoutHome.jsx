import React, { useState } from "react";
import {
  AuditOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  ProfileOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setUnAuthenticated } from "./api/edit/authenticationSlice.js";
import { Footer } from "antd/es/layout/layout.js";

const { Header, Content, Sider } = Layout;

const items = [
  { name: "Posts", href: "/", icon: <ProductOutlined className="h-5 w-5" /> },
  { name: "Brand", href: "/brands", icon: <ProfileOutlined className="h-5 w-5" /> },
  { name: "Employee", href: "/employee", icon: <UsergroupAddOutlined className="h-5 w-5" /> },
  { name: "About", href: "/about", icon: <AuditOutlined className="h-5 w-5" /> },
  { name: "Settings", href: "/settings", icon: <UserOutlined className="h-5 w-5" /> },
];
const out = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 pr-1"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
    />
  </svg>
);
const LayoutHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function getBack() {
    dispatch(setUnAuthenticated());
    cookie.set("access-token", "");
    navigate("/login");
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    ...items.map((item, index) => ({
      key: index.toString(),
      icon: item.icon,
      label: <Link to={item.href}>{item.name}</Link>,
    })),
    {
      key: "logout",
      icon: out,
      label: "Log out",
      onClick: getBack,
    },
  ];

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="64" collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className=" text-center">
          <Button
            type="text"
            className=" esmer pt-14 text-white "
            icon={collapsed ? <MenuUnfoldOutlined className="h-5 w-5" /> : <MenuFoldOutlined className="h-5 w-5" />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
        <Menu
          className="h-[60vh] flex flex-col justify-center"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "5.7px",
          }}
        >
          <div
            style={{
              paddingBlock: 0,
              paddingInline: 0,
              minHeight: 500,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className=" h-[86.9vh]  py-6 px-3 overflow-y-auto your-custom-scrollbar">
              <Outlet />
            </div>
            <div className=" text-[.7rem] text-center">Mainer {new Date().getFullYear()} Created by Esmer</div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutHome;
