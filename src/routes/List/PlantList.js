import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Cookie from 'js-cookie'
import { routerRedux } from 'dva/router';
import { getMenuData } from '../../common/menu';
import {
  Table,
} from 'antd';

import styles from './PlantList.less';

@connect(({ plant_list,global,loading }) => ({
  plant_list,
  global,
  loading: loading.effects['global/company_stat', 'plant_list/plant_list'],
}))

export default class TableList extends PureComponent {
  state = {
    tabKey:"1",
  };

  // 场站信息
  get_company_stat = (params) =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'global/company_stat',
      payload:params,
    });
  }

  // 场站列表
  get_plant_list=(params)=>{
    const { dispatch } = this.props;
    dispatch({
      type:"plant_list/plant_list",
      payload:params,
    })
  }
  // 分页
  change_page = (pagination) => {
    this.get_plant_list({ page:pagination.current})
  };
  componentDidMount() {
    this.get_plant_list({page:1});
    this.get_company_stat()
  }

  render() {

    const columns = [
      { title: '名称', width: 120, dataIndex: 'plant_name', key: 'plant_name', fixed: 'left' },
      { title: '装机容量(kW)', dataIndex: 'installed_capacity', key: 'installed_capacity' },
      { title: '功率(kW)', dataIndex: 'power', key: 'power' },
      { title: 'PR', dataIndex: 'pr', key: 'pr' },
      { title: '今日发电量-逆变器(kWh)', dataIndex: 'todays_energy', key: 'todays_energy' },
      { title: '今日发电量-电表(kWh)', dataIndex: 'meter_todays_energy', key: 'meter_todays_energy' },
      { title: '累计发电量-电表(kWh)', dataIndex: 'meter_total_energy', key: 'meter_total_energy' },
      { title: '线损(%)', dataIndex: 'line_loss', key: 'line_loss' },
      { title: '今日满发(h)', dataIndex: 'todays_full_power_hours', key: 'todays_full_power_hours' },
      { title: '累计满发(h)', dataIndex: 'total_full_power_hours', key: 'total_full_power_hours' },
      { title: '地址', dataIndex: 'address', key: 'address' },
      // {
      //   title: 'Action',
      //   key: 'operation',
      //   render: () => <a href="javascript:;">action</a>,
      // },
    ];
    const selectTab = (i)=> {
      this.setState({
        tabKey:i,
      })
      this.get_plant_list({page:1,status:i})
    }
    const {plant_list, global}=this.props;
    return (
      <div className={styles.my_table}>
        <div className={styles.select_tab}>
          <div className={this.state.tabKey==="0"?styles.active:null} onClick={()=>selectTab("0")}>
            <span>{global.company_stat.plant_num}</span>
            <p>
              总数
            </p>
          </div>
          <div className={this.state.tabKey==="3"?styles.active:null} onClick={()=>selectTab("3")}>
            <span>{global.company_stat.err_num}</span>
            <p>
              <span className={styles.red}>●</span>全场通讯中断
            </p>
          </div>
          <div className={this.state.tabKey==="2"?styles.active:null} onClick={()=>selectTab("2")}>
            <span>{global.company_stat.abnormal_num}</span>
            <p>
              <span className={styles.orange}>●</span>部分通讯中断
            </p>
          </div>
          <div className={this.state.tabKey==="1"?styles.active:null} onClick={()=>selectTab("1")}>
            <span>{global.company_stat.ok_num}</span>
            <p>
              <span className={styles.green}>●</span>通讯正常
            </p>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={plant_list.data.list}
          pagination={plant_list.data.pagination}
          rowKey='plant_id'
          scroll={{ x: 1500 }}
          onChange={this.change_page}
          onRow={(record) => {
            return {
              onClick: () => {
                sessionStorage.setItem("plant_id",record.plant_id);
                sessionStorage.setItem("plant_name",record.plant_name);
                window.location.href=`/center/detail/info/analysis` // 要使用这个重新加载整个页面，使左边导航的的数据变化
              },       // 点击行
            };
          }}
        />
      </div>
    );
  }
}
