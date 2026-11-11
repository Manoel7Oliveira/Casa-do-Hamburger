import { useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useContext(UserContext);
  console.log(document.cookie);

  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (!email || !password) {
        setError("E-mail e senha são obrigatórios");
        return;
      }
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Inclui cookies na requisição
      });

      console.log(response);
      if (response.status === 500) {
        setError("Erro no servidor, tente novamente mais tarde");
        return;
      }

      if (response.status === 404) {
        setError("Usuário não encontrado");
        return;
      }

      if (response.status === 401) {
        setError("Credenciais inválidas");
        return;
      }

      if (response.status === 400) {
        setError("Usuário e senha são obrigatórias");
        return;
      }

      if (response.status === 200) {
        setError("");
        const data = await response.json();
        navigate("/");
        setUser(data);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  }

  return (
    <form
      className="flex h-screen items-center justify-center bg-[#161410]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col justify-center gap-2">
        <Link to="/">
          <img src="/logo.png" alt="" className="mx-auto mb-4" />
        </Link>
        <div className="mb-3 flex flex-col gap-2">
          <Input
            placeholder="E-mail"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Senha"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-left text-sm font-bold text-red-500">{error}</p>
        </div>

        <Button title="Login" variant="default" type="submit" />

        <Link to="/register" className="w-full">
          <Button title="Nao tenho uma conta" variant="outline" />
        </Link>
      </div>
    </form>
  );
};

export default Login;
