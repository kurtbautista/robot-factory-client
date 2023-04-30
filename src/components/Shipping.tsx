import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { robotsSelector } from "../store/slices/robotSlice";
import { Box, Button, Typography } from "@mui/material";
import { Robot } from "./Robot.types";
import { createShipment } from "../store/slices/robotAction";
import { headerTable, transformData } from "./helper";
import { SimpleTable } from "./index";

const Shipping = () => {
  const dispatch = useAppDispatch();
  const { robots } = useAppSelector(robotsSelector);
  const [shipping, setShipping] = useState<Robot[]>([]);
  const [recycleList, setRecycleList] = useState<Robot[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const passedQA = robots?.filter(
      (row: Robot) =>
        !row.statuses.some((item) =>
          ["rusty", "loose screws", "paint scratched"].includes(item)
        )
    );
    setRecycleList(passedQA);
  }, []);

  const factorySecond = useMemo(
    () =>
      robots?.filter((row: Robot) =>
        row.statuses.some((item) =>
          ["rusty", "loose screws", "paint scratched"].includes(item)
        )
      ),
    [robots]
  );

  const handleClick = useCallback(
    (id: number) => () => {
      const getRobot = robots?.find((item: Robot) => item.id === id);
      setShipping((prev: Robot[]) => {
        if (getRobot) {
          return [...prev, getRobot];
        }
        return prev;
      });
      setRecycleList((prev: Robot[]) => {
        return prev.filter((item) => item.id !== id);
      });
    },
    []
  );

  const handleRemove = useCallback(
    (id: number) => () => {
      const getRobot = robots?.find((item: Robot) => item.id === id);
      setRecycleList((prev: Robot[]) => {
        if (getRobot) {
          return [...prev, getRobot];
        }
        return prev;
      });
      setShipping((prev: Robot[]) => {
        return prev.filter((item) => item.id !== id);
      });
    },
    []
  );

  const handleShipping = useCallback(() => {
    dispatch(createShipment(shipping.map((item) => item.id)));
    setShowMessage(true);
  }, []);

  const headerFactorySecond = useMemo(
    () => [{ name: "id", label: "ID" }, ...headerTable],
    []
  );

  const header = useMemo(
    () => [...headerFactorySecond, { name: "actionButton", label: "" }],
    []
  );

  const factorySecondData = useMemo(
    () => transformData(factorySecond),
    [factorySecond]
  );

  const dataPassedQA = useMemo(
    () =>
      transformData(recycleList).map((row) => ({
        ...row,
        actionButton: (
          <Button variant="outlined" size="small" onClick={handleClick(row.id)}>
            Add to shipment
          </Button>
        ),
      })),
    [recycleList]
  );

  const dataShipping = useMemo(
    () =>
      transformData(shipping).map((row) => ({
        ...row,
        actionButton: !showMessage && (
          <Button
            variant="outlined"
            size="small"
            onClick={handleRemove(row.id)}
          >
            Remove from shipment
          </Button>
        ),
      })),
    [shipping, showMessage]
  );

  return (
    <Box>
      {!showMessage && (
        <>
          <Typography variant="h5" style={{ margin: "20px 0" }}>
            Factory Second
          </Typography>
          <SimpleTable header={headerFactorySecond} data={factorySecondData} />
          <Typography variant="h5" style={{ margin: "20px 0" }}>
            Passed QA
          </Typography>
          <SimpleTable header={header} data={dataPassedQA} />
        </>
      )}

      <Typography variant="h5" style={{ margin: "20px 0" }}>
        {showMessage ? "Robots are successfully sent!" : "Ready to ship"}
      </Typography>
      <SimpleTable header={header} data={dataShipping} />
      {!showMessage && (
        <Button
          variant="contained"
          onClick={handleShipping}
          disabled={shipping.length === 0}
          style={{ float: "right", marginTop: 20 }}
        >
          Send shipment
        </Button>
      )}
    </Box>
  );
};

export default memo(Shipping);
