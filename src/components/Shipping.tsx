import { useState } from "react";
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

const Recycle = () => {
  const { robots } = useAppSelector(robotsSelector);

  const [shipping, setShipping] = useState<Robot[]>([]);

  const factorySecond = robots?.filter((row: Robot) =>
    row.statuses.some((item) =>
      ["rusty", "loose screws", "paint scratched"].includes(item)
    )
  );

  const passedQA = robots?.filter(
    (row: Robot) =>
      !row.statuses.some((item) =>
        ["rusty", "loose screws", "paint scratched"].includes(item)
      )
  );

  const handleClick = (id: number) => () => {};

  return (
    <Box>
      <Typography variant="h5">Factory Second</Typography>
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
      <Typography variant="h5" style={{ top: 30 }}>
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
            {passedQA.map((row: Robot) => {
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
      <Typography variant="h5" style={{ top: 30 }}>
        Ready to ship
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
            {passedQA.map((row: Robot) => {
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
                      Remove from shipment
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Recycle;
