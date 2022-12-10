import { useRef } from "react";
import propTypes from "prop-types";
import { dataPropTypes } from "../../utils/propTypes";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon";

import styles from "./BurgerConstructorIngridient.module.css";

import { useDispatch } from "react-redux";
import {
  REMOVE_INGRIDIENT_FROM_CONSTRUCTOR,
  MOVE_INGRIDIENT,
} from "../../services/actions/actions";
import { useDrop, useDrag } from "react-dnd";

function BurgerConstructorIngridient({ elem, index }) {
  const dispatch = useDispatch();

  // Удаление

  const handleRemoveIngridient = (uuid) => {
    dispatch({ type: REMOVE_INGRIDIENT_FROM_CONSTRUCTOR, uuid: uuid });
  };

  // //Сортировка

  const sortRef = useRef(null);
  const [, drop] = useDrop({
    accept: "ingridientMove",
    collect() {},
    hover(item, monitor) {
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
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch({
        type: MOVE_INGRIDIENT,
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
      <DragIcon />
      <ConstructorElement
        text={elem.name}
        id={index}
        price={elem.price}
        thumbnail={elem.image}
        handleClose={() => {
          handleRemoveIngridient(elem.uuid);
        }}
      />
    </li>
  );
}

BurgerConstructorIngridient.propTypes = {
  elem: propTypes.objectOf(dataPropTypes).isRequired,
  index: propTypes.string.isRequired,
};

export default BurgerConstructorIngridient;
