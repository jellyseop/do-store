interface IPageHeader {
  title: string;
  desc?: string;
}

const PageHeader: React.FC<IPageHeader> = ({ title, desc }) => {
  return (
    <div className="w-full my-4 px-6 ">
      <h1 className="text-xl tracking-wide text-gray-800">{title}</h1>
      {desc && <p className="text-sm text-gray-400 tracking-wide">{desc}</p>}
    </div>
  );
};

export default PageHeader;
