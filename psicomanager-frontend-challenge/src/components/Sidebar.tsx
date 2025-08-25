import React from "react";

interface SidebarProps {
  onFinanceiroClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onFinanceiroClick }) => {
  return (
    <div style={styles.sidebar}>
      <SidebarButton icon="📋" label="Painel" disabled />
      <SidebarButton icon="👥" label="Clientes" disabled />
      <SidebarButton icon="📅" label="Agenda" disabled />
      <SidebarButton icon="💰" label="Financeiro" active onClick={onFinanceiroClick} />
      <SidebarButton icon="📈" label="Relatórios" disabled />
      <SidebarButton icon="📣" label="Marketing" disabled />
      <SidebarButton icon="⚙️" label="Configuração" disabled />
      <SidebarButton icon="🏥" label="Minha Clínica" disabled />
    </div>
  );
};

interface SidebarButtonProps {
  icon: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  label,
  active = false,
  disabled = false,
  onClick,
}) => {
  const style = active
    ? styles.active
    : disabled
    ? styles.disabled
    : styles.default;

  return (
    <button style={style} onClick={onClick} disabled={disabled}>
      <div style={styles.icon}>{icon}</div>
      <div style={styles.label}>{label}</div>
    </button>
  );
};

const styles = {
  sidebar: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    padding: "1rem",
    backgroundColor: "#f8f8f8",
    height: "100vh",
    width: "220px",
    borderRight: "1px solid #ddd",
    alignItems: "center",
  },
  icon: {
    fontSize: "1.5rem",
    marginBottom: "0.25rem",
  },
  label: {
    fontSize: "0.75rem",
    textAlign: "center" as const,
  },
  active: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "1rem",
    width: "100%",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },
  disabled: {
    backgroundColor: "#e0e0e0",
    color: "#888",
    border: "none",
    borderRadius: "8px",
    padding: "1rem",
    width: "100%",
    cursor: "not-allowed",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },
  default: {
    backgroundColor: "#fff",
    color: "#333",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "1rem",
    width: "100%",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },
};

export default Sidebar;