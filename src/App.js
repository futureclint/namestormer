import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

// API URLs
const API_URL_CATEGORIES = `https://api.fungenerators.com/name/categories.json?start=0&limit=25&api_key=${process.env.REACT_APP_NAME_API_KEY}`;
const API_URL_NAMES_BEG = `https://api.fungenerators.com/name/generate?category=`;
const API_URL_NAMES_END = `&limit=10&api_key=${process.env.REACT_APP_NAME_API_KEY}`;
//const API_URL_AIRTABLE

function App() {

  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState('elf');
  const [randomNames, setRandomNames] = useState([]);
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
  });

  const getRandomNames = async () => {
    const resp = await axios.get(`${API_URL_NAMES_BEG}${category}${API_URL_NAMES_END}`);
    console.log(resp);
    setRandomNames(resp.data.contents.names);
    console.log(`Category is ${category}`);
    console.log(`${API_URL_NAMES_BEG}${category}${API_URL_NAMES_END}`);
  }

  // Fetch new names on submit
  const handleSubmit = async (ev) => {
    // Prevent default form function
    ev.preventDefault();
    // Retrieve new random names
    getRandomNames();
    // Flip the value in state that triggers the API call
    setToggleFetch(!toggleFetch);
  }

  return (
    <div className="App">
      <h1>Namestormer</h1>

      <hr />

      {/* Display list of categories */}
      <ul>
      {categoryList.map((category) => (
        <li>{category.name}</li>
      ))}
      </ul>

      <hr />

      {/* Form: Get Names */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="dropdown">Choose a category:</label>
        <br />
        <select name="dropdown" onChange={(ev) => setCategory(ev.target.value)}>
          {categoryList.map((category) => (
            <option value={category.name}>{category.name}</option>
          ))}
        </select>
        <br />
        <button type="submit">Get Names</button>
      </form>

      {/* Output random names */}
      <ul>
        {randomNames.map((name) => (
          <li>{name}</li>
        ))}
      </ul>

    </div>
  );
}

export default App;
