import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appContainer:{
    display:'flex',
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '30px 5px'
  },

  musicBox :{
    borderRadius: '15px',
    padding:'20px',
    display:'flex',
    flexDirection:'column',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    webkitBoxShadow:'0 0 20px LightCyan', 
    mozBoxShadow: '0 0 20px LightCyan',
    boxShadow:'0 0 20px LightCyan',
  },
  
  [theme.breakpoints.down('sm')]:{
    mainContainer: {
      flexDirection: 'column-reverse',
    }
  }
  
}));