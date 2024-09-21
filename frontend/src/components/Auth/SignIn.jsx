import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "./constants";
// import LoadingIndicator from "./LoadingIndicator";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import { loginAuth } from "../Service/authService";
import logo from '../Img/Logo.png'


function SignIn() {
    // const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setIsAuthorized } = useAuth();
    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            setErrorMessage('Email or password is incorrect.');
            return;
        }
        setLoading(true);
        try {
            const res = await loginAuth(email, password);
            console.log(res);
            if (res) {
                localStorage.setItem(ACCESS_TOKEN, res.data["token"]);
                setIsAuthorized(true);
                navigate("/overview");
            }
        } catch (error) {
            console.log(error);
            if (error.code === "ERR_NETWORK"){
                setErrorMessage('Can\'t connect to server.');
            }
            else setErrorMessage('Username or password is incorrect.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="block items-center text-center bg-slate-200 pt-28 h-100vh">
            <div className=' absolute left-10 top-8'>
                    <Link to="/home" className="-m-1.5 p-1.5 flex flex-row">
                    <img
                        loading="lazy"
                        src={logo}
                        alt="Company Logo"
                        className="h-8 w-auto"
                    />
                    <span className='text-xl p-0.5 font-bold text-deep-blue'>
                        Data&Retailers
                    </span>
                    </Link>
            </div>
            <header className="text-vivid-blue text-6xl font-sans">Sign in</header>
            <div className="text-vivid-blue mt-4 font-sans">Sign in and start your work!</div>
            <form onSubmit={handleSubmit} >
                <div>   
                    <label htmlFor="email" className="absolute w-px h-px p-0 truncate">Enter Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter Email"
                        className="w-72 p-3 mt-5 max-w-full border border-vivid-blue rounded-lg text-dark-blue"
                        value={email}   
                        onChange={e => setEmail(e.target.value)}
                        required
                        
                    />
                </div>
                <div>
                    <label htmlFor="password" className="absolute w-px h-px p-0 truncate">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="w-72 p-3 mt-5 max-w-full border border-vivid-blue rounded-lg text-dark-blue"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                {errorMessage && <p className="text-red-600 pt-2">{errorMessage}</p>}
                {loading? <button className="w-72 h-14 p-3 mt-3 max-w-full border rounded-lg bg-pinkish-purple" disabled><CircularProgress sx={{color:"white"}} size={30}/></button>: 
                    <button className="w-72 h-14 p-3 mt-3 max-w-full border rounded-lg bg-pinkish-purple capitalize text-white text-xl font-medium" type="submit">Sign in</button>
                }
            </form>
            <div className="text-vivid-blue mt-4">
                <Link to="/register">Don’t have an account?</Link>
            </div>
            <div className="text-vivid-blue mt-4">  
                <span className="text-vivid-blue mt-4" >Forgot password? </span>
                <Link to="/register" style={{ fontSize: 18 }}>Sign up</Link>
            </div>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7cb08ccd3d75cd9302262765155183963ba140f9795f48a3ba8f472b701079f7?apiKey=afa45b72ad7c46798aa3d2761c2357ac&"
                alt="Sign in visual representation" 
                className=" absolute w-full self-stretch bottom-0" 
            />
        </div>
    );
}

export default SignIn