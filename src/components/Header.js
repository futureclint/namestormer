import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1>Namestormer</h1>
      </Link>
      <span className="emoji">&#9889;</span>
    </header>
  );
}

export default Header;
