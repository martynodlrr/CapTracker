import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import React from "react";

import { ModalProvider, Modal } from "./context/Modal";
import configureStore from "./store";
import App from "./app";

import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
	window.store = store;
}

function Root() {
	return (
		<Auth0Provider
			domain={process.env.REACT_APP_AUTH0_DOMAIN}
			clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
			authorizationParams={{
				redirect_uri: `${window.location.origin}/capstones`
			}}
		>
		<ModalProvider>
			<Provider store={store}>
				<BrowserRouter>
					<App />
					<Modal />
				</BrowserRouter>
			</Provider>
		</ModalProvider>
  </Auth0Provider>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById("root")
);
