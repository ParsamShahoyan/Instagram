import React, { useEffect, useRef } from 'react';
import IMAGES from '../../images';
import './CreatePost.css'
import { useDispatch, useSelector } from 'react-redux';
import { addPost as addPostUser, selectUsers } from '../../store/slices/users/usersSlice';
import { useNavigate } from 'react-router-dom'
import { addPost as addPostPost} from '../../store/slices/posts/postsSlice';

const CreatePost = () => {
    const formRef = useRef(null)
    const { currentUser } = useSelector(selectUsers)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if(!currentUser){
            navigate('/login')
        }
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        const {img:{value: img}, desc:{value: desc}} = formRef.current
        const payload = {
            id: new Date().getTime() + 'U',
            name: currentUser.username,
            postText: desc,
            img,
        }
        dispatch(addPostUser(payload))
        dispatch(addPostPost(payload))
        navigate('/')
        formRef.current.reset()
    }
    return (
        <div style={{marginTop: '100px', textAlign: 'center'}} className='container'>
            <h1 style={{fontSize: '50px' }}>Create Post</h1>
            <br/>
            <img style={{margin:'auto'}} width='100px' src={IMAGES.createPost} alt="" />   
            <br/>
            <form style={{marginTop: '50px'}} ref={formRef} onSubmit={handleSubmit}>
                <input name='img' type="text"  placeholder='"https://img..."'/> <br /> <br />
                <input name='desc' type="text"  placeholder='Desc'/> <br /> <br />
                <label className="input-file">
                    <input style={{display: 'none'}} type="submit" name="file"/>		
                    <span>Выберите файл</span>
                </label>
            </form>
        </div>
    );
}

export default CreatePost;
