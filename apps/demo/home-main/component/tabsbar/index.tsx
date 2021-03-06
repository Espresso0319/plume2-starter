/**
 * Created by Acans angrycans@gmail.com on 2017/3/15
 */
import * as React from 'react';
import { Tabs, Tab } from 'react-toolbox';

import ListView from '../listview';
import VirtualListView from '../virtual-listview';
import PullRefreshList from '../pull-refresh-list';
import InfiniteListView from '../infinite-listview';

/**
 * HomeMain 的tabbar组件
 */

export default class TabsBar extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  render() {
    return (
      <Tabs index={this.state.index} onChange={this.handleTabChange} fixed>
        <Tab label="精选" onActive={this.handleActive}>
          <div>react-toolbox listview</div>
          <ListView />
        </Tab>
        <Tab label="动态" onActive={this.handleActive}>
          <div>preact virtual-list</div>
          <VirtualListView />
        </Tab>
        <Tab label="原创" onActive={this.handleActive}>
          <div>rc-list-view</div>
          <PullRefreshList />
        </Tab>
        <Tab label="无限滚动" onActive={this.handleActive}>
          <div>react-infinite-scroller</div>
          <InfiniteListView />
        </Tab>
      </Tabs>
    );
  }

  handleTabChange = index => {
    this.setState({ index });
  };

  handleActive = () => {
    if (__DEV__) {
      console.log('TabsBar handleActive');
    }
  };
}
