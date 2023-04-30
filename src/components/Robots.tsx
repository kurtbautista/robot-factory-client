import { memo, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { robotsSelector } from "../store/slices/robotSlice";
import { Button } from "@mui/material";
import { Robot } from "./Robot.types";
import WarningIcon from "@mui/icons-material/Warning";
import { extinguish } from "../store/slices/robotAction";
import { SimpleTable } from "./index";

const Robots = () => {
  const dispatch = useAppDispatch();

  const { robots } = useAppSelector(robotsSelector);

  const handleClick = useCallback(
    (id: number) => () => dispatch(extinguish(id)),
    []
  );

  const header = useMemo(
    () => [
      { name: "name", label: "Name" },
      { name: "statuses", label: "Status - On fire" },
      { name: "actionButton", label: "" },
    ],
    []
  );

  const data = useMemo(
    () =>
      robots?.map((item: Robot) => ({
        ...item,
        statuses: item?.statuses?.includes("on fire") && (
          <WarningIcon color="error" />
        ),
        actionButton: (
          <Button
            variant="outlined"
            disabled={!item.statuses.includes("on fire")}
            size="small"
            onClick={handleClick(item.id)}
          >
            Extinguish
          </Button>
        ),
      })),
    [robots]
  );

  return <SimpleTable header={header} data={data} />;
};

export default memo(Robots);
