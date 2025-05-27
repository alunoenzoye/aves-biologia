import { Routes } from 'react-router';
import { Route } from 'react-router';
import './App.scss';
import HomePage from '../pages/HomePage';
import QuizSelectPage from '../pages/QuizSelectPage';
import QuizPage from '../pages/QuizPage';
import StartPage from '../pages/StartPage';
import CatalogPage from '../pages/CatalogPage';

function App() {
  return (
    <Routes>
      <Route index element={<StartPage />}/>
      <Route path="/home" element={<HomePage />} />
      <Route path="/quiz-select" element={<QuizSelectPage />}/>
      <Route path="/quiz" element={<QuizPage />}/>
      <Route path="/avedex" element={<CatalogPage />}></Route>
    </Routes>
  )
}

export default App
