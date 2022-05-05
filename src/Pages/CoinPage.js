import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data.data[0]);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "40%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "#28abe3" }} />;
  const profit = parseFloat(coin.c24) > 0;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <Typography variant="h3" className={classes.heading}>
          {coin.currToName}
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin.quoteCurrency} {numberWithCommas(parseFloat(coin.LSRate))}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              Day Change:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              }}
            >
              {numberWithCommas(parseFloat(coin.c24))} {profit && "+"}(
              {parseFloat(coin.c24p).toFixed(2)}%)
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              Volume:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin.quoteCurrency} {numberWithCommas(coin.tp24.slice(0, -6))}M
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              24h High:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin.quoteCurrency} {numberWithCommas(parseFloat(coin.h24))}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              24h Low:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin.quoteCurrency} {numberWithCommas(parseFloat(coin.l24))}
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
