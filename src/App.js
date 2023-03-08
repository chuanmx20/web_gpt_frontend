import './App.css';
import { PageContent } from './PageContent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PageHeader/>
        <PageContent/>
      </header>
    </div>
  );
}
function PageHeader() {
  return (<div className="Page-header">
    <p>{process.env.REACT_APP_TITLE}</p>
  </div>)
}

export default App;
