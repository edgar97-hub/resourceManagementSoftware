import {useRef, useEffect, Component,useContext, useState} from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase"
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext"
import $ from 'jquery'
import "./login.scss"

const Login = () => {
//class Login extends Component{
   // constructor(props){
     // super(props)
    //}
    //componentDidMount(){

      

      const [error, setError] = useState(false);
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
  
      const navigate = useNavigate();
      const {dispatch} = useContext(AuthContext)

      const handleLogin = (e) =>{
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            
            const user = userCredential.user;
            dispatch({type:"LOGIN", payload:user})
            console.log(user);
            console.log("redirect to /");

            navigate("/");

        })
        .catch((error) => {
            setError(true);
            const errorCode = error.code;
            const errorMessage = error.message;
        });



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
            <form action="#" onSubmit={handleLogin}>
              <h1>Crear una cuenta</h1>
              <div className="social-wrapper">
                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
              </div>
              <input type="text" placeholder="Nombre" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Registrarse</button>
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
              <a href="#">Olvidaste tu contraseña?</a>
              <button>Iniciar sesión</button>
              { error && <span>wrong email or password!</span>}

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