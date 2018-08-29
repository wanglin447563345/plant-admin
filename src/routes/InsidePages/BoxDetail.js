import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {Row, Col, Modal, Checkbox} from "antd"
import { routerRedux } from 'dva/router';
import styles from './BoxDetail.less';
import {
  Bar,
} from 'components/Charts';
const CheckboxGroup = Checkbox.Group;

@connect(({  }) => ({

}))

export default class InverterDetail extends PureComponent {
  state={
    tab2:"1",
    v_modal:false
  };


  tab2Change = (i) =>{
    this.setState({
      tab2:i
    })
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
          <span onClick={()=>this.props.dispatch(routerRedux.push("/center/detail/device/inverter-list"))}>箱变列表</span> > 箱变详情
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
            </div>
          </div>
          <div>
            <p>
              <span>遥信动作：</span> 0
            </p>
          </div>
        </div>
        <div className={styles.inverter_cont}>
          <Row gutter={24} className={styles.inverter_row2}>
            <Col className={styles.inverter_col} span={6}>
              <div>
                sdasds
              </div>
            </Col>
            <Col className={styles.inverter_col} span={18}>
              <div>
                <div className={styles.head_title}>
                  <div>
                    <span onClick={()=>this.tab2Change('1')} className={this.state.tab2==='1'?styles.active:null}>遥信信息</span>
                    <span onClick={()=>this.tab2Change('2')} className={this.state.tab2==='2'?styles.active:null}>遥测数据</span>
                  </div>
                </div>
                <div className={styles.ratio_cont}>
                  <div className={this.state.tab2==='1'?styles.active:null}>
                    <div>

                    </div>
                  </div>
                  <div className={this.state.tab2==='2'?styles.active:null}>
                    <div className={styles.tb_line}>
                      <div>
                        <span onClick={this.showModal}>高压侧a</span>
                        548.67 A
                      </div>|
                      <div>
                        <span onClick={this.showModal}>高压侧a</span>
                        548.67 A
                      </div>|
                      <div>
                        <span onClick={this.showModal}>高压侧a</span>
                        548.67 A
                      </div>
                    </div>
                    <div className={styles.tb_line}>
                      <div>
                        <span onClick={this.showModal}>高压侧a</span>
                        548.67 A
                      </div>|
                      <div>
                        <span onClick={this.showModal}>高压侧a</span>
                        548.67 A
                      </div>|
                      <div>
                        <span onClick={this.showModal}>高压侧a</span>
                        548.67 A
                      </div>
                    </div>
                    <div className={styles.tb_line}>
                      <div>
                        <span onClick={this.showModal}>高压侧a</span>
                        548.67 A
                      </div>|
                      <div>
                        <span onClick={this.showModal}>高压侧a</span>
                        548.67 A
                      </div>|
                      <div>
                        <span onClick={this.showModal}>高压侧a</span>
                        548.67 A
                      </div>
                    </div>
                    <div className={styles.tb_line}>
                      <div>
                        <span onClick={this.showModal}>高压侧a</span>
                        548.67 A
                      </div>|
                      <div>
                        <span onClick={this.showModal}>高压侧a</span>
                        548.67 A
                      </div>|
                      <div>
                        <span onClick={this.showModal}>高压侧a</span>
                        548.67 A
                      </div>
                    </div>
                  </div>
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
