import React, { useState } from 'react';
import './Login.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db, provider } from '../../libs/firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
function Login() {
  const [username,setUsername] = useState("");
  const [mail,setMail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    if (username!="" && mail!="" && password!="") {
      try {
        const res = await createUserWithEmailAndPassword(auth, mail, password);
        toast.success("User Created!");
        await setDoc(doc(db, "users", res.user.uid), {
          username,
          mail,
          id : res.user.uid,
          createdAt : new Date(),
          transactions : []
        });
        setLoading(false);
        navigate("/dashboard");
        setPassword("");
        setMail("");
        setUsername("");
      }
      catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    }
    else {
      toast.error("All Fields are Mandatory!");
      setLoading(false);
    }
  }
  async function handleSignupGoogle(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const token = credential.accessToken;
      const user = res.user;
      toast.success("User Created!")
      console.log(res);
      await setDoc(doc(db, "users", user.uid), {
        username : user.displayName,
        mail: user.email,
        id : user.uid,
        createdAt : new Date(),
        transactions : []
      });
      setLoading(false);
      navigate("/dashboard");
    }
    catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    if (mail!="" && password!="") {
      try {
        const res = await signInWithEmailAndPassword(auth, mail, password);
        toast.success("Logged In!");
        setLoading(false);
        navigate("/dashboard");
        setMail("");
        setPassword("");
      }
      catch(error) {
        toast.error(error.message);
        setLoading(false);
      }
    }
    else {
      toast.error("All Fields are Mandatory!");
      setLoading(false);
    }
  }
  function handleLoginGoogle() {

  }
  return (
    <>
    {login ? (
      <div className='login'>
        <h2>Login on <span style={{color:"var(--theme)"}}>Savior</span></h2>
        <form>
          <Input type="email" label="Email" placeholder="Enter your mail" state={mail} setState={setMail}/>
          <Input type="password" label="Password" placeholder="Enter your password" state={password} setState={setPassword}/>
          <Button disabled={loading} onClick={handleLogin} text={loading ? "Loading" : "Login"} skyblue={false}/>
          <p style={{textAlign:"center", fontSize:13}}>or</p>
          <Button disabled={loading} onClick={handleLoginGoogle} text={loading ? "Loading" : "Login with Google"} skyblue={true}/>
          <p className='ask' onClick={()=>setLogin(false)}>Not a User? <span style={{fontWeight:"bold", fontStyle:"normal"}}>Signup Now!</span></p>
        </form>
      </div>
    ) : (
      <div className='login'>
        <h2>Sign Up on <span style={{color:"var(--theme)"}}>Savior</span></h2>
        <form>
          <Input type="text" label="Username" placeholder="Enter your username" state={username} setState={setUsername}/>
          <Input type="email" label="Email" placeholder="Enter your mail" state={mail} setState={setMail}/>
          <Input type="password" label="Password" placeholder="Enter your password" state={password} setState={setPassword}/>
          <Button disabled={loading} onClick={handleSignup} text={loading ? "Loading" : "Signup"} skyblue={false}/>
          <p style={{textAlign:"center", fontSize:13}}>or</p>
          <Button disabled={loading} onClick={handleSignupGoogle} text={loading ? "Loading" : "Signup with Google"} skyblue={true}/>
          <p className='ask' onClick={()=>setLogin(true)}>Already a User? <span style={{fontWeight:"bold", fontStyle:"normal"}}>Login Now!</span></p>
        </form>
    </div>
    )}
    </>
  )
}

export default Login