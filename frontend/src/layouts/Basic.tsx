"use client";
import React, { CSSProperties, useState } from "react";
import {
  FormOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, theme, Typography } from "antd";
import styles from "./basic.module.css";
import { useRouter } from "next/navigation";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const BasicLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [broken, setBroken] = useState(false);
  const router = useRouter();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items: MenuItem[] = [
    {
      key: "1",
      label: "Create Interest",
      icon: <FormOutlined />,
      onClick: () => {
        if (broken) setCollapsed(true);
        router.replace("/");
      },
    },
    {
      key: "2",
      label: "Get Interest",
      icon: <UnorderedListOutlined />,
      onClick: () => {
        if (broken) setCollapsed(true);
        router.replace("/list");
      },
    },
  ];

  const siderStyles: CSSProperties = broken
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100vh",
        zIndex: 1,
      }
    : {};

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        reverseArrow
        trigger={null}
        collapsible
        breakpoint="md"
        collapsedWidth="0"
        collapsed={collapsed}
        onBreakpoint={setBroken}
        style={siderStyles}
        onCollapse={(value: boolean) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Button
            size="small"
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              marginRight: 5,
            }}
          />

          <Typography.Title level={5} className={styles.title}>
            OB techinal test
          </Typography.Title>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              marginTop: 10,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
