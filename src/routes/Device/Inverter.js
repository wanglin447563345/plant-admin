import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Cookie from 'js-cookie'
import { routerRedux } from 'dva/router';
import {
  Table,
  Tooltip,
  Button,
  Pagination,
} from 'antd';

import styles from '../List/PlantList.less';

@connect(({ inverter_list }) => ({
  inverter_list,
}))

export default class TableList extends PureComponent {
  state = {
    tabKey:"1",
  };

  // 逆变器列表
  get_inverter_list=(params)=>{
    const { dispatch } = this.props;
    dispatch({
      type:"inverter_list/inverter_list",
      payload:{
        plant_id:sessionStorage.getItem("plant_id"),
        ...params,
      },
    })
  }

  // 分页
  change_page = (current,pageSize) => {
    Cookie.set('default_size',pageSize,{ expires: 7 });
    this.get_inverter_list({ page:current,rows:pageSize})
  };

  // 显示总条数
  showTotal= (total)=> {
    return `共 ${total} 条`;
  };

  componentDidMount() {
    this.get_inverter_list({page:1,rows:Cookie.get("default_size")||10})
  }

  render() {

    const columns = [
      { title: '名称', width: 120, dataIndex: 'inverter_name', key: 'inverter_name', fixed: 'left' },
      { title: '装机容量(kWh)', dataIndex: 'installed_capacity', key: 'installed_capacity' },
      { title: '品牌', dataIndex: 'brand', key: 'brand' },
      { title: '型号', dataIndex: 'model', key: 'model' },
      { title: '输入功率(W)', dataIndex: 'power', key: 'power' },
      { title: '输出功率(W)', dataIndex: 'dc_power', key: 'dc_power' },
      { title: '效率', dataIndex: 'efficiency', key: 'efficiency' },
      { title: '今日发电量(kWh)', dataIndex: 'todays_energy', key: 'todays_energy' },
      { title: '累计发电量(kWh)', dataIndex: 'total_energy', key: 'total_energy' },
      { title: '今日满发(h)', dataIndex: 'todays_full_power_hours', key: 'todays_full_power_hours' },
      { title: '累计满发(h)', dataIndex: 'total_full_power_hours', key: 'total_full_power_hours' },
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
              sessionStorage.setItem("inverter_id",record.inverter_id);
              this.props.dispatch(routerRedux.push(`/center/detail/device/inverter-raw`))
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

    const {inverter_list}=this.props;
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
          <div className={this.state.tabKey==="3"?styles.active:null} onClick={()=>selectTab("3")}>
            <span>1</span>
            <p>
              <span className={styles.red}>●</span>停运
            </p>
          </div>
          </Tooltip>
          <Tooltip placement="bottomLeft" title={'asdasd'}>
          <div className={this.state.tabKey==="4"?styles.active:null} onClick={()=>selectTab("4")}>
            <span>1</span>
            <p>
              <span className={styles.orange}>●</span>性能偏低
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
          <Tooltip placement="bottomLeft" title={'asdasd'}>
          <div className={this.state.tabKey==="7"?styles.active:null} onClick={()=>selectTab("7")}>
            <span>1</span>
            <p>
              其他
            </p>
          </div>
          </Tooltip>
        </div>
        <Table
          columns={columns}
          dataSource={inverter_list.data.list}
          rowKey='inverter_id'
          pagination={false}
          scroll={{ x: 1200 }}
          onRow={(record) => {
            return {
              onClick: () => {
                sessionStorage.setItem("inverter_id",record.inverter_id);
                this.props.dispatch(routerRedux.push(`/center/detail/device/inverter-detail`)) // 要使用这个重新加载整个页面，使左边导航的的数据变化
              },       // 点击行
            };
          }}
        />
        <div style={{marginTop:15,marginBottom:20,textAlign:"right"}}>
          <Pagination
            showQuickJumper
            showSizeChanger
            defaultPageSize={Cookie.get('default_size')||10}
            pageSizeOptions={["10","20","50","100"]}
            current={inverter_list.data.pagination.current}
            total={inverter_list.data.pagination.total}
            onChange={this.change_page}
            onShowSizeChange={this.change_page}
            showTotal={this.showTotal}
          />
        </div>
      </div>
    );
  }
}
