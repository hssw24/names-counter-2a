// src/App.js
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import './App.css';

const App = () => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchNames = async () => {
      const namesSnapshot = await db.collection('names').get();
      setNames(namesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchNames();
  }, []);

  const incrementCount = (id, currentCount) => {
    db.collection('names').doc(id).update({ count: currentCount + 1 });
  };

  const renderNames = (filterFn, bgColor, sortFn) => {
    return names
      .filter(filterFn)
      .sort(sortFn)
      .map(name => (
        <button
          key={name.id}
          style={{ backgroundColor: bgColor }}
          onClick={() => incrementCount(name.id, name.count)}
        >
          {name.name} ({name.count})
        </button>
      ));
  };

  return (
    <div className="App">
      <div>
        <h2>Alle Namen</h2>
        {renderNames(() => true, 'white', (a, b) => a.name.localeCompare(b.name))}
      </div>
      <div>
        <h2>Namen mit Zahl = 0</h2>
        {renderNames(name => name.count === 0, 'lightgreen', (a, b) => a.name.localeCompare(b.name))}
      </div>
      <div>
        <h2>Namen mit Zahl = 1</h2>
        {renderNames(name => name.count === 1, 'lightgray', (a, b) => a.name.localeCompare(b.name))}
      </div>
      <div>
        <h2>Namen mit Zahl = 2</h2>
        {renderNames(name => name.count === 2, 'yellow', (a, b) => a.name.localeCompare(b.name))}
      </div>
      <div>
        <h2>Namen mit Zahl = 3</h2>
        {renderNames(name => name.count === 3, 'red', (a, b) => a.name.localeCompare(b.name))}
      </div>
      <div>
        <h2>Namen mit Zahl >= 4</h2>
        {renderNames(name => name.count >= 4, 'black', (a, b) => b.count - a.count)}
      </div>
    </div>
  );
};

export default App;
