import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Table,
  Tooltip,
  Button,
} from 'antd';

import styles from '../List/PlantList.less';

@connect(({ weather_list }) => ({
  weather_list,
}))

export default class TableList extends PureComponent {
  state = {
    tabKey:"1"
  };

  // 天气列表
  get_weather_list=(params)=>{
    const { dispatch } = this.props;
    dispatch({
      type:"weather_list/weather_list",
      payload:{
        plant_id:sessionStorage.getItem("plant_id"),
        ...params,
      },
    })
  }

  // 分页
  change_page = (pagination) => {
    this.get_weather_list({ page:pagination.current})
  };

  componentDidMount() {
    this.get_weather_list()
  }

  render() {

    const columns = [
      { title: '名称', dataIndex: 'weather_station_name', key: 'weather_station_name' },
      { title: '辐照强度 w/m2', dataIndex: 'irradiation', key: 'irradiation' },
      { title: '今日累计辐照 kwh/m2', dataIndex: 'todays_irradiation', key: 'todays_irradiation' },
      { title: '总累计辐照 kwh/m2', dataIndex: 'total_irradiation', key: 'total_irradiation' },
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
              sessionStorage.setItem("weather_station_id",record.weather_station_id);
              this.props.dispatch(routerRedux.push(`/center/detail/device/weather-raw`))
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
    }

    const {weather_list}=this.props;
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
          dataSource={weather_list.data.list}
          pagination={weather_list.data.pagination}
          rowKey='weather_station_id'
          onChange={this.change_page}
        />
      </div>
    );
  }
}
