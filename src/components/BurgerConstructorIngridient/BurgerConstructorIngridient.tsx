import { FC, useRef } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon";

import styles from "./BurgerConstructorIngridient.module.css";

import { useDispatch } from "../../services/types/hooks";
import {
  REMOVE_INGRIDIENT_FROM_CONSTRUCTOR,
  START_MOVE_INGRIDIENT,
} from "../../services/actions/order";
import { useDrop, useDrag } from "react-dnd";
import { TIngridient } from "../../services/types/data";

interface IBurgerConstructorIngridient {
  elem: TIngridient;
  index: number;
}

const BurgerConstructorIngridient: FC<IBurgerConstructorIngridient> = ({
  elem,
  index,
}) => {
  const dispatch = useDispatch();

  // Удаление

  const handleRemoveIngridient = (uuid: string) => {
    dispatch({ type: REMOVE_INGRIDIENT_FROM_CONSTRUCTOR, uuid: uuid });
  };

  // //Сортировка

  const sortRef = useRef<HTMLLIElement>(null);
  const [, drop] = useDrop({
    accept: "ingridientMove",
    collect() {},
    hover(item: { index: number }, monitor) {
      if (!sortRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = sortRef.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset: any = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch({
        type: START_MOVE_INGRIDIENT,
        drag: dragIndex,
        hover: hoverIndex,
      });
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "ingridientMove",
    item: () => {
      return { id: elem.uuid, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(sortRef));

  return (
    <li
      className={styles.listItem}
      key={elem.uuid}
      draggable={true}
      ref={sortRef}
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={elem.name}
        price={elem.price}
        thumbnail={elem.image}
        handleClose={() => {
          return elem.uuid ? handleRemoveIngridient(elem.uuid) : undefined;
        }}
      />
    </li>
  );
};

export default BurgerConstructorIngridient;
