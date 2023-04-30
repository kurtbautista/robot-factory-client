import { memo, useMemo } from "react";
import { useAppSelector } from "../hooks";
import { robotsSelector } from "../store/slices/robotSlice";
import { Robot } from "./Robot.types";
import CheckedIcon from "@mui/icons-material/Check";
import { headerTable } from "./helper";

import { SimpleTable } from "./index";

const Recycle = () => {
  const { robots } = useAppSelector(robotsSelector);

  const data = useMemo(
    () =>
      robots?.map(({ configuration, statuses, ...row }: Robot) => ({
        ...row,
        ...configuration,
        hasSentience: configuration.hasSentience && <CheckedIcon />,
        hasWheels: configuration.hasWheels && <CheckedIcon />,
        hasTracks: configuration.hasTracks && <CheckedIcon />,
        statuses: statuses.join(", "),
      })),
    []
  );

  return <SimpleTable header={headerTable} data={data} />;
};

export default memo(Recycle);
