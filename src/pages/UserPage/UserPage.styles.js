import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: 200,
    width: "auto",
    display: "flex",
    flexDirection: " column",
    justifyContent: "space-between",
  },
  paper: {
    padding: 20,
  },
}));

export default useStyles;
