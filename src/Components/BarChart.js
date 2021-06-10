import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

export default function BarChart({ data, chartTitle, xAxisProp, yAxisProp }) {
  return (
    <Paper>
      <Chart data={data}>
        <ArgumentAxis />
        <ValueAxis max={7} />

        <BarSeries valueField={yAxisProp} argumentField={xAxisProp} />
        {chartTitle && <Title text={chartTitle} />}
        <Animation />
      </Chart>
    </Paper>
  );
}
