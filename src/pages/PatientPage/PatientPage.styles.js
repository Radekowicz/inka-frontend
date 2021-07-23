import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 1200,
    margin: 'auto',
    padding: 10,
  },
  upperContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 160,
  },
}));

export default useStyles;
