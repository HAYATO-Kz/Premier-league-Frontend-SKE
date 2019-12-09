import { Row, Col, Select, Tabs, Table } from "antd";
import React, { useState, useEffect } from "react";
import Ball from "./Stat";
import Ranking from "./Ranking";
import { getJson, getSeasonCode } from "./helper";
const { Option } = Select;
const { TabPane } = Tabs;

const Premier = () => {
  let yearOption = [2016, 2017, 2018, 2019];
  const [yearSelected, setYearSelected] = useState(2019);
  const [data, setData] = useState([]);
  const [currentTab, setCurrentTab] = useState("ranking");

  useEffect(() => {
    const seasonCode = getSeasonCode(yearSelected);
    async function anyNameFunction() {
      const fetchData = await getJson(
        `http://0.0.0.0:8080/premier-api/${currentTab}/${seasonCode}`
      );
      await setData(fetchData);
    }
    if (currentTab != "ranking") {
      anyNameFunction();
    }
  }, [currentTab, yearSelected]);

  function selectYear(year) {
    setYearSelected(year);
  }

  const changeTab = key => {
    setCurrentTab(key);
  };

  return (
    <div>
      <Row>
        <Col span={6} offset={2}>
          <Select
            placeholder="select year"
            style={{ width: 135, marginTop: "30px", marginBottom: "30px" }}
            onChange={selectYear}
            defaultValue={2019}
          >
            {yearOption.map(year => (
              <Option value={year}>{year}</Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={22} offset={1} className="card-container">
          <Tabs type="card" onChange={changeTab}>
            <TabPane tab="Ranking" key="ranking">
              <Ranking year={yearSelected} />
            </TabPane>
            <TabPane tab="Shot on Goal" key="shotOnGoalAverageBySeason">
              <Ball
                year={yearSelected}
                data={data}
                dataHeader={"Static"}
                dataIndex={"overallShotOnGoal"}
              />
            </TabPane>
            <TabPane tab="Ball Possession" key="ballPossessionAverageBySeason">
              <Ball
                year={yearSelected}
                data={data}
                dataHeader={"Shot On Goal"}
                dataIndex={"overallBallPossession"}
              />
            </TabPane>
            <TabPane
              tab="Goalkeeper Saves"
              key="goalKeeperSavesAverageBySeason"
            >
              <Ball
                year={yearSelected}
                data={data}
                dataHeader={"Goalkeeper Saves"}
                dataIndex={"overallTeamGoalKeeperBySeason"}
              />
            </TabPane>
            <TabPane tab="Foul" key="foulsAverageBySeason">
              <Ball
                year={yearSelected}
                data={data}
                dataHeader={"Foul"}
                dataIndex={"overallFouls"}
              />
            </TabPane>
            <TabPane tab="Blocked Shot" key="blockedShotsAverageBySeason">
              <Ball
                year={yearSelected}
                data={data}
                dataHeader={"Blocked Shot"}
                dataIndex={"overallBlockedShotsBySeason"}
              />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default Premier;
