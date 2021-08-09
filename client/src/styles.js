import { makeStyles, createTheme } from '@material-ui/core/styles';

// const theme = createTheme({
//   breakpoints: {
//     values: {
//       xs: 0,
//       iphoneX: 375,
//       iphone12Max: 428,
//       md: 960,
//       lg: 1280,
//       xl: 1920,
//     },
//   },
// })


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

  headingBar: {
    display:'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '800px',
    width: '100%',
    marginBottom: '30px',
    borderRadius: '15px',
    padding: '20px',
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    webkitBoxShadow:'0 0 20px LightCyan', 
    mozBoxShadow: '0 0 20px LightCyan',
    boxShadow:'0 0 20px LightCyan',
  },


  logo: {
    height: '60px',
    width: '60px',
    borderRadius: '30px',
  },
  
  [theme.breakpoints.down(429)]:{
    mainContainer: {
      flexDirection: 'column-reverse',
    },
    logo: {
      height: '40px',
      width: '40px',
      borderRadius: '20px',
    },
    headingBar: {
      width: '380px',
      padding: '10px',
    },
  },

  [theme.breakpoints.down(376)]:{
    headingBar: {
      width: '340px',
      padding: '10px',
    }
  }
  
}));