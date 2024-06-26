import { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import LoadingIndicator from "./LoadingIndicator";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { getCLS } from "web-vitals";

function evaluatePasswordStrength(password) {
    const lengthCriteria = password.length >= 12;
    const lowercaseCriteria = /[a-z]/.test(password);
    const uppercaseCriteria = /[A-Z]/.test(password);
    const digitCriteria = /\d/.test(password);
    const specialCharacterCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (lengthCriteria && lowercaseCriteria && uppercaseCriteria && digitCriteria && specialCharacterCriteria) {
        return 'Strong';
    } else if (lengthCriteria || (lowercaseCriteria && uppercaseCriteria && digitCriteria)) {
        return 'Medium';
    } else {
        return 'Weak';
    }
}

function Form({ route, method }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [passwordStrength, setPasswordStrength] = useState('');
    const { setIsAuthorized } = useAuth();
    const name = method === "login" ? "Login" : "Register";
    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPasswordStrength(evaluatePasswordStrength(password));
        setPassword(password);
    };
    function getColor(str){
        if (str === 'Strong') return 'text-green';
        else if (str == 'Medium') return 'text-orange';
        else return 'text-red';
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!emailRegex.test(email)) {
            setErrorMessage('Email không hợp lệ!');
            return;
        }

        if (!passwordRegex.test(password)) {
            setErrorMessage('Mật khẩu không hợp lệ!');
            return;
        }
        setLoading(true);

        try {
            const res = await api.post(route, { email, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                setIsAuthorized(true);
                navigate("/calculate")
            } else {
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
            setErrorMessage('Tên đăng nhập hoặc mật khẩu không đúng!');
        } finally {
            setLoading(false)
        }
    };
    if (name === "Login") {
        return (
            <div className="block items-center text-center bg-slate-200 pt-28">
                <header className="text-vivid-blue text-6xl font-sans">Sign in</header>
                <div className="text-vivid-blue mt-4 font-sans">Sign in and start your work!</div>
                <form onSubmit={handleSubmit} >
                    <div>
                        <label htmlFor="email" className="absolute w-px h-px p-0 truncate">Enter Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter Email"
                            className="w-72 p-3 mt-5 max-w-full border border-vivid-blue rounded-lg"
                            value={email}   
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="absolute w-px h-px p-0 truncate">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            className="w-72 p-3 mt-5 max-w-full border border-vivid-blue rounded-lg"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    {loading && <LoadingIndicator />}
                    {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                    <button className="w-72 p-3 mt-5 max-w-full border rounded-lg bg-pinkish-purple capitalize text-white text-xl font-medium" type="submit">Login</button>
                </form>
                <div className="text-vivid-blue mt-4">
                    <Link to="/register">Don’t have an account?</Link>
                </div>
                <div className="text-vivid-blue mt-4">  
                    <span className="text-vivid-blue mt-4" >Forgot password? </span>
                    <Link to="/register" style={{ fontSize: 18 }}>Sign up</Link>
                </div>
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7cb08ccd3d75cd9302262765155183963ba140f9795f48a3ba8f472b701079f7?apiKey=afa45b72ad7c46798aa3d2761c2357ac&" alt="Sign in visual representation" className="w-full self-stretch mt-28" />
            </div>
        );
    }

    return (
        <div className="block items-center text-center bg-slate-200 pt-28">
            <header className="text-vivid-blue text-6xl font-sans">Sign up</header>
            <div className="text-vivid-blue mt-4 font-sans">Create your account!</div>
            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="email" className="absolute w-px h-px p-0 truncate">Enter Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter Email"
                        className="w-72 p-3 mt-5 max-w-full border border-vivid-blue rounded-lg"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="absolute w-px h-px p-0 truncate">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="w-72 p-3 mt-5 max-w-full border border-vivid-blue rounded-lg"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                {loading && <LoadingIndicator />}
                {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                {<p className={getColor(passwordStrength)}>Password strength: {passwordStrength}</p>}
                <button className="w-72 p-3 mt-5 max-w-full border rounded-lg bg-pinkish-purple capitalize text-white text-xl font-medium" type="submit">Sign up</button>
            </form>
            <div className="text-vivid-blue mt-4">
                <Link to="/login">Have an account?</Link>
            </div>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7cb08ccd3d75cd9302262765155183963ba140f9795f48a3ba8f472b701079f7?apiKey=afa45b72ad7c46798aa3d2761c2357ac&" alt="Sign in visual representation" className="w-full self-stretch mt-28" />
        </div>
    );
}

export default Form