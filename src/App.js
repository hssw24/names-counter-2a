// src/App.js
import React, { useEffect, useState } from 'react';
import { collection, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebaseConfig';
import './App.css';

const App = () => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'names'), (snapshot) => {
      const namesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNames(namesList);
    });

    return () => unsubscribe();  // Cleanup listener on unmount
  }, []);

  const incrementNumber = async (id, currentNumber) => {
    const newNumber = currentNumber + 1;
    const nameRef = doc(db, 'names', id);
    await updateDoc(nameRef, { number: newNumber });
  };

  const renderNames = (filterCondition, color) => {
    return (
      <div style={{ backgroundColor: color, padding: '10px', marginBottom: '10px' }}>
        {names.filter(filterCondition).map(name => (
          <button
            key={name.id}
            onClick={() => incrementNumber(name.id, name.number)}
            style={{ margin: '5px' }}
          >
            {name.name} ({name.number})
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Names Counter</h1>
      {renderNames(name => name.number === 1, 'lightgreen')}
      {renderNames(name => name.number === 2, 'yellow')}
      {renderNames(name => name.number === 3, 'red')}
      {renderNames(name => name.number >= 4, 'black')}
      {renderNames(name => name.number === 0, 'white')}
    </div>
  );
};

export default App;