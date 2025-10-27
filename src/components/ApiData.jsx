import React, { useEffect, useState } from 'react';
import Button from './Button';

const ApiData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = data.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <p className="text-gray-500 dark:text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">API Data (Posts)</h2>
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
      />
      <ul className="grid gap-4 md:grid-cols-2">
        {filtered.map((post) => (
          <li key={post.id} className="p-4 border dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
            <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApiData;
