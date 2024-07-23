// src/App.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const App = () => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'names'));
      const namesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNames(namesList);
    };

    fetchData();
  }, []);

  const incrementNumber = async (id, currentNumber) => {
    const newNumber = currentNumber + 1;
    const nameRef = doc(db, 'names', id);
    await updateDoc(nameRef, { number: newNumber });
    setNames(names.map(name => name.id === id ? { ...name, number: newNumber } : name));
  };

  const renderNames = (number, color) => {
    return (
      <div style={{ backgroundColor: color, padding: '10px', marginBottom: '10px' }}>
        {names.filter(name => name.number === number).map(name => (
          <button key={name.id} onClick={() => incrementNumber(name.id, name.number)}>
            {name.name} ({name.number})
          </button>
        ))}
      </div>
    );
  };

  const renderNamesGreaterThanOrEqualTo = (number, color) => {
    return (
      <div style={{ backgroundColor: color, padding: '10px', marginBottom: '10px' }}>
        {names.filter(name => name.number >= number).sort((a, b) => b.number - a.number).map(name => (
          <button key={name.id} onClick={() => incrementNumber(name.id, name.number)}>
            {name.name} ({name.number})
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Names Counter</h1>
      {renderNames(1, 'lightgreen')}
      {renderNames(2, 'yellow')}
      {renderNames(3, 'red')}
      {renderNamesGreaterThanOrEqualTo(4, 'black')}
    </div>
  );
};

export default App;

/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
