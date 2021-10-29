import axios from 'axios';
import { useEffect, useState } from 'react';

// API URL
const API_URL_AIRTABLE = `https://api.airtable.com/v0/app3x4dnCfUephaZE/Table%201?api_key=${process.env.REACT_APP_AIRTABLE_API_KEY}`;

const WorkingNamesList = (props) => {

  // State Variables
  const [workingNames, setWorkingNames] = useState([]);

  // Fetch working name list from Airtable
  useEffect(() => {
    const getWorkingNames = async () => {
      const resp = await axios.get(API_URL_AIRTABLE);
      setWorkingNames(resp.data.records);
    }
    getWorkingNames();
  }, [props.toggleFetch]);

  return (
    <div className="working-names-list">
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
  );
}

export default WorkingNamesList;
