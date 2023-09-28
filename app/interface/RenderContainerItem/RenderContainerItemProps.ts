export type RenderContainerItemProps = {
  item: { key: string; value: string };
  checkedAllContainer: boolean;
  numberOfContainers: number;
  numberOfCheckedContainer: number;
  setNumberOfCheckedContainer: React.Dispatch<React.SetStateAction<number>>;
  setCheckedListContainerId: React.Dispatch<React.SetStateAction<string[]>>;
};
