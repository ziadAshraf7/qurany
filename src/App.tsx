
import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from './Pages/Home';
import Juz from './Pages/Juz';
import Surah from './Pages/Surah';


function App() {
    return (
      <>
      <Routes>
        <Route path='/' element = {<Home />}/>
        <Route path="surah/:quranIdentifier/:surahNumber" element = {<Surah />} />
        <Route path = "juz/:quranIdentifier/:juzNumber" element = {<Juz />} />
      </Routes> 
      </>
    );
  }





export default App
