import { Robot } from "./Robot.types";
import CheckedIcon from "@mui/icons-material/Check";

export const headerTable = [
  {
    name: "name",
    label: "Name",
    headerProps: {
      align: "center",
    },
    dataProps: {
      align: "center",
    },
  },
  {
    name: "hasSentience",
    label: "Has Sentience",
    headerProps: {
      align: "center",
    },
    dataProps: {
      align: "center",
    },
  },
  {
    name: "hasWheels",
    label: "Has Wheels",
    headerProps: {
      align: "center",
    },
    dataProps: {
      align: "center",
    },
  },
  {
    name: "hasTracks",
    label: "Has Tracks",
    headerProps: {
      align: "center",
    },
    dataProps: {
      align: "center",
    },
  },
  {
    name: "numberOfRotors",
    label: "Number Of Rotors",
    headerProps: {
      align: "center",
    },
    dataProps: {
      align: "center",
    },
  },
  {
    name: "colour",
    label: "Colour",
    headerProps: {
      align: "center",
    },
    dataProps: {
      align: "center",
    },
  },
  {
    name: "statuses",
    label: "Statuses",
    headerProps: {
      align: "center",
    },
    dataProps: {
      align: "center",
    },
  },
];

export const transformData = (data: Robot[]) =>
  data.map(({ configuration, statuses, ...row }: Robot) => ({
    ...row,
    ...configuration,
    hasSentience: configuration.hasSentience && <CheckedIcon />,
    hasWheels: configuration.hasWheels && <CheckedIcon />,
    hasTracks: configuration.hasTracks && <CheckedIcon />,
    colour: configuration.Colour,
    statuses: statuses.join(", "),
  }));
