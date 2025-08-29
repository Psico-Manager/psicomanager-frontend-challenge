import React, { useState } from 'react';
import {
  LayoutContainer,
  Navbar,
  NavbarBrand,
  NavbarMenu,
  NavbarItem,
  MainContainer,
  Sidebar,
  SidebarMenu,
  SidebarItem,
  Content,
  SidebarIcon,
  SidebarText,
} from './Layout.styles';
import {
  Users,
  Calendar,
  FileText,
  Settings,
  Building2,
  Megaphone,
  Banknote,
  Gauge,
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onOpenFinanceiroModal?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onOpenFinanceiroModal }) => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems = [
    { id: 'painel', label: 'Painel', icon: Gauge },
    { id: 'clientes', label: 'Pacientes', icon: Users },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'financeiro', label: 'Financeiro', icon: Banknote },
    { id: 'marketing', label: 'Relatórios', icon: Megaphone },
    { id: 'relatorios', label: 'Relatórios', icon: FileText },
    { id: 'configuracoes', label: 'Configuração', icon: Settings },
    { id: 'mihna_clinica', label: 'Minha Clinica', icon: Building2 },
  ];

  const navbarItems = [
    { id: 'perfil', label: 'Meu Perfil' },
    { id: 'sair', label: 'Sair' },
  ];

  const handleMenuItemClick = (itemId: string) => {
    // Se for o item de financeiro e tiver uma função para abrir o modal, chama ela
    if (itemId === 'financeiro' && onOpenFinanceiroModal) {
      onOpenFinanceiroModal();
      return;
    }
    
    // Caso contrário, apenas atualiza o item ativo
    setActiveItem(itemId);
  };

  return (
    <LayoutContainer>
      <Navbar>
        <NavbarBrand>PsicoManager</NavbarBrand>
        <NavbarMenu>
          {navbarItems.map((item) => (
            <NavbarItem key={item.id} href='#'>
              {item.label}
            </NavbarItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <MainContainer>
        <Sidebar>
          <SidebarMenu>
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeItem === item.id;
              const isHovered = hoveredItem === item.id;
              
              return (
                <SidebarItem
                  key={item.id}
                  className={`${isActive ? 'active' : ''} ${isHovered ? 'hover' : ''}`}
                  onClick={() => handleMenuItemClick(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <SidebarIcon>
                    <IconComponent size={20} />
                  </SidebarIcon>
                  <SidebarText>{item.label}</SidebarText>
                </SidebarItem>
              );
            })}
          </SidebarMenu>
        </Sidebar>

        <Content>{children}</Content>
      </MainContainer>
    </LayoutContainer>
  );
};

export default Layout;
