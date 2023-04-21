import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type ProcessStepper = {
  children: React.ReactNode;
  handleStepChange: (step: number) => void;
  handleRecycle: (event: React.MouseEvent<HTMLButtonElement>) => void;
  nextButtonHidden: boolean;
  nextButtonDisabled: boolean;
  recycleButtonDisabled: boolean;
};

const steps = ["On fire should be extinguished", "Recycle", "Shipping"];

const ProcessStepper = ({
  children,
  handleStepChange,
  handleRecycle,
  nextButtonHidden,
  nextButtonDisabled,
  recycleButtonDisabled,
}: ProcessStepper) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  React.useEffect(() => handleStepChange(activeStep), [activeStep]);

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%", marginTop: 10 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {children}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button
                color="success"
                variant="contained"
                onClick={handleRecycle}
                disabled={recycleButtonDisabled}
                sx={{ mr: 1 }}
              >
                Recycle
              </Button>
            )}
            {!nextButtonHidden && (
              <Button
                disabled={nextButtonDisabled}
                variant="contained"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Send shipment" : "Next"}
              </Button>
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default ProcessStepper;
