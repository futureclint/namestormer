import { useState } from 'react';
import Header from './components/Header.js';
import SectionHeader from './components/SectionHeader.js';
import GenerateNamesForm from './components/GenerateNamesForm.js';
import WorkingNamesList from './components/WorkingNamesList.js';
import Footer from './components/Footer.js';
import './App.css';

function App() {

  // State variables
  const [toggleFetch, setToggleFetch] = useState(true);

  return (
    <div className="app-wrapper">

      <Header />

      <main>

        {/* Section: Generate Names */}
        <section className="generate-names">
          <SectionHeader title={'Generate Names'} />
          <div className="section-body">
            <GenerateNamesForm
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
