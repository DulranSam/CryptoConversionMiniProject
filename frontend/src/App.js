import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [btc, setBTC] = useState([]);
  const [conversion, setConversion] = useState({
    crypto: "",
    currency: "",
  });

  useEffect(() => {
    async function byDefault() {
      try {
        const response = await Axios.get("http://localhost:8000/home");
        setBTC(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    byDefault();
  }, []);

  async function sendFromFrontend(e) {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await Axios.get("http://localhost:8000/home", {
        params: { crypto: conversion.crypto, currency: conversion.currency },
      });

      if (response.status === 200) {
        setBTC(response.data);
      } else {
        console.log("Ran into an error");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <form onSubmit={sendFromFrontend}>
        <input
          onChange={(e) => {
            setConversion((prevConversion) => ({
              ...prevConversion,
              crypto: e.target.value,
            }));
          }}
          placeholder="Enter Crypto Currency"
        ></input>
        <input
          onChange={(e) => {
            setConversion((prevConversion) => ({
              ...prevConversion,
              currency: e.target.value,
            }));
          }}
          placeholder="Enter Money Currency"
        ></input>
        <button type="submit">{loading ? "Loading..." : "Fetch Data!"}</button>
      </form>
      <p>{JSON.stringify(btc)}</p>
    </div>
  );
}

export default App;
