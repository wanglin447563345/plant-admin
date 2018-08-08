import React, { Component } from 'react';
import { Chart, Axis, Tooltip, Geom, Legend } from 'bizcharts';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import autoHeight from '../autoHeight';
import styles from '../index.less';

@autoHeight()
class Bar extends Component {
  state = {
    autoHideXLabels: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  handleRoot = n => {
    this.root = n;
  };

  handleRef = n => {
    this.node = n;
  };

  @Bind()
  @Debounce(400)
  resize() {
    if (!this.node) {
      return;
    }
    const canvasWidth = this.node.parentNode.clientWidth;
    const { data = [], autoLabel = true } = this.props;
    if (!autoLabel) {
      return;
    }
    const minWidth = data.length * 30;
    const { autoHideXLabels } = this.state;

    if (canvasWidth <= minWidth) {
      if (!autoHideXLabels) {
        this.setState({
          autoHideXLabels: true,
        });
      }
    } else if (autoHideXLabels) {
      this.setState({
        autoHideXLabels: false,
      });
    }
  }

  render() {
    const {
      height,
      forceFit = true,
      data,
      color = 'name',
      padding,
      type,
    } = this.props;

    const { autoHideXLabels } = this.state;

    const scale = {
      x: {
        type: 'cat',
      },
      y: {
        min: 0,
      },
    };

    const tooltip = [
      '月份*月均降雨量',
      (x, y) => ({
        name: x,
        value: y,
      }),
    ];

    return (
      <div className={styles.chart} style={{ height }} ref={this.handleRoot}>
        <div ref={this.handleRef}>
          <Chart
            scale={scale}
            height={height}
            forceFit={forceFit}
            data={data}
            padding={padding || 'auto'}
          >
            <Legend
              position='bottom'
            />
            <Axis
              name="月份"
              title={false}
              label={autoHideXLabels ? false : {}}
              tickLine={autoHideXLabels ? false : {}}
            />
            <Axis name="月均降雨量" min={0} />
            <Tooltip showTitle={false} crosshairs={false} />
            <Geom type={type}  position="月份*月均降雨量" color={color} tooltip={tooltip} adjust={[{type : "dodge",marginRatio: 1 / 32}]} />
          </Chart>
        </div>
      </div>
    );
  }
}

export default Bar;
