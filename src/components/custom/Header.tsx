import React, { useCallback, useState, memo } from "react";
import styled from "styled-components";

import { FiSearch, FiChevronDown, FiMenu } from "react-icons/fi";

import { InputBase } from "../ui/InputField";
import pmLogo from "../../assets/psicomanager-logo.png";

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 ${({ theme }) => theme.space(4)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 70px;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 30;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};
`;

const CompanyLogo = styled.img`
  height: 24px;
  object-fit: contain;

  @media (max-width: 900px) {
    display: none;
  }
`;

const MobileMenuIcon = styled.button`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  padding: ${({ theme }) => theme.space(1)};

  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 180px;
  min-width: 120px;
  flex-shrink: 0;

  @media (max-width: 900px) {
    width: 140px;
  }
`;

const SearchInput = styled(InputBase)`
  width: 100%;
  height: 32px;
  font-size: 0.875rem;
  padding-left: 32px;
  padding-right: 32px;
  box-sizing: border-box;
`;

const SearchIconLeft = styled(FiSearch)`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.muted};
  pointer-events: none;
  font-size: 0.875rem;
`;

const DropdownIconRight = styled(FiChevronDown)`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.muted};
  pointer-events: none;
  font-size: 0.875rem;
`;





interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header = memo(function Header({ 
  onMenuClick
}: HeaderProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, []);

  return (
    <HeaderContainer role="banner">
      <LeftSection>
        <CompanyLogo src={pmLogo} alt="Logo PsicoManager" />
        <MobileMenuIcon 
          onClick={onMenuClick}
          aria-label="Abrir menu de navegação"
        >
          <FiMenu />
        </MobileMenuIcon>
        <SearchContainer>
          <SearchInput
            placeholder="Buscar cliente"
            value={searchValue}
            onChange={handleSearchChange}
            aria-label="Buscar cliente"
          />
          <SearchIconLeft aria-hidden="true" />
          <DropdownIconRight aria-hidden="true" />
        </SearchContainer>
      </LeftSection>


    </HeaderContainer>
  );
});
