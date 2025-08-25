"use client";

import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center h-16 px-6 bg-white border-b">
      <Image
        src="/logo_psicomanager.png"
        alt="Logo Psicomanager"
        width={120}
        height={35}
        priority
      />
      <div className="ml-4 w-80">
        <Input
          placeholder="Buscar cliente"
          prefix={<SearchOutlined />}
          className="rounded"
        />
      </div>
    </header>
  );
}
