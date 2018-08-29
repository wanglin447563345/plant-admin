import React, { Component } from 'react';
import { connect } from 'dva';
import {  Alert} from 'antd';
import Login from 'components/Login';
import styles from './Login.less';

const { UserName, Password,  Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {

  // onTabChange = type => {
  //   this.setState({ type });
  // };

  handleSubmit = (err, values) => {
    const { dispatch } = this.props;
    if (!err) {
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
        },
      });
    }
  };


  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  render() {
    const { login, submitting } = this.props;
    return (
      <div className={styles.main}>
        <Login onSubmit={this.handleSubmit}>
          {login.status === 'error' &&
          !submitting &&
          this.renderMessage('账户或密码错误')}
          <UserName name="user_name" placeholder="用户名" />
          <Password name="password" placeholder="密码" />
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}
