import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectUsers } from '../../store/slices/users/usersSlice'
import './MessengerChat.css'
const messStyle = {
  U: {
    backgroundColor : '#002C78',
    color: 'white',
    width: 'fit-content',
    padding: '5px',
    borderRadius: '10px',
  },
  B: {
    backgroundColor : '#00FF78',
    color: 'white',
    width: 'fit-content',
    padding: '5px',
    borderRadius: '10px',
  },
}

function MessengerChat() {
  const messRef = useRef(null)
  const { currentUser } = useSelector(selectUsers)
  useEffect(() => {
    messRef.current.scrollTop = messRef.current.scrollHeight - messRef.current.clientHeight;
  }, [currentUser?.messages])
  return (
	 <div ref={messRef} className='MessengerChat'>
		{
      currentUser?.messages.map(message => (
        <h2 style={messStyle[message.id.at(-1)]} key={message.id}>{message.txt}</h2>
      ))
    }
	 </div>
  )
}

export default MessengerChat
