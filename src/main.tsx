import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {persistor, store} from "./store/store";
import {BrowserRouter as Router} from "react-router-dom";
import {CookiesProvider} from "react-cookie";
import {PersistGate} from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <PersistGate loading={null} persistor={persistor}>
                    <CookiesProvider>
                        <App/>
                    </CookiesProvider>
                </PersistGate>
            </Router>
        </Provider>
    </React.StrictMode>
);