import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#121212"
    },
    primary: {
      main: "#ffeb3b"
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: red.A400
    },
    type: "dark"
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200
    }
  }
});

export default theme;
