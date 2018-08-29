import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import { getQueryPath } from './utils/utils';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/center/user'].component;
  const BasicLayout = routerData['/center/'].component;
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/center/user" component={UserLayout} />
          <AuthorizedRoute
            path="/center/"
            render={props => <BasicLayout {...props} />}
            authority={['admin', 'user']}
            redirectPath={getQueryPath('/center/user/login')}
          />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
