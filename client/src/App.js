import './App.css';
import { Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import Form from './components/Form/Form'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Form /> }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
