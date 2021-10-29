import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from './components/Header.js';
import GenerateNamesForm from './components/GenerateNamesForm.js';
import Footer from './components/Footer.js';
import './App.css';

// API URLs
const API_URL_CATEGORIES = `https://api.fungenerators.com/name/categories.json?start=0&limit=25&api_key=${process.env.REACT_APP_NAME_API_KEY}`;
const API_URL_NAMES = `https://api.fungenerators.com/name/generate?limit=10&category=`;
const API_URL_AIRTABLE = `https://api.airtable.com/v0/app3x4dnCfUephaZE/Table%201?api_key=${process.env.REACT_APP_AIRTABLE_API_KEY}`;

function App() {

  // State variables
  const [workingNames, setWorkingNames] = useState([]);
  const [toggleFetch, setToggleFetch] = useState(true);

  // Fetch working name list from Airtable
  useEffect(() => {
    const getWorkingNames = async () => {
      const resp = await axios.get(API_URL_AIRTABLE);
      setWorkingNames(resp.data.records);
    }
    getWorkingNames();
  }, [toggleFetch]);

  return (
    <div className="App">

      <Header />

      <main>

        {/* Section: Generate Names */}
        <section className="generate-names">
          <h2>Generate Names</h2>
          <hr />
          <div className="section-body">
            <GenerateNamesForm
              API_URL_CATEGORIES={API_URL_CATEGORIES}
              API_URL_NAMES={API_URL_NAMES}
              API_URL_AIRTABLE={API_URL_AIRTABLE}
              setToggleFetch={setToggleFetch}
              toggleFetch={toggleFetch}
            />
          </div>
        </section>

        {/* Section: Selected Names */}
        <section className="selected-names">
          <h2>Selected Names</h2>
          <hr />
          <div className="section-body">
            { workingNames.length > 0 ?
            <ul>
              {workingNames.map((item, idx) => (
                <li key={idx}>
                  <button className="pill selected">{item.fields.working}</button>
                </li>
              ))}
            </ul>
            : <em>No working names</em> }
          </div>
        </section>

      </main>

      <Footer />

    </div>
  );
}

export default App;
