import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams, Link } from "react-router-dom";
import AddTarefaModal from "../modals/add-tarefa";
import DeleteTarefaModal from "../modals/delete-tarefa";

export default function TabelaTarefas() {
  const { turmaId } = useParams();
  const [tarefas, setTarefas] = useState([]);

  const fetchTarefas = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/turmas/${turmaId}/tarefas`
      );
      setTarefas(response.data);
      console.log("Tarefas:", response.data);
    } catch (error) {
      console.error("Erro ao buscar os dados das tarefas:", error);
    }
  };

  useEffect(() => {
    fetchTarefas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turmaId]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        <Link className="text-primary" to="/turmas">
          Voltar
        </Link>
        <h1 className="text-2xl font-bold">Tarefas da Turma</h1>
        <AddTarefaModal turmaId={turmaId} onAdd={fetchTarefas} />

      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Descrição</TableCell>
            <TableCell className="flex justify-end">Opções</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tarefas.map((tarefa) => (
            <TableRow key={tarefa.id}>
              <TableCell>{tarefa.descricao}</TableCell>
              <TableCell className="flex justify-end">
                <DeleteTarefaModal
                  turmaId={turmaId}
                  tarefaId={tarefa.id}
                  onRemove={fetchTarefas}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
