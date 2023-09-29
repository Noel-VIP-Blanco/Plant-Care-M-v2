export type RenderMonthCheckboxProps = {
  item: string;
  numberOfMonths: number;
  numberOfCheckedMonths: number;
  setNumberOfCheckedMonths: React.Dispatch<React.SetStateAction<number>>;
  checkedAllMonths: boolean;
  setCheckedListMonths: React.Dispatch<React.SetStateAction<string[]>>;
};
