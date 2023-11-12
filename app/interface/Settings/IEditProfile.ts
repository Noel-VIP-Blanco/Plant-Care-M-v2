export interface IEditProfile {
    handleSave: () => void;
    handleCancel: () => void;
    tempDetailObject: {
      tempFirstName: string;
      tempLastName: string;
      tempRole: string;
      tempUsername: string;
      tempEmail: string;
    };
    tempDetailFunctionObject: {
      setTempFirstName: React.Dispatch<React.SetStateAction<string>>;
      setTempLastName: React.Dispatch<React.SetStateAction<string>>;
      setTempRole: React.Dispatch<React.SetStateAction<string>>;
      setTempEmail: React.Dispatch<React.SetStateAction<string>>;
      setTempUsername: React.Dispatch<React.SetStateAction<string>>;
    };
  }