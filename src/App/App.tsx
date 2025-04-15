import { Routes } from 'react-router';
import { Route } from 'react-router';
import './App.css';
import StartPage from '../pages/StartPage';
import QuizSelectPage from '../pages/QuizSelectPage';
import QuizPage from '../pages/QuizPage';

function App() {
  return (
    <Routes>
      <Route index element={<StartPage />}/>
      <Route path="/quiz-select" element={<QuizSelectPage />}/>
      <Route path="/quiz" element={<QuizPage />}/>
    </Routes>
  )
}

export default App
