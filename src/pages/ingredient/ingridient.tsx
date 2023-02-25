import { useSelector } from "../../services/types/hooks";
import { useParams } from "react-router";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import { FC } from "react";

const IngridientPage: FC = () => {
  const data = useSelector((store) => store.data.data);
  const { id }: { id: string } = useParams();
  const currentData = data.find((elem) => elem._id === id);

  return <div>{currentData && <IngredientDetails data={currentData} />}</div>;
};

export default IngridientPage;
