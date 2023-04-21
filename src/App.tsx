import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import "./App.css";
import { fetchRobots, extinguish, recycle } from "./store/slices/robotAction";
import { Box, Container, CircularProgress } from "@mui/material";
import { ProcessStepper, Robots, Recycle, Shipment } from "./components";
import { robotsSelector } from "./store/slices/robotSlice";
import { Robot } from "./components/Robot.types";

function App() {
  const dispatch = useAppDispatch();
  const { isLoading, robots } = useAppSelector(robotsSelector);
  const [recycleButtonDisabled, setRecycleButtonDisabled] = useState(false);
  const [step, setStep] = useState(0);

  const recycleRobots = robots.reduce((acc: number[], curr: Robot) => {
    // Has fewer than 3 or greater than 8 rotors
    const condition1 =
      curr.configuration.numberOfRotors < 3 ||
      curr.configuration.numberOfRotors > 8;
    // Has any number of rotors and blue in colour
    const condition2 = curr.configuration.Colour === "blue";
    // Has both wheels and tracks
    const condition3 =
      curr.configuration.hasWheels && curr.configuration.hasTracks;
    // Has wheels and is rusty
    const condition4 =
      curr.configuration.hasWheels && curr.statuses.includes("rusty");
    // Is sentient and has screws loose
    const condition5 =
      curr.configuration.hasSentience && curr.statuses.includes("loose screws");
    // Is on fire
    const condition6 = curr.statuses.includes("on fire");

    if (
      condition1 ||
      condition2 ||
      condition3 ||
      condition4 ||
      condition5 ||
      condition6
    ) {
      return [...acc, curr.id];
    }
    return acc;
  }, []);

  useEffect(() => {
    setRecycleButtonDisabled(recycleRobots.length === 0);
  }, [recycleRobots]);

  const nextButtonDisabled = robots.reduce((acc, curr: Robot) => {
    if (acc) {
      return acc;
    }
    return curr.statuses.includes("on fire");
  }, false);

  useEffect(() => {
    dispatch(fetchRobots());
  }, []);
  const handleStepChange = (step: number) => {
    setStep(step);
  };

  const content = (step: number) => {
    switch (step) {
      case 0:
        return <Robots />;
      case 1:
        return <Recycle />;
      case 2:
        return <Shipment />;
    }
  };

  const handleRecycle = () => dispatch(recycle(recycleRobots));

  return (
    <Container maxWidth="lg">
      {isLoading && (
        <Box
          style={{
            background: "#ffffffbf",
            width: "100%",
            height: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 99,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Box sx={{ height: "100vh" }}>
        <ProcessStepper
          children={content(step)}
          handleStepChange={handleStepChange}
          handleRecycle={handleRecycle}
          nextButtonDisabled={
            nextButtonDisabled || (step === 1 && !recycleButtonDisabled)
          }
          nextButtonHidden={step === 2}
          recycleButtonDisabled={recycleButtonDisabled}
        />
      </Box>
    </Container>
  );
}

export default App;
