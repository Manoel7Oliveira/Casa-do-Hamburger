import { useState } from "react";
import Input from "../components/Input";

import { Link } from "react-router";
import Button from "../components/Button";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmePassword, setConfirmePassword] = useState("");
  const [cep, setCep] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (!name || !email || !password || !cep) {
        setError("Todos os campos são obrigatórios");
        return;
      }

      if (confirmePassword !== password) {
        setError("As senhas não são iguais");
        return;
      }

      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, cep }),
      });

      console.log(response);

      switch (response.status) {
        case 201:
          setName("");
          setEmail("");
          setPassword("");
          setConfirmePassword("");
          setCep("");
          setError("");
          break;
        case 400:
          setError("Todos os campos são obrigatórios");
          break;
        case 409:
          setError("E-mail já cadastrado");
          break;
        case 500:
          setError("Tente novamente mais tarde");
          break;
        default:
          setError("");
      }

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
      return;
    }

    console.log({ name, email, password, confirmePassword, cep });
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
        <Input
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          type="text"
          value={name}
        />

        <Input
          placeholder="E-mail"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <Input
          placeholder="Senha"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <Input
          placeholder="Confirme sua Senha"
          type="password"
          onChange={(e) => setConfirmePassword(e.target.value)}
          value={confirmePassword}
        />

        <Input
          placeholder="CEP"
          type="text"
          onChange={(e) => setCep(e.target.value)}
          value={cep}
        />
        <p className="text-left text-sm font-bold text-red-500">{error}</p>

        <div className="mt-3 flex w-full flex-col gap-2">
          <Button title="Criar conta" type="submit" />

          <Link to="/login" className="w-full">
            <Button title="Já tenho uma conta" variant="outline" />
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
