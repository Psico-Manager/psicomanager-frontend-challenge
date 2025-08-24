import React from "react";

interface SidebarProps {
  onFinanceiroClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onFinanceiroClick }) => {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Painel</h2>

      <button disabled style={styles.disabled}>Clientes</button>
      <button disabled style={styles.disabled}>Agenda</button>

      <button onClick={onFinanceiroClick} style={styles.active}>
        Financeiro
      </button>

      <button disabled style={styles.disabled}>Relatórios</button>
      <button disabled style={styles.disabled}>Marketing</button>
      <button disabled style={styles.disabled}>Configuração</button>
      <button disabled style={styles.disabled}>Minha Clínica</button>
    </div>
  );
};

const styles = {
  sidebar: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.75rem",
    padding: "1rem",
    backgroundColor: "#f8f8f8",
    height: "100vh",
    width: "220px",
    borderRight: "1px solid #ddd",
  },
  title: {
    fontSize: "1.2rem",
    marginBottom: "1rem",
    fontWeight: "bold",
  },
  active: {
    padding: "0.75rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textAlign: "left" as const,
  },
  disabled: {
    padding: "0.75rem",
    backgroundColor: "#e0e0e0",
    color: "#888",
    border: "none",
    borderRadius: "4px",
    cursor: "not-allowed",
    textAlign: "left" as const,
  },
};

export default Sidebar;