const Notification = ({message, error}) => {
  if (message != null){
    return(
      <div className={error ? 'error-box' : 'notification-box'}>
        <p>{message}</p>
      </div>
    )  
  }
  return null
}

export default Notification