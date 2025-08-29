import styled from 'styled-components';

// Container principal
export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// Navbar
export const Navbar = styled.nav`
  background-color: #f0f0f0;
  color: #090909ff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #b4b4b4ff; /* Borda cinza visível */
`;

export const NavbarBrand = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const NavbarMenu = styled.div`
  display: flex;
  gap: 1rem;
`;

export const NavbarItem = styled.a`
  color: #090909ff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

// Container principal (sidebar + conteúdo)
export const MainContainer = styled.div`
  display: flex;
  flex: 1;
`;

// Sidebar
export const Sidebar = styled.aside`
  width: 80px;
  background-color: #e6e0e0ff;
  padding: 0.5rem;
  border-right: 2px solid #b4b4b4ff; /* Borda cinza visível à direita */
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 150px;
  }
`;

export const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SidebarItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 80%;
  background-color: #ebeaecff;
  color: #060606ff;

  &:hover,
  &.hover {
    background-color: #320285ff;
    color: white;
  }

  &.active {
    background-color: #320285ff;
    color: white;
    border-color: #ebeaecff;
  }
`;

export const SidebarIcon = styled.span`
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SidebarText = styled.span`
  font-size: 0.8rem;
  text-align: center;
`;

// Conteúdo principal
export const Content = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: var(--color-background);
  border-left: 1px solid var(--color-border); /* Borda cinza sutil à esquerda */
`;
