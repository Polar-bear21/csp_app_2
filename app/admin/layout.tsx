// サイドバーとヘッダーを配置
"use client";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/admin/components/app-sidebar";
import {
  FileText,
  Users,
  ClipboardList,
  LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export type SidebarItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};
// Menu items.
const items: SidebarItem[] = [
  { title: "日報一覧", url: "/admin/", icon: FileText },
  { title: "作業者一覧", url: "/admin/workers", icon: Users },
  { title: "工番一覧", url: "/admin/orders", icon: ClipboardList },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  //const [selectedItem, setSelectedItem] = useState<SidebarItem>(items[0]);
  const [selectedItem, setSelectedItem] = useState<SidebarItem>(
    () => items.find((item) => item.url === pathname) || items[0]
  );

  // 選択されたitemsをセットする関数
  const handleItemSelect = (item: SidebarItem) => {
    setSelectedItem(item);
  };

  return (
    <SidebarProvider>
      <AppSidebar
        items={items}
        onItemSelect={handleItemSelect}
        selectedItem={selectedItem}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <p>{selectedItem?.title}</p>
        </header>
        {/* <main>{children}</main> */}
        <div className="flex flex-1 flex-col gap-4 p-8">
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            {children}
          </div>
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
