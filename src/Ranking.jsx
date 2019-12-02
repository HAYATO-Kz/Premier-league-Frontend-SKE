import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Table } from "antd";
import { getJson, getSeasonCode } from "./helper";

const teamTableColumn = [
  { title: "Rank", dataIndex: "ranking", key: "ranking", width: "150px" },
  {
    title: "Logo",
    dataIndex: "logo",
    key: "logo",
    width: "150px",
    render: (name, row) => (
      <img width="75px" height="75px" src={`${row.teamLogo}`} />
    )
  },
  { title: "Team", dataIndex: "teamName", key: "team" },
  {
    title: "Win",
    dataIndex: "win",
    key: "win",
    width: "100px",
    align: "center"
  },
  {
    title: "Lose",
    dataIndex: "loss",
    key: "loss",
    width: "100px",
    align: "center"
  },
  {
    title: "Draw",
    dataIndex: "draw",
    key: "draw",
    width: "100px",
    align: "center"
  },
  {
    title: "Goals Difference",
    dataIndex: "goalsDiff",
    key: "goalsDiff",
    width: "150px",
    align: "center"
  },
  {
    title: "Points",
    dataIndex: "points",
    key: "points",
    width: "150px",
    align: "center"
  }
];

const Ranking = props => {
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    const { year } = props;
    const seasonCode = getSeasonCode(year);

    async function anyNameFunction() {
      const data = await getJson(
        `http://0.0.0.0:8080/premier-api/teamBySeason/${seasonCode}`
      );
      setRankingData(data);
    }
    anyNameFunction();
  }, [props.year]);

  return (
    <Table
      columns={teamTableColumn}
      dataSource={rankingData}
      title={() => <span>Year {props.year}</span>}
      pagination={false}
      onRow={(record, rowIndex) => {
        return {
          onClick: event => {
            window.location.href = `team/${record.teamId}`;
          }
        };
      }}
    />
  );
};

export default Ranking;
