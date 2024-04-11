import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      light: 'rgb(100, 100, 100)',
      main: 'rgb(110, 110, 110)',
      dark: 'rgb(120, 120, 120)',
    },
    secondary: {
      light: 'rgb(235, 235, 229)',
      main: 'rgb(245, 245, 239)',
      dark: 'rgb(255, 255, 249)',
    },
    accent: {
      light: 'rgb(100, 100, 100)',
      main: 'rgb(110, 110, 110)',
      dark: 'rgb(120, 120, 120)',
    },
    text: {
      main: 'rgb(37, 34, 34)',
    }
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: '#24090B',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:before": {
            borderBottomColor: '#B2AC2E',
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottomColor: '#B2AC2E',
          },
          "&:after": {
            borderBottomColor: '#B2AC2E',
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgb(51, 51, 51)',
          }
        },
        label: {
          fontWeight: 'bold',
        }
      }
    }
  }
})

export default theme
