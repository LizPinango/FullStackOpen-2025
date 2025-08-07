import { useState, useEffect } from 'react'

import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import LoggedInPage from './components/LoggedInPage'

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)      
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault(); 
    try {
      const user = await loginService.login({ username, password })      
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {      
      setError(true)
      handleMessage('Wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
      setError(false)
    }, 7000)
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
        : <LoggedInPage 
            user={user}   
            blogs={blogs} 
            setBlogs={setBlogs}
            handleLogout={handleLogout} 
            handleMessage={handleMessage}
            setError={setError}
          />           
      }
    </div>
  )
}

export default App