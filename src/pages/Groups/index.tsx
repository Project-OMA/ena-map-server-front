import { useState, useCallback, useEffect } from "react";
import GroupFormModal from "../../common/modal/GroupFormModal";
import { Header } from "./style";
import { groupService } from "../../service/axiosServer";
import { LoadingComponent } from "../../common/styled/LoadingComponent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export default function Groups() {
  const [openFormModal, setOpenFormModal] = useState<boolean>(false);
  const [groupUpdateId, setGroupUpdateId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [groups, setGroups] = useState([]);

  const closeFormModal = () => {
    setGroupUpdateId(null);
    setOpenFormModal(false);
  };

  const openEditModal = (id: number) => {
    setGroupUpdateId(id);
    setOpenFormModal(true);
  };

  const loadGroups = useCallback(async () => {
    if (!openFormModal) {
      try {
        setLoading(true);
        const response = await groupService.findAll();
        setGroups(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }, [openFormModal]);

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  const renderGroupsCards = useCallback(() => {
    if (groups.length > 0) {
      return groups.map((group: any) => {
        return (
          <TableRow key={group.id}>
            <TableCell component="th" scope="row">
              {group.id}
            </TableCell>
            <TableCell>{group.name}</TableCell>
            <TableCell>{group.id_owner}</TableCell>
            <TableCell>{new Date(group.created_at).toLocaleString()}</TableCell>
            <TableCell>{new Date(group.updated_at).toLocaleString()}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                onClick={() => openEditModal(group.id)}
              >
                Editar
              </Button>
            </TableCell>
          </TableRow>
        );
      });
    }

    if (loading) {
      return <LoadingComponent size={30} />;
    }
  }, [groups, loading]);

  return (
    <>
      <Header>
        <button onClick={() => setOpenFormModal(true)}>Cadastrar grupo</button>
      </Header>

      <GroupFormModal
        open={openFormModal}
        closeModal={closeFormModal}
        groupUpdateId={groupUpdateId}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Id do Proprietário</TableCell>
              <TableCell>Criado em</TableCell>
              <TableCell>Atualizado em</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderGroupsCards()}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
