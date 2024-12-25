import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
      	<LocalizationProvider dateAdapter={AdapterDateFns}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
    	</LocalizationProvider>
    </StrictMode>,
)
