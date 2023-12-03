import { AgendaSchedule } from "react-native-calendars";

export type EventItemProps = AgendaSchedule & {
  [FormattedDate: string]: {
    id: string;
    day: string;
    name: string;
    height: number;
    plantName: string | undefined;
    containerName: string | undefined;
  }[];
};
