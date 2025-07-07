import { Link } from 'react-router';


import 'bootstrap/dist/css/bootstrap.css';
const Header = () => {
  return (
    <>
      <header>
        <nav className='navbar navbar-expand-lg  bg-light'>
          <ul className="nav">
            <li className='nav-item d-flex flex-row justify-content-between'>
              <Link className="nav-link" to="/">Bookshelf</Link>
              <Link className="nav-link" to="/json">JsonForm</Link>
              <Link className="nav-link" to="/apps">App</Link>
              <Link className="nav-link" to="/userForm">UserForm</Link>
              <Link className="nav-link" to="/todolist">TodoList</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );

}

export default Header;