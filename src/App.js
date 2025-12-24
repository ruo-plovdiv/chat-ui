import './App.css';
import Header from './components/Header';
import Textarea from './components/Terxtarea';
import api from './api/api';
import { useEffect, useState } from 'react';
import Skeleton from './components/Skeleton';
import { TypeAnimation } from 'react-type-animation';




const App = () => {
  const getData = api();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData('началник').then((res) => setData(res)).catch((err) => console.log(err)).finally(() => setLoading(false));
    console.log('fetching data...', data);
  }, []);

  return (
    <div className="App container mt-5">
      <Header />
      {loading ? <Skeleton /> : <p>{data && <TypeAnimation sequence={[data, ]} wrapper="span" speed={50} repeat={0} />}</p>}
      <Textarea />
    </div>
  );
}

export default App;
