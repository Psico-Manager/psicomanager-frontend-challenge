"use client";

import {
  HomeOutlined,
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  FileTextOutlined,
  PhoneOutlined,
  SettingOutlined,
  BankOutlined,
} from "@ant-design/icons";

export default function Sidebar() {
  return (
    <aside className="w-20 bg-gray-100 border-r flex flex-col items-center py-6">
      <nav className="flex flex-col space-y-2 w-full">
        <button className="flex flex-col items-center py-3 text-gray-700 hover:bg-gray-200 rounded">
          <HomeOutlined />
          <span className="text-[11px]">Painel</span>
        </button>
        <button className="flex flex-col items-center py-3 text-gray-700 hover:bg-gray-200 rounded">
          <UserOutlined />
          <span className="text-[11px]">Clientes</span>
        </button>
        <button className="flex flex-col items-center py-3 text-gray-700 hover:bg-gray-200 rounded">
          <CalendarOutlined />
          <span className="text-[11px]">Agenda</span>
        </button>
        <button className="flex flex-col items-center py-3 bg-blue-900 text-white rounded">
          <DollarOutlined />
          <span className="text-[11px]">Financeiro</span>
        </button>
        <button className="flex flex-col items-center py-3 text-gray-700 hover:bg-gray-200 rounded">
          <FileTextOutlined />
          <span className="text-[11px]">Relatórios</span>
        </button>
        <button className="flex flex-col items-center py-3 text-gray-700 hover:bg-gray-200 rounded">
          <PhoneOutlined />
          <span className="text-[11px]">Marketing</span>
        </button>
        <button className="flex flex-col items-center py-3 text-gray-700 hover:bg-gray-200 rounded">
          <SettingOutlined />
          <span className="text-[11px]">Configuração</span>
        </button>
        <button className="flex flex-col items-center py-3 text-gray-700 hover:bg-gray-200 rounded">
          <BankOutlined />
          <span className="text-[11px]">Minha clínica</span>
        </button>
      </nav>
    </aside>
  );
}
