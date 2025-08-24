// src/pages/Home.tsx
import { useState } from "react";
import ModalWizard from "../components/ModalWizard";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bem-vindo ao PsicoBank</h1>
      <button onClick={handleOpenModal}>Ativar PsicoBank</button>

      {showModal && <ModalWizard onClose={handleCloseModal} />}
    </div>
  );
};

export default Home;