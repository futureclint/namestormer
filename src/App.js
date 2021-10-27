import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

// API URLs
const API_URL_CATEGORIES = `https://api.fungenerators.com/name/categories.json?start=0&limit=25&api_key=${process.env.REACT_APP_NAME_API_KEY}`;
const API_URL_NAMES_BEG = `https://api.fungenerators.com/name/generate?category=`;
const API_URL_NAMES_END = `&limit=10&api_key=${process.env.REACT_APP_NAME_API_KEY}`;
const API_URL_AIRTABLE = `https://api.airtable.com/v0/app3x4dnCfUephaZE/Table%201?api_key=${process.env.REACT_APP_AIRTABLE_API_KEY}`;

function App() {

  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState('elf');
  const [randomNames, setRandomNames] = useState([]);
  const [workingNameList, setWorkingNameList] = useState([]);
  const [working, setWorking] = useState('');
  const [toggleFetch, setToggleFetch] = useState(true);

  // Fetch category list on page load
  // NOTE: only retrieves the first 25 categories, but there are more
  // TODO: retrieve remaining categories and append to array
  useEffect(() => {
    const getCategoryList = async () => {
      const resp = await axios.get(API_URL_CATEGORIES);
      setCategoryList(resp.data.contents[0]);
    }
    getCategoryList();
  }, [toggleFetch]);

  // Fetch new random names
  const getRandomNames = async () => {
    const resp = await axios.get(`${API_URL_NAMES_BEG}${category}${API_URL_NAMES_END}`);
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
    const getWorkingNameList = async () => {
      const resp = await axios.get(API_URL_AIRTABLE);
      setWorkingNameList(resp.data.records);
    }
    getWorkingNameList();
    console.log(workingNameList);
  }, [toggleFetch]);

  return (
    <div className="App">
      <h1>Namestormer</h1>

      <hr />

      {/* Form: Get Names */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="dropdown">Choose a category:</label>
        <br />
        <select name="dropdown" onChange={(ev) => setCategory(ev.target.value)}>
          {categoryList.map((category, idx) => (
            <option key={idx} value={category.name}>{category.name}</option>
          ))}
        </select>
        <br />

        {/* Output random names */}
        { randomNames.length > 0 ?
        <ul>
          {randomNames.map((name, idx) => (
            <li key={idx}>
              <button onClick={(ev) => addWorkingName(name)}>{name}</button>
            </li>
          ))}
        </ul>
        : <em>To start generate some random names</em> }
        <br />

        <button type="submit">Generate Random Names</button>
      </form>

    </div>
  );
}

export default App;
