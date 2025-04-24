"use client";

import { useState, ChangeEvent, useMemo, useEffect, useRef } from "react";

export type Issue = {
  id: string;
  name: string;
  message: string;
  status: "open" | "resolved";
  numEvents: number;
  numUsers: number;
  value: number;
};

type CheckedState = {
  checked: boolean;
  backgroundColor: string;
};

type TableProps = {
  issues: Issue[];
};

// Constants for styling and configuration
const STYLES = {
  CHECKBOX: "w-5 h-5 cursor-pointer",
  DISABLED_CHECKBOX: "w-5 h-5 opacity-50",
  TABLE: "w-full border-collapse shadow-lg",
  ROW: "border-b border-gray-200",
  HEADER_CELL: "py-6 text-left font-medium text-black",
  DATA_CELL: "py-6",
  STATUS_INDICATOR: "inline-block w-[15px] h-[15px] rounded-full",
  STATUS_TEXT: "font-medium",
} as const;

// Status indicator component
const StatusIndicator = ({ status }: { status: Issue["status"] }) => {
  const isOpen = status === "open";
  return (
    <div className="flex items-center gap-2">
      <span
        className={`${STYLES.STATUS_INDICATOR} ${
          isOpen ? "bg-blue-600" : "bg-gray-400"
        }`}
      />
      <span
        className={`${STYLES.STATUS_TEXT} ${
          isOpen ? "text-blue-700" : "text-gray-700"
        }`}
      >
        {isOpen ? "Open" : "Resolved"}
      </span>
    </div>
  );
};

// Table header component
const TableHeader = ({
  selectedCount,
  onSelectAll,
  isAllSelected,
  selectAllCheckboxRef,
}: {
  selectedCount: number;
  onSelectAll: (event: ChangeEvent<HTMLInputElement>) => void;
  isAllSelected: boolean;
  selectAllCheckboxRef: React.RefObject<HTMLInputElement | null>;
}) => (
  <thead>
    <tr className="border-2 border-gray-200">
      <th className="py-6 pl-6 text-left w-[48px]">
        <input
          ref={selectAllCheckboxRef}
          className={STYLES.CHECKBOX}
          type="checkbox"
          id="custom-checkbox-selectDeselectAll"
          name="custom-checkbox-selectDeselectAll"
          value="custom-checkbox-selectDeselectAll"
          checked={isAllSelected}
          onChange={onSelectAll}
        />
      </th>
      <th className="py-6 min-w-[8rem] text-left text-black">
        {selectedCount ? `Selected ${selectedCount}` : "None selected"}
      </th>
      <th colSpan={2} />
    </tr>
    <tr className="border-2 border-gray-200">
      <th className="py-6 pl-6" />
      <th className={STYLES.HEADER_CELL}>Name</th>
      <th className={STYLES.HEADER_CELL}>Message</th>
      <th className={STYLES.HEADER_CELL}>Status</th>
    </tr>
  </thead>
);

// Table row component
const TableRow = ({
  issue,
  index,
  isChecked,
  onCheck,
}: {
  issue: Issue;
  index: number;
  isChecked: boolean;
  onCheck: (index: number) => void;
}) => {
  const isOpen = issue.status === "open";
  const rowClasses = `${
    isOpen
      ? "cursor-pointer hover:bg-blue-50 text-black"
      : "text-gray-600 cursor-not-allowed"
  } ${STYLES.ROW} ${isChecked ? "bg-blue-50" : ""}`;

  return (
    <tr className={rowClasses} key={issue.id} onClick={() => isOpen && onCheck(index)}>
      <td className="py-6 pl-6">
        {isOpen ? (
          <input
            className={STYLES.CHECKBOX}
            type="checkbox"
            id={`custom-checkbox-${index}`}
            name={issue.name}
            value={issue.name}
            checked={isChecked}
            onChange={() => onCheck(index)}
          />
        ) : (
          <input className={STYLES.DISABLED_CHECKBOX} type="checkbox" disabled />
        )}
      </td>
      <td className={STYLES.DATA_CELL}>{issue.name}</td>
      <td className={STYLES.DATA_CELL}>{issue.message}</td>
      <td className={STYLES.DATA_CELL}>
        <StatusIndicator status={issue.status} />
      </td>
    </tr>
  );
};

const Table = ({ issues }: TableProps) => {
  const [checkedState, setCheckedState] = useState<CheckedState[]>(
    issues.map(() => ({ checked: false, backgroundColor: "#ffffff" }))
  );
  const [selectDeselectAllIsChecked, setSelectDeselectAllIsChecked] = useState(false);
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);

  // Calculate total selected value using useMemo for better performance
  const numCheckboxesSelected = useMemo(() => {
    return checkedState.reduce((sum, state, index) => {
      return state.checked ? sum + issues[index].value : sum;
    }, 0);
  }, [checkedState, issues]);

  const handleOnChange = (position: number): void => {
    const updatedCheckedState = checkedState.map((element, index) => {
      if (position === index) {
        return {
          ...element,
          checked: !element.checked,
          backgroundColor: element.checked ? "#ffffff" : "#eeeeee",
        };
      }
      return element;
    });
    setCheckedState(updatedCheckedState);
    updateSelectAllState(updatedCheckedState);
  };

  const updateSelectAllState = (state: CheckedState[]): void => {
    const openIssuesCount = issues.filter(issue => issue.status === "open").length;
    const selectedCount = state.filter(item => item.checked).length;
    
    if (selectedCount === 0) {
      if (selectAllCheckboxRef.current) {
        selectAllCheckboxRef.current.indeterminate = false;
      }
      setSelectDeselectAllIsChecked(false);
    } else if (selectedCount > 0 && selectedCount < openIssuesCount) {
      if (selectAllCheckboxRef.current) {
        selectAllCheckboxRef.current.indeterminate = true;
      }
      setSelectDeselectAllIsChecked(false);
    } else if (selectedCount === openIssuesCount) {
      if (selectAllCheckboxRef.current) {
        selectAllCheckboxRef.current.indeterminate = false;
      }
      setSelectDeselectAllIsChecked(true);
    }
  };

  const handleSelectDeselectAll = (event: ChangeEvent<HTMLInputElement>): void => {
    const { checked } = event.target;
    const updatedState = issues.map(issue => ({
      checked: checked && issue.status === "open",
      backgroundColor: checked && issue.status === "open" ? "#eeeeee" : "#ffffff",
    }));
    
    setCheckedState(updatedState);
    setSelectDeselectAllIsChecked(checked);
  };

  return (
    <table className={STYLES.TABLE}>
      <TableHeader
        selectedCount={numCheckboxesSelected}
        onSelectAll={handleSelectDeselectAll}
        isAllSelected={selectDeselectAllIsChecked}
        selectAllCheckboxRef={selectAllCheckboxRef}
      />
      <tbody>
        {issues.map((issue, index) => (
          <TableRow
            key={issue.id}
            issue={issue}
            index={index}
            isChecked={checkedState[index].checked}
            onCheck={handleOnChange}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
