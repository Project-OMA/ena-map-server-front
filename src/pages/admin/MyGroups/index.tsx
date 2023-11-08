import { useState, useCallback, useEffect } from "react";
import GroupFormModal from "../../../common/modal/GroupFormModal";
import { HeaderGroup } from "./style";
import { groupService } from "../../../service/axiosServer";
import { LoadingComponent } from "../../../common/styled/LoadingComponent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

import debounce from 'lodash/debounce';
import Header from "../../../common/components/Header/Header";
import { useUser } from '../../../hooks/useUser';

export default function Admin_MyGroups() {
  const { user } = useUser();
  const [openFormModal, setOpenFormModal] = useState<boolean>(false);
  const [groupUpdateId, setGroupUpdateId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [groups, setGroups] = useState([]);

  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [count, setCount] = useState<number>(0);

  const closeFormModal = () => {
    setGroupUpdateId(null);
    setOpenFormModal(false);
  };

  const openEditModal = (id: number) => { console.log({id})
    setGroupUpdateId(id);
    setOpenFormModal(true);
  };

  const loadGroups = useCallback(async (search: string, limit: number, page: number) => {
    if (!openFormModal) {
      try {
        setLoading(true);
        console.log({loadGroup: true})
        const pagedGroups = (await groupService.findAllPagedByUserId(search, limit, page + 1, user?.id));
        setGroups(pagedGroups.data);
        setLimit(pagedGroups.limit);
        setPage(pagedGroups.page - 1);
        setCount(pagedGroups.count);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }, [openFormModal]);

  const debouncedLoadUsers = debounce(loadGroups, 1500);

  useEffect(() => {
    loadGroups(search, limit, page);
  }, [loadGroups]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    loadGroups(search, limit, newPage);
  };

  const handleChangeLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(+event.target.value);
    setPage(0);
    loadGroups(search, +event.target.value, 0);
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    debouncedLoadUsers(newSearch, limit, 0);
  };

  const renderGroupsCards = useCallback(() => {
    if (groups && groups.length > 0) {
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
      <Header title="Grupos" />
      <HeaderGroup>
        <button onClick={() => setOpenFormModal(true)}>Cadastrar grupo</button>
      </HeaderGroup>

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
        <TableContainer component={Paper} sx={{ marginTop: 2}}>
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
