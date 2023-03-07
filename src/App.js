import logo from './logo.svg';
import './App.css';
import { LoginControl } from './login'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PageHeader/>
        <LoginControl/>
      </header>
    </div>
  );
}
var state = {
  phase : 0,
  loading : 'idle',
}
function PageHeader() {
  return (<div className="Page-header">
    <p>
      Hello World
    </p>
  </div>)
}

export default App;
