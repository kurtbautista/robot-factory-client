export type Robot = {
  id: number;
  name: string;
  configuration: {
    hasSentience: boolean;
    hasWheels: boolean;
    hasTracks: boolean;
    numberOfRotors: number;
    Colour: string;
  };
  statuses: string[];
};

export type Robots = {
  robots: Robot[];
};
