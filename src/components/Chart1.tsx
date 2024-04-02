import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";


const Chart1 = () => {

  const chartContainer = useRef<HTMLDivElement>(null);
  const myChart = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (chartContainer.current) {
      myChart.current = echarts.init(chartContainer.current, null, {
        renderer: 'canvas',
        useDirtyRect: false,
      });

      const option: echarts.EChartsOption = {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: [
            'Expansion',
            'Replacement',
            'Involuntary Turnover',
            'Voluntary Turnover',
            'Discrepancies',
            'Net Change',
          ],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'Placeholder',
            type: 'bar',
            stack: 'Total',
            silent: true,
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent',
            },
            emphasis: {
              itemStyle: {
                borderColor: 'transparent',
                color: 'transparent',
              },
            },
            data: [0, 379, 587, 355, 355, 0],
          },
          {
            name: 'Income',
            type: 'bar',
            stack: 'Total',
            color: 'rgb(155 235 180)',
            label: {
              show: true,
              position: 'top',
              color: 'rgb(155 235 180)',
              formatter: '+{c}',
            },
            data: [
              379,
              326,
              '-',
              '-',
              { value: 7, itemStyle: { color: 'gray' }, label: { color: 'gray' } },
              { value: 362, itemStyle: { color: 'rgb(190 220 253)' }, label: { color: 'rgb(190 220 253)' } }, ,
            ],
          },
          {
            name: 'Expenses',
            type: 'bar',
            stack: 'Total',
            color: 'rgb(244 171 170)',
            label: {
              show: true,
              position: 'bottom',
              color: 'rgb(244 171 170)',
              formatter: '-{c}',
            },
            data: ['-', '-', 118, 232, '-', '-'],
          },
        ],
      };

      if (option && myChart.current) {
        myChart.current.setOption(option);
      }

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (myChart.current) {
          myChart.current.dispose();
        }
      };
    }
  }, []);

  const handleResize = () => {
    if (myChart.current) {
      myChart.current.resize();
    }
  };
  return (<>
    <div ref={chartContainer} style={{ width: '90%', height: '68vh' }}/>
  </>);
}

export default Chart1