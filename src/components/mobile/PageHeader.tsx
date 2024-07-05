interface IPageHeader {
  title: string;
  desc?: string;
}

const PageHeader: React.FC<IPageHeader> = ({ title, desc }) => {
  return (
    <div className="w-full my-4 xl:mt-6 xl:mb-0 xl:max-w-5xl xl:mx-auto px-6 xl:px-0">
      <h1 className="text-xl tracking-wide text-gray-800">{title}</h1>
      {desc && <p className="text-sm text-gray-400 tracking-wide">{desc}</p>}
    </div>
  );
};

export default PageHeader;
