import styled from "styled-components";
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiCreditCard,
  FiBarChart2,
  FiSettings,
  FiMap,
} from "react-icons/fi";
import { RiMegaphoneLine } from "react-icons/ri";
import { AiFillDashboard } from "react-icons/ai";
import { FaBuilding, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { FaFileLines, FaMoneyBill1 } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";

// Sidebar container
const Aside = styled.aside`
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.sidebarText};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 5rem; // largura fixa pequena, responsiva
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 900px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    padding: 0.5rem 0;
  }
`;

// Item do sidebar
const Item = styled.button<{ active?: boolean }>`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ active }) => (active ? "#334094" : "transparent")};
  color: ${({ theme, active }) =>
    active ? "#fff" : theme.colors.sidebarMuted};

  color: ${({ theme, active }) =>
    active ? "#fff" : theme.colors.sidebarMuted};
  border: none;
  border-radius: 20%;
  cursor: pointer;
  font-size: 1.5rem;
  transition: background 0.2s;

  &:hover {
    background: rgba(79, 70, 229, 0.1);
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: 900px) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.25rem;
  }
`;

// Ícones
const items = [
  { label: "Painel", icon: <AiFillDashboard /> },
  { label: "Clientes", icon: <FaUsers /> },
  { label: "Agenda", icon: <FaCalendarAlt /> },
  { label: "Financeiro", icon: <FaMoneyBill1 /> },
  { label: "Relatórios", icon: <FaFileLines /> },
  { label: "Marketing", icon: <RiMegaphoneLine /> },
  { label: "Configuração", icon: <IoMdSettings /> },
  { label: "Minha clínica", icon: <FaBuilding /> },
];

export function Sidebar() {
  return (
    <Aside>
      {items.map((i) => (
        <Item
          key={i.label}
          active={i.label === "Financeiro"}
          disabled={i.label !== "Financeiro"}
          title={i.label} // tooltip
        >
          {i.icon}
        </Item>
      ))}
    </Aside>
  );
}
