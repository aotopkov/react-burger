import PropTypes from "prop-types";
import styles from "./IngredientDetails.module.css";
import { dataPropTypes } from "../../utils/propTypes";
import { useSelector } from "react-redux";

function IngredientDetails() {
  const data = useSelector((store) => store.ingridient.data);

  return (
    <>
      <p className="text text_type_main-large ml-10 mt-10">
        Детали ингридиента
      </p>
      <div className={styles.container}>
        <img src={data.image_large} alt={data.name} className="" />
        <p className="text text_type_main-default mt-4">{data.name}</p>
        <ul className={styles.nutrition}>
          <li className={styles.nutritionItem}>
            <p className="text text_type_main-default text_color_inactive">
              Калории, ккал
            </p>
            <p className="text text_type_digits-default mt-2">
              {data.calories}
            </p>
          </li>
          <li className={styles.nutritionItem}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_digits-default mt-2">
              {data.proteins}
            </p>
          </li>
          <li className={styles.nutritionItem}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_digits-default mt-2">{data.fat}</p>
          </li>
          <li className={styles.nutritionItem}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default mt-2">
              {data.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

IngredientDetails.PropType = {
  data: PropTypes.objectOf(dataPropTypes.isRequired).isRequired,
};

export default IngredientDetails;
