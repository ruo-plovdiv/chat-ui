import './App.css';
import Header from './components/Header';
import Textarea from './components/Terxtarea';
import api from './api/api';
import { useEffect, useState } from 'react';
import Skeleton from './components/Skeleton';



const App = () => {
  const getData = api();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData().then((res) => setData(res)).catch((err) => console.log(err)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="App container mt-5">
      <Header />
      {loading ? <Skeleton /> : <p>{data}</p>}
      <Textarea />
    </div>
  );
}

export default App;
