import "./home.scss";
import { Navbar} from "../../components";
import { Link } from "react-router-dom";
import { FiSettings} from "@react-icons/all-files/fi/FiSettings";


const Home = () => {
  return (
    <div className="home">
        <Navbar />


      <div className="wrapper">

          <Link to="/jobs"  target="_blank" className="w"style={{ textDecoration: "none" }}>
             <FiSettings size={50}/>
             <p className=""> GESTIÓN SIG</p>
          </Link>

          <Link to="/jobs" target="_blank" className="w"style={{ textDecoration: "none" }}>
             <FiSettings size={50}/>
             <p className="p-1"> GESTIÓN ESTRATEGICA</p>

          </Link>

          <Link to="/jobs" target="_blank" className="w" style={{ textDecoration: "none" }}>
             <FiSettings size={50}/>
             <p className="p-1"> GESTIÓN LOGÍSTICA Y ALMACENES</p>

          </Link>

          <Link to="/jobs" target="_blank" className="w" style={{ textDecoration: "none" }}>
             <FiSettings size={50}/>
             <p className="p-1"> GESTIÓN DEL TALENTO HUMANO</p>
          </Link>

          <Link to="/jobs" target="_blank" className="w" style={{ textDecoration: "none" }}>
             <FiSettings size={50}/>
             <p className="p-1">GESTIÓN OPERACIONES</p>

          </Link>

          <Link to="/jobs" target="_blank" className="w" style={{ textDecoration: "none" }}>
             <FiSettings size={50}/>
             <p className="p-1">GESTIÓN MANTENIMIENTO</p>
          </Link>

          <Link to="/jobs" target="_blank" className="w" style={{ textDecoration: "none" }}>
             <FiSettings size={50}/>
             <p className="p-1">DOCUMENTOS CORPORATIVOS</p>
          </Link>
          <Link to="/jobs" target="_blank" className="w" style={{ textDecoration: "none" }}>
             <FiSettings size={50}/>
             <p className="p-1">GESTIÓN COMERCIAL</p>
          </Link>


         

         

      </div>

     

    </div>
  );
};

export default Home;