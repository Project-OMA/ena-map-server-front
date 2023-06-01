import { useState, useCallback, useEffect } from "react";
import UserFormModal from "../../common/modal/UserFormModal";
import UserFileModal from "../../common/modal/UserFileModal";
import { Header } from "./style";
import { userService } from "../../service/axiosServer";
import { LoadingComponent } from "../../common/styled/LoadingComponent";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import convertUserType from '../../utils/convertUserType';
import Button from '@mui/material/Button';

export default function Users() {
  const [openCsvModal, setOpenCsvModal] = useState<boolean>(false);
  const [openFormModal, setOpenFormModal] = useState<boolean>(false);
  const [userUpdateId, setUserUpdateId] = useState<number | null>(null);

  const [users, setUsers] = useState([]);

  const closeCsvModal = () => {
    setOpenCsvModal(false);
  };

  const closeFormModal = () => {
    setUserUpdateId(null);
    setOpenFormModal(false);
  };

  const openEditModal = (id: number) => {
    setUserUpdateId(id);
    setOpenFormModal(true);
  };


  const loadUsers = useCallback(async () => {
    try {
      const response = await userService.findAll();
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const renderUsersCards = useCallback(() => {
    if (users.length > 0) {
      return users.map((user: any) => {
        return (
          <TableRow key={user.id}>
            <TableCell component="th" scope="row">
              {user.id}
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{convertUserType(user.type)}</TableCell>
            <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
            <TableCell>{new Date(user.updated_at).toLocaleString()}</TableCell>
            <TableCell>
              <Button variant="contained" onClick={() => openEditModal(user.id)}>Editar</Button>
            </TableCell>
          </TableRow>
        )
      });
    }
    return <LoadingComponent size={30} />;
  }, [users]);

  return (
    <>
      <Header>
        <button onClick={() => setOpenCsvModal(true)}>Cadastrar por CSV</button>
        <button onClick={() => setOpenFormModal(true)}>Cadastrar por Formulário</button>
      </Header>
      
      <UserFileModal
        open={openCsvModal}
        closeModal={closeCsvModal}
      />

      <UserFormModal
        open={openFormModal}
        closeModal={closeFormModal}
        userUpdateId={userUpdateId}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Criado em</TableCell>
              <TableCell>Atualizado em</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderUsersCards()}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
