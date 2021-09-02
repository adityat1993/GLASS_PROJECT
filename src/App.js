import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import Sidebar from './components/nav/Sidebar/Sidebar'
import './app.css'
import HomePage from './pages/Home';
import IndexPage from './pages/Index';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile'
import SignUp from './pages/Signup';
import navDrawerReducer from './store/reducers/navDrawer'
import Header from './components/nav/Header/Header';
import NotesPage from './pages/Notes';
import RoutinePage from './pages/Routines'
import SettingPage from './pages/Setting'
import TaskPage from './pages/Tasks'
import Background from './components/ui/Background/Background';
import Background1 from './components/ui/Background/Background1';
import DetailsPage from './pages/Details';


let username = localStorage.getItem(`name`);
const rootReducer = combineReducers({
	navDrawerState: navDrawerReducer
})

const store = createStore(rootReducer)

function App() {
	return (

		<Provider store={store}>
			<Router>

				<Header />
				<Switch>
					<Route path="/home/routine/setting" render={(props) => <SettingPage {...props} />} />
					<Route path="/home/routine" render={(props) => <RoutinePage {...props} />} />
					<Route path="/home/task" render={(props) => <TaskPage {...props} />} />
					<Route path="/home/profile" render={(props) => <ProfilePage {...props} />} />
					<Route path="/home/notes" render={(props) => <NotesPage {...props} />} />
					<Route path="/welcome" render={(props) => <Background text={`Welcome ${localStorage.getItem(`name`)}`} {...props} />} />
					<Route path="/signout" render={(props) => <Background1 text={'Take Care'} {...props} />} />
					<Route path="/signin" render={(props) => <Background text={``} {...props} />} />
     				<Route path="/details" render={(props) => <DetailsPage {...props} />} />
					<Route path="/signup" render={(props) => <SignUp {...props} />} />
					<Route path="/login" render={(props) => <LoginPage {...props} />} />
					<Route path="/home" render={(props) => <HomePage {...props} />} />
					<Route path="/" render={(props) => <IndexPage {...props} />} />
				</Switch>
				<Sidebar />

			</Router>

		</Provider>
	)
}

export default App
