import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  registerPaper: {
    padding: 40,
    minHeight: 500,
    width: 380,
    margin: '30px auto',
  },
  registerTextField: {
    margin: '15px auto',
  },
  registerButton: { margin: '30px auto' },
}));

export default useStyles;
