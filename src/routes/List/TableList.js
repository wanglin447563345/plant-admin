import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { getMenuData } from '../../common/menu';
import {
  Table,
} from 'antd';

import styles from './TableList.less';

@connect(({  }) => ({

}))

export default class TableList extends PureComponent {
  state = {
    tabKey:"1"
  };

  render() {

    const columns = [
      { title: 'Full Name', width: 120, dataIndex: 'name', key: 'name', fixed: 'left' },
      { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
      { title: 'Column 1', dataIndex: 'address', key: '1' },
      { title: 'Column 2', dataIndex: 'address', key: '2' },
      { title: 'Column 3', dataIndex: 'address', key: '3' },
      { title: 'Column 4', dataIndex: 'address', key: '4' },
      { title: 'Column 5', dataIndex: 'address', key: '5' },
      { title: 'Column 6', dataIndex: 'address', key: '6' },
      { title: 'Column 7', dataIndex: 'address', key: '7' },
      { title: 'Column 8', dataIndex: 'address', key: '8' },
      {
        title: 'Action',
        key: 'operation',
        render: () => <a href="javascript:;">action</a>,
      },
    ];

    const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 40,
      address: 'London Park',
    }];
    const selectTab = (i)=> {
      this.setState({
        tabKey:i
      })
    }

    return (
      <div className={styles.my_table}>
        <div className={styles.select_tab}>
          <div className={this.state.tabKey==="1"?styles.active:null} onClick={()=>selectTab("1")}>
            <span>1</span>
            <p>
              总数
            </p>
          </div>
          <div className={this.state.tabKey==="2"?styles.active:null} onClick={()=>selectTab("2")}>
            <span>1</span>
            <p>
              <span className={styles.red}>●</span>全场通讯中断
            </p>
          </div>
          <div className={this.state.tabKey==="3"?styles.active:null} onClick={()=>selectTab("3")}>
            <span>1</span>
            <p>
              <span className={styles.orange}>●</span>部分通讯中断
            </p>
          </div>
          <div className={this.state.tabKey==="4"?styles.active:null} onClick={()=>selectTab("4")}>
            <span>1</span>
            <p>
              <span className={styles.green}>●</span>通讯正常
            </p>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: 1300 }}
          onRow={(record) => {
            return {
              onClick: () => {
                window.location.href="/leeland/detail/info/analysis"
              },       // 点击行
            };
          }}
        />
      </div>
    );
  }
}
