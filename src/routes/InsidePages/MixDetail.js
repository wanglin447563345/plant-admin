import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {Row, Col, Button,Modal, Checkbox} from "antd"
import { routerRedux } from 'dva/router';
import styles from './MixDetail.less';
import {
  Bar,
} from 'components/Charts';
const CheckboxGroup = Checkbox.Group;

@connect(({  }) => ({

}))

export default class InverterDetail extends PureComponent {
  state={
    setting:true,
    v_modal:false,
  };


  setChange = (i) =>{
    console.log(i)
    this.setState({
      setting:i
    })
  };

  showModal = () => {
    this.setState({
      v_modal: true,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      v_modal: false,
    });
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

    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
    ];


    return (
      <div className={styles.inverter_wrap}>
        <div className={styles.path_nav}>
          <span onClick={()=>this.props.dispatch(routerRedux.push("/leeland/detail/device/inverter-list"))}>直流汇流箱列表</span> > 直流汇流箱详情
        </div>
        <div className={styles.inverter_head}>
          <div>
            <div>
              <div className={styles.title}>
                <p>
                  S2-NB1-04-HL1
                </p>
                <p>
                  <span className={styles.green}>●</span>运行
                </p>
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
            <Col className={styles.inverter_col} span={12}>
              <div className={styles.inside_col}>
                <Col span={24}>
                  <div className={styles.head_title}>
                    <div>
                      <span>支路电流 (A)</span>
                    </div>
                  </div>
                  <div className={styles.ratio_cont}>
                    <div className={styles.active}>
                      <div>
                        <div className={this.state.setting?styles.active:null}>
                          <div className={styles.inside_head}>
                            <p>
                              故障：<span>6/1</span> 已接：<span>6/6</span>
                            </p>
                            <Button size="small" type="primary" onClick={()=>this.setChange(false)}>设置</Button>
                          </div>
                          <div className={styles.line_table}>
                            <div>
                              <span>01</span>
                              <p>83.23</p>
                            </div>
                            <div>
                              <span>01</span>
                              <p>83.23</p>
                            </div>
                            <div>
                              <span>01</span>
                              <p>83.23</p>
                            </div>
                            <div>
                              <span>01</span>
                              <p>83.23</p>
                            </div>
                            <div>
                              <span>01</span>
                              <p>83.23</p>
                            </div>
                          </div>
                        </div>
                        <div className={!this.state.setting?styles.active:null}>
                          <div className={styles.inside_head}>
                            <p>
                              故障：<span>6/1</span> 已接：<span>6/6</span>
                            </p>
                            <div>
                              <Button size="small" type="primary" onClick={()=>this.setChange(true)}>完成</Button>
                              <Button size="small" type="primary" onClick={()=>this.setChange(true)}>取消</Button>
                            </div>
                          </div>
                          <div className={styles.line_table}>
                            <div>
                              <span>01</span>
                              <p onClick={this.showModal}>83.23</p>
                            </div>
                            <div>
                              <span>01</span>
                              <p onClick={this.showModal}>83.23</p>
                            </div>
                            <div>
                              <span>01</span>
                              <p onClick={this.showModal}>83.23</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </div>
              <div className={styles.inside_col}>
                <Col span={24}>
                  <div className={styles.head_title}>
                    <div>
                      <span>电流离散率详解图表</span>
                    </div>
                  </div>
                  <div className={styles.elec_cont}>
                    <Bar height={160} data={salesData} type="line" />
                  </div>
                </Col>
              </div>
            </Col>
            <Col className={styles.inverter_col} span={12}>
              <div>
                <div className={styles.head_title}>
                  <div>
                    <span>警告</span>
                  </div>
                </div>
                <div className={styles.warn_cont}>
                  <p>栅格常常需要和间隔进行配合，你可以使用 Row 的 gutter 属性，我们推荐使用 (16+8n)px 作为栅格间隔。(n 是自然数)
                    如果要支持响应式，可以写成</p>
                  <span>2018-02-03 11:29:02</span>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <Modal
          title="S1箱变 2018-08-08"
          visible={this.state.v_modal}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Row gutter={24} className={styles.inverter_row2}>
            <Col className={styles.inverter_col} span={6}>
              <CheckboxGroup options={options} defaultValue={['Pear']} />
            </Col>
            <Col className={styles.inverter_col} span={18}>
              <Bar height={240} data={salesData} type="line" />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
