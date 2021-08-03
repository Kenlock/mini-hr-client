import React from 'react';
import { useHistory } from 'react-router';
import { Layout, Menu } from 'antd';
import { Route, Redirect } from 'react-router-dom';

const { Header, Content } = Layout;
const PrivateRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  return (
    <>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100vw' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Dashboard</Menu.Item>
          <Menu.Item key="2">Openings</Menu.Item>
          <Menu.Item key="3">Reports</Menu.Item>
          <Menu.Item
            key="3"
            onClick={() => {
              localStorage.removeItem('authToken');
              history.push('/');
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        style={{
          marginTop: 90,
          marginLeft: '50px',
          marginRight: '50px',
        }}
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
