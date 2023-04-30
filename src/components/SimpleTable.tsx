import { memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

type TableProps = {
  header: any[];
  data: any[];
};

const SimpleTable = ({ header, data }: TableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((item, index) => (
              <TableCell key={index} {...item.headerProps}>
                {item.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row: any, index) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {header.map((item, index) => (
                <TableCell
                  key={index}
                  component="th"
                  scope="row"
                  {...item.dataProps}
                >
                  {row[item.name]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(SimpleTable);
