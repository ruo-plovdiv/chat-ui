import './App.css';
import Header from './components/Header';
import Textarea from './components/Terxtarea';
import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Loader from './components/Loader/Loader';

const App = () => {
  const [conversation, setConversation] = useState([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleChange = (e) => setValue(e.target.value);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    
    setLoading(true);
    setDisabled(true);
    
    // Add user's question to the conversation
    const userQuestion = value;
    setConversation(prev => [...prev, { type: 'question', content: userQuestion }]);
    
    fetch('http://10.254.32.21:8000/search-ollama?q=' + encodeURIComponent(userQuestion))
      .then((response) => response.json())
      .then((result) => {
        setConversation(prev => [...prev, { type: 'answer', content: result.answer }]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setConversation(prev => [...prev, { type: 'answer', content: 'Грешка при извличане на отговор.' }]);
      })
      .finally(() => {
        setDisabled(false);
        setLoading(false);
        setValue('');
      });
  };

  return (
    <div className="App container mt-5">
      <Header />
      <div className="col-md-10 mx-auto">
        <div className="conversation-container mb-4">
        <h3 className='text-center text-muted h5 mb-3'>
          Моля, задайте въпрос, свързан с административни услуги. Примери:
        </h3>
        <ul className="list-group mx-auto mb-5 col-md-8">
          <li className="list-group-item">Признаване на завършен период или клас</li>
          <li className="list-group-item">Заявление за издаване на удостоверение за признаване на завършен период или клас</li>
          <li className="list-group-item">Заявление за издаване на дубликат на удостоверение или уверение за вече признати етапи</li>
        </ul>
          {conversation.map((item, index) => (
            <div 
              key={index} 
              className={`message ${item.type} ${index === conversation.length - 1 && item.type === 'answer' ? 'last-answer' : ''}`}
            >
              <div className="message-content">
                <strong className={`${item.type === 'question' ? 'd-block mt-3' : 'mt-1 d-block '}`}>{item.type === 'question' ? 'Вашият въпрос: ' : 'Отговор: '}</strong>
                {item.type === 'answer' && index === conversation.length - 1 && !loading ? (
                  <p>
                    <TypeAnimation
                    sequence={[item.content]}
                    wrapper="span"
                    speed={50}
                    repeat={0}
                  />
                  </p>
                ) : (
                  item.content
                )}
              </div>
            </div>
          ))}
          {loading && <Loader />}
        </div>
        
        <Textarea
          submit={onSubmitHandler}
          placeholder="Напиши съобщение..."
          value={value}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default App;