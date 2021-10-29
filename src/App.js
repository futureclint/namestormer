import { useEffect, useState } from 'react';
import Header from './components/Header.js';
import SectionHeader from './components/SectionHeader.js';
import GenerateNamesForm from './components/GenerateNamesForm.js';
import WorkingNamesList from './components/WorkingNamesList.js';
import Footer from './components/Footer.js';
import './App.css';

// API URLs
const API_URL_CATEGORIES = `https://api.fungenerators.com/name/categories.json?start=0&limit=25&api_key=${process.env.REACT_APP_NAME_API_KEY}`;
const API_URL_NAMES = `https://api.fungenerators.com/name/generate?limit=10&category=`;
const API_URL_AIRTABLE = `https://api.airtable.com/v0/app3x4dnCfUephaZE/Table%201?api_key=${process.env.REACT_APP_AIRTABLE_API_KEY}`;

function App() {

  // State variables
  const [toggleFetch, setToggleFetch] = useState(true);

  return (
    <div className="App">

      <Header />

      <main>

        {/* Section: Generate Names */}
        <section className="generate-names">
          <SectionHeader title={'Generate Names'} />
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
          <SectionHeader title={'Selected Names'} />
          <div className="section-body">
            <WorkingNamesList
              API_URL_AIRTABLE={API_URL_AIRTABLE}
              setToggleFetch={setToggleFetch}
              toggleFetch={toggleFetch}
            />
          </div>
        </section>

      </main>

      <Footer />

    </div>
  );
}

export default App;
