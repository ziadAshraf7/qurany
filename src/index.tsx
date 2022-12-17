import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import {
    BrowserRouter as Router,
  } from "react-router-dom";

  import { createTheme, ThemeProvider } from '@mui/material/styles';

  import {
    QueryClient,
    QueryClientProvider,
  } from 'react-query'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)



const theme  = createTheme({
  typography : {
    fontFamily : 'Nanum Myeongjo'
  } 
});

const queryClient = new QueryClient()

root.render(
  <QueryClientProvider client={queryClient}>
  <ThemeProvider theme={theme}>
    <Router>
    <App />
    </Router>
    </ThemeProvider>
    </QueryClientProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
