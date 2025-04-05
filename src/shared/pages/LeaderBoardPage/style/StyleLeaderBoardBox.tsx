import { Box, styled, TableCell, TableRow } from "@mui/material";
import Table from "@mui/material/Table";
interface SpecialTableCellProps {
    isWinner?: boolean;
  }
  
export const StyledLeaderBoardBox = styled(Box)(({ theme }) => ({
    width: "33%",
    margin: "20px auto",
    textAlign: "center",
    height: "100%",
    display: "flex",
    alignItems: "cneter",
    flexDirection: "column",
    justifyContent: "center",

}));

export const StyledTable = styled(Table)(({ theme }) => ({
  tableLayout: "fixed",
  width: "100%",
  borderCollapse: "collapse",

  // Rounded corners on the first row
  "& thead tr:first-of-type th:first-of-type": {
    borderTopLeftRadius: 8,
  },
  "& thead tr:first-of-type th:last-of-type": {
    borderTopRightRadius: 8,
  },

  // Pink vertical lines between header columns (except the last one)
  "& thead tr th:not(:last-of-type)": {
    borderRight: `1px solid ${theme.palette.basePinkSecondary.main}`,
  },

  // Ensure header cells don’t add a second bottom border
  "& thead tr th": {
    borderBottom: "none", // remove cell bottom border
  },

  // Then apply one pink bottom border on the entire header row
  "& thead tr": {
    borderBottom: `1px solid ${theme.palette.basePinkSecondary.main}`,
  },

  // Body: gray vertical lines (except last column), optional bottom borders
  "& tbody tr td:not(:last-of-type)": {
    borderRight: `1px solid ${theme.palette.baseGray4.main}`,
  },
  "& tbody tr": {
    borderBottom: `1px solid ${theme.palette.baseGray4.main}`,
  },
}));


export const StyledHeaderTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.basePink02.main,
    // If you want to override the borders on header cells, you can also target them via a nested selector in the table.
  }));
  export const SpecialTableCell = styled(TableCell, {
    shouldForwardProp: (prop) => prop !== "isWinner",
  })<SpecialTableCellProps>(({ theme, isWinner }) => ({
    textAlign: "center",
    color: isWinner ? theme.palette.infoGreen.main : theme.palette.primary.main,
  }));
  export const StyledCenteredTableCell = styled(TableCell)(({ theme }) => ({
    textAlign: "center",
  }));
  
  export const StyledHighScoreContainer = styled(Box)(({ theme }) => ({
  marginBottom: 6,
  borderRadius: 8,
  overflow: "hidden",
}));