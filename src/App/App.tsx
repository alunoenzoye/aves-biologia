import { Routes } from 'react-router';
import { Route } from 'react-router';
import './App.css';
import HomePage from '../pages/HomePage';
import QuizSelectPage from '../pages/QuizSelectPage';
import QuizPage from '../pages/QuizPage';
import StartPage from '../pages/StartPage';

function App() {
  return (
    <Routes>
      <Route index element={<StartPage />}/>
      <Route path="/home" element={<HomePage />} />
      <Route path="/quiz-select" element={<QuizSelectPage />}/>
      <Route path="/quiz" element={<QuizPage />}/>
    </Routes>
  )
}

export default App
