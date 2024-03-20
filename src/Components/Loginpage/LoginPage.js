import React from 'react'
import "./LoginPage.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import  { useState} from 'react'
import { useNavigate } from 'react-router-dom'


function LoginPage() {
    const nav = useNavigate();
    const [Username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
  
  
    const [actual]=useState({
        name:"Vasanth",
        pass:"Vasanth123"
    })

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRememberMe = (e) => {
        setRememberMe(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Username === actual.name && password === actual.pass) {
            nav('/home');
            return;
        }
        else{
            alert('Invalid username or password')
        }
    }
    return (
        <div className='body'>
            <div className='container1'>
                <div className='login-box'>
                    <form onSubmit={handleSubmit}>
                        <div className='login-header'>
                            <span>Login</span>
                        </div>

                        <div className='input-box'>
                            <input type='text' id='user' className='input-field' required value={Username} onChange={handleUsernameChange}>
                            </input>
                            <label className='label'>Username</label>
                            <i class="bi bi-person"></i>
                        </div>

                        <div className='input-box'>
                            <input type='password' id='pass' className='input-field' required value={password} onChange={handlePasswordChange}>
                            </input>
                            <label className='label'>Password</label>
                            <i class="bi bi-lock"></i>
                        </div>

                        <div className='remember-forgot'>
                            <div className='remember-me'>
                                <input type='checkbox' id='remember' checked={rememberMe} onChange={handleRememberMe}></input>
                                <label>Remember me</label>
                            </div>

                            <div className='forgot'>
                                <a className='a' href='#'>Forgot Password</a>
                            </div>
                        </div>

                        <div className='input-box'>
                            <input type='submit' className='input-submit' value="Login" ></input>

                        </div>

                        <div className='register'>
                            <span>Don't have an account? <a className='a' href='#'>Register</a></span>
                        </div>

                    </form>


                </div>

            </div>


        </div>
    )
}

export default LoginPage
