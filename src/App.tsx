import React from 'react';
import QuestionPage from './pages/QuestionPage/QuestionPage';
import { GlobalStyle } from './styles/Global';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <QuestionPage />
    </div>
  );
}

export default App;
