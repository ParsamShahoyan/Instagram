import { useEffect, useRef } from "react";
import {useDispatch, useSelector, } from 'react-redux'
import "./Login.css";
import IMAGES from "../../images";
import fetchUsers from "../../store/slices/users/usersAPI";
import { selectUsers, toggleCurrentUser } from "../../store/slices/users/usersSlice";
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const {currentUser} = useSelector(selectUsers)
  const navigate = useNavigate()

  useEffect(() => {
    if(currentUser){
      navigate('/')
    }
  }, [currentUser])

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const formRef = useRef(null)
  const handleSubmit = (e) => {
    e.preventDefault()
    const {login : {value: login}, password: {value: password}} = formRef.current
    dispatch(toggleCurrentUser({login, password}))
  }

  return (
    <div >
      <div className="login">
        <div>
          <img className="img_logo" src={IMAGES.logo} alt="" />
        </div>
        <form ref={formRef} onSubmit={handleSubmit}>
          <input defaultValue='bret' name="login" placeholder="Phone number, username, or email" type="text" />
          <input defaultValue="gwenborough" name="password" placeholder="Password" type="password" />
          <button style={{cursor:'pointer'}}>Log in</button>
        </form>
        <div className="either">
          <hr />
          <span className="foo">OR</span>
          <hr />
        </div>
        <p className="logo_end">Forgot password?</p>
      </div>
      <div className="fotter_logo">
        <p>Don`t have an account?</p>
        <span className="footer_a" > Sign in</span>
      </div>
    </div>
  );
};

export default Login;
