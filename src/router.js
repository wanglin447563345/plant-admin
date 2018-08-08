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
  const UserLayout = routerData['/leeland/user'].component;
  const BasicLayout = routerData['/leeland/'].component;
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/leeland/user" component={UserLayout} />
          <AuthorizedRoute
            path="/leeland/"
            render={props => <BasicLayout {...props} />}
            authority={['admin', 'user']}
            redirectPath={getQueryPath('/leeland/user/login', {
              redirect: window.location.href,
            })}
          />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
