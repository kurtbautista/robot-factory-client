import { useAppSelector } from "../hooks";
import { robotsSelector } from "../store/slices/robotSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Robot } from "./Robot.types";
import CheckedIcon from "@mui/icons-material/Check";

const Recycle = () => {
  const { robots } = useAppSelector(robotsSelector);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Has Sentience</TableCell>
            <TableCell align="center">Has Wheels</TableCell>
            <TableCell align="center">Has Tracks</TableCell>
            <TableCell align="center">Number Of Rotors</TableCell>
            <TableCell align="center">Colour</TableCell>
            <TableCell align="center">Statuses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {robots?.map((row: Robot) => {
            const status = row.statuses;
            console.log(row.statuses, status);
            return (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
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
                <TableCell align="center">{row.configuration.Colour}</TableCell>
                <TableCell align="center">{row.statuses.join(", ")}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Recycle;
