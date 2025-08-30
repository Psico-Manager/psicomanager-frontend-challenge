import styled from 'styled-components';

// Container principal
export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

// Navbar
export const Navbar = styled.nav`
  background-color: #f0f0f0;
  color: #090909ff;
  padding: 1rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #b4b4b4ff;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`

export const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  flex: 1;
  min-width: 0;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`

export const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const NavbarBrand = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

export const ClientSearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 300px;

  @media (max-width: 768px) {
    display: none;
  }
`

export const ClientSearchSelect = styled.select`
  padding: 0.5rem 2rem 0.5rem 2.5rem;
  border: 1px solid #d1d1d1;
  border-radius: 20px;
  background-color: #f8f8f8;
  font-size: 1rem;
  min-width: 150px;
  appearance: none;
  cursor: pointer;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #a0a0a0;
    box-shadow: 0 0 0 2px rgba(160, 160, 160, 0.2);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 1.5rem 0.4rem 2rem;
    font-size: 0.9rem;
    min-width: 120px;
  }
`

export const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  color: #666;
  pointer-events: none;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    left: 8px;
  }
`

export const DropdownIcon = styled.span`
  position: absolute;
  right: 12px;
  color: #666;
  pointer-events: none;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    right: 8px;
  }
`

export const NavbarMenu = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    gap: 0.5rem;
    overflow-x: auto;
  }
`

export const NavbarItem = styled.a`
  color: #090909ff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.6rem;
  }
`

export const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ff4444;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
    font-size: 8px;
    top: -4px;
    right: -4px;
  }
`

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #cccccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #666666;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 12px;
  }
`

export const AvatarDropdownIcon = styled.span`
  position: absolute;
  bottom: -5px;
  right: -5px;
  background-color: #ffffff;
  border: 1px solid #d1d1d1;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 14px;
    height: 14px;
    bottom: -4px;
    right: -4px;
  }
`

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 1000;
  margin-top: 10px;

  @media (max-width: 768px) {
    min-width: 160px;
    right: 0;
    left: auto;
  }
`

export const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }

  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 0.9rem;
  }
`

// Container principal (sidebar + conteúdo)
export const MainContainer = styled.div`
  display: flex;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

// Sidebar
export const Sidebar = styled.aside`
  width: 80px;
  background-color: #e6e0e0ff;
  padding: 0.5rem;
  border-right: 2px solid #b4b4b4ff;
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    min-height: auto;
    border-right: none;
    border-bottom: 2px solid #b4b4b4ff;
    padding: 0.25rem;
  }
`

export const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: row;
    overflow-x: auto;
    padding: 0.25rem 0;
  }
`

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

  @media (max-width: 768px) {
    margin-bottom: 0;
    margin-right: 0.5rem;
    padding: 0.5rem;
    width: auto;
    min-width: 70px;
  }
`

export const SidebarIcon = styled.span`
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    margin-bottom: 0.1rem;
  }
`

export const SidebarText = styled.span`
  font-size: 0.8rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`

// Conteúdo principal
export const Content = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: var(--color-background);
  border-left: 1px solid var(--color-border);

  @media (max-width: 768px) {
    padding: 1rem;
    border-left: none;
    border-top: 1px solid var(--color-border);
  }
`