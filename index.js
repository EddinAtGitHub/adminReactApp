import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import './App.css';
import Routes from './routes/Routes';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {lightBlue} from "@material-ui/core/colors";
import "./init";
import './context/I18n';

const theme = createMuiTheme({
palette:{
    primary:{...lightBlue,contrastText: '#fff'},
    
},
overrides:{
    MuiAppBar:{
        colorPrimary:{backgroundColor:'#001119'},
    },
    MuiButton:{
        root:{ textTransform: 'capitalize'}
    },
    MuiTab:{
        root:{textTransform:'none',}
    },
    MuiTableCell:{
        root:{borderBottomColor:"rgba(0, 17, 25, 0.15)"}
    },
    MuiDivider:{
        root:{backgroundColor:"rgba(0, 17, 25, 0.15)"}
    },
    MuiPaper:{
        elevation1:{
            boxShadow:"0px 1px 3px 0px #ddd, 0px 1px 1px 0px #ddd, 0px 2px 1px -1px #ddd"
        }
    }
}
});

const App=()=>(
    <MuiThemeProvider theme={theme}>
         <Routes />
    </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

