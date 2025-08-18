import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Home from './pages/Home.jsx';
import AddIncome from './pages/AddIncome.jsx';
import AddExpense from './pages/AddExpense.jsx';
import Reports from './pages/Reports.jsx';
import UpdateIncome from './pages/UpdateIncome.jsx';
import UpdateExpense from './pages/UpdateExpense.jsx';

const App = ()=> {
  return (
    <div className="flex">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reportes" element={<Reports />} />
          <Route path="/agregar-ingreso" element={<AddIncome />} />
          <Route path="/ingreso/:id" element={<UpdateIncome />} />
          <Route path="/agregar-egreso" element={<AddExpense />} />
          <Route path="/egreso/:id" element={<UpdateExpense />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
