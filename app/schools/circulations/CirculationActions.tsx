import IssueBookButton from "../dashboard/_components/IssueBookButton";
import ReturnBookButton from "../dashboard/_components/ReturnBookButton";
import RenewCirculationButton from "../_components/RenewCirculationButton";

const CirculationsActions = () => {
  return (
    <div className="flex flex-wrap gap-6 mb-4">
      <IssueBookButton />
      <ReturnBookButton />
      <RenewCirculationButton />
    </div>
  );
};

export default CirculationsActions;
