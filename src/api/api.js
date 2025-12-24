
const api = (param) => {
  const data = async () => {
    const response = await fetch('http://localhost:8000/search-ollama?q=' + param);
    const result = await response.json();
    return result.body;
  }

  return data;
}

export default api;