import axios from 'axios';

const RandomNamesList = (props) => {

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
    <div className="random-names-list">
      {/* Output random names */}
      { props.randomNames.length > 0 ?
      <ul>
        {props.randomNames.map((name, idx) => (
          <li key={idx}>
            <button className="pill generated" onClick={(ev) => addWorkingName(name)}>{name}</button>
          </li>
        ))}
      </ul>
      : <em>To start generate some random names</em> }
    </div>
  );
}

export default RandomNamesList;
