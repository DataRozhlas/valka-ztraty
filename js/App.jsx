import React, { useEffect, useState } from "react";
import d3 from "./d3Importer.js";
import MultipleSelect from "./MultipleSelect.jsx";

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
    const translatedType = slovnicek.filter((s) => s[0] === d.type);
    console.log(translatedType);
    return {
      ...d,
      type: translatedType,
    };
  });
  return prelozenaData;
};

const slovnicek = [
  ["All Types", "Všechny druhy zbraní "],
  ["Tanks", "Tanky"],
  ["Armoured Fighting Vehicles", "Obrněná bojová vozidla"],
  ["Infantry Fighting Vehicles", "Bojová vozidla pěchoty"],
  ["Armoured Personnel Carriers", "Obrněné transportéry"],
  ["Mine-Resistant Ambush Protected", "Vozidla MRAP s ochranou proti minám"],
  ["Infantry Mobility Vehicles", "Lehká obrněná vozidla"],
  ["Communications Stations", "Spojovací technika"],
  ["Engineering Vehicles And Equipment", "Ženijní technika"],
  ["Anti-Tank Guided Missiles", "Protitankové řízené střely"],
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
    "All Types",
    "Tanks",
    "Unmanned Aerial Vehicles",
  ]);

  useEffect(async () => {
    const data = await getData(
      "https://data.irozhlas.cz/valka-ztraty/data/totals_by_type.csv"
    );
    const result = translateData(data, slovnicek);
    setData(result);
  }, []);

  return (
    <div>
      <MultipleSelect data={data} vybrane={vybrane} setVybrane={setVybrane} />
    </div>
  );
}
export default App;
