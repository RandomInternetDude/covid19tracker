
import React, { useEffect, useState } from "react";
import {MenuItem, FormControl, Select, Card, CardContent} from '@material-ui/core';
import Infobox from './components/Infobox';
import Table from './components/Table';
import Map from './components/Map';
import {sortData} from "./components/Utils";
import './App.css';
import LineGraph from "./components/LineGraph";


// https://disease.sh/v3/covid-19/countries


function App() {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData]= useState([]);
  const [casesType, setCasesType] = useState("cases");


  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data=>{
      setCountryInfo(data);
    })
  },[])




useEffect(()=>{
  // runs one time when app loads
  
  const getCountriesData = async () => {
   await fetch("https://disease.sh/v3/covid-19/countries")
   .then((response) => response.json())
   .then((data)=>{
    const countries = data.map((country) => ({
      name: country.country,
      value: country.countryInfo.iso2,
      
    }));
    const sortedData = sortData(data)
    setCountries(countries)
    setTableData(sortedData)
   })
  }
  getCountriesData();
},[])

const onCountryChange = async (e) => {
  const countryCode = e.target.value;



  const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

  await fetch(url)
  .then((response)=>response.json())
  .then((data)=>{
    setInputCountry(countryCode);
    setCountryInfo(data);
    // setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
    // setMapZoom(4);
  });
};

  return (
    <div className="app">
      <div className="app__left">
        <div className='app__header'>
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant='outlined' value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}

            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
              <Infobox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}  onClick={(e) => setCasesType("cases")} />
              <Infobox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}  onClick={(e) => setCasesType("recovered")} />
              <Infobox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}  onClick={(e) => setCasesType("deaths")} />
        </div>
          <Map />
        </div>
        <Card className="app__right">
          <CardContent>
            <h3>Live Cases by Country</h3>
                <Table countries={tableData} />
            <h3>WorldWide new cases</h3>
                <LineGraph casesType={casesType} />
          </CardContent>
        </Card>
    </div>
  );
}

export default App;
