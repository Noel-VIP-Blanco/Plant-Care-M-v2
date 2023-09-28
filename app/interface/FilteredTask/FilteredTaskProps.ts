export type FilteredTasksProps = {
  checkedStatus: string[];
  setCheckedStatus: React.Dispatch<React.SetStateAction<string[]>>;
  checkedListContainerId: string[];
  setCheckedListContainerId: React.Dispatch<React.SetStateAction<string[]>>;
};
