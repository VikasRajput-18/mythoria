import React from "react";

interface PageHeaderProps {
  Icon: React.ReactNode;
  title: string;
  description: string;
}

const PageHeader = ({ Icon, title, description }: PageHeaderProps) => {
  return (
    <>
      <div className="flex items-center gap-2">
        {Icon}
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-white">
          {title}
        </h1>
      </div>
      <p className="text-sm max-w-2xl text-mystic-500">{description}</p>
    </>
  );
};

export default PageHeader;
