import TabelaTarefas from "../table/table-tarefas";
import Header from "../ui/header";

export default function Tarefas() {


  return (
    <div>
      <Header />
      <div className="flex flex-col mx-auto max-w-[400px] gap-4">
        <TabelaTarefas />
      </div>

    </div>
  );
}
