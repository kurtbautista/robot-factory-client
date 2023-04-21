import { useAppDispatch, useAppSelector } from "../hooks";
import { robotsSelector } from "../store/slices/robotSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Robot } from "./Robot.types";
import WarningIcon from "@mui/icons-material/Warning";
import { extinguish } from "../store/slices/robotAction";

const Robots = () => {
  const dispatch = useAppDispatch();

  const { robots } = useAppSelector(robotsSelector);

  const handleClick = (id: number) => () => dispatch(extinguish(id));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Status - On fire</TableCell>
            <TableCell align="right"></TableCell>
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
                  {row.statuses.includes("on fire") && (
                    <WarningIcon color="error" />
                  )}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    disabled={!row.statuses.includes("on fire")}
                    size="small"
                    onClick={handleClick(row.id)}
                  >
                    Extinguish
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Robots;
