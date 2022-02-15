import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(3),
  },
  actionDiv: {
    textAlign: 'center',
  },
  flexBox:{
    border: '5px solid black',
  }
}));