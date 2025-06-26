const Notification = ({message}) => {
  if (message != null){
    return(    
      <div className="notification-box">
        <p>{message}</p>
      </div>
    )  
  }
  return null
}

export default Notification