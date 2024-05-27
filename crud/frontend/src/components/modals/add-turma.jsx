import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// eslint-disable-next-line react/prop-types
export default function AddTurmaModal({ onAdd }) {
  const [nome, setNome] = useState('');
  const [professorId, setProfessorId] = useState('');
  const [open, setOpen] = useState(false);

  const resetInputs = () => {
    setNome('');
    setProfessorId('');
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/turmas', {
        nome: nome,
        professor_id: professorId,
      });
      console.log('Turma adicionada:', response.data);
      onAdd(); // Atualiza a tabela
      resetInputs(); // Limpa os estados dos inputs após o envio bem-sucedido
      setOpen(false); // Fecha a modal
    } catch (error) {
      console.error('Erro ao adicionar turma:', error);
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
          <AlertDialogTitle>Adicionar Turma</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nome" className="text-right">
              Nome
            </Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
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
  )
}
