
import GoogleAuth from '../../domain/useCases/authUseCases/GoogleAuth';
import google from '../../assets/Img/google.png';
import facebook from '../../assets/Img/facebook.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';

const Login = () => {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleGoogleLogin = async () => {
        try {
            const user = await GoogleAuth();
            if (user) {
                setUser(user); // Actualiza el contexto directamente
                navigate('/');
            }
        } catch (error) {
            console.error('Error during Google authentication:', error);
        }
    };

    // const handleGoogleLogin = async () => {
    //     try {
    //         await GoogleAuth();
    //         // Espera unos milisegundos para que onAuthStateChanged se dispare
    //         setTimeout(() => {
    //             navigate('/dashboard');
    //         }, 500);
    //     } catch (error) {
    //         console.error('Error during Google authentication:', error);
    //     }
    // };


    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg login-card">

                <h5 className="text-center mb-4 fw-bold">Accede con tu cuenta</h5>

                <div className="d-grid gap-3">
                    <button className="btn btn-success d-flex align-items-center justify-content-center gap-2"
                        onClick={handleGoogleLogin}>
                        <img
                            src={google}
                            alt="Google"
                            width="20"
                        />
                        Continuar con Google
                    </button>

                    <button className="btn btn-success d-flex align-items-center justify-content-center gap-2">
                        <img
                            src={facebook}
                            alt="Facebook"
                            width="20"
                        />
                        Continuar con Facebook
                    </button>
                </div>

                <div className="form-check mt-4 d-flex justify-content-center">
                    <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id="terms"
                        checked={termsAccepted}
                        onChange={() => setTermsAccepted(!termsAccepted)}
                    />
                    <label className="form-check-label" htmlFor="terms">
                        Aceptar términos y condiciones
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Login;
