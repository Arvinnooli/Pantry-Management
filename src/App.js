import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import {Auth} from "./pages/auth/index";
import {ExpenseTracker} from "./pages/expense-tracker/index";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth/>}/>
          <Route path="/expense-tracker" element={<ExpenseTracker/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
