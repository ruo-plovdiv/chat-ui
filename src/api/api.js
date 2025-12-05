
const api = () => {
  const data = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const result = await response.json();
    return result.body;
  }

  return data;
}

export default api;