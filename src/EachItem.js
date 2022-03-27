import {BiEdit, BiTrash} from 'react-icons/bi'

import './App.css'

const EachItem = props => {
  const {eachContact, removeContactFromList, addToCheckedList} = props
  const {name, email, role, id} = eachContact
  const removeContact = () => {
    removeContactFromList(id)
  }

  const toCheck = event => {
    if (event.target.checked) {
      addToCheckedList(id)
    }
  }

  return (
    <div>
      <ul className="contacts">
        <li className="checkbox-head">
          <input onClick={toCheck} type="checkbox" />
        </li>
        <li className="name-head">{name}</li>
        <li className="email-head">{email}</li>
        <li className="role-head">{role}</li>
        <li className="actions-head">
          <button type="button" className="edit-button">
            <BiEdit />
          </button>

          <button
            type="button"
            className="trash-button"
            onClick={removeContact}
          >
            <BiTrash className="trash" />
          </button>
        </li>
      </ul>
      <hr className="h-line" />
    </div>
  )
}

export default EachItem
