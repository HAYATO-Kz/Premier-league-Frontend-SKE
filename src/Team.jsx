import React, { useEffect, useState } from "react";
import { getJson, sortByProperty } from "./helper";
import { LineChart, Line, XAxis, YAxis, Cell, Tooltip } from "recharts";
import { Row, Select, Col } from "antd";

const { Option } = Select;

const Team = props => {
  const { teamId } = props.match.params;
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [dataType, setDataType] = useState("overallBallPossession");

  useEffect(() => {
    async function fetchData() {
      const fetchData = await getJson(
        `http://0.0.0.0:8080/premier-api/statisticByTeamId/${teamId}`
      );
      const { teamName } = await getJson(
        `http://0.0.0.0:8080/premier-api/teamById/${teamId}`
      );

      setName(teamName);
      setData(fetchData.sort(sortByProperty("year", false)));
    }
    fetchData();
  }, [teamId]);

  const onChange = select => {
    setDataType(select);
  };

  return (
    <div>
      <Row>
        <Col span={5} offset={1}>
          <h1>
            <a href="/">{name}</a>
          </h1>
        </Col>
      </Row>
      <Row>
        <Col span={5} offset={1}>
          <Select
            defaultValue="overallBallPossession"
            style={{ width: 175, marginTop: "30px", marginBottom: "30px" }}
            onChange={onChange}
          >
            <Option key="overallBallPossession">Ball Possession</Option>
            <Option key="overallBlockedShots">Blocked Shot</Option>
            <Option key="overallFouls">Foul</Option>
            <Option key="overallGoalKeeper">Goalkeeper blocked</Option>
            <Option key="overallPassAccurate">Pass Accurate</Option>
            <Option key="overallShotOnGoal">Shot on Goal</Option>
            <Option key="overallTotalPasses">Total Passes</Option>
            <Option key="ranking">Ranking</Option>
          </Select>
        </Col>
      </Row>
      <LineChart width={1300} height={400} data={data}>
        <XAxis dataKey="year" />
        <YAxis />
        {/* <Tooltip content={<CustomTooltip />} /> */}
        <Line dataKey={dataType} barSize={30} fill="#8884d8"></Line>
      </LineChart>
    </div>
  );
};

export default Team;
