import * as React from 'react';
import * as ReactDOM from "react-dom/client";
import {BrowserRouter} from 'react-router-dom' 
import { Provider } from 'react-redux'
import store from './store/store'

import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('app') as HTMLElement
)
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
