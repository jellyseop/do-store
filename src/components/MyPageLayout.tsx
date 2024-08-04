import React from "react";
import MenuList from "./MenuList";

interface MyPageLayoutProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

const MyPageLayout: React.FC<MyPageLayoutProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="flex flex-col xl:flex-row w-full xl:space-x-8 xl:mt-8 xl:max-w-5xl xl:mx-auto">
      {/* Sidebar Section */}
      <aside className="w-full xl:w-1/4 xl:pr-8">
        <h1 className="text-2xl text-gray-800 font-semibold mb-8">
          마이페이지
        </h1>
        <MenuList />
      </aside>
      {/* Main Content Section */}
      <section className="w-full xl:w-3/4">
        <h1 className="mb-9 flex items-center">
          <div className="text-xl text-gray-700 font-normal mr-4">{title}</div>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </h1>
        <div className="border-t border-gray-300 mt-4 pt-3">{children}</div>
      </section>
    </div>
  );
};

export default MyPageLayout;
