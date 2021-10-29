import axios from 'axios';
import { useEffect, useState } from 'react';

const GenerateNamesForm = (props) => {

  // State Variables
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('elf');
  const [randomNames, setRandomNames] = useState([]);

  // Fetch category list on page load
  // NOTE: only retrieves the first 25 categories, but there are more
  // TODO: retrieve remaining categories and append to array
  useEffect(() => {
    const getCategories = async () => {
      const resp = await axios.get(props.API_URL_CATEGORIES);
      setCategories(resp.data.contents[0]);
    }
    getCategories();
  }, []);

  // Fetch new random names
  const getRandomNames = async () => {
    const resp = await axios.get(props.API_URL_NAMES + category, {
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
    props.setToggleFetch(!props.toggleFetch);
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
    await axios.post(props.API_URL_AIRTABLE, newName).then(props.setToggleFetch(!props.toggleFetch));
  }

  return (
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
            <button className="pill generated" onClick={(ev) => addWorkingName(name)}>{name}</button>
          </li>
        ))}
      </ul>
      : <em>To start generate some random names</em> }

      <input type="submit" value="Generate Random Names" />
    </form>
  );
}

export default GenerateNamesForm;
