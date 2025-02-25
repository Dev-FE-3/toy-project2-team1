import "./App.css";
import Calendar from "./components/calendar/Calendar";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <>
      <div id="sidebar">
        <Outlet />
        <nav>
          <ul>
            <li>
              <Link to={`contacts/1`}>Your Name</Link>
            </li>
            <li>
              <Link to={`contacts/2`}>Your Friend</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default App;
