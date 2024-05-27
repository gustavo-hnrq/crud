import { useState } from "react";
import PropTypes from "prop-types"; // Importe PropTypes
import axios from "axios";
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
import { Edit } from "lucide-react";

export default function EditModal({ paciente, onUpdate }) {
  const [nome, setNome] = useState(paciente.nome);
  const [idade, setIdade] = useState(paciente.idade);
  const [genero, setGenero] = useState(paciente.genero);
  const [endereco, setEndereco] = useState(paciente.endereco);
  const [telefone, setTelefone] = useState(paciente.telefone);
  const [open, setOpen] = useState(false);

  const handleUpdate = async () => {
    try {
      const updatedPaciente = {
        id: paciente.id,
        nome,
        idade,
        genero,
        endereco,
        telefone,
      };
      await axios.put(
        `http://localhost:3000/api/pacientes/${paciente.id}`,
        updatedPaciente
      );
      console.log("Paciente atualizado com sucesso");
      onUpdate(updatedPaciente); // Atualiza a tabela após a edição
      setOpen(false); // Fecha a modal de edição
    } catch (error) {
      console.error("Erro ao atualizar paciente:", error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="h-8 w-8 p-0">
          <Edit className="h-4 w-4 text-primary" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Editar Paciente</AlertDialogTitle>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="idade" className="text-right">
              Idade
            </Label>
            <Input
              id="idade"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="genero" className="text-right">
              Gênero
            </Label>
            <Input
              id="genero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endereco" className="text-right">
              Endereço
            </Label>
            <Input
              id="endereco"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="telefone" className="text-right">
              Telefone
            </Label>
            <Input
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleUpdate}>Salvar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

EditModal.propTypes = {
  paciente: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
