export type ContainerItemProps = {
  contId: string;
  contName: string;
  arduinoBoardId: string;
};

export type ContainerProps = {
  id: number;
  name: string;
  arduinoBoardDto: {
    id: number;
    name: string;
    status: string;
    sensorMappings: any[] | null; // Define the appropriate type for sensorMappings based on your data structure
  };
  plantDto: {
    id: number;
    name: string;
    maximumEc: number;
    maximumPh: number;
    minimumEc: number;
    minimumPh: number;
    daysToMaturity: string;
    farmId: number;
  };
  farmId: number;
};

export type AddContainerProps = {
  name: string;
  arduinoBoardDto: {
    id: number;
  };
  plantDto: {
    id: number;
  };
  farmId: number;
};

interface PlantDto {
  id: number;
}

interface ArduinoBoardDto {
  id?: number;
}

export type UpdateContainerProps = {
  name: string;
  arduinoBoardDto: ArduinoBoardDto;
  plantDto: PlantDto;
};
