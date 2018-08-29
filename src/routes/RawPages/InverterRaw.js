import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Table,
} from 'antd';
import styles from './styles.less';

@connect(({ inverter_raw }) => ({
  inverter_raw,
}))

export default class InverterRaw extends PureComponent {

  // 逆变器列表
  get_inverter_raw=(params)=>{
    const { dispatch } = this.props;
    dispatch({
      type:"inverter_raw/inverter_raw",
      payload:{
        inverter_id:sessionStorage.getItem("inverter_id"),
        ...params,
      },
    })
  }

  // 分页
  change_page = (pagination) => {
    this.get_inverter_raw({ page:pagination.current})
  };

  componentDidMount() {
    this.get_inverter_raw({page:1})
  }

  render() {
    const columns = [
      { title: '时间', width: 180, dataIndex: 'DTime', key: 'DTime', fixed: 'left',
          render: (text) => (
            moment(text*1000).format('YYYY-MM-DD HH:mm:ss')
          ),
        }
    ];
    if(this.props.inverter_raw.data.list[0]) {
      const arr = Object.keys(this.props.inverter_raw.data.list[0]);
      for (let i in arr) {
        if (i > 1) {
          columns.push({title: arr[i], dataIndex: arr[i], key: arr[i]})
        }
      }
    }


    const {inverter_raw}=this.props;
    return (
      <div className={styles.my_table}>
        <Table
          columns={columns}
          dataSource={inverter_raw.data.list}
          pagination={inverter_raw.data.pagination}
          rowKey='id'
          scroll={{ x: 8000 }}
          onChange={this.change_page}
        />
      </div>
    );
  }
}
