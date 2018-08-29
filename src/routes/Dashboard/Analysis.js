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
import more from '../../assets/more.png'
import total from '../../assets/total.png'
import co from '../../assets/co2.png'
import elec from '../../assets/elec.png'
import profit from '../../assets/profit.png'
import size from '../../assets/size.png'
import elec_db from '../../assets/elec_db.png'
import profit_db from '../../assets/profit_db.png'
import order from '../../assets/order.png'
import feng from '../../assets/feng.png'

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
      show: true,
    };
  }


  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'chart/fetch',
    // });

    if(this.state.show){
      this.mapInit()
    }

  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'chart/clear',
    // });
  }
// 初始化地图

  mapInit =()=>{
    // let BMap = window.BMap
    const BMap=window.BMap;
    let map = new BMap.Map('home_map') // 创建Map实例
    map.centerAndZoom(new BMap.Point(112.877535, 28.238118), 11)
  };

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
    const { show } = this.state;


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
    const changeState = () => {
      this.setState({
        show:!this.state.show,
      })
      if(!this.state.show && this.mapRef.current){
        this.mapInit()
      }
    }
    return (
      <Fragment>
        <div className={styles.wrap_map} style={{display:show ? "block":"none"}}>
        <div className={styles.items_map}>
          <div className={styles.line1}>
            {/*<div className={styles.item_map} style={{cursor:"pointer"}} onClick={changeState}>*/}
              {/*<div className={styles.img}><img src={more} alt="" /></div>*/}
              {/*<div className={styles.title}>更多</div>*/}
            {/*</div>*/}
            <div className={styles.item_map} onClick={()=>this.props.dispatch(routerRedux.push("/center/list/plant-list"))}>
              <div className={styles.img}>
                <img src={total} alt="" />
              </div>
              <div className={styles.num}>总场站数</div>
              <div className={styles.num}>12</div>
            </div>
            <div className={styles.item_map}>
              <Gauge f_color="#fff" title="累计RP" height={128} percent={creatData()} />
            </div>
          </div>
          <div className={styles.line2}>
            {/*<div className={styles.item_map}>*/}
              {/*<div className={styles.img}>*/}
                {/*<img src={co} alt="" />*/}
              {/*</div>*/}
              {/*<div className={styles.num}>*/}
                {/*节能减排CO₂*/}
              {/*</div>*/}
              {/*<div className={styles.num}>*/}
                {/*21212吨*/}
              {/*</div>*/}
            {/*</div>*/}
            {/*<div className={styles.item_map}>*/}
              {/*<div className={styles.img}>*/}
                {/*<img src={elec} alt="" />*/}
              {/*</div>*/}
              {/*<div className={styles.num}>*/}
                {/*累计发电量*/}
              {/*</div>*/}
              {/*<div className={styles.num}>*/}
                {/*21212MWh*/}
              {/*</div>*/}
            {/*</div>*/}
          </div>
          <div className={styles.line3}>
            <div className={styles.item_map}>
              <div className={styles.img}>
                <img src={profit} alt="" />
              </div>
              <div className={styles.num}>
                累计收益
              </div>
              <div className={styles.num}>
                21212千元
              </div>
            </div>
            <div className={styles.item_map}>
              <div className={styles.img}>
                <img src={size} alt="" />
              </div>
              <div className={styles.num}>
                装机容量
              </div>
              <div className={styles.num}>
                21MWp
              </div>
            </div>

          </div>
        </div>
        <div className={styles.db_map} id="home_map" />
      </div>
        <div className={styles.db_more} style={{display:show ? "none":"block"}}>
        <div className={styles.go_back} onClick={changeState}><Icon type="caret-left" />返回</div>
        <Row gutter={24} className={styles.my_row}>
          <Col {...topColResponsiveProps2} className={styles.my_col2}>
           <div>
             <div>
               <div>
                 <div>总场站数: 12</div>
               </div>
               <div>
                 <div>
                   <div className={styles.green}>
                     1
                   </div>
                   <div>
                     正常
                   </div>
                 </div>
                 <div>
                   <div className={styles.orange}>
                     0
                   </div>
                   <div>
                     部分通讯中断
                   </div>
                 </div>
               </div>
             </div>
             <div>
               <div>
                 <div>装机容量: 12</div>
               </div>
               <div>
                 <div>
                   <div className={styles.red}>
                     1
                   </div>
                   <div>
                     全场通讯中断
                   </div>
                 </div>
                 <div>
                   <div className={styles.gray}>
                     0
                   </div>
                   <div>
                     待接入
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
                  累计发电连 <span>&</span> 收益
                </div>
              </div>
              <div className={styles.ele_pro}>
                <div>
                  <img src={elec_db} alt="" />
                  <div>12345 MWh</div>
                </div>
                <div>
                  <img src={profit_db} alt="" />
                  <div>12345 千元</div>
                </div>
              </div>
            </div>
          </Col>
          <Col {...topColResponsiveProps} className={styles.my_col1}>
            <div>
              <div className={styles.head_title}>
                <div>
                  满发小时排行 <img src={order} alt="" />
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
                    {!show?<Gauge f_color="#000" height={160} percent={creatData()} />:null}
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
                    {!show?<Bar height={148} data={salesData} type="line" />:null}
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col1}>
                  <div className={styles.head_title}>
                    <div>
                      累计节能减排CO₂
                    </div>
                  </div>
                  <div className={styles.feng}>
                   <div>
                     <img src={feng} alt="" />
                     <span>3232432</span>
                   </div>
                  </div>
                </div>
                <div className={styles.col2}>
                  <div className={styles.head_title}>
                    <div>
                      每千瓦实时功率 <span>&</span> 归一化辐照强度
                    </div>
                  </div>
                  <div style={{padding:"0 20px"}}>
                    {!show?<Bar height={148} data={salesData} type="interval" />:null}
                  </div>
                </div>
              </div>
            </Col>
            <Col {...topColResponsiveProps} className={styles.my_col1}>
              <div>
                <div className={styles.head_title}>
                  <div>
                    RP排行 <img src={order} alt=""/>
                  </div>
                  <div className={styles.select}>
                    <Select defaultValue="year" style={{ width: 70 }} onChange={this.handleChange}>
                      <Option value="year">当年</Option>
                      <Option value="month">当月</Option>
                      <Option value="day">当日</Option>
                    </Select>
                  </div>
                </div>
                <div className={styles.rp}>
                  {!show?<WaterWave height={161} title="" percent={34} />:null}
                  <p>张家港立澜海狮光伏电厂</p>
                </div>
                {/*<div className={styles.warning}>*/}
                  {/*<div>*/}
                    {/*<div><span>故障故障故障故障故障故障故障故障故障故障故障故障故障故障</span><Button type="primary" size="small">确认</Button></div>*/}
                    {/*<div className={styles.warn_time}>*/}
                      {/*2017-12-01*/}
                    {/*</div>*/}
                  {/*</div>*/}
                  {/*<div>*/}
                    {/*<div><span>故障故障故障故障故障故障故障故障故障故障故障故障故障故障</span><Button type="primary" size="small">确认</Button></div>*/}
                    {/*<div className={styles.warn_time}>*/}
                      {/*2017-12-01*/}
                    {/*</div>*/}
                  {/*</div>*/}
                  {/*<div>*/}
                    {/*<div><span>故障故障故障故障故障故障故障故障故障故障故障故障故障故障</span><Button type="primary" size="small">确认</Button></div>*/}
                    {/*<div className={styles.warn_time}>*/}
                      {/*2017-12-01*/}
                    {/*</div>*/}
                  {/*</div>*/}
                  {/*<div>*/}
                    {/*<div><span>故障故障故障故障故障故障故障故障故障故障故障故障故障故障</span><Button type="primary" size="small">确认</Button></div>*/}
                    {/*<div className={styles.warn_time}>*/}
                      {/*2017-12-01*/}
                    {/*</div>*/}
                  {/*</div>*/}
                  {/*<div>*/}
                    {/*<div><span>故障故障故障故障故障故障故障故障故障故障故障故障故障故障</span><Button type="primary" size="small">确认</Button></div>*/}
                    {/*<div className={styles.warn_time}>*/}
                      {/*2017-12-01*/}
                    {/*</div>*/}
                  {/*</div>*/}
                  {/*<div className={styles.warn_btn}>*/}
                    {/*<Button type="primary">查看更多</Button>*/}
                  {/*</div>*/}
                {/*</div>*/}
              </div>
            </Col>
          </Row>
        </div>
      </Fragment>

    );
  }
}
