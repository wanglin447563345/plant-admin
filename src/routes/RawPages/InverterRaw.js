import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Cookie from 'js-cookie'
import moment from 'moment';
import {
  Table,
  Pagination,
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
  change_page = (current,pageSize) => {
    Cookie.set('default_size',pageSize);
    this.get_inverter_raw({ page:current,rows:pageSize})
  };

  // 显示总条数
  showTotal= (total)=> {
    return `共 ${total} 条`;
  };

  componentDidMount() {
    this.get_inverter_raw({page:1,rows:Cookie.get("default_size")||10})
  }

  render() {
    const columns = [
      { title: '时间', width: 180, dataIndex: 'timestamp', key: 'timestamp', fixed: 'left',
        render: (text) => (
          moment(text*1000).format('YYYY-MM-DD HH:mm:ss')
        ),
      }
    ];
    if(this.props.inverter_raw.data.list[0]) {
      const arr = Object.keys(this.props.inverter_raw.data.list[0]);
      for (let i in arr) {
        if (i > 1 && arr[i]!=="DTime" && arr[i]!=="timestamp") {
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
          pagination={false}
          rowKey='id'
          scroll={{ x: 8000 }}
        />
        <div style={{marginTop:15,marginBottom:20,textAlign:"right"}}>
          <Pagination
            showQuickJumper
            showSizeChanger
            defaultPageSize={Cookie.get('default_size')||10}
            pageSizeOptions={["10","20","50","100"]}
            current={inverter_raw.data.pagination.current}
            total={inverter_raw.data.pagination.total}
            onChange={this.change_page}
            onShowSizeChange={this.change_page}
            showTotal={this.showTotal}
          />
        </div>
      </div>
    );
  }
}
