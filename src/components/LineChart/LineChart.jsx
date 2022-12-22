import React from "react";
import { Line } from "react-chartjs-2";
import { Row, Col, Typography } from "antd";
import moment from "moment/moment";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "./LineChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ coinHistory, currentPrice, coinName, timePeriod }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);

    if (
      timePeriod === "1h" ||
      timePeriod === "3h" ||
      timePeriod === "12h" ||
      timePeriod === "24h"
    ) {
      coinTimestamp.push(
        moment.unix(coinHistory?.data?.history[i].timestamp).format("HH:mm A")
      );
    } else if (timePeriod === "7d" || timePeriod === "30d") {
      coinTimestamp.push(
        moment.unix(coinHistory?.data?.history[i].timestamp).format("DD-MMM")
      );
    } else if (timePeriod === "3m" || timePeriod === "1y") {
      coinTimestamp.push(
        moment.unix(coinHistory?.data?.history[i].timestamp).format("MMM-YYYY")
      );
    } else {
      coinTimestamp.push(
        moment.unix(coinHistory?.data?.history[i].timestamp).format("YYYY-MMM")
      );
    }
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      // showing label in top
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${coinName} Price Chart`,
      },
    },
    scales: {
      x: {
        // reverse chart line
        reverse: true,
        reverseStacks: true,
        ticks: {
          callback: function (val, index) {
            // Hide every 2nd tick label
            return index % 2 === 0 ? this.getLabelForValue(val) : "";
          },
        },
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Typography.Title level={2} className="chart-title">
          {coinName} Price Chart
        </Typography.Title>
        <Col className="price-container">
          <Typography.Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Typography.Title>
          <Typography.Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Typography.Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
