import React, { useEffect, useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, SvgIcon } from "@mui/material";
import theme from "../../../themes";
import GameButton from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { defaultContainerStyles, StyledHighScoreContainer } from "../../../themes/utils/GlobalContainerStyles";
import { GradientLinearProgress } from "../../components/Loader/Loader";
import { LeaderboardItem } from "../../../utils/interfaces/GameProps";
import { BASE_URL } from "../../../utils/vars";
import { useGameContext } from "../../../providers/GameContext";
import { SpecialTableCell, StyledCenteredTableCell, StyledHeaderTableRow, StyledLeaderBoardBox, StyledTable } from "./style/StyleLeaderBoardBox";

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  useEffect(() => {
    fetchLeaderboard();
  }, []);
  const { state, onSetLoading ,showToast } = useGameContext();
  const fetchLeaderboard = async () => {
    onSetLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/leaderboard`);
      const data = await res.json();
      // data.leaderboards is unsorted, so let's sort by score descending
      const sorted = data.leaderboards.sort((a: LeaderboardItem, b: LeaderboardItem) => b.score - a.score);
      setLeaderboard(sorted);
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
      showToast("Error. Please Try again");
    } finally {
      onSetLoading(false);
    }
  };
  const CustomCrownIcon = () => {
    return (
      <SvgIcon sx={{ height: "28px", width: "36px" }}>
        <svg width="38" height="29" viewBox="0 0 38 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M37.4375 8.49999C37.4381 7.85395 37.2846 7.21708 36.9897 6.64224C36.6949 6.06741 36.2672 5.57118 35.7421 5.19475C35.2171 4.81832 34.6098 4.57253 33.9707 4.47779C33.3317 4.38305 32.6792 4.44209 32.0676 4.65001C31.4559 4.85793 30.9026 5.20873 30.4537 5.67329C30.0047 6.13786 29.6731 6.7028 29.4862 7.32123C29.2993 7.93966 29.2626 8.59373 29.3791 9.22918C29.4957 9.86463 29.7621 10.4631 30.1563 10.975L25.4953 16.7125L21.4328 7.37499C22.1157 6.86386 22.6204 6.15075 22.8753 5.33675C23.1302 4.52275 23.1224 3.64917 22.8531 2.83983C22.5837 2.03049 22.0665 1.32646 21.3746 0.82755C20.6828 0.328636 19.8514 0.0601501 18.9984 0.0601501C18.1455 0.0601501 17.3141 0.328636 16.6223 0.82755C15.9304 1.32646 15.4131 2.03049 15.1438 2.83983C14.8745 3.64917 14.8667 4.52275 15.1216 5.33675C15.3765 6.15075 15.8812 6.86386 16.5641 7.37499L12.5016 16.7125L7.84375 10.975C8.39582 10.2572 8.69224 9.37554 8.68594 8.47002C8.67964 7.5645 8.37099 6.68705 7.80899 5.977C7.247 5.26696 6.46388 4.76504 5.58401 4.55095C4.70415 4.33685 3.77797 4.42287 2.95258 4.79533C2.12719 5.16779 1.44989 5.80534 1.02827 6.60674C0.60664 7.40813 0.464849 8.32742 0.625413 9.21861C0.785977 10.1098 1.23969 10.9218 1.9145 11.5256C2.58931 12.1295 3.44652 12.4906 4.35 12.5516L6.65625 26.3594C6.7412 26.8694 7.00406 27.3329 7.39822 27.6675C7.79237 28.0022 8.29232 28.1864 8.80938 28.1875L29.1906 28.1875C29.7077 28.1864 30.2076 28.0022 30.6018 27.6675C30.9959 27.3329 31.2588 26.8694 31.3438 26.3594L33.6453 12.5516C34.6733 12.483 35.6369 12.0264 36.341 11.2742C37.0451 10.5219 37.437 9.53031 37.4375 8.49999ZM19 1.93749C19.4326 1.93749 19.8556 2.06579 20.2153 2.30615C20.575 2.54652 20.8554 2.88816 21.021 3.28787C21.1866 3.68758 21.2299 4.12742 21.1455 4.55175C21.0611 4.97609 20.8527 5.36586 20.5468 5.67179C20.2409 5.97771 19.8511 6.18605 19.4268 6.27046C19.0024 6.35486 18.5626 6.31154 18.1629 6.14598C17.7632 5.98041 17.4215 5.70003 17.1812 5.3403C16.9408 4.98057 16.8125 4.55764 16.8125 4.12499C16.8125 3.54483 17.043 2.98843 17.4532 2.5782C17.8634 2.16796 18.4198 1.93749 19 1.93749ZM2.4375 8.49999C2.4375 8.06734 2.5658 7.64441 2.80616 7.28468C3.04653 6.92495 3.38817 6.64457 3.78788 6.47901C4.1876 6.31344 4.62743 6.27012 5.05176 6.35452C5.4761 6.43893 5.86587 6.64727 6.1718 6.95319C6.47773 7.25912 6.68607 7.6489 6.77047 8.07323C6.85488 8.49757 6.81156 8.9374 6.64599 9.33711C6.48042 9.73682 6.20005 10.0785 5.84031 10.3188C5.48058 10.5592 5.05765 10.6875 4.625 10.6875C4.04484 10.6875 3.48844 10.457 3.07821 10.0468C2.66797 9.63655 2.4375 9.08015 2.4375 8.49999ZM29.5 26.0516C29.4877 26.1252 29.4494 26.192 29.3921 26.2399C29.3348 26.2878 29.2622 26.3135 29.1875 26.3125L8.80938 26.3125C8.7347 26.3135 8.66213 26.2878 8.60481 26.2399C8.54748 26.192 8.50919 26.1252 8.49688 26.0516L6.2 12.25L6.39063 12.1641L12.0156 19.0953C12.1047 19.2036 12.2168 19.2906 12.3439 19.3498C12.471 19.409 12.6098 19.439 12.75 19.4375C12.7924 19.4375 12.8347 19.4343 12.8766 19.4281C13.0361 19.4064 13.1873 19.3439 13.3156 19.2467C13.444 19.1496 13.5451 19.021 13.6094 18.8734L18.2844 8.12343C18.7576 8.20883 19.2424 8.20883 19.7156 8.12343L24.3906 18.8734C24.4549 19.021 24.5561 19.1496 24.6844 19.2467C24.8127 19.3439 24.9639 19.4064 25.1234 19.4281C25.1653 19.4343 25.2076 19.4375 25.25 19.4375C25.3895 19.4375 25.5273 19.4064 25.6533 19.3464C25.7792 19.2863 25.8902 19.199 25.9781 19.0906L31.6031 12.1594L31.7938 12.2453L29.5 26.0516ZM33.375 10.6875C32.9424 10.6875 32.5194 10.5592 32.1597 10.3188C31.8 10.0785 31.5196 9.73682 31.354 9.33711C31.1885 8.9374 31.1451 8.49757 31.2295 8.07323C31.3139 7.6489 31.5223 7.25912 31.8282 6.95319C32.1341 6.64727 32.5239 6.43893 32.9482 6.35452C33.3726 6.27012 33.8124 6.31344 34.2121 6.47901C34.6118 6.64457 34.9535 6.92495 35.1938 7.28468C35.4342 7.64441 35.5625 8.06734 35.5625 8.49999C35.5625 9.08015 35.332 9.63655 34.9218 10.0468C34.5116 10.457 33.9552 10.6875 33.375 10.6875Z"
            fill="#30A66D"
          />
        </svg>
      </SvgIcon>
    );
  };
  const mapIndexText = (index: number): string => {
    const j = index % 10;
    const k = index % 100;
    if (j === 1 && k !== 11) {
      return index + "st";
    }
    if (j === 2 && k !== 12) {
      return index + "nd";
    }
    if (j === 3 && k !== 13) {
      return index + "rd";
    }
    return index + "th";
  };
  return (
    <Container
      sx={{
        ...defaultContainerStyles,
        justifyContent: "flex-start",
      }}
    >
      <Typography variant="mavensBigTitleBold" mt={10}>
        HIGHSCORES TABLE
      </Typography>
      <StyledHighScoreContainer sx={{ marginBottom: 6 }}>
        {state?.isLoading ? (
          <StyledLeaderBoardBox>
            <GradientLinearProgress variant="indeterminate" />
          </StyledLeaderBoardBox>
        ) : (
          <StyledTable>
            <TableHead>
              <StyledHeaderTableRow>
                <TableCell sx={{ textAlign: "center" }}>
                  <Typography variant="mavenLeaderboardTitleText">POS</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {" "}
                  <Typography variant="mavenLeaderboardTitleText">Player name</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {" "}
                  <Typography variant="mavenLeaderboardTitleText">Score</Typography>
                </TableCell>
              </StyledHeaderTableRow>
            </TableHead>
            <TableBody>
              {leaderboard?.map((item, index) => (
                <StyledHeaderTableRow
                  key={item.userId + index}
                  sx={{ backgroundColor: theme?.palette?.baseWhite?.main }}
                >
                  <SpecialTableCell isWinner={index === 0}>
                    {index === 0 && <CustomCrownIcon></CustomCrownIcon>}

                    <Typography ml={0.5} variant="mavenLeaderboardText">
                      {" "}
                      {mapIndexText(index + 1)}
                    </Typography>
                  </SpecialTableCell>
                  <StyledCenteredTableCell
                    sx={{
                      color: index === 0 ? theme.palette.infoGreen.main : theme.palette.primary.main,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="mavenLeaderboardText">{item.username}</Typography>
                  </StyledCenteredTableCell>
                  <StyledCenteredTableCell
                    sx={{
                      color: index === 0 ? theme.palette.infoGreen.main : theme.palette.primary.main,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="mavenLeaderboardText">{item.score}</Typography>
                  </StyledCenteredTableCell>
                </StyledHeaderTableRow>
              ))}
            </TableBody>
          </StyledTable>
        )}
      </StyledHighScoreContainer>
      {!state?.isLoading && (
        <GameButton
          text="Restart game"
          iconPosition="start"
          fullWidth={true}
          width={163}
          onClick={() => {
            navigate("/game");
          }}
        />
      )}
    </Container>
  );
}
