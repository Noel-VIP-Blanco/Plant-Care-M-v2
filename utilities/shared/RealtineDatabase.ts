// firebaseUtils.ts
import { ref, onValue, set } from "firebase/database";
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

interface MinpHProps {
  farmId: string | null | undefined;
  arduinoBoardId: number | undefined;
  setMinpH: (value: string) => void;
}
interface MaxpHProps {
  farmId: string | null | undefined;
  arduinoBoardId: number | undefined;
  setMaxpH: (value: string) => void;
}
interface MinTDSProps {
  farmId: string | null | undefined;
  arduinoBoardId: number | undefined;
  setMinTDS: (value: string) => void;
}
interface MaxTDSProps {
  farmId: string | null | undefined;
  arduinoBoardId: number | undefined;
  setMaxTDS: (value: string) => void;
}

interface HumidityProps {
  farmId: string | null | undefined;
  mainArduinoBoard: number | undefined;
  setSensorHumidity: (value: string) => void;
}

interface TemperatureProps {
  farmId: string | null | undefined;
  mainArduinoBoard: number | undefined;
  setSensorTemperature: (value: string) => void;
}

export const getTemperature = ({
  farmId,
  mainArduinoBoard,
  setSensorTemperature,
}: TemperatureProps): void => {
  const currentTemperature = ref(
    FIREBASE_DATABASE,
    `farm/${farmId}/arduinoBoard/${mainArduinoBoard}/currentTemperature`
  );
  onValue(currentTemperature, (snapshot) => {
    const temperature = snapshot.val();
    setSensorTemperature(temperature);
    console.log(temperature);
  });
};

export const getHumidity = ({
  farmId,
  mainArduinoBoard,
  setSensorHumidity,
}: HumidityProps): void => {
  const currentHumidity = ref(
    FIREBASE_DATABASE,
    `farm/${farmId}/arduinoBoard/${mainArduinoBoard}/currentHumidity`
  );
  onValue(currentHumidity, (snapshot) => {
    const humidity = snapshot.val();
    setSensorHumidity(humidity);
    console.log(humidity);
  });
};

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
    if (Number(ph) > 11) {
      setSensorWaterAcidity("9");
    } else {
      setSensorWaterAcidity(ph);
    }

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

export const getMinpH = ({
  farmId,
  arduinoBoardId,
  setMinpH,
}: MinpHProps): void => {
  const currentpHRef = ref(
    FIREBASE_DATABASE,
    `farm/${farmId}/arduinoBoard/${arduinoBoardId}/minpH`
  );
  onValue(currentpHRef, (snapshot) => {
    const ph = snapshot.val();
    setMinpH(ph);
    console.log(ph);
  });
};

export const getMaxpH = ({
  farmId,
  arduinoBoardId,
  setMaxpH,
}: MaxpHProps): void => {
  const currentpHRef = ref(
    FIREBASE_DATABASE,
    `farm/${farmId}/arduinoBoard/${arduinoBoardId}/maxpH`
  );
  onValue(currentpHRef, (snapshot) => {
    const ph = snapshot.val();
    setMaxpH(ph);
    console.log(ph);
  });
};

export const getMinTDS = ({
  farmId,
  arduinoBoardId,
  setMinTDS,
}: MinTDSProps): void => {
  const currentTDSRef = ref(
    FIREBASE_DATABASE,
    `farm/${farmId}/arduinoBoard/${arduinoBoardId}/minTDS`
  );
  onValue(currentTDSRef, (snapshot) => {
    const TDS = snapshot.val();
    setMinTDS(TDS);
    console.log(TDS);
  });
};

export const getMaxTDS = ({
  farmId,
  arduinoBoardId,
  setMaxTDS,
}: MaxTDSProps): void => {
  const currentTDSRef = ref(
    FIREBASE_DATABASE,
    `farm/${farmId}/arduinoBoard/${arduinoBoardId}/maxTDS`
  );
  onValue(currentTDSRef, (snapshot) => {
    const TDS = snapshot.val();
    setMaxTDS(TDS);
    console.log(TDS);
  });
};
