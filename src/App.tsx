import React from 'react';
import './styles.css';
import Hangman from './components/Hangman';

const App: React.FC = () => {
  return (
    <div className="App">
      <Hangman />
    </div>
  );
};

export default App;