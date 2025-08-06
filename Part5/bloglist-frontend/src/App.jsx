import { useState, useEffect } from 'react'

import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import LoggedInPage from './components/LoggedInPage'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault(); 
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {      
      setError(true)
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification message={message} error={error}/>

      {user === null ?
        <LoginForm 
          handleLogin={handleLogin}  
          username={username} 
          setUsername={setUsername} 
          password={password} 
          setPassword={setPassword}
        />
        : <LoggedInPage user={user} blogs={blogs}/>           
      }
    </div>
  )
}

export default App