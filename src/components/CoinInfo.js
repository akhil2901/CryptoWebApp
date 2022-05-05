import { useEffect, useState } from "react";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Table,
  Button,
  Modal,
  Typography,
  TextField,
} from "@material-ui/core";
import { numberWithCommas } from "./CoinsTable";
import { green, red } from "@material-ui/core/colors";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const CoinInfo = ({ coin }) => {
  const [days, setDays] = useState(1);
  const [open, setOpen] = useState(false);
  const [flag, setflag] = useState(false);
  const [price, setPrice] = useState(null);
  const [amount, setAmount] = useState(null);
  const [total, setTotal] = useState(null);
  const [type, setType] = useState("");
  const [modalStyle] = useState(getModalStyle);

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: "black",
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: 10,
    },
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
  }));

  const theme = createTheme({
    palette: {
      primary: green,
      secondary: red,
    },
  });
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };

  const fetchHistoricData = async () => {
    setflag(true);
  };

  console.log(coin);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {flag === false ? (
          <CircularProgress
            style={{ color: "#28abe3" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#28abe3" }}>
                <TableRow>
                  {["Volume", "Buy Price", "Sell Price", "Volume"].map(
                    (head) => (
                      <TableCell
                        style={{
                          color: "white",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        key={head}
                        align={"center"}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow className={classes.row}>
                  <TableCell component="th" scope="row" align="center">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span>{coin.tVolBid}</span>
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: "rgb(14, 203, 129)" }}
                  >
                    {coin.quoteCurrency}{" "}
                    {numberWithCommas(parseFloat(coin.bid).toFixed(2))}
                  </TableCell>
                  <TableCell align="center" style={{ color: "red" }}>
                    {coin.quoteCurrency}{" "}
                    {numberWithCommas(parseFloat(coin.ask).toFixed(2))}
                  </TableCell>
                  <TableCell align="center">{coin.tVolAsk}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div
              style={{
                marginTop: 80,
                alignSelf: "flex-end",
                width: 200,
              }}
            >
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => [setOpen(true), setType("Buy")]}
                >
                  Buy
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: 66 }}
                  onClick={() => [setOpen(true), setType("Sell")]}
                >
                  Sell
                </Button>
              </ThemeProvider>
            </div>
          </>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <Typography align="center" style={{ color: "#FFF" }} variant="h4">
            {coin.marketName}
          </Typography>
          <div style={{ width: "100%" }}>
            <TextField
              id="standard-basic"
              label={`Price (${coin.quoteCurrency})`}
              value={price}
              onChange={(event) => {
                if (amount !== null) {
                  setTotal(amount * event.target.value);
                }
                setPrice(event.target.value);
              }}
            />
            <TextField
              id="standard-basic"
              label={`Amount (${coin.baseCurrency})`}
              value={amount}
              onChange={(event) => {
                if (price !== null) {
                  setTotal(price * event.target.value);
                }
                setAmount(event.target.value);
              }}
            />
            <TextField
              id="standard-basic"
              label={`Total (${coin.quoteCurrency})`}
              value={total}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <div>
              <Typography style={{ color: "#fff" }}> Avail</Typography>
              <Typography style={{ color: "#fff" }}>
                0 {coin.quoteCurrency}
              </Typography>
            </div>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color={type === "Buy" ? "primary" : "secondary"}
              >
                {type}
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </Modal>
    </ThemeProvider>
  );
};

export default CoinInfo;
