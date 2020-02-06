import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { isLoggedIn } from "../utils";
import { Organizations,OrganizationDetails,UserDetails } from "../containers";
import Header from "../components/Header";
import Footer from "../components/Footer";
const checkAuth = () => {
	return isLoggedIn();
};

const Routes = () => {
	return (
		<BrowserRouter basepath={process.env.PUBLIC_URL}>
			<Header/>
			<Switch>
				<Route path="/" exact render={()=><Redirect to="/organisations" />} />
				<Route path="/organisations" exact component={Organizations} />
				<Route  path={`/organisations/:id`} exact component={OrganizationDetails} />
				<Route path={`/organisations/:id/users/:userId`} exact component={UserDetails} />
			</Switch>
			<Footer/>
		</BrowserRouter>
	);
}

export default Routes;
