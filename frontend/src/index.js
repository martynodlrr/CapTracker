import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import { ModalProvider, Modal } from "./context/Modal";
import configureStore from './redux';
import App from './App.js';

import './index.css';

const store = configureStore({});

if (process.env.NODE_ENV !== 'production') {
	window.store = store;
};

function Root() {
	return (
		<ModalProvider>
			<Provider store={store}>
				<BrowserRouter>
					<App />
					<Modal />
				</BrowserRouter>
			</Provider>
		</ModalProvider>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById("root")
);
