import React, { FC, useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { choreOrDayType, day } from "../../api/choreChartApi";

const SortableItem = SortableElement<{
  value: day;
  deleteFun: (id: number) => void;
}>(
  ({
    value,
    deleteFun,
  }: {
    value: choreOrDayType;
    deleteFun: (id: number) => void;
  }) => {
    return (
      <div className={"list-group-item list-group-item-action"}>
        {value.name}
      </div>
    );
  }
);

const SortableDayList = SortableContainer(
  ({
    items,
    deleteFun,
  }: {
    items: choreOrDayType[];
    deleteFun: (id: number) => void;
  }) => {
    return (
      <div>
        {items.map((day: day, index: number) => (
          <SortableItem
            key={`item-${day.name}`}
            index={index}
            value={day}
            deleteFun={deleteFun}
          />
        ))}
      </div>
    );
  }
);

const ManageOrderOfType: FC<{
  choreOrDays: choreOrDayType[];
  updateValues: (values: choreOrDayType[]) => void;
  deleteFun: (id: number) => void;
}> = ({ choreOrDays, updateValues, deleteFun }) => {
  let onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    updateValues(
      arrayMove(choreOrDays, oldIndex, newIndex).map((choreOrDay, index) => {
        choreOrDay.rank = index + 1;
        return choreOrDay;
      })
    );
  };

  if (choreOrDays.length === 0) {
    return <div />;
  }

  return (
    <SortableDayList
      items={choreOrDays}
      onSortEnd={onSortEnd}
      deleteFun={deleteFun}
    />
  );
};

export default ManageOrderOfType;
