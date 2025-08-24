import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ModalWizard from "./components/ModalWizard";

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleFinanceiroClick = () => {
    setShowModal(true);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onFinanceiroClick={handleFinanceiroClick} />

      <main style={{ flex: 1, padding: "2rem" }}>
        <h1>Bem-vindo ao sistema</h1>
        {showModal && <ModalWizard onClose={() => setShowModal(false)} />}
      </main>
    </div>
  );
}

export default App;