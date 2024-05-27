import AddModal from "../modals/add-turma";
import Tabela from "../table/table-turmas";
import Header from "../ui/header";
import { useState } from "react";

export default function Turmas() {
  const [reloadTable, setReloadTable] = useState(false);

  const handleReloadTable = () => {
    setReloadTable(!reloadTable);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col mx-auto max-w-[400px] gap-4">
        <p className="text-2xl font-bold">Turmas</p>
          <AddModal onAdd={handleReloadTable} />
        <Tabela key={reloadTable.toString()} />
      </div>
    </div>
  );
}
