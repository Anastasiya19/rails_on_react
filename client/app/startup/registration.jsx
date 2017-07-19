import ReactOnRails from 'react-on-rails';

import Static from '../components/Static';
import Todos from '../components/Todos';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Todos,
  Static
});

