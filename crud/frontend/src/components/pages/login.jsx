import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        senha,
      });
      console.log(response.data);
      // Redireciona para a próxima página em caso de sucesso
      window.location.href = "/turmas";
    } catch (error) {
      console.error("Erro ao fazer login:", error.response.data.error);
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-[380px] mt-52">
        <div className="flex flex-col gap-3 border rounded-md p-4 w-full">
          <h1 className="text-xl font-bold">Login</h1>
          <p className="text-sm text-slate-500">
            Digite suas credenciais para logar
          </p>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-3">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Label>Senha</Label>
              <Input
                type="password"
                placeholder="senha123"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              {error && <p className="text-red-500">{error}</p>}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
