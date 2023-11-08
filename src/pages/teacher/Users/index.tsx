import { useState, useCallback, useEffect } from "react";
import UserFormModal from "../../../common/modal/UserFormModal";
import UserFileModal from "../../../common/modal/UserFileModal";
import { HeaderUsers } from "./style";
import { userService } from "../../../service/axiosServer";
import { LoadingComponent } from "../../../common/styled/LoadingComponent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import convertUserType from "../../../utils/convertUserType";
import Button from "@mui/material/Button";
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

import debounce from 'lodash/debounce';
import Header from "../../../common/components/Header/Header";

export default function Teacher_Users() {
  const [openCsvModal, setOpenCsvModal] = useState<boolean>(false);
  const [openFormModal, setOpenFormModal] = useState<boolean>(false);
  const [userUpdateId, setUserUpdateId] = useState<number | null>(null);

  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  
  const [users, setUsers] = useState([]);

  const loadUsers = useCallback(async (search: string, limit: number, page: number) => {
    if (!openFormModal && !openCsvModal) {
      try {
        const pagedUsers = (await userService.findAllPaged(search, limit, page + 1));
        setUsers(pagedUsers.data);
        setLimit(pagedUsers.limit);
        setPage(pagedUsers.page - 1);
        setCount(pagedUsers.count);
      } catch (error) {
        console.error(error);
      }
    }
  }, [openFormModal, openCsvModal]);

  useEffect(() => {
    loadUsers(search, limit, page);
  }, [loadUsers]);

  const debouncedLoadUsers = debounce(loadUsers, 1500);

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    loadUsers(search, limit, newPage);
  };

  const handleChangeLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(+event.target.value);
    setPage(0);
    loadUsers(search, +event.target.value, 0);
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    debouncedLoadUsers(newSearch, limit, 0);
  };

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
              <Button
                variant="contained"
                onClick={() => openEditModal(user.id)}
              >
                Editar
              </Button>
            </TableCell>
          </TableRow>
        );
      });
    }
    return <LoadingComponent size={30} />;
  }, [users]);

  return (
    <>
      <Header title="Usuários" />
      <HeaderUsers>
        <button onClick={() => setOpenCsvModal(true)}>Cadastrar por CSV</button>
        <button onClick={() => setOpenFormModal(true)}>
          Cadastrar por Formulário
        </button>
      </HeaderUsers>

      <UserFileModal open={openCsvModal} closeModal={closeCsvModal} />

      <UserFormModal
        open={openFormModal}
        closeModal={closeFormModal}
        userUpdateId={userUpdateId}
      />
      <Paper sx={{ width: '100%', height: '100%', marginY: 5}}>
        <TextField
          id="search"
          type="search"
          label="Pesquisar"
          value={search}
          onChange={handleChangeSearch}
          sx={{ width: "100%"}}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
          }}
        />
        <TableContainer sx={{ marginTop: 2}}>
          <Table stickyHeader aria-label="sticky table">
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
            <TableBody>{renderUsersCards()}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15]}
          component="div"
          count={count}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeLimit}
        />
      </Paper>
    </>
  );
}
