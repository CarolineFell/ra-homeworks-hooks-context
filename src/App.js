import React, { useState } from 'react';
import Header from './components/Header/Header';
import List from './components/List/List';
import Details from './components/Details/Details';
import useFetchData from './hooks/useFetchData';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserID, setSelectedUserID] = useState(null);

  const [{ data, loading }] = useFetchData(`${process.env.REACT_APP_USERS_URL}/users.json`);
  if (data && (JSON.stringify(users) !== JSON.stringify(data))) {
    setUsers(data);
  }

  return (
    <div className='App'>
      <Header />
      <div className="container">
        { loading && <div className='details'>{'Loading the list...'}</div> }
        <List
          items={users}
          selectedID={selectedUserID}
          onClick={(id) => setSelectedUserID(id)}
        />
        { selectedUserID && <Details info={users.find((o) => o.id === selectedUserID)}/> }
      </div>
    </div>
  );
}

export default App;