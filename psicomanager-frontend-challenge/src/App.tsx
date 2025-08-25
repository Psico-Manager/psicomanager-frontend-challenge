import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ModalWizard from "./components/ModalWizard";

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleFinanceiroClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar onFinanceiroClick={handleFinanceiroClick} />

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          Financeiro
        </h1>

        <button
          onClick={handleFinanceiroClick}
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

        {showModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            }}
          >
         <div
           style={{
            backgroundColor: "#fff",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            width: "100%",
            maxWidth: "800px", // 👈 mais largo para desktop
            maxHeight: "90vh",
            overflowY: "auto",
            }}
            >

              <ModalWizard onClose={handleCloseModal} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;