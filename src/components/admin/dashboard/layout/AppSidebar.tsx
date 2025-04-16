"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  House,
  ListFilter,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Star,
} from "lucide-react";
import TeamSwitcher from "./TeamSwitcher";
import NavMain from "./NavMain";
import NavUser from "./NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Robin",
    email: "jsdev.robin@gmail.com",
    avatar: "/images/avatars/user.jpg",
  },
  teams: [
    {
      name: "Mun",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Robin",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "History", url: "#" },
        { title: "Starred", url: "#" },
        { title: "Settings", url: "#" },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        { title: "Genesis", url: "#" },
        { title: "Explorer", url: "#" },
        { title: "Quantum", url: "#" },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "Introduction", url: "#" },
        { title: "Get Started", url: "#" },
        { title: "Tutorials", url: "#" },
        { title: "Changelog", url: "#" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "General", url: "#" },
        { title: "Team", url: "#" },
        { title: "Billing", url: "#" },
        { title: "Limits", url: "#" },
      ],
    },
  ],
  productMangement: [
    {
      title: "Category Setup",
      url: "#",
      icon: ListFilter,
      items: [
        { title: "Categories", url: "/dashboard/category" },
        { title: "Sub Categories", url: "/dashboard/sub-category" },
        { title: "Sub Sub Categories", url: "/dashboard/sub-sub-category" },
      ],
    },
    {
      title: "Brands",
      url: "#",
      icon: Star,
      items: [
        { title: "Add New", url: "#" },
        { title: "List", url: "#" },
      ],
    },
    {
      title: "In-house Products",
      url: "#",
      icon: House,
      items: [
        { title: "Product List", url: "#" },
        { title: "Add New Product", url: "#" },
        { title: "Bulk Import", url: "#" },
        { title: "Request Restock List", url: "#" },
      ],
    },
    {
      title: "Vendor Products",
      url: "#",
      icon: Bot,
      items: [
        { title: "New Products Requests (36)", url: "#" },
        { title: "Product Update Requests (0)", url: "#" },
        { title: "Approved Products (172)", url: "#" },
        { title: "Denied Products", url: "#" },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

const AppSidebar = (props: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavMain items={data.productMangement} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
