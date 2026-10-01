"use client";

import { Header } from "@/app/components/UI/Header";
import { useDrawer } from "@/app/hooks/useDrawer";
import { useState } from "react";
import Footer from "@/app/components/UI/Footer";
import { TaskGroup } from "@/app/components/Tasks/TaskGroup";
import { CalendarGroup } from "@/app/components/Calendar/CalendarGroup";
import { useTask } from "@/app/hooks/useTaks";
import { TaskDrawer } from "./components/Tasks/TaskDrawer";
import { Loading } from "./components/UI/Loading";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./login/page";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { openDrawer, drawerData, closeDrawer } = useDrawer();
  const { loadingTasks } = useTask();
  const { user } = useAuth();

  if (loadingTasks) {
    return <Loading />;
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="relative w-full min-h-screen font-ragnar tracking-wide flex flex-col">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <section className="w-full px-8 py-4 flex flex-col flex-grow relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TaskGroup openDrawer={openDrawer} searchQuery={searchQuery} />

          <div className="flex flex-col gap-6">
            <CalendarGroup openDrawer={openDrawer} searchQuery={searchQuery} />
          </div>
        </div>

        <Footer />
      </section>

      {drawerData?.type === "task" && (
        <TaskDrawer task={drawerData.data} onClose={closeDrawer} />
      )}
    </div>
  );
}
