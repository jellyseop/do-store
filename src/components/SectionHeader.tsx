interface SectionHeaderProps {
  title: string;
  linkTo: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, linkTo }) => {
  return (
    <div className="flex gap-x-3 items-center text-gray-800 mb-2">
      <h2 className="text-lg">{title}</h2>
      {/* TODO: Link로 교체*/}
      <div id={linkTo} className="text-sm text-gray-400">
        전체보기{" >"}
      </div>
    </div>
  );
};

export default SectionHeader;
