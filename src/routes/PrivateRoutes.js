import React from 'react';
import { Layout, Menu } from 'antd';
import { Route, Redirect } from 'react-router-dom';

const { Header, Content } = Layout;
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100vw' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Dashboard</Menu.Item>
          <Menu.Item key="2">Openings</Menu.Item>
          <Menu.Item key="3">Reports</Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: '0 50px', marginTop: 90, height: '100vh' }}
      >
        <Route
          {...rest}
          render={(props) =>
            localStorage.getItem('authToken') ? (
              <Component {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      </Content>
    </>
  );
};

export default PrivateRoute;
