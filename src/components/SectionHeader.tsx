interface SectionHeaderProps {
  title: string;
  desc?: string;
  linkTo: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  desc,
  linkTo,
}) => {
  return (
    <>
      {/*모바일 스크린*/}
      <div className="xl:hidden flex gap-x-3 items-center text-gray-800 mb-2">
        <h2 className="text-lg">{title}</h2>
        {/* TODO: Link로 교체*/}
        <div id={linkTo} className="text-xs text-gray-400">
          전체보기{" >"}
        </div>
      </div>

      {/*웹 스크린*/}
      <div className="hidden p-6 xl:block w-full max-w-5xl mx-auto mb-6">
        <h2 className="mb-4 text-2xl text-center text-gray-800 tracking-widest ">
          {title}
          &nbsp;{"  >"}
        </h2>
        {/* TODO: Link로 교체*/}
        <p id={linkTo} className="text-center text-gray-400 tracking-wide">
          {desc}
        </p>
      </div>
    </>
  );
};

export default SectionHeader;
