import React, { useCallback, memo } from "react";
import styled from "styled-components";
import { RiMegaphoneLine } from "react-icons/ri";
import { AiFillDashboard } from "react-icons/ai";
import { FaBuilding, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { FaFileLines, FaMoneyBill1 } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";

const SidebarContainer = styled.aside`
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.sidebarText};
  padding: ${({ theme }) => theme.space(4)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(3)};
  width: 7rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 100%;

  @media (max-width: 900px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    padding: ${({ theme }) => theme.space(2)} 0;
    min-height: auto;
  }
`;

interface NavigationItemProps {
  $isActive?: boolean;
  $isDisabled?: boolean;
}

const NavigationItem = styled.button<NavigationItemProps>`
  width: 100%;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space(1)};
  background: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.primary : "transparent"};
  color: ${({ theme, $isActive, $isDisabled }) => {
    if ($isDisabled) return theme.colors.muted;
    return $isActive ? "#ffffff" : theme.colors.sidebarMuted;
  }};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: ${({ $isDisabled }) => $isDisabled ? "not-allowed" : "pointer"};
  font-size: 1.25rem;
  transition: all 0.2s ease-in-out;
  position: relative;
  padding: ${({ theme }) => theme.space(2)};

  &:hover:not(:disabled) {
    background: ${({ $isActive, theme }) => 
      $isActive ? theme.colors.primaryHover : "rgba(7, 7, 10, 0.1)"};
    color: ${({ $isActive, theme }) => 
      $isActive ? "#ffffff" : theme.colors.primary};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
  }

  @media (max-width: 900px) {
    min-height: auto;
    height: 50px;
    font-size: 1rem;
    gap: ${({ theme }) => theme.space(0.5)};
  }
`;

const IconWrapper = styled.div`
  font-size: 1.25rem;

  @media (max-width: 900px) {
    font-size: 1.125rem;
  }
`;

const ItemLabel = styled.span`
  font-size: 0.625rem;
  font-weight: 500;
  text-align: center;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;

  @media (max-width: 900px) {
    font-size: 0.5rem;
  }
`;

interface NavigationMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isEnabled: boolean;
}

const navigationItems: NavigationMenuItem[] = [
  { 
    id: "dashboard", 
    label: "Painel", 
    icon: <AiFillDashboard />, 
    isEnabled: false 
  },
  { 
    id: "clients", 
    label: "Clientes", 
    icon: <FaUsers />, 
    isEnabled: false 
  },
  { 
    id: "schedule", 
    label: "Agenda", 
    icon: <FaCalendarAlt />, 
    isEnabled: false 
  },
  { 
    id: "financial", 
    label: "Financeiro", 
    icon: <FaMoneyBill1 />, 
    isEnabled: true 
  },
  { 
    id: "reports", 
    label: "Relatórios", 
    icon: <FaFileLines />, 
    isEnabled: false 
  },
  { 
    id: "marketing", 
    label: "Marketing", 
    icon: <RiMegaphoneLine />, 
    isEnabled: false 
  },
  { 
    id: "settings", 
    label: "Configuração", 
    icon: <IoMdSettings />, 
    isEnabled: false 
  },
  { 
    id: "clinic", 
    label: "Minha clínica", 
    icon: <FaBuilding />, 
    isEnabled: false 
  },
];

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
}

export const Sidebar = memo(function Sidebar({ 
  activeItem = "financial", 
  onItemClick 
}: SidebarProps) {
  const handleItemClick = useCallback((item: NavigationMenuItem) => {
    if (item.isEnabled && onItemClick) {
      onItemClick(item.id);
    }
  }, [onItemClick]);

  return (
    <SidebarContainer role="navigation" aria-label="Menu principal">
      {navigationItems.map((item) => (
        <NavigationItem
          key={item.id}
          $isActive={item.id === activeItem}
          $isDisabled={!item.isEnabled}
          disabled={!item.isEnabled}
          onClick={() => handleItemClick(item)}
          title={item.label}
          aria-label={item.label}
          aria-current={item.id === activeItem ? "page" : undefined}
        >
          <IconWrapper>
            {item.icon}
          </IconWrapper>
          <ItemLabel>
            {item.label}
          </ItemLabel>
        </NavigationItem>
      ))}
    </SidebarContainer>
  );
});
