import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './pages/admin-login/admin-login.component'
import CollectionPage from './pages/events-collection/events-collection.component'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import './App.css';
import Header from './components/header/header.component'
import AddEvent from './pages/add-event/add-event.component'
import {selectAdminPresent} from './redux/admin/admin.selector'
function App({isAdmin}) {
  console.log("Admin: ")
  console.log(isAdmin);
  return (
   <div>
      <Header />
      <Switch>
        <Route exact path = "/" component = {CollectionPage} />
        <Route exact path = "/admin" 
        render = 
        {
          () => isAdmin?
            (<Redirect to = '/' />):
            (
              <SignIn />
            )
        } />
        <Route exact path = "/event/new" component = {AddEvent} />

      </Switch>
   </div>
   
  );
}
const mapStateToProps = createStructuredSelector({
  isAdmin: selectAdminPresent
})
export default connect(mapStateToProps)(App);
