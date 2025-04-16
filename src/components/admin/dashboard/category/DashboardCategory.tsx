"use client";

import React from "react";
import DashboardCategoryCreate from "./particles/DashboardCategoryCreate";
import DashboardCategoryList from "./particles/DashboardCategoryList";
import CategoryTableDrag from "./particles/CategoryTableDrag";

const DashboardCategory = () => {
  return (
    <section className="space-y-4 lg:space-y-5">
      <DashboardCategoryCreate />
      <DashboardCategoryList />
      <CategoryTableDrag />
    </section>
  );
};

export default DashboardCategory;
