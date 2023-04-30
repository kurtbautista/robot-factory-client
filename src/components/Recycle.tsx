import { memo, useMemo } from "react";
import { useAppSelector } from "../hooks";
import { robotsSelector } from "../store/slices/robotSlice";
import { Robot } from "./Robot.types";
import CheckedIcon from "@mui/icons-material/Check";
import { headerTable, transformData } from "./helper";

import { SimpleTable } from "./index";

const Recycle = () => {
  const { robots } = useAppSelector(robotsSelector);

  const data = useMemo(() => transformData(robots), [robots]);

  return <SimpleTable header={headerTable} data={data} />;
};

export default memo(Recycle);
