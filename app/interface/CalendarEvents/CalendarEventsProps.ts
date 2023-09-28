export type CalendarEventsProps = {
  openEventModal: () => void;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
};

export type MarkedDate = {
  selected: boolean;
  selectedColor: string;
};
