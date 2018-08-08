import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table,
  DatePicker,
  Select,
} from 'antd';

import styles from './WarningList.less';
const { RangePicker } = DatePicker;
const Option = Select.Option;

@connect(({  }) => ({

}))

export default class TableList extends PureComponent {
  state = {
    select_time:"1",
    action:"1",
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
    };

    const onChange=(value, dateString)=> {
      console.log('Selected Time: ', value);
      console.log('Formatted Selected Time: ', dateString);
    }

    const onOk = (value) => {
      console.log('onOk: ', value);
    }

    const reset = (value) => {
      this.setState({
        select_time:"1",
        action:"1"
      })
    }

    const select_time = (value) => {
      this.setState({
        select_time:value
      })
    }

    const action = (value) => {
      this.setState({
        action:value
      })
    }

    const  handleChange=(value)=> {
      console.log(`selected ${value}`);
    }

    return (
      <div className={styles.my_table}>
        <div className={styles.warning_select}>
          <div className={styles.reset}>
            <span>刷选</span><p onClick={reset}>默认设置</p>
          </div>
          <div className={styles.reset}>
            <span>时间</span><p className={this.state.select_time==="1"?styles.active:null} onClick={()=>select_time("1")}>当天</p>
            <p className={this.state.select_time==="2"?styles.active:null} onClick={()=>select_time("2")}>最近三天</p>
            <p className={this.state.select_time==="3"?styles.active:null} onClick={()=>select_time("3")}>当月</p>
            <p className={this.state.select_time==="4"?styles.active:null} onClick={()=>select_time("4")}>最近三月</p>
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder={['Start Time', 'End Time']}
              onChange={onChange}
              onOk={onOk}
            />
          </div>
          <div className={styles.reset}>
            <span>操作</span><p className={this.state.action==="1"?styles.active:null} onClick={()=>action("1")}>确认</p>
            <p className={this.state.action==="2"?styles.active:null} onClick={()=>action("2")}>未确认</p>
          </div>
          <div className={styles.reset}>
            <span>设备</span>
            <div>
              <Select defaultValue="lucy" style={{ width: 160 }} onChange={handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>Disabled</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
            <div>
              <Select defaultValue="lucy" style={{ width: 160 }} onChange={handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>Disabled</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
            <div>
              <Select defaultValue="lucy" style={{ width: 160 }} onChange={handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>Disabled</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>

          </div>
        </div>
        <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
      </div>
    );
  }
}
