import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

// API URLs
const API_URL_CATEGORIES = `https://api.fungenerators.com/name/categories.json?start=0&limit=25&api_key=${process.env.REACT_APP_NAME_API_KEY}`;
const API_URL_NAMES = `https://api.fungenerators.com/name/generate?limit=10&category=`;
const API_URL_AIRTABLE = `https://api.airtable.com/v0/app3x4dnCfUephaZE/Table%201?api_key=${process.env.REACT_APP_AIRTABLE_API_KEY}`;

function App() {

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('elf');
  const [randomNames, setRandomNames] = useState([]);
  const [workingNames, setWorkingNames] = useState([]);
  const [toggleFetch, setToggleFetch] = useState(true);

  // Fetch category list on page load
  // NOTE: only retrieves the first 25 categories, but there are more
  // TODO: retrieve remaining categories and append to array
  useEffect(() => {
    const getCategories = async () => {
      const resp = await axios.get(API_URL_CATEGORIES);
      setCategories(resp.data.contents[0]);
    }
    getCategories();
  }, [toggleFetch]);

  // Fetch new random names
  const getRandomNames = async () => {
    const resp = await axios.get(API_URL_NAMES + category, {
      headers: {
        'X-Fungenerators-Api-Secret': process.env.REACT_APP_NAME_API_KEY
      }
    });
    setRandomNames(resp.data.contents.names);
  }

  // Handle form submission
  const handleSubmit = (ev) => {
    // Prevent default form function
    ev.preventDefault();
    // Retrieve new random names
    getRandomNames();
    setToggleFetch(!toggleFetch);
  }

  // Add to Airtable (Working)
  const addWorkingName = async (name) => {
    // New API entry
    const newName = {
      records: [
        {
          fields: {
            working: name
          }
        }
      ]
    }
    // Post new API entry
    await axios.post(API_URL_AIRTABLE, newName);
    setToggleFetch(!toggleFetch);
  }

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

      <header>
        <a href="/">
          <h1>Namestormer</h1>
        </a>
      </header>

      <hr />

      {/* Form: Get Names */}
      <h2>Generate Names</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dropdown">Choose a category:</label>
        <select name="dropdown" onChange={(ev) => setCategory(ev.target.value)}>
          {categories.map((category, idx) => (
            <option key={idx} value={category.name}>{category.name}</option>
          ))}
        </select>

        {/* Output random names */}
        { randomNames.length > 0 ?
        <ul>
          {randomNames.map((name, idx) => (
            <li key={idx}>
              <button class="pill generated" onClick={(ev) => addWorkingName(name)}>{name}</button>
            </li>
          ))}
        </ul>
        : <em>To start generate some random names</em> }

        <input type="submit" value="Generate Random Names" />
      </form>

      <hr />

      {/* Display working names */}
      <h2>Selected Names</h2>
      { workingNames.length > 0 ?
      <ul>
        {workingNames.map((item, idx) => (
          <li key={idx}>
            <button class="pill selected">{item.fields.working}</button>
          </li>
        ))}
      </ul>
      : <em>No working names</em> }

      <hr />

      <footer>
        <span>&copy; Clint Gunter</span>
        <span>Random names from <a href="https://fungenerators.com/api/namegen/">Fun Generators</a></span>
      </footer>

    </div>
  );
}

export default App;
