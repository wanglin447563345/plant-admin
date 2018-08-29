import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Table,
} from 'antd';
import styles from './styles.less';

@connect(({ weather_raw }) => ({
  weather_raw,
}))

export default class WeatherRaw extends PureComponent {

  // 逆变器列表
  get_weather_raw=(params)=>{
    const { dispatch } = this.props;
    dispatch({
      type:"weather_raw/weather_raw",
      payload:{
        weather_station_id:sessionStorage.getItem("weather_station_id"),
        ...params,
      },
    })
  }

  // 分页
  change_page = (pagination) => {
    this.get_weather_raw({ page:pagination.current})
  };

  componentDidMount() {
    this.get_weather_raw({page:1})
  }

  render() {
    const columns = [
      { title: '时间', width: 180, dataIndex: 'DTime', key: 'DTime', fixed: 'left',
        render: (text) => (
          moment(text*1000).format('YYYY-MM-DD HH:mm:ss')
        ),
      }
    ];
    if(this.props.weather_raw.data.list[0]) {
      const arr = Object.keys(this.props.weather_raw.data.list[0]);
      for (let i in arr) {
        if (i > 1) {
          columns.push({title: arr[i], dataIndex: arr[i], key: arr[i]})
        }
      }
    }


    const {weather_raw}=this.props;
    return (
      <div className={styles.my_table}>
        <Table
          columns={columns}
          dataSource={weather_raw.data.list}
          pagination={weather_raw.data.pagination}
          rowKey='id'
          scroll={{ x: 1400 }}
          onChange={this.change_page}
        />
      </div>
    );
  }
}
