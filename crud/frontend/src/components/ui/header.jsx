import { Link } from "react-router-dom";
import { Button } from "./button";
import { LogOutIcon } from "lucide-react";

export default function Header() {
  return (
    <div className="w-full border-b p-5 flex justify-between items-center mb-36">
      <Link to="/turmas">
        <h1 className="cursor-default font-bold">CRUD</h1>
      </Link>
      <Link to="/">
        <Button variant="outline" className="flex gap-2">
          <LogOutIcon className="h-4 w-4" /><p>Sair</p>
        </Button>
      </Link>
    </div>
  );
}
