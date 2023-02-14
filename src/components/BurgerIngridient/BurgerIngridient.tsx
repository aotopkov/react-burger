import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";

import styles from "./BurgerIngridient.module.css";

import { useSelector } from "../../services/types/hooks";

import { useDrag } from "react-dnd";
import { FC } from "react";
import { TIngridient } from "../../services/types/data";

const BurgerIngridient: FC<{ data: TIngridient }> = ({ data }) => {
  const count = useSelector((store) => {
    if (data.type === "bun" && store.constructorBin.bun) {
      return store.constructorBin.bun._id === data._id ? "1" : false;
    }
    if (data.type !== "bun" && store.constructorBin.ingridients) {
      return store.constructorBin.ingridients.filter(
        (elem: TIngridient) => elem._id === data._id
      ).length;
    }
  });

  const [, dragRef] = useDrag({
    type: data.type === "bun" ? "bun" : "ingridient",
    item: { id: data._id },
  });

  return (
    <li className={styles.container} draggable ref={dragRef}>
      <img src={data.image} alt={data.name}></img>
      <div className={styles.priceContainer}>
        <p className="text text_type_digits-default">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p>{data.name}</p>
      {count >= 1 && <Counter count={count} />}
    </li>
  );
};

export default BurgerIngridient;
