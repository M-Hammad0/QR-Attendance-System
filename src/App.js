import QRScanner from "./Student/QRScanner";
import CourseList from './Teacher/CourseList';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CourseDetails from "./Teacher/CourseDetails";
import LectureDetails from "./Teacher/LectureDetails";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {

  return (
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/qr" element={<QRScanner />} />
        <Route path="courses">
            <Route path="/" element={<CourseList />} />
            <Route path=":slug" element={<CourseDetails />} />
            <Route path=":slug/:slug2" element={<LectureDetails />} />
        </Route>
      </Routes>
    </Router>
  )
      
}

export default App;
