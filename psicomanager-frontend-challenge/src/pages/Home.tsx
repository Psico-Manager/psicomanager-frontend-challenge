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
          padding: "2rem",
        }}
      >
        {successMessage && (
          <div
            style={{
              position: "fixed",
              bottom: "2rem",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#4caf50",
              color: "#fff",
              padding: "1rem 2rem",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              zIndex: 1000,
              fontSize: "1.2rem",
            }}
          >
            {successMessage}
          </div>
        )}

        <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#333" }}>
          Financeiro
        </h1>

        {!showCelebration ? (
          <button
            onClick={handleOpenModal}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.1rem",
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            Ativar PsicoBank
          </button>
        ) : (
          <div
            style={{
              marginTop: "1rem",
              fontSize: "1.2rem",
              color: "#4caf50",
              fontWeight: "bold",
            }}
          >
            <ul
  style={{
    listStyle: "none",
    padding: 0,
    display: showCelebration ? "none" : "block",
  }}
>
  <li style={{ marginBottom: "1rem" }}>🏦 Dashboard</li>
  <li style={{ marginBottom: "1rem" }}>💳 Pagamentos</li>
  <li style={{ marginBottom: "1rem" }}>📊 Relatórios</li>
</ul>
          </div>
        )}
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