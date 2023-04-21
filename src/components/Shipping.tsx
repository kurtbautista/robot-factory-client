import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { robotsSelector } from "../store/slices/robotSlice";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { Robot, Robots } from "./Robot.types";
import CheckedIcon from "@mui/icons-material/Check";
import { createShipment } from "../store/slices/robotAction";

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

  const factorySecond = robots?.filter((row: Robot) =>
    row.statuses.some((item) =>
      ["rusty", "loose screws", "paint scratched"].includes(item)
    )
  );

  const handleClick = (id: number) => () => {
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
  };

  const handleRemove = (id: number) => () => {
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
  };

  const handleShipping = () => {
    dispatch(createShipment(shipping.map((item) => item.id)));
    setShowMessage(true);
  };

  return (
    <Box>
      {!showMessage && (
        <>
          <Typography variant="h5" style={{ margin: "20px 0" }}>
            Factory Second
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Has Sentience</TableCell>
                  <TableCell align="center">Has Wheels</TableCell>
                  <TableCell align="center">Has Tracks</TableCell>
                  <TableCell align="center">Number Of Rotors</TableCell>
                  <TableCell align="center">Colour</TableCell>
                  <TableCell align="center">Statuses</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {factorySecond.map((row: Robot) => {
                  return (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">
                        {row.configuration.hasSentience && <CheckedIcon />}
                      </TableCell>
                      <TableCell align="center">
                        {row.configuration.hasWheels && <CheckedIcon />}
                      </TableCell>
                      <TableCell align="center">
                        {row.configuration.hasTracks && <CheckedIcon />}
                      </TableCell>
                      <TableCell align="center">
                        {row.configuration.numberOfRotors}
                      </TableCell>
                      <TableCell align="center">
                        {row.configuration.Colour}
                      </TableCell>
                      <TableCell align="center">
                        {row.statuses.join(", ")}
                      </TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="h5" style={{ margin: "20px 0" }}>
            Passed QA
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Has Sentience</TableCell>
                  <TableCell align="center">Has Wheels</TableCell>
                  <TableCell align="center">Has Tracks</TableCell>
                  <TableCell align="center">Number Of Rotors</TableCell>
                  <TableCell align="center">Colour</TableCell>
                  <TableCell align="center">Statuses</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recycleList?.map((row: Robot) => {
                  return (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">
                        {row.configuration.hasSentience && <CheckedIcon />}
                      </TableCell>
                      <TableCell align="center">
                        {row.configuration.hasWheels && <CheckedIcon />}
                      </TableCell>
                      <TableCell align="center">
                        {row.configuration.hasTracks && <CheckedIcon />}
                      </TableCell>
                      <TableCell align="center">
                        {row.configuration.numberOfRotors}
                      </TableCell>
                      <TableCell align="center">
                        {row.configuration.Colour}
                      </TableCell>
                      <TableCell align="center">
                        {row.statuses.join(", ")}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={handleClick(row.id)}
                        >
                          Add to shipment
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      <Typography variant="h5" style={{ margin: "20px 0" }}>
        {showMessage ? "Robots are successfully sent!" : "Ready to ship"}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center">Has Sentience</TableCell>
              <TableCell align="center">Has Wheels</TableCell>
              <TableCell align="center">Has Tracks</TableCell>
              <TableCell align="center">Number Of Rotors</TableCell>
              <TableCell align="center">Colour</TableCell>
              <TableCell align="center">Statuses</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipping?.map((row: Robot) => {
              return (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">
                    {row.configuration.hasSentience && <CheckedIcon />}
                  </TableCell>
                  <TableCell align="center">
                    {row.configuration.hasWheels && <CheckedIcon />}
                  </TableCell>
                  <TableCell align="center">
                    {row.configuration.hasTracks && <CheckedIcon />}
                  </TableCell>
                  <TableCell align="center">
                    {row.configuration.numberOfRotors}
                  </TableCell>
                  <TableCell align="center">
                    {row.configuration.Colour}
                  </TableCell>
                  <TableCell align="center">
                    {row.statuses.join(", ")}
                  </TableCell>
                  <TableCell align="center">
                    {!showMessage && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleRemove(row.id)}
                      >
                        Remove from shipment
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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

export default Shipping;
