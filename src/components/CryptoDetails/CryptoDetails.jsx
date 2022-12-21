import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Row, Col, Typography, Select } from "antd";

import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import Loader from "../Loader/Loader";

import "./CryptoDetails.css";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../../services/cryptoApi";
import LineChart from "../LineChart/LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("24h");
  const {
    data: coin,
    isFetching,
    isLoading,
  } = useGetCryptoDetailsQuery(coinId);

  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const cryptoDetails = coin?.data?.coin;

  if (!isLoading) {
    console.log("cryptoDetails:", cryptoDetails);
    console.log("coinHistory:", coinHistory);
  }

  if (isFetching) return <Loader />;

  const time = ["1h", "3h", "12h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        coin?.data?.coin["24hVolume"] && millify(coin?.data?.coin["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {coin?.data?.coin.name} ({coin?.data?.coin.symbol})
        </Title>
        <p>
          {coin?.data?.coin.name} live price in USD. View value statistics,
          market cap and supply
        </p>
      </Col>
      <Select
        defaultValue="24h"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>

      {/* line chart */}
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(coin?.data?.coin.price)}
        coinName={coin?.data?.coin.name}
        timePeriod={timePeriod}
      />

      {/* statistics */}
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {coin?.data?.coin.name} Value Statistics
            </Title>
            <p>An overview showing the stats of {coin?.data?.coin.name}</p>
          </Col>
          {stats.map(({ icon, title, value }, i) => (
            <Col className="coin-stats" key={i}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>

        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Statistics
            </Title>
            <p>An overview showing the stats of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({ icon, title, value }, i) => (
            <Col className="coin-stats" key={i}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>

      <Col className="coin-desc-link">
        {/* description */}
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {coin?.data?.coin.name}?
          </Title>

          {coin?.data?.coin.description ? (
            HTMLReactParser(coin?.data?.coin.description)
          ) : (
            <p style={{ color: "green", fontSize: "1rem" }}>
              Loading description for {coin?.data?.coin.name}
            </p>
          )}
        </Row>

        {/* links */}
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {coin?.data?.coin.name} Links
          </Title>
          {coin?.data?.coin.links.map((link, i) => (
            <Row className="coin-link" key={i}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
