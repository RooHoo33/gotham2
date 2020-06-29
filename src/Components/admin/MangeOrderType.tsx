import React, { FC } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { choreOrDayType, day } from "../../api/choreChartApi";

const SortableItem = SortableElement<{ value: string }>(
  ({ value }: { value: string }) => {
    return (
      <div className={"list-group-item list-group-item-action"}>{value}</div>
    );
  }
);

const SortableDayList = SortableContainer(({ items }: { items: day[] }) => {
  return (
    <div>
      {items.map((day: day, index: number) => (
        <SortableItem key={`item-${day.name}`} index={index} value={day.name} />
      ))}
    </div>
  );
});

const ManageOrderOfType: FC<{
  choreOrDays: choreOrDayType[];
  updateValues: (values: choreOrDayType[]) => void;
}> = ({ choreOrDays, updateValues }) => {
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

  return <SortableDayList items={choreOrDays} onSortEnd={onSortEnd} />;
};

export default ManageOrderOfType;
