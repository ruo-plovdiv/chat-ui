import './App.css';
import Header from './components/Header';
import Textarea from './components/Terxtarea';
import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Loader from './components/Loader/Loader';

const App = () => {

  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setValue(e.target.value);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    setLoading(true);

    fetch('http://localhost:8000/search-ollama?q=' + encodeURIComponent(value))
      .then((response) => response.json())
      .then((result) => {
        setData((prevData) => [...prevData, result.answer]);
      })
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => {
        setLoading(false);
        setValue('');
      });
  };

  return (
    <div className="App container mt-5">
      <Header />
      <>
        {data && data.length > 0 && data.slice(0, -1).map((item, idx) => (
          idx === data.length - 2 ? null : <p key={`answer-${idx}`}>{item}</p>
        ))}

        {loading ? (
          <Loader />
        ) : (
          data && data.length > 0 ? (
            <TypeAnimation
              sequence={[data[data.length - 1]]}
              wrapper="p"
              speed={50}
              repeat={0}
              key={`type-${data.length}`}
            />
          ) : null
        )}
      </>
     
      <Textarea
        submit={onSubmitHandler}
        placeholder="Напиши съобщение..."
        value={value}
        onChange={handleChange}
      />
      </div>
  );
}

export default App;
