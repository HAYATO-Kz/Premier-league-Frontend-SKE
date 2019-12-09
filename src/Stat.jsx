import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
  LabelList
} from "recharts";
import React from "react";
import { Table, Row, Col, Card } from "antd";
import { getTeamColor } from "./rankColor";
import { sortByProperty } from "./helper";

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return <Card size="small">{payload[0].payload.teamName}</Card>;
  }
  return null;
}

const Ball = props => {
  const { data, dataHeader, dataIndex } = props;

  const teamTableColumn = [
    { title: "Name", dataIndex: "teamName", key: "name", align: "center" },
    {
      title: dataHeader,
      dataIndex: dataIndex,
      key: dataIndex,
      align: "center",
      render: (value, row) => (
        <span> {parseFloat(Math.round(value * 100) / 100).toFixed(2)}</span>
      )
    }
  ];

  function createColor(team) {
    if (team == "none") {
      return <div>No data</div>;
    }
    if (typeof team == "Response") {
      return;
    }

    return (
      <Row>
        <Col
          span={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "60px",
            width: "70px"
          }}
        >
          <Card
            style={{
              backgroundColor: getTeamColor(team.teamId),
              width: "40px",
              height: "40px"
            }}
          />
        </Col>
        <Col span={12}>
          <img height="60px" width="60px" src={team.teamLogo} />
        </Col>
      </Row>
    );
  }

  return (
    <div>
      <BarChart width={1300} height={400} data={data}>
        <XAxis tick={false} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey={dataIndex} barSize={30} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getTeamColor(entry.teamId)} />
          ))}
          <LabelList dataKey="teamName" position="top" />
        </Bar>
      </BarChart>
      <Row>
        <Col span={11} offset={1}>
          <Table
            columns={teamTableColumn}
            pagination={false}
            dataSource={data
              .concat()
              .sort(sortByProperty(dataIndex, true))
              .slice(0, 5)}
          />
        </Col>
        <Col span={11} offset={1}>
          <Row style={{ marginTop: "6px", marginBottom: "6px" }}>
            <Col span={6}>{createColor(data[0] || "none")}</Col>
            <Col span={6}>{createColor(data[1] || "none")}</Col>
            <Col span={6}>{createColor(data[2] || "none")}</Col>
            <Col span={6}>{createColor(data[3] || "none")}</Col>
          </Row>
          <Row style={{ marginTop: "6px", marginBottom: "6px" }}>
            <Col span={6}>{createColor(data[4] || "none")}</Col>
            <Col span={6}>{createColor(data[5] || "none")}</Col>
            <Col span={6}>{createColor(data[6] || "none")}</Col>
            <Col span={6}>{createColor(data[7] || "none")}</Col>
          </Row>
          <Row style={{ marginTop: "6px", marginBottom: "6px" }}>
            <Col span={6}>{createColor(data[8] || "none")}</Col>
            <Col span={6}>{createColor(data[9] || "none")}</Col>
            <Col span={6}>{createColor(data[10] || "none")}</Col>
            <Col span={6}>{createColor(data[11] || "none")}</Col>
          </Row>
          <Row style={{ marginTop: "6px", marginBottom: "6px" }}>
            <Col span={6}>{createColor(data[12] || "none")}</Col>
            <Col span={6}>{createColor(data[13] || "none")}</Col>
            <Col span={6}>{createColor(data[14] || "none")}</Col>
            <Col span={6}>{createColor(data[15] || "none")}</Col>
          </Row>
          <Row style={{ marginTop: "6px", marginBottom: "6px" }}>
            <Col span={6}>{createColor(data[16] || "none")}</Col>
            <Col span={6}>{createColor(data[17] || "none")}</Col>
            <Col span={6}>{createColor(data[18] || "none")}</Col>
            <Col span={6}>{createColor(data[19] || "none")}</Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Ball;
