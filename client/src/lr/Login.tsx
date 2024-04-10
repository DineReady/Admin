import "./Login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginFn = async (e: React.FormEvent<HTMLFormElement>) => {
        // Tutaj dodajemy typ dla `e`
        e.preventDefault(); // Zapobiega domyślnej akcji formularza

        if (email && password) {
            try {
                const credentials = { email, password };
                const response = await axios.post("/api/admin/login", credentials);
                const data = response.data;

                if (data.success && data.token) {
                    sessionStorage.setItem("token", data.token);
                    navigate("/admin/orders");
                }
            } catch (error) {
                console.error("Błąd logowania:", error);
                // Tu można dodać obsługę błędów, np. wyświetlanie komunikatu
            }
        }
    };

    return (
        <div className="login-container">
            <div className="form">
                <h2>Admin</h2>
                <form onSubmit={loginFn}>
                    <input
                        type="text"
                        placeholder="Login"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Hasło"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Zaloguj</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
