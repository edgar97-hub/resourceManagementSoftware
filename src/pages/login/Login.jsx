import {useRef, useEffect, Component,useContext, useState} from 'react';
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase"
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext"
import $ from 'jquery'
import "./login.scss"
import Example  from "./Notification.jsx"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { showSpinner } from '@syncfusion/ej2-react-popups';


 

const Login = () => {
//class Login extends Component{
   // constructor(props){
     // super(props)
    //}
    //componentDidMount(){

      
      var message = {
        "auth/network-request-failed":"solicitud de red fallida",
         "auth/wrong-password":"contraseña incorrecta",
      }

      const emailRef = useRef()
      const passwordRef = useRef()
      const passwordConfirmRef = useRef()
      const [loading, setLoading] = useState(false)
      const [registrationNotification, setRegistrationNotification] = useState(false);
      const [registrationMessage, setRegistrationMessage] = useState("");


      async function handleSignUp(e) {
        e.preventDefault()
    
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          console.log("Passwords do not match");
          return setError("Passwords do not match")
        }

        setError("")
        setLoading(true)
        setRegistrationNotification(false);
        setRegistrationMessage("");

        createUserWithEmailAndPassword(auth, emailRef, passwordRef)
        .then((userCredential) => {
            
            const user = userCredential.user;
            dispatch({type:"LOGIN", payload:user})
            navigate("/");

        })
        .catch((error) => {
            setError(true);

            const errorMessage = error.message;
            var regExp = /\(([^)]+)\)/;
            var matches = regExp.exec(errorMessage);
            console.log("test"+matches[1])
            setRegistrationMessage(message[matches[1]])
            setRegistrationNotification(true);
            setError("Failed to create an account")

       });
        setRegistrationNotification(false);
        setLoading(false)

    
      }


      const [error, setError] = useState(false);
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();
      const {dispatch} = useContext(AuthContext)
      const [loginNotification, setLoginNotification] = useState(false);
      const [loginMessage, setLoginMessage] = useState("");

      const handleLogin = (e) =>{
        e.preventDefault();
        
        setLoginNotification(false);
        setLoginMessage("");

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            
            const user = userCredential.user;
            dispatch({type:"LOGIN", payload:user})
            console.log(user);
            navigate("/");

        })
        .catch((error) => {

            setError(true);
            setLoginNotification(true);
            var regExp = /\(([^)]+)\)/;
            var matches = regExp.exec(error.message);
            console.log("test"+matches[1])
            setLoginMessage(message[matches[1]])
 
        });
        setLoginNotification(false);

    }
     
   
    useEffect(() => {

      const signUpButton = document.getElementById('signUp');
      const signInButton = document.getElementById('signIn');
      const container = document.getElementById('wrapper');

      signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
      });

      signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });

    }, []);


    
  
    return (
      <div className='login'>

        <div className="wrapper" id="wrapper">
          <div className="form-wrapper sign-up-wrapper">
            <form action="#" onSubmit={handleSignUp}>
              <h1>Crear una cuenta</h1>
               {/*
              <div className="social-wrapper">
                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
              </div>
    */}
              <input type="text" placeholder="Nombre"   />
              <input type="email" placeholder="Email" ref={emailRef} required/>
              <input type="password" placeholder="Password" ref={passwordRef} required />
              <input type="Password-confirmation" placeholder="Password Confirmation" ref={passwordConfirmRef} required />

              <button disabled={loading}>Registrarse</button>
              { registrationNotification &&  NotificationManager.error(registrationMessage, 'Info!', 5000)}

            </form>
          </div>

          <div className="form-wrapper sign-in-wrapper">
            <form action="#" onSubmit={handleLogin}>
              <h1>Iniciar sesión</h1>
              <div className="social-wrapper">
                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
              </div>
              <input type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
              <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
              <a href="forgot-password">Olvidaste tu contraseña?</a>
              <button>Iniciar sesión</button>
              { /* error && <span>wrong email or password!</span>*/}

              { loginNotification &&  NotificationManager.error(loginMessage, 'Info!', 5000)}

 
            </form>
          </div>
          <div className="overlay-wrapper">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Bienvenido de nuevo!</h1>
                <p>Para mantenerse conectado con nosotros, inicie sesión con su información personal</p>
                <button className="ghost" id="signIn">Iniciar sesión</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hola amigo!</h1>
                <p>Ingresa tus datos personales y comienza tu viaje con nosotros</p>
                <button className="ghost" id="signUp">Registrarse</button>
              </div>
            </div>
          </div>
        </div>
         
 
        
        

        
      </div>
      
  )
}

export default Login