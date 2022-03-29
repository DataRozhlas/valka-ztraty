import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

function Graf({ v, data, isMobile, maxLength }) {
  const vybranaData = data.filter((d) => d.type === v);
  const Rusko = vybranaData.filter((d) => d.country === "Russia");
  const Ukrajina = vybranaData.filter((d) => d.country === "Ukraine");
  const transpodedData = [
    {
      name: "poškozené",
      data: [
        { y: Rusko[0].damaged, color: "#fee5d9", name: "Rusko" },
        { y: Ukrajina[0].damaged, color: "#eff3ff", name: "Ukrajina" },
      ],
    },
    {
      name: "opuštěné",
      data: [
        { y: Rusko[0].abandoned, color: "#fcae91", name: "Rusko" },
        { y: Ukrajina[0].abandoned, color: "#bdd7e7", name: "Ukrajina" },
      ],
    },
    {
      name: "ukořistěné",
      data: [
        { y: Rusko[0].captured, color: "#fb6a4a", name: "Rusko" },
        { y: Ukrajina[0].captured, color: "#6baed6", name: "Ukrajina" },
      ],
    },
    {
      name: "zničené",
      data: [
        { y: Rusko[0].destroyed, color: "#cb181d", name: "Rusko" },
        { y: Ukrajina[0].destroyed, color: "#2171b5", name: "Ukrajina" },
      ],
    },
  ];

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          title: {
            text: vybranaData[0].type,
            useHTML: true,
          },
          credits: { enabled: false },
          chart: {
            type: "bar",
            height: isMobile ? "40%" : "20%",
          },
          xAxis: {
            categories: ["Rusko", "Ukrajina"],
          },
          yAxis: {
            max: maxLength,
            title: {
              enabled: false,
            },
          },
          legend: {
            enabled: false,
          },
          plotOptions: {
            series: {
              stacking: "normal",
              animation: false,
            },
          },
          series: transpodedData,
        }}
      />
    </div>
  );
}

export default Graf;
