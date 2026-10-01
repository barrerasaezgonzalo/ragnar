import { useState } from "react";
import { DrawerData } from "../types";

export function useDrawer() {
  const [drawerData, setDrawerData] = useState<DrawerData | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = (type: string, data?: DrawerData) => {
    setDrawerData(data ?? null);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setDrawerData(null);
  };

  return {
    drawerData,
    drawerOpen,
    openDrawer,
    closeDrawer,
  };
}
