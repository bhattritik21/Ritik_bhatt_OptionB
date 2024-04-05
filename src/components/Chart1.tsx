import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

const Chart1 = ({ jsonData }: any) => {
  const [data, setData] = useState([]);

  const chartContainer = useRef<HTMLDivElement>(null);
  const myChart = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (jsonData) {
      try {
        const rawData: any = JSON.parse(jsonData);
        let value: any = rawData.data;
        let numbers: any = [];
        let stringKey: any = null;
        Object.keys(value[0]).forEach((key) => {
          if (typeof value[0][key] === "number") {
            numbers.push(key);
          }
          if (typeof value[0][key] === "string") {
            stringKey=key;
          }
        });
    
        const processedData = value.map((val: any) => {
          const sub: number = val[numbers[1]] - val[numbers[0]];
          const category: string = val[stringKey];
          return { ...val,category,sub };
        });

        setData(processedData);
    
      } catch (e) {
        console.log(e);
      }
    }
  }, [jsonData]);

  useEffect(() => {
    if (chartContainer.current && data.length > 0) {
      myChart.current = echarts.init(chartContainer.current, null, {
        renderer: "canvas",
        useDirtyRect: false,
      });

      let placeholders: any = [];
      let catLabel: any = [];
      let incomes: any = [];
      let sum = 0;
      let totalSum = 0;
      data.forEach((element: any, index: Number) => {
        totalSum += element.sub;
      });
      let modifiedData: any = data;

      if (totalSum < 0) {
        modifiedData = data.map((e: any) => {
          e.sub /= -1;
          return e;
        });
      }
      modifiedData.sort((a: any, b: any) => {
        if (a.sub < b.sub) {
          return 1;
        }
        if (a.sub > b.sub) {
          return -1;
        }
        return 0;
      });

      modifiedData.forEach((element: any, index: Number) => {
        incomes.push(Math.abs(element.sub));
        catLabel.push(element.category);
        if (index === 0) {
          placeholders.push(0);
        } else {
          if (element.sub > 0) {
            placeholders.push(sum);
          } else if (element.sub < 0) {
            placeholders.push(sum + element.sub);
          }
        }
        sum += element.sub;
      });

      incomes.push(placeholders[modifiedData.length - 1]);
      placeholders.push(0);
      catLabel.push("Total");
      
      const option: echarts.EChartsOption = {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: catLabel,
          axisLabel: {
            interval: 0, 
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Placeholder",
            type: "bar",
            stack: "Total",
            silent: true,
            itemStyle: {
              borderColor: "transparent",
              color: "transparent",
            },
            emphasis: {
              itemStyle: {
                borderColor: "transparent",
                color: "transparent",
              },
            },
            data: placeholders,
          },
          {
            name: "Income",
            type: "bar",
            stack: "Total",
            itemStyle: {
              borderColor: "transparent",
              color: (params: any) => {
                const DI = params.dataIndex;
                const ele: any = modifiedData[DI];
                if (ele) {
                  if (ele.sub < 0) {
                    return totalSum < 0 ? "green" : "red";
                  } else {
                    return totalSum < 0 ? "red" : "green";
                  }
                }
                return totalSum < 0 ? "red" : "green";
              },
              
            },
            label: {
              show: true,
              position: "top",
              formatter: (params: any) => {
                return "$" + Number(params.value).toFixed(2);
              },
            },
            data: incomes,
          },
        ],
      };

      if (option && myChart.current) {
        myChart.current.setOption(option);
      }

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (myChart.current) {
          myChart.current.dispose();
        }
      };
    }
  }, [data]);

  const handleResize = () => {
    if (myChart.current) {
      myChart.current.resize();
    }
  };
  return (
    <>
      <div ref={chartContainer} style={{ width: "90%", height: "68vh" }} />
    </>
  );
};

export default Chart1;
