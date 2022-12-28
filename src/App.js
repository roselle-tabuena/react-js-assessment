import { Route, Redirect, Switch } from 'react-router-dom';

import Contact from './pages/Contact';
import ContactView from './pages/ContactView';
import CustomNav from './components/UI/CustomNav';
import NotFound from './pages/NotFound'
import Footer from './components/UI/Footer';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <CustomNav />
    <ToastContainer />
    <Switch>
      <Route path='/' exact>
        <Redirect to='contacts' />
      </Route>
      <Route path='/contacts' exact>
        <Contact />
      </Route>
      <Route path='/contacts/:contactId' exact>
        <ContactView />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
    <Footer />
    </>
  );
}

export default App;
