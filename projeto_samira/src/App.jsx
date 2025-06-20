import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const apiUrl = "https://u52aw2xgj3.execute-api.us-east-1.amazonaws.com/dev";

  const [id, setId] = useState("");
  const [telefone, setTelefone] = useState("");
  const [alunos, setAlunos] = useState("");
  const [resultado, setResultado] = useState("");
  const [items, setItems] = useState([]);

  // GET
  const buscarItems = async () => {
    try {
      const response = await axios.get(`${apiUrl}/items`);
      setItems(response.data);
    } catch (error) {
      console.error("Erro ao buscar itens", error);
      setResultado("Erro ao buscar itens.");
    }
  };

  useEffect(() => {
    buscarItems();
  }, []);

  // POST
  const criarItem = async () => {
    try {
      const body = {
        id,
        telefone,
        alunos: alunos.split(",").map((a) => a.trim()),
      };
      await axios.post(`${apiUrl}/items`, body);
      setResultado("Item criado com sucesso!");
      limparCampos();
      buscarItems();
    } catch (error) {
      console.error("Erro ao criar item", error);
      setResultado("Erro ao criar item.");
    }
  };

  // PUT
  const atualizarItem = async () => {
    try {
      const body = {
        id,
        telefone,
        alunos: alunos.split(",").map((a) => a.trim()),
      };
      await axios.put(`${apiUrl}/${id}`, body);
      setResultado("Item atualizado com sucesso!");
      limparCampos();
      buscarItems();
    } catch (error) {
      console.error("Erro ao atualizar item", error);
      setResultado("Erro ao atualizar item.");
    }
  };

  // DELETE
  const deletarItem = async () => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setResultado("Item deletado com sucesso!");
      limparCampos();
      buscarItems();
    } catch (error) {
      console.error("Erro ao deletar item", error);
      setResultado("Erro ao deletar item.");
    }
  };

  const limparCampos = () => {
    setId("");
    setTelefone("");
    setAlunos("");
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: 20,
        borderRadius: 10,
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        backgroundColor: "#fefefe",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>
        Lista de Itens Cadastrados
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          marginBottom: 20,
        }}
      >
        <input
          style={{
            padding: 10,
            fontSize: 16,
            borderRadius: 5,
            border: "1px solid #ccc",
            outline: "none",
          }}
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <input
          style={{
            padding: 10,
            fontSize: 16,
            borderRadius: 5,
            border: "1px solid #ccc",
            outline: "none",
          }}
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />

        <input
          style={{
            padding: 10,
            fontSize: 16,
            borderRadius: 5,
            border: "1px solid #ccc",
            outline: "none",
          }}
          type="text"
          placeholder="Alunos (separados por vírgula)"
          value={alunos}
          onChange={(e) => setAlunos(e.target.value)}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 20,
        }}
      >
        <button
          onClick={criarItem}
          style={{
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: 5,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Criar
        </button>

        <button
          onClick={atualizarItem}
          style={{
            backgroundColor: "#2196f3",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: 5,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Atualizar
        </button>

        <button
          onClick={deletarItem}
          style={{
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: 5,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Deletar
        </button>

        <button
          onClick={buscarItems}
          style={{
            backgroundColor: "#555",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: 5,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Buscar
        </button>
      </div>

      <div style={{ textAlign: "center", marginBottom: 20, minHeight: 24 }}>
        <strong>{resultado}</strong>
      </div>

      <div>
        <h2 style={{ borderBottom: "1px solid #ccc", paddingBottom: 10 }}>
          Itens no banco:
        </h2>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {items.length === 0 && (
            <li style={{ color: "#999" }}>Nenhum item encontrado.</li>
          )}
          {items.map((item, index) => (
            <li
              key={index}
              style={{
                backgroundColor: "#fafafa",
                padding: 15,
                marginBottom: 10,
                borderRadius: 6,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <b>ID:</b> {item.id} | <b>Telefone:</b> {item.telefone || "-"} |{" "}
              <b>Alunos:</b>{" "}
              {Array.isArray(item.alunos) ? item.alunos.join(", ") : "-"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
