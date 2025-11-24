import { useField } from "../hooks"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"

const CreateNew = ({ addNew }) => {
  const contentField = useField('text')
  const authorField = useField('text')
  const infoField = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: contentField.props.value,
      author: authorField.props.value,
      info: infoField.props.value,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = () => {
    contentField.reset()
    authorField.reset()
    infoField.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentField.props} />
        </div>
        <div>
          author
          <input {...authorField.props} />
        </div>
        <div>
          url for more info
          <input {...infoField.props} />
        </div>
        <button type="submit">create</button>
        <button onClick={handleReset} type="reset">reset</button>
      </form>
    </div>
  )

}

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired
}

export default CreateNew