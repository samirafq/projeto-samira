import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const apiUrl = "https://u52aw2xgj3.execute-api.us-east-1.amazonaws.com/dev";

  const [id, setId] = useState("");
  const [telefone, setTelefone] = useState("");
  const [alunos, setAlunos] = useState("");
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState("");

  // Buscar todos os itens
  const fetchItems = async () => {
    try {
      const res = await axios.get(`${apiUrl}/items`);
      setItems(res.data || []);
    } catch (error) {
      setMsg("Erro ao carregar itens.");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Criar ou atualizar item (PUT)
  const salvarItem = async () => {
    if (!id.trim()) {
      setMsg("ID é obrigatório.");
      return;
    }
    try {
      const body = {
        id: id.trim(),
        telefone: telefone.trim(),
        alunos: alunos
          .split(",")
          .map((a) => a.trim())
          .filter((a) => a.length > 0),
      };
      await axios.put(`${apiUrl}/items`, body);
      setMsg("Item salvo com sucesso!");
      limparCampos();
      fetchItems();
    } catch {
      setMsg("Erro ao salvar item.");
    }
  };

  // Excluir item
  const excluirItem = async (idExcluir) => {
    try {
      await axios.delete(`${apiUrl}/items/${idExcluir}`);
      setMsg(`Item "${idExcluir}" excluído.`);
      fetchItems();
    } catch {
      setMsg("Erro ao excluir item.");
    }
  };

  const limparCampos = () => {
    setId("");
    setTelefone("");
    setAlunos("");
    setMsg("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 p-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">
          🎓 Cadastro de Responsáveis e Alunos
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="ID (obrigatório)"
            className="border rounded-lg px-4 py-2"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Telefone (opcional)"
            className="border rounded-lg px-4 py-2"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Alunos (separados por vírgula)"
            className="border rounded-lg px-4 py-2"
            value={alunos}
            onChange={(e) => setAlunos(e.target.value)}
          />
        </div>

        <div className="flex gap-4 mb-6 flex-wrap justify-center">
          <button
            onClick={salvarItem}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow"
          >
            Salvar
          </button>
          <button
            onClick={limparCampos}
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg shadow"
          >
            Limpar
          </button>
        </div>

        {msg && (
          <div className="mb-4 text-center text-indigo-700 font-semibold">{msg}</div>
        )}

        <div className="space-y-4">
          {items.length === 0 && (
            <p className="text-gray-500 text-center">Nenhum item cadastrado.</p>
          )}
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-sky-50 border-l-4 border-indigo-300 p-4 rounded-md shadow-sm"
            >
              <div><b>ID:</b> {item.id}</div>
              <div><b>Telefone:</b> {item.telefone || "—"}</div>
              <div>
                <b>Alunos:</b>{" "}
                {Array.isArray(item.alunos) ? item.alunos.join(", ") : "—"}
              </div>
              <button
                onClick={() => excluirItem(item.id)}
                className="mt-2 text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
