import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

// API URLs
const API_URL_CATEGORIES = `https://api.fungenerators.com/name/categories.json?start=0&limit=25&api_key=${process.env.REACT_APP_NAME_API_KEY}`;
//const API_URL_NAMES
//const API_URL_AIRTABLE

function App() {

  const [categoryList, setCategoryList] = useState([]);
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

  return (
    <div className="App">
      <h1>Namestormer</h1>

      {/* Display list of categories */}
      <ul>
      {categoryList.map((category) => (
        <li>{category.name}</li>
      ))}
      </ul>

    </div>
  );
}

export default App;
