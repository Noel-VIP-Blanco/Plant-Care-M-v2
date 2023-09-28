export enum SensorType {
  WATERNUTRIENT,
  WATERACIDITY,
  TEMPERATUREANDHUMIDITY,
  WATERLEVEL,
}
export type SensorProps = {
  sensorID: string;
  sensorType: SensorType;
  value: number;
};
