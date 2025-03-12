import { signInWithPopup, signOut} from 'firebase/auth'
import { auth, provider } from '../config/firebaseAuth'
import { addUser, removeUser } from '../utils/signInSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function SignIn() {
const dispatch = useDispatch()
const userData = useSelector((state)=> {return state.signInSlice.userData} )
  const handleAuth =async ()=>{
     let res =   await signInWithPopup(auth,provider)
      const userData = {
          name: res.user.displayName,
          photo :res.user.photoURL,
      }
       dispatch(addUser(userData))
    }
const handleSignOut = async ()=>{
   const res = await signOut(auth)
   console.log(res);
   dispatch(removeUser())
   
}
  return (
    <div>
        <h1>Login baba</h1>
        {
          userData ? 
          <button
          onClick={handleSignOut}
          className='bg-slate-600 p-4 text-white font-bold'
          > Google Out</button>
          :
          <button
          onClick={handleAuth}
          className='bg-slate-300 p-4 text-white font-bold'
          > Google</button>
        }
    </div>
  )
}

export default SignIn