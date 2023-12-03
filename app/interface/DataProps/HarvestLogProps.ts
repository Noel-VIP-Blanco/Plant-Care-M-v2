export interface HarvestLogProps {
    value: {
      id: number;
      harvestedDate: string;
      plantName: string;
      farmerLastName:string;
    };
    filteredValue:{
      id: number;
      harvestedDate: string;
      plantName: string;
      farmerLastName:string;
    }
  }