import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:5000/api/login", {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        navigate("/admin");
      } else {
        await axios.post("http://localhost:5000/api/register", formData);
        alert("Registration successful! You can now log in.");
        setIsLogin(true);
      }
    } catch (error) {
      setError(error.response?.data?.message || "An unknown error occurred.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{isLogin ? "Admin Login" : "Admin Register"}</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              style={styles.input}
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p
          style={styles.toggle}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #8360c3, #2ebf91)',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    outline: 'none',
    width: '100%',
  },
  button: {
    padding: '12px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  error: {
    color: 'red',
  },
  toggle: {
    marginTop: '10px',
    cursor: 'pointer',
    color: '#007BFF',
    textDecoration: 'underline',
  },
};

export default Auth;
