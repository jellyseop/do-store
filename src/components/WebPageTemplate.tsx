import React from "react";
import MenuList from "./MenuList";

interface PageTemplateProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

const WebPageTemplate: React.FC<PageTemplateProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="flex flex-col xl:flex-row w-full xl:space-x-8  xl:mt-8">
      <div className="w-full xl:w-1/4 xl:pr-8">
        <h1 className="text-2xl text-gray-800 font-semibold mb-8">
          마이페이지
        </h1>
        <MenuList />
      </div>
      <div className="w-full xl:w-3/4">
        <div className="mb-9 flex items-center">
          <h2 className="text-xl text-gray-700 font-normal mr-4">{title}</h2>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>
        <div className="border-t border-gray-300 mt-4 pt-4">{children}</div>
      </div>
    </div>
  );
};

export default WebPageTemplate;
