import React, { useEffect, useState, useLayoutEffect } from "react";
import d3 from "./d3Importer.js";
import MultipleSelect from "./MultipleSelect.jsx";
import Graf from "./Graf.jsx";
import Legenda from "./Legenda.jsx";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

const isMobile = window.innerWidth < 768;

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const data = d3.csvParse(text, (d) => {
      return {
        country: d.country,
        type: d.equipment_type,
        destroyed: +d.destroyed,
        abandoned: +d.abandoned,
        damaged: +d.damaged,
        captured: +d.captured,
      };
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getUpdated = async (url) => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const translateData = (data, slovnicek) => {
  const prelozenaData = data.map((d) => {
    const translatedType = slovnicek.filter((s) => s[0] === d.type)[0][1];
    return {
      ...d,
      type: translatedType,
    };
  });
  return prelozenaData;
};

const slovnicek = [
  ["all types", "Všechny druhy vojenské techniky"],
  ["tanks", "Tanky"],
  ["armoured fighting vehicles", "Obrněná bojová vozidla"],
  ["infantry fighting vehicles", "Bojová vozidla pěchoty"],
  ["armoured personnel carriers", "Obrněné transportéry"],
  ["mine-resistant ambush protected", "Vozidla MRAP s ochranou proti minám"],
  ["infantry mobility vehicles", "Lehká obrněná vozidla"],
  ["communications stations", "Spojovací technika"],
  ["engineering vehicles and equipment", "Ženijní technika"],
  ["engineering vehicles", "Ženijní technika"],
  ["anti-tank guided missiles", "Protitankové řízené střely"],
  ["anti-tank guided missiles", "Protitankové řízené střely"],
  ["man-portable air defence systems", "Přenosné systémy protivzdušné obrany"],
  ["heavy mortars", "Těžké minomety"],
  ["towed artillery", "Tažená děla"],
  ["self-propelled artillery", "Samohybná děla"],
  ["multiple rocket launchers", "Raketomety"],
  ["anti-aircraft guns", "Protiletadlové kanóny"],
  ["self-propelled anti-aircraft guns", "Samohybné protiletadlové kanóny"],
  ["surface-to-air missile systems", "Raketové systémy země-vzduch"],
  ["radars", "Radary"],
  ["jammers and deception systems", "Rušičky"],
  ["aircraft", "Letadla"],
  ["helicopters", "Vrtulníky"],
  ["unmanned aerial vehicles", "Drony"],
  ["naval ships", "Námořní lodě"],
  ["logistics trains", "Zásobovací vlaky"],
  ["trucks, vehicles and jeeps", "Nákladní auta, vozidla a džípy"],
];

function App() {
  const [data, setData] = useState([]);
  const [vybrane, setVybrane] = useState([
    "Všechny druhy vojenské techniky",
    "Tanky",
    "Bojová vozidla pěchoty",
  ]);
  const [maxLength, setMaxLength] = useState(2020);
  const [updated, setUpdated] = useState("");

  useEffect(async () => {
    const data = await getData(
      "https://data.irozhlas.cz/oryx-cache/totals_by_type.csv"
    );
    const result = translateData(data, slovnicek);
    setData(result);
  }, []);

  useEffect(async () => {
    const data = await getUpdated(
      "https://data.irozhlas.cz/oryx-cache/updated.json"
    );
    setUpdated(
      new Date(data.updated).toLocaleString("cs-CZ", { dateStyle: "short" })
    );
  }, []);

  useLayoutEffect(() => {
    const vybranaData = data.filter((d) => vybrane.includes(d.type));
    const newMax = vybranaData.reduce((acc, curr) => {
      const total =
        curr.destroyed + curr.captured + curr.damaged + curr.abandoned;
      return total > acc ? total : acc;
    }, 0);
    setMaxLength(newMax);
  }, [vybrane, data]);

  return (
    <div>
      <MultipleSelect data={data} vybrane={vybrane} setVybrane={setVybrane} />
      <Legenda isMobile={isMobile} />
      {data.length !== 0 &&
        vybrane.map((v, i) => (
          <Graf
            key={i}
            v={v}
            data={data}
            isMobile={isMobile}
            maxLength={maxLength}
          ></Graf>
        ))}
      <Container>
        <Typography
          variant="caption"
          display="flex"
          sx={{ justifyContent: "flex-end" }}
        >
          Zdroj dat:&nbsp;
          <Link href="https://www.oryxspioenkop.com/2022/02/attack-on-europe-documenting-equipment.html">
            Oryx
          </Link>
          , stav k {updated}
        </Typography>
      </Container>
    </div>
  );
}
export default App;
