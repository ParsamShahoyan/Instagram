import './MessengerPeoplesMessages.css'
import IMAGES from '../../images'
import MessengerPeoplesMessage from '../MessengerPeoplesMessage/MessengerPeoplesMessage'

function MessengerPeoplesMessages() {
	const message = [
		{
			 id: '1',
			 img: 'https://www.shutterstock.com/image-illustration/cute-cartoon-robot-3d-render-260nw-2062306355.jpg',
			 name: 'Bot',
			 active: 'Active 30m ago'
		},
  ]
  return (
	 <div className='Messenger-left-col-peoples-messages'>
		{
			message.map(el => <MessengerPeoplesMessage key={el.id} img={el.img} name={el.name} active={el.active}/>)
		}
	 </div>
  )
}

export default MessengerPeoplesMessages
