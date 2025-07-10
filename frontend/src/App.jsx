import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from '../components/Form.jsx'

function App() {

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>NIB Info API</h1>
      <Form />
      <p className="explanation">
        Enter a NIB number to receive information about this person.
      </p>
    </>
  )
}

export default App
