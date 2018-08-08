import { isUrl } from '../utils/utils';
const is_detail = Number.parseInt(location.href.indexOf("detail"))

const menuData = is_detail < 0?[
  {
    name: '首页',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '视图',
        path: 'analysis',
      },
    ],
  },
  {
    name: '场站',
    icon: 'table',
    path: 'list',
    children: [
      {
        name: '场站列表',
        path: 'table-list',
      },
    ],
  },
  {
    name: '告警服务',
    icon: 'exclamation-circle-o',
    path: 'warning',
    children: [
      {
        name: '全部告警',
        path: 'all',
        authority: 'admin',
      },
    ],
  },
]:[
  {
    name: '场站',
    icon: 'area-chart',
    path: 'info',
    children: [
      {
        name: '指标',
        path: 'analysis',
      },
    ],
  },
  {
    name: '设备监控',
    icon: 'hdd',
    path: 'device',
    children: [
      {
        name: '逆变器列表',
        path: 'inverter-list',
      },
      {
        name: '直流汇流箱列表',
        path: 'mix-list',
      },
      {
        name: '箱变列表',
        path: 'box-list',
      },
      {
        name: '气象站列表',
        path: 'weather-list',
      },
      {
        name: '电表列表',
        path: 'meter-list',
      },
    ],
  },
  {
    name: '告警服务',
    icon: 'exclamation-circle-o',
    path: 'warning',
    children: [
      {
        name: '所有告警',
        path: 'all',
      },
    ],
  },

];
const Path=is_detail<0?"/leeland/":"/leeland/detail/";
function formatter(data, parentPath= Path, parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
