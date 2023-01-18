import { useSelector } from "react-redux";
import { useParams } from "react-router";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";

export default function IngridientPage() {
  const data = useSelector((store) => store.data.data);
  const { id } = useParams();
  const currentData = data.find((elem) => elem._id === id);

  return <div>{currentData && <IngredientDetails data={currentData} />}</div>;
}
