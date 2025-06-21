import React, { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://u52aw2xgj3.execute-api.us-east-1.amazonaws.com/samira-dev/items";

  const fetchItems = () => {
    setLoading(true);
    setError(null);
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao carregar os dados da API.");
        return response.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreate = () => {
    setError(null);
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Item criado com sucesso!");
        fetchItems();
        setId("");
        setName("");
      })
      .catch((err) => {
        alert("Erro ao criar item: " + err.message);
        setError(err.message);
      });
  };

  const handleUpdate = () => {
    setError(null);
    fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Item atualizado com sucesso!");
        fetchItems();
        setId("");
        setName("");
      })
      .catch((err) => {
        alert("Erro ao atualizar item: " + err.message);
        setError(err.message);
      });
  };

  const handleDelete = (deleteId) => {
    setError(null);
    fetch(`${API_URL}/${deleteId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Item excluído com sucesso!");
        fetchItems();
      })
      .catch((err) => {
        alert("Erro ao excluir item: " + err.message);
        setError(err.message);
      });
  };

  if (loading) return <p>Carregando dados...</p>;
  if (error) return <p className="text-red-500">Erro: {error}</p>;

  return (
    <div className="text-white bg-gray-900 min-h-screen p-10 font-sans">
      <h1 className="text-3xl font-bold mb-6">CRUD com AWS</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800 text-white"
        />
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800 text-white"
        />
        <button onClick={handleCreate} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
          Criar
        </button>
        <button onClick={handleUpdate} className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded">
          Atualizar
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Lista de Itens da API</h2>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="bg-gray-800 p-3 rounded flex justify-between items-center">
            <span>
              <strong>ID:</strong> {item.id} | <strong>Nome:</strong> {item.name}
            </span>
            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

