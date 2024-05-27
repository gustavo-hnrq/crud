import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// eslint-disable-next-line react/prop-types
export default function AddTarefaModal({ turmaId, onAdd }) {
  const [descricao, setDescricao] = useState('');
  const [open, setOpen] = useState(false);

  const resetInputs = () => {
    setDescricao('');
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/turmas/${turmaId}/tarefas`, {
        descricao: descricao,
        turma_id: turmaId,  // Inclui o turmaId no corpo da requisição
      });
      console.log('Tarefa adicionada:', response.data);
      onAdd(); // Atualiza a tabela de tarefas
      resetInputs(); // Limpa os estados dos inputs após o envio bem-sucedido
      setOpen(false); // Fecha a modal
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  useEffect(() => {
    // Limpa os estados dos inputs quando a modal é fechada
    if (!open) {
      resetInputs();
    }
  }, [open]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>Adicionar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Adicionar Tarefa</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="descricao" className="text-right">
              Descrição
            </Label>
            <Input
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Adicionar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}