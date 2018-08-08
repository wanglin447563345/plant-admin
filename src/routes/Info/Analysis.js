import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Progress,
  Menu,
  Dropdown,
  Select,
  Button,
} from 'antd';
import numeral from 'numeral';
import {
  Bar,
  Gauge,
  WaterWave,
} from 'components/Charts';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';

import styles from './Analysis.less';
import co from '../../assets/d_co.png'
import elec from '../../assets/d_elec.png'
import profit from '../../assets/d_profit.png'
import clock from '../../assets/d_clock.png'
import order from '../../assets/order.png'
import clc from '../../assets/clc.png'

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const Option = Select.Option;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}



@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
export default class Analysis extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      salesType: 'all',
      currentTabKey: '',
      rangePickerValue: getTimeDistance('year'),
    };
  }


  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'chart/fetch',
    // });


  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'chart/clear',
    // });
  }


  // 满发选择

  handleChange=(value) =>{
    console.log(`selected ${value}`);
  };



  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    this.setState({
      rangePickerValue,
    });

    const { dispatch } = this.props;
    // dispatch({
    //   type: 'chart/fetchSalesData',
    // });
  };

  selectDate = type => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
  }

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


    const topColResponsiveProps = {
      xs: 6,
      sm: 6,
      md: 6,
      lg: 6,
      xl: 6,
      style: { marginBottom: 24 },
    };
    const topColResponsiveProps2 = {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
      style: { marginBottom: 24 },
    };
    const topColResponsiveProps3 = {
      xs: 18,
      sm: 18,
      md: 18,
      lg: 18,
      xl: 18,
      style: { marginBottom: 24 },
    };
    function creatData() {
      let val = Math.random() * 100;
      val = val.toFixed(1);
      return val;
    }
    return (
      <Fragment>
        <div className={styles.db_more}>
          <Row gutter={24} className={styles.my_row}>
            <Col {...topColResponsiveProps2} className={styles.my_col2}>
              <div>
                <div>
                  <div>
                    <div>张家港立澜海狮光伏电厂</div>
                  </div>
                  <div>
                    <div>
                      <div className={styles.green}>
                        1
                      </div>
                      <div>
                        气温
                      </div>
                    </div>
                    <div>
                      <div className={styles.orange}>
                        0
                      </div>
                      <div>
                        辐照强度
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div>通讯正常</div>
                  </div>
                  <div>
                    <div>
                      <div className={styles.red}>
                        1
                      </div>
                      <div>
                        全场功率
                      </div>
                    </div>
                    <div>
                      <div className={styles.gray}>
                        0
                      </div>
                      <div>
                        装机容量
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col {...topColResponsiveProps} className={styles.my_col1}>
              <div>
                <div className={styles.head_title}>
                  <div>
                    发电量 <span>&</span> 满发小时 <span>&</span> 收益 <span>&</span> CO₂
                  </div>
                </div>
                <div className={styles.ele_pro}>
                  <div>
                    <div><img src={elec} alt="" /> 发电量</div>
                    <div>12345 MWh</div>
                  </div>
                  <div>
                    <div><img src={clock} alt="" /> 满发小时</div>
                    <div>12345 h</div>
                  </div>
                  <div>
                    <div><img src={profit} alt="" /> 收益</div>
                    <div>12345 MWh</div>
                  </div>
                  <div>
                    <div><img src={co} alt="" /> CO₂</div>
                    <div>12345 吨</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col {...topColResponsiveProps} className={styles.my_col1}>
              <div>
                <div className={styles.head_title}>
                  <div>
                    逆变器满发小时排行 <img src={order} alt="" />
                  </div>
                  <div className={styles.select}>
                    <Select defaultValue="year" style={{ width: 70 }} onChange={this.handleChange}>
                      <Option value="year">当年</Option>
                      <Option value="month">当月</Option>
                      <Option value="day">当日</Option>
                    </Select>
                  </div>
                </div>
                <div className={styles.order_time}>
                  <div>
                    <span>张家港立澜海狮光伏电厂</span>
                    <Progress percent={100} format={() => `123243 h`} />
                  </div>
                  <div>
                    <span>张家港立澜海狮光伏电厂</span>
                    <Progress percent={100} format={() => `123243 h`} />
                  </div>
                  <div>
                    <span>张家港立澜海狮光伏电厂</span>
                    <Progress percent={100} format={() => `123243 h`} />
                  </div>
                  <div>
                    <span>张家港立澜海狮光伏电厂</span>
                    <Progress percent={100} format={() => `123243 h`} />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row gutter={24} className={styles.my_row2}>
            <Col {...topColResponsiveProps3} className={styles.in_col}>
              <div className={styles.row}>
                <div className={styles.col1}>
                  <div className={styles.head_title}>
                    <div>
                      累计RP
                    </div>
                  </div>
                  <div style={{width:"100%",height:160,margin:"0 auto"}}>
                    <Gauge f_color="#000" height={160} percent={creatData()} />
                  </div>
                </div>
                <div className={styles.col2}>
                  <div className={styles.head_title}>
                    <div>
                      发电量 <span>&</span> 收益 <span>&</span> 满发小时
                    </div>
                    <div className={styles.select}>
                      <Select defaultValue="year" style={{ width: 70 }} onChange={this.handleChange}>
                        <Option value="year">当年</Option>
                        <Option value="month">当月</Option>
                        <Option value="day">当日</Option>
                      </Select>
                    </div>
                  </div>
                  <div style={{padding:"0 20px"}}>
                    <Bar height={148} data={salesData} type="line" />
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col1}>
                  <div className={styles.head_title}>
                    <div>
                      发电量对比
                    </div>
                  </div>
                  <div className={styles.feng}>
                    <div>
                      <div><img src={clc} alt="" /> 逆变器</div>
                      <div>12345 MWh</div>
                    </div>
                    <div>
                      <div><img src={clc} alt="" />  井网表</div>
                      <div>12345 MWh</div>
                    </div>
                    <div>
                      <div><img src={clc} alt="" />  关口表</div>
                      <div>12345 MWh</div>
                    </div>
                  </div>
                </div>
                <div className={styles.col2}>
                  <div className={styles.head_title}>
                    <div>
                      发电量 <span>&</span> 辐照 <span>&</span> RP
                    </div>
                  </div>
                  <div style={{padding:"0 20px"}}>
                    <Bar height={148} data={salesData} type="interval" />
                  </div>
                </div>
              </div>
            </Col>
            <Col {...topColResponsiveProps} className={styles.my_col1}>
              <div>
                <div className={styles.head_title}>
                  <div>
                    当前逆变器警告 <img src={order} alt=""/>
                  </div>
                </div>
                <div className={styles.warning}>
                <div>
                <div><span>故障故障故障故障故障故障故障故障故障故障故障故障故障故障</span><Button type="primary" size="small">确认</Button></div>
                <div className={styles.warn_time}>
                2017-12-01
                </div>
                </div>
                <div>
                <div><span>故障故障故障故障故障故障故障故障故障故障故障故障故障故障</span><Button type="primary" size="small">确认</Button></div>
                <div className={styles.warn_time}>
                2017-12-01
                </div>
                </div>
                <div>
                <div><span>故障故障故障故障故障故障故障故障故障故障故障故障故障故障</span><Button type="primary" size="small">确认</Button></div>
                <div className={styles.warn_time}>
                2017-12-01
                </div>
                </div>
                <div>
                <div><span>故障故障故障故障故障故障故障故障故障故障故障故障故障故障</span><Button type="primary" size="small">确认</Button></div>
                <div className={styles.warn_time}>
                2017-12-01
                </div>
                </div>
                <div>
                <div><span>故障故障故障故障故障故障故障故障故障故障故障故障故障故障</span><Button type="primary" size="small">确认</Button></div>
                <div className={styles.warn_time}>
                2017-12-01
                </div>
                </div>
                <div className={styles.warn_btn}>
                <Button type="primary">查看更多</Button>
                </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Fragment>

    );
  }
}
