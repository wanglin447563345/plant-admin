import React from 'react';
import { Chart, Geom, Axis, Coord, Guide, Shape } from 'bizcharts';
import autoHeight from '../autoHeight';

const { Arc, Html, Line } = Guide;



Shape.registerShape('point', 'pointer', {
  drawShape(cfg, group) {
    let point = cfg.points[0];
    point = this.parsePoint(point);
    const center = this.parsePoint({
      x: 0,
      y: 0,
    });
    group.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: cfg.x,
        y2: cfg.y,
        stroke: cfg.color,
        lineWidth: 2,
        lineCap: 'round',
      },
    });
    return group.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 6,
        stroke: cfg.color,
        lineWidth: 3,
        fill: '#fff',
      },
    });
  },
});

@autoHeight()
export default class Gauge extends React.Component {
  render() {
    const {
      f_color,
      height,
      percent,
      forceFit = true,
      color = ['#0086FA', '#FFBF00', '#F5222D'],
      bgColor = '#F0F2F5',
    } = this.props;
    const title = this.props.title||'';
    const cols = {
      value: {
        type: 'linear',
        min: 0,
        max: 10,
        tickInterval: 1,
        nice: false,
      },
    };
    const data = [{ value: percent / 10 }];
    return (
      <Chart height={height} data={data} scale={cols} padding={[-16, 0, 16, 0]} forceFit={forceFit}>
        <Coord type="polar" startAngle={-1 * Math.PI} endAngle={0 * Math.PI} radius={0.8} />
        <Axis name="1" line={null} />
        <Axis
          line={null}
          tickLine={null}
          subTickLine={null}
          name="value"
          zIndex={2}
          gird={null}
          label={{
            offset: -6,
            textStyle: {
              fontSize: 12,
              fill: '#CBCBCB',
              textAlign: 'center',
              textBaseline: 'middle',
            },
          }}
        />
        <Guide>
          <Line
            start={[3, 0.905]}
            end={[3, 0.85]}
            lineStyle={{
              stroke: color,
              lineDash: null,
              lineWidth: 2,
            }}
          />
          <Line
            start={[5, 0.905]}
            end={[5, 0.85]}
            lineStyle={{
              stroke: color,
              lineDash: null,
              lineWidth: 3,
            }}
          />
          <Line
            start={[7, 0.905]}
            end={[7, 0.85]}
            lineStyle={{
              stroke: color,
              lineDash: null,
              lineWidth: 3,
            }}
          />
          <Arc
            zIndex={0}
            start={[0, 0.965]}
            end={[10, 0.965]}
            style={{
              stroke: bgColor,
              lineWidth: 10,
            }}
          />
          {
            data[0].value>=4 && <Arc
              zIndex={1}
              start={[0, 0.965]}
              end={[4, 0.965]}
              style={{
                stroke: color[0],
                lineWidth: 10,
              }}
            />
          }
          {
            data[0].value>=8 && <Arc
              zIndex={1}
              start={[4, 0.965]}
              end={[8, 0.965]}
              style={{
                stroke: color[1],
                lineWidth: 10,
              }}
            />
          }
          {
            data[0].value>8 && data[0].value<=10 && <Arc
            zIndex={1}
            start={[8, 0.965]}
            end={[data[0].value, 0.965]}
            style={{
            stroke: color[2],
            lineWidth: 10,
          }}
            />
          }
          {
            data[0].value>4 && data[0].value<=8 && <Arc
              zIndex={1}
              start={[4, 0.965]}
              end={[data[0].value, 0.965]}
              style={{
                stroke: color[1],
                lineWidth: 10,
              }}
            />
          }
          {
            data[0].value<4 && <Arc
              zIndex={1}
              start={[0, 0.965]}
              end={[data[0].value, 0.965]}
              style={{
                stroke: color[0],
                lineWidth: 10,
              }}
            />
          }

          <Html
            position={['50%', '75%']}
            html={() => {
              return `
                <div style="width: 100px;text-align: center;font-size: 12px!important;">
                  <p style="font-size: 14px;color: ${f_color};margin: 0;">
                    ${data[0].value * 10}%
                  </p>
                  <p style="margin-top: 20px; font-size: 16px">${title}</p>
                </div>`;
            }}
          />
        </Guide>
        <Geom
          line={false}
          type="point"
          position="value*1"
          shape="pointer"
          color={color}
          active={false}
        />
      </Chart>
    );
  }
}
