
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from "./page/user/UserSignUpForm";
import NavigationBar from './page/navbar/NavigationBar'
import AddMoment from './page/moment/AddMoment'
import ListMoment from './page/moment/ListMoment'
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <Router>
        <div className="NavigationBar">
          <NavigationBar />
        </div>
        <div className="MainContent">
          <Routes>
            <Route path="/" element={<SignUpForm />} />
            <Route path="/add-user" element={<SignUpForm />} />
            <Route path="/add-moment" element={<AddMoment />} />
            <Route path="/list-moment" element={<ListMoment />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
