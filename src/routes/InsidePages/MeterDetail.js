import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {Table,Row, Col} from "antd"
import { routerRedux } from 'dva/router';
import styles from './MeterDetail.less';
import {
  Bar,
} from 'components/Charts';

@connect(({  }) => ({

}))

export default class InverterDetail extends PureComponent {
  state={

  };


  render() {
    const salesData=[{
      "name": "London",
      "月份": "Jan.",
      "月均降雨量": 18.9,
    }, {
      "name": "London",
      "月份": "Feb.",
      "月均降雨量": 28.8,
    }, {
      "name": "London",
      "月份": "Mar.",
      "月均降雨量": 39.3,
    }, {
      "name": "London",
      "月份": "Apr.",
      "月均降雨量": 81.4,
    }, {
      "name": "London",
      "月份": "May",
      "月均降雨量": 47,
    }, {
      "name": "London",
      "月份": "Jun.",
      "月均降雨量": 20.3,
    }, {
      "name": "London",
      "月份": "Jul.",
      "月均降雨量": 24,
    }, {
      "name": "London",
      "月份": "Aug.",
      "月均降雨量": 35.6,
    }, {
      "name": "Berlin",
      "月份": "Jan.",
      "月均降雨量": 12.4,
    }, {
      "name": "Berlin",
      "月份": "Feb.",
      "月均降雨量": 23.2,
    }, {
      "name": "Berlin",
      "月份": "Mar.",
      "月均降雨量": 34.5,
    }, {
      "name": "Berlin",
      "月份": "Apr.",
      "月均降雨量": 99.7,
    }, {
      "name": "Berlin",
      "月份": "May",
      "月均降雨量": 52.6,
    }, {
      "name": "Berlin",
      "月份": "Jun.",
      "月均降雨量": 35.5,
    }, {
      "name": "Berlin",
      "月份": "Jul.",
      "月均降雨量": 37.4,
    }, {
      "name": "Berlin",
      "月份": "Aug.",
      "月均降雨量": 42.4,
    }]

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

    return (
      <div className={styles.inverter_wrap}>
        <div className={styles.path_nav}>
          <span onClick={()=>this.props.dispatch(routerRedux.push("/center/detail/device/inverter-list"))}>电表列表</span> > 电表详情
        </div>
        <div className={styles.inverter_head}>
          <div>
            <div>
              <div className={styles.title}>
                <p>
                  S1-NB1
                </p>
                <p>
                  <span className={styles.green}>●</span>运行
                </p>
              </div>
              <div>
                <span>品牌: 阳光电源</span> <span>型号: SG500MX</span>
              </div>
            </div>
          </div>
          <div>
            <p>
              <span>组件容量</span> 506.8kWp
            </p>|
            <p>
              <span>机箱温度</span> 37.49°C
            </p>|
            <p>
              <span>转换效率</span> 98%
            </p>|
            <p>
              <span>离散率</span> 14.67%
            </p>
          </div>
        </div>
        <div className={styles.inverter_cont}>
          <Row gutter={24} className={styles.inverter_row1}>
            <Col className={styles.inverter_col} span={6}>
              <div>
                <div className={styles.head_title}>
                  <div>
                    <span>发电量统计</span>
                  </div>
                </div>
                <div className={styles.tab_cont}>
                  <div className={styles.active}>
                    <div>
                      <p>
                        当日发电量 : <span>215.11 kW</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        当月发电量 : <span>215.11 kW</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        当年发电量 : <span>215.11 kW</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        累计发电量 : <span>215.11 kW</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col className={styles.inverter_col} span={18}>
              <div>
                <div className={styles.head_title}>
                  <div>
                    <span>发电量</span>
                  </div>
                </div>
                <div className={styles.elec_cont}>
                  <Bar height={240} data={salesData} type="interval" />
                </div>
              </div>
            </Col>
          </Row>
          <div className={styles.my_table}>
            <Table
              columns={columns}
              dataSource={data}
              scroll={{ x: 1300 }}
            />
          </div>
        </div>
      </div>
    );
  }
}
