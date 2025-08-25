import { useState } from "react";
import ModalWizard from "../components/ModalWizard";
import Congratscreen from '../components/CongratScreen';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCelebration] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [successMessage, setSuccessMessage] = useState("");
  setSuccessMessage("🎉 Cadastro realizado com sucesso!");

  return (
    <div style={{ height: "100vh", display: "flex", backgroundColor: "#f5f5f5" }}>
      {/* ASIDE à esquerda */}
     <aside
        style={{
          width: "250px",
          backgroundColor: "#1976d2",
          color: "#fff",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Menu</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: "1rem" }}>🏦 Dashboard</li>
          <li style={{ marginBottom: "1rem" }}>💳 Pagamentos</li>
          <li style={{ marginBottom: "1rem" }}>📊 Relatórios</li>
        </ul>
      </aside>

      {/* CONTEÚDO CENTRAL */}
    <main
  style={{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem", // reduzido
  }}
>
  {successMessage && (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#4caf50",
        color: "#fff",
        padding: "0.5rem 1rem",
        borderRadius: "6px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        zIndex: 1000,
        fontSize: "1rem",
      }}
    >
      {successMessage}
    </div>
  )}

  <h1
    style={{
      fontSize: "1.5rem",
      marginBottom: "0.75rem",
      color: "#333",
    }}
  >
    Financeiro
  </h1>

  {!showCelebration ? (
    <button
      onClick={handleOpenModal}
      style={{
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
        backgroundColor: "#1976d2",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      Ativar PsicoBank
    </button>
  ) : (
    <div
      style={{
        marginTop: "0.75rem",
        fontSize: "1rem",
        color: "#4caf50",
        fontWeight: "bold",
      }}
    >
      {/* Conteúdo de celebração aqui */}
    </div>
  )}

  <ul
    style={{
      listStyle: "none",
      padding: 0,
      display: showCelebration ? "none" : "block",
    }}
  >
    {/* Itens da lista aqui */}
  </ul>
</main>


      {/* MODAL */}
{isModalOpen && (
  <div style={{ /* estilos do modal */ }}>
    <div style={{ /* estilos internos */ }}>
      <ModalWizard onClose={handleCloseModal} />
      <Congratscreen
        onClose={() => {
          setIsModalOpen(false); // fecha o modal

        }}
      />
    </div>
  </div>
)}

    </div>
  );
}