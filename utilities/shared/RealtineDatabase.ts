// firebaseUtils.ts
import { ref, onValue } from "firebase/database";
import { FIREBASE_DATABASE } from "@root/FirebaseConfig"; // Import your Firebase constants here

interface SensorWaterNutrientProps {
  farmId: string | null | undefined;
  arduinoBoardId: number | undefined;
  setSensorWaterNutrient: (value: string) => void;
}

interface SensorWaterAcidityProps {
  farmId: string | null | undefined;
  arduinoBoardId: number | undefined;
  setSensorWaterAcidity: (value: string) => void;
}

interface SensorWaterLevelProps {
  farmId: string | null | undefined;
  arduinoBoardId: number | undefined;
  setSensorWaterLevel: (value: string) => void;
}

export const getCurrentTDS = ({
  farmId,
  arduinoBoardId,
  setSensorWaterNutrient,
}: SensorWaterNutrientProps): void => {
  const currentTDSRef = ref(
    FIREBASE_DATABASE,
    `farm/${farmId}/arduinoBoard/${arduinoBoardId}/currentTDS`
  );
  onValue(currentTDSRef, (snapshot) => {
    const tds = snapshot.val();
    setSensorWaterNutrient(tds);
    console.log(tds);
  });
};

export const getCurrentpH = ({
  farmId,
  arduinoBoardId,
  setSensorWaterAcidity,
}: SensorWaterAcidityProps): void => {
  const currentpHRef = ref(
    FIREBASE_DATABASE,
    `farm/${farmId}/arduinoBoard/${arduinoBoardId}/currentpH`
  );
  onValue(currentpHRef, (snapshot) => {
    const ph = snapshot.val();
    setSensorWaterAcidity(ph);
    console.log(ph);
  });
};

export const getCurrentWaterLevel = ({
  farmId,
  arduinoBoardId,
  setSensorWaterLevel,
}: SensorWaterLevelProps): void => {
  const currentWaterLevelRef = ref(
    FIREBASE_DATABASE,
    `farm/${farmId}/arduinoBoard/${arduinoBoardId}/currentWaterLevel`
  );
  onValue(currentWaterLevelRef, (snapshot) => {
    const waterLevel = snapshot.val();
    setSensorWaterLevel(waterLevel);
    console.log(waterLevel);
  });
};
