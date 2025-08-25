import React from "react";
import styled from "styled-components";
import { FiSearch, FiChevronDown, FiBell, FiMenu } from "react-icons/fi";
import { BsFillCameraVideoFill } from "react-icons/bs";
import groupLogo from "../assets/Group.png";
import { InputBase } from "./primitives/Field";

// Container do Header
const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 60px;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 30;
`;

// Left group: logo/menu + search
const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// Logo
const Logo = styled.img`
  height: 32px;
  object-fit: contain;

  @media (max-width: 900px) {
    display: none;
  }
`;

// Menu icon para mobile
const MenuIcon = styled(FiMenu)`
  display: none;
  font-size: 1.5rem;

  @media (max-width: 900px) {
    display: block;
  }
`;

// Input wrapper
const SearchWrapper = styled.div`
  position: relative;
  width: 180px;
  min-width: 120px; // mobile
  flex-shrink: 0;

  @media (max-width: 900px) {
    width: 140px;
  }
`;

const SmallInput = styled(InputBase)`
  width: 100%;
  height: 28px;
  font-size: 0.875rem;
  padding-left: 28px;
  padding-right: 24px;
  box-sizing: border-box;
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.muted};
  pointer-events: none;
`;

const DropdownIcon = styled(FiChevronDown)`
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.muted};
  pointer-events: none;
`;

// Right group: icons + avatar
const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

// Ícones de ação
const IconButton = styled.button`
  flex-shrink: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// Badge de notificações
const NotificationBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background: red;
  color: white;
  font-size: 0.65rem;
  font-weight: bold;
  padding: 0 4px;
  border-radius: 50%;
`;

// Avatar circular com dropdown
const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 0.875rem;
  font-weight: bold;
  justify-content: center;
  position: relative;
  cursor: pointer;
  margin-right: 4px;
`;

const AvatarDropdown = styled(FiChevronDown)`
  position: absolute;
  right: -6px;
  bottom: -2px;
  font-size: 0.8rem;
`;

export function Header() {
  return (
    <HeaderContainer>
      <LeftGroup>
        <Logo src={groupLogo} alt="Logo" />
        <MenuIcon />
        <SearchWrapper>
          <SmallInput placeholder="Buscar cliente..." />
          <SearchIcon />
          <DropdownIcon />
        </SearchWrapper>
      </LeftGroup>

      <RightGroup>
        <IconButton>
          <BsFillCameraVideoFill />
        </IconButton>

        <IconButton>
          <FiBell />
          <NotificationBadge>2</NotificationBadge>
        </IconButton>

        <AvatarWrapper>
          AB
          <AvatarDropdown />
        </AvatarWrapper>
      </RightGroup>
    </HeaderContainer>
  );
}
