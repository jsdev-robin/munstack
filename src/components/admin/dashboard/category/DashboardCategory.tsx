"use client";

import React from "react";
import DashboardCategoryCreate from "./particles/DashboardCategoryCreate";
import DashboardCategoryList from "./particles/DashboardCategoryList";

const DashboardCategory = () => {
  return (
    <section className="space-y-4 lg:space-y-5">
      <DashboardCategoryCreate />
      <DashboardCategoryList />
    </section>
  );
};

export default DashboardCategory;
