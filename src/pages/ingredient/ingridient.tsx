import { useSelector } from "../../services/types/hooks";

import { useParams } from "react-router";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import { FC } from "react";
import { TIngridient } from "../../services/types/data";

const IngridientPage: FC = () => {
  const data = useSelector((store) => store.data.data);
  const { id }: any = useParams();
  const currentData = data.find((elem: TIngridient) => elem._id === id);

  return <div>{currentData && <IngredientDetails data={currentData} />}</div>;
}

export default IngridientPage