export type RenderYearCheckboxProps = {
  item: string;
  numberOfYears: number;
  numberOfCheckedYears: number;
  setNumberOfCheckedYears: React.Dispatch<React.SetStateAction<number>>;
  checkedAllYear: boolean;
  setCheckedListYears: React.Dispatch<React.SetStateAction<string[]>>;
};
