import React, { useState, useRef, useEffect } from 'react';
import {
  LayoutContainer,
  Navbar,
  NavbarLeft,
  MenuButton,
  NavbarBrand,
  ClientSearchContainer,
  ClientSearchSelect,
  SearchIcon,
  DropdownIcon,
  NavbarMenu,
  NavbarItem,
  NotificationBadge,
  Avatar,
  AvatarDropdownIcon,
  DropdownMenu,
  DropdownItem,
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
  Search,
  ChevronDown,
  User,
  LogOut,
  Video,
  Bell,
  Menu,
  X,
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onOpenFinanceiroModal?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onOpenFinanceiroModal }) => {
  const [activeItem, setActiveItem] = useState('financeiro');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navbarMenuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { id: 'painel', label: 'Painel', icon: Gauge },
    { id: 'clientes', label: 'Pacientes', icon: Users },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'financeiro', label: 'Financeiro', icon: Banknote },
    { id: 'marketing', label: 'Marketing', icon: Megaphone },
    { id: 'relatorios', label: 'Relatórios', icon: FileText },
    { id: 'configuracoes', label: 'Configuração', icon: Settings },
    { id: 'mihna_clinica', label: 'Minha Clinica', icon: Building2 },
  ];

  const navbarItems = [
    { id: 'video', label: '', icon: Video },
    { id: 'notificacoes', label: '', icon: Bell, hasNotification: true },
  ];

  const avatarDropdownItems = [
    { id: 'perfil', label: 'Meu Perfil', icon: User },
    { id: 'sair', label: 'Sair', icon: LogOut },
  ];

  // Efeito para fechar o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarMenuRef.current &&
        !navbarMenuRef.current.contains(event.target as Node)
      ) {
        setIsAvatarDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Efeito para lidar com mudanças no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize(); // Verifica o tamanho inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuItemClick = (itemId: string) => {
    // Se for o item de financeiro e tiver uma função para abrir o modal, chama ela
    if (itemId === 'financeiro' && onOpenFinanceiroModal) {
      // onOpenFinanceiroModal();
      return;
    }

    // Caso contrário, apenas atualiza o item ativo
    setActiveItem(itemId);

    // Fecha a sidebar em dispositivos móveis após selecionar um item
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleAvatarClick = () => {
    setIsAvatarDropdownOpen(!isAvatarDropdownOpen);
  };

  const handleDropdownItemClick = (itemId: string) => {
    console.log(`Item clicado: ${itemId}`);
    setIsAvatarDropdownOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LayoutContainer>
      <Navbar>
        <NavbarLeft>
          <MenuButton onClick={toggleSidebar}>
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </MenuButton>
          <NavbarBrand>PsicoManager</NavbarBrand>
          <ClientSearchContainer>
            <SearchIcon>
              <Search size={16} />
            </SearchIcon>
            <ClientSearchSelect>
              <option>Buscar cliente</option>
            </ClientSearchSelect>
            <DropdownIcon>
              <ChevronDown size={16} />
            </DropdownIcon>
          </ClientSearchContainer>
        </NavbarLeft>
        <NavbarMenu ref={navbarMenuRef}>
          {navbarItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavbarItem key={item.id} href='#'>
                <IconComponent size={20} />
                {item.hasNotification && (
                  <NotificationBadge>3</NotificationBadge>
                )}
              </NavbarItem>
            );
          })}
          <Avatar onClick={handleAvatarClick}>
            MV
            <AvatarDropdownIcon>
              <ChevronDown size={12} />
            </AvatarDropdownIcon>
          </Avatar>
          {isAvatarDropdownOpen && (
            <DropdownMenu>
              {avatarDropdownItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <DropdownItem
                    key={item.id}
                    onClick={() => handleDropdownItemClick(item.id)}
                  >
                    <IconComponent size={16} />
                    {item.label}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          )}
        </NavbarMenu>
      </Navbar>

      <MainContainer>
        <Sidebar style={{ display: isSidebarOpen ? 'flex' : 'none' }}>
          <SidebarMenu>
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeItem === item.id;
              const isHovered = hoveredItem === item.id;

              return (
                <SidebarItem
                  key={item.id}
                  className={`${isActive ? 'active' : ''} ${
                    isHovered ? 'hover' : ''
                  }`}
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