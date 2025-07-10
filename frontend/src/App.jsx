import nibLogo from './assets/niblogo.png'
import './App.css'
import Form from '../components/Form.jsx'

function App() {

  return (
    <>
      <div>
          <img src={nibLogo} className="logo react" alt="NIB logo" />
      </div>
      <h1>NIB Info API</h1>
      <Form />
    </>
  )
}

export default App
