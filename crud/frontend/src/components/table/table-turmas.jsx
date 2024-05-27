import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteTurmaModal from "../modals/delete-turma";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { EyeIcon } from "lucide-react";

export default function TabelaTurmas() {
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    fetchTurmas();
  }, []);

  const fetchTurmas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/turmas");
      setTurmas(response.data);
    } catch (error) {
      console.error("Erro ao buscar os dados das turmas:", error);
    }
  };

  const handleRemove = async (turmaId) => {
    try {
      await axios.delete(`http://localhost:3000/api/turmas/${turmaId}`);
      console.log("Turma removida com sucesso");
      fetchTurmas(); // Atualiza a lista de pacientes após a remoção
    } catch (error) {
      console.error("Erro ao remover turma:", error);
    }
  };

  return (
    <Table className="max-w-[400px] mx-auto">
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead className="flex justify-end items-center">Opções</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {turmas.map((turma) => (
          <TableRow
            onClick={() => history.push(`/turmas/${turma.id}/tarefas`)}
            key={turma.id}
          >
            <TableCell>{turma.nome}</TableCell>
            <TableCell className="flex gap-3 justify-end">
              <Link to={`/turmas/${turma.id}/tarefas`}>
                <Button variant="outline" className="h-8 w-8 p-0">
                  <EyeIcon className="h-4 w-4 text-primary" />
                </Button>
              </Link>
              <DeleteTurmaModal
                turmaId={turma.id}
                onRemove={() => handleRemove(turma.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
