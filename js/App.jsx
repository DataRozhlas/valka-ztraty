import React, { useEffect, useState, useLayoutEffect } from "react";
import d3 from "./d3Importer.js";
import MultipleSelect from "./MultipleSelect.jsx";
import Graf from "./Graf.jsx";
import Legenda from "./Legenda.jsx";

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
  ["All Types", "Všechny druhy zbraní"],
  ["Tanks", "Tanky"],
  ["Armoured Fighting Vehicles", "Obrněná bojová vozidla"],
  ["Infantry Fighting Vehicles", "Bojová vozidla pěchoty"],
  ["Armoured Personnel Carriers", "Obrněné transportéry"],
  ["Mine-Resistant Ambush Protected", "Vozidla MRAP s ochranou proti minám"],
  ["Infantry Mobility Vehicles", "Lehká obrněná vozidla"],
  ["Communications Stations", "Spojovací technika"],
  ["Engineering Vehicles And Equipment", "Ženijní technika"],
  ["Engineering Vehicles", "Ženijní technika"],
  ["Anti-Tank Guided Missiles", "Protitankové řízené střely"],
  ["Anti-tank Guided Missiles", "Protitankové řízené střely"],
  ["Man-Portable Air Defence Systems", "Přenosné systémy protivzdušné obrany"],
  ["Heavy Mortars", "Těžké minomety"],
  ["Towed Artillery", "Tažená děla"],
  ["Self-Propelled Artillery", "Samohybná děla"],
  ["Multiple Rocket Launchers", "Raketomety"],
  ["Anti-Aircraft Guns", "Protiletadlové kanóny"],
  ["Self-Propelled Anti-Aircraft Guns", "Samohybné protiletadlové kanóny"],
  ["Surface-To-Air Missile Systems", "Raketové systémy země-vzduch"],
  ["Radars", "Radary"],
  ["Jammers And Deception Systems", "Rušičky"],
  ["Aircraft", "Letadla"],
  ["Helicopters", "Vrtulníky"],
  ["Unmanned Aerial Vehicles", "Drony"],
  ["Naval Ships", "Námořní lodě"],
  ["Logistics Trains", "Zásobovací vlaky"],
  ["Trucks, Vehicles and Jeeps", "Nákladní auta, vozidla a džípy"],
];

function App() {
  const [data, setData] = useState([]);
  const [vybrane, setVybrane] = useState([
    "Všechny druhy zbraní",
    "Tanky",
    "Bojová vozidla pěchoty",
  ]);
  const [maxLength, setMaxLength] = useState(2020);

  useEffect(async () => {
    const data = await getData(
      "https://data.irozhlas.cz/valka-ztraty/data/totals_by_type.csv"
    );
    const result = translateData(data, slovnicek);
    setData(result);
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
      <Legenda />
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
    </div>
  );
}
export default App;
