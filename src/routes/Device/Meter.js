import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Table,
  Tooltip,
  Button,
} from 'antd';

import styles from '../List/PlantList.less';

@connect(({ meter_list }) => ({
  meter_list
}))

export default class TableList extends PureComponent {
  state = {
    tabKey:"1"
  };

  // 电表列表
  get_meter_list=(params)=>{
    const { dispatch } = this.props;
    dispatch({
      type:"meter_list/meter_list",
      payload:{
        plant_id:sessionStorage.getItem("plant_id"),
        ...params,
      },
    })
  }

  // 分页
  change_page = (pagination) => {
    this.get_meter_list({ page:pagination.current})
  };

  componentDidMount() {
    this.get_meter_list()
  }

  render() {

    const columns = [
      { title: '名称', width: 120, dataIndex: 'meter_name', key: 'meter_name', fixed: 'left' },
      { title: '装机容量(kWh)', dataIndex: 'installed_capacity', key: 'installed_capacity' },
      { title: '品牌', dataIndex: 'brand', key: 'brand' },
      { title: '型号', dataIndex: 'model', key: 'model' },
      { title: '有功功率(W)', dataIndex: 'active_power', key: 'active_power' },
      { title: '无功功率(W)', dataIndex: 'reactive_power', key: 'reactive_power' },
      { title: '视在功率(W)', dataIndex: 'apparent_power', key: 'apparent_power' },
      { title: '今日发电量(kWh)', dataIndex: 'todays_energy', key: 'todays_energy' },
      { title: '累计发电量(kWh)', dataIndex: 'total_energy', key: 'total_energy' },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Button
            ghost={true}
            icon="eye"
            type="primary"
            size='small'
            shape="circle"
            title="原始数据"
            onClick={(e) =>{
              e.stopPropagation(); //这里需要阻止事件冒泡
              sessionStorage.setItem("meter_id",record.meter_id);
              this.props.dispatch(routerRedux.push(`/center/detail/device/meter-raw`))
            }
            }
          />
        ),
      },
    ];

    const selectTab = (i)=> {
      this.setState({
        tabKey:i
      })
    };

    const {meter_list}=this.props;
    return (
      <div className={styles.my_table}>
        <div className={styles.select_tab}>
          <div className={this.state.tabKey==="1"?styles.active:null} onClick={()=>selectTab("1")}>
            <span>1</span>
            <p>
              总数
            </p>
          </div>
          <Tooltip placement="bottomLeft" title={'asdasd'}>
            <div className={this.state.tabKey==="2"?styles.active:null} onClick={()=>selectTab("2")}>
              <span>1</span>
              <p>
                <span className={styles.red}>●</span>通讯中断
              </p>
            </div>
          </Tooltip>
          <Tooltip placement="bottomLeft" title={'asdasd'}>
            <div className={this.state.tabKey==="5"?styles.active:null} onClick={()=>selectTab("5")}>
              <span>1</span>
              <p>
                <span className={styles.green}>●</span>运行
              </p>
            </div>
          </Tooltip>
          <Tooltip placement="bottomLeft" title={'asdasd'}>
            <div className={this.state.tabKey==="6"?styles.active:null} onClick={()=>selectTab("6")}>
              <span>1</span>
              <p>
                <span className={styles.green}>●</span>夜间或不稳定期
              </p>
            </div>
          </Tooltip>
        </div>
        <Table
          columns={columns}
          dataSource={meter_list.data.list}
          pagination={meter_list.data.pagination}
          rowKey='meter_id'
          scroll={{ x: 1200 }}
          onChange={this.change_page}
        />
      </div>
    );
  }
}
