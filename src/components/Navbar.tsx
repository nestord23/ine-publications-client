import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/posts">Gestión de Publicaciones</Link>
      </div>
      <div className="navbar-actions">
        <Link to="/posts/new" className="btn-primary">
          + Nueva publicación
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;