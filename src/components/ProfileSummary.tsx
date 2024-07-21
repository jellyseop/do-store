import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { balanceState, studentDataState } from "../atmos";

interface IProfileSummary {
  showLink: boolean;
}

const ProfileSummary: React.FC<IProfileSummary> = ({ showLink }) => {
  const studentName = useRecoilValue(studentDataState);
  const balance = useRecoilValue(balanceState);

  if (!studentName) {
    return <div className="py-[22px]"></div>;
  }

  return (
    <div className="flex justify-between items-center px-6 py-5 xl:p-0 xl:mb-6 bg-gray-100 xl:bg-white text-gray-700">
      {showLink && (
        <Link to="/mypage" className="text-sm text-gray-400 xl:ml-2">
          <div className="text-sm xl:text-xs text-gray-700 flex">
            보유 Do money
            <span className=" ml-3 xl:ml-2 mr-1 text-md">{balance}</span>
            <img
              src="/images/do-money.svg"
              alt="do-money"
              className="w-3 xl:w-2.5 aspect-square text-yellow-400"
            />
            <span className="mx-2">|</span>
            <span className="mr-1">{studentName.nameKo}</span> 님
            <img
              src={`/images/badges/top-green.svg`}
              alt="badge"
              className="w-5 xl:w-4 aspect-square ml-1 -mb-0.5 mr-1"
            />
            {" >"}
          </div>
        </Link>
      )}
    </div>
  );
};

export default ProfileSummary;
