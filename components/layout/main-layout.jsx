"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export function MainLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [userRole, setUserRole] = useState("user")

  useEffect(() => {
    // Get user role from localStorage
    const storedRole = localStorage.getItem("userRole") || "user"
    setUserRole(storedRole)

    // Get sidebar state from localStorage
    const sidebarState = localStorage.getItem("sidebarState")
    if (sidebarState) {
      setIsSidebarCollapsed(sidebarState === "collapsed")
    }
  }, [])

  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed
    setIsSidebarCollapsed(newState)
    localStorage.setItem("sidebarState", newState ? "collapsed" : "expanded")
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar userRole={userRole} isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
        <div
          className={`flex flex-col flex-1 ${isSidebarCollapsed ? "main-content-collapsed" : "main-content-expanded"}`}
        >
          <Header toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
