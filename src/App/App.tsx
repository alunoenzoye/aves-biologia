import { Routes } from 'react-router';
import { Route } from 'react-router';
import './App.css';
import StartPage from '../pages/StartPage';
import QuizSelectPage from '../pages/QuizSelectPage';

function App() {
  return (
    <Routes>
      <Route index element={<StartPage />}/>
      <Route path="/ola" element={<StartPage />}/>
      <Route path="/quiz-select" element={<QuizSelectPage />}/>
    </Routes>
  )
}

export default App
