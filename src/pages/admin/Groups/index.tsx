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
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

import debounce from "lodash/debounce";
import Header from "../../../common/components/Header/Header";
import { useRoutes } from "../../../hooks/useRoutes";
import { WrapperPage } from "../../../common/styled/main.styled";

export default function Admin_Groups() {
  const { routes } = useRoutes();
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

  const openEditModal = (id: number) => {
    setGroupUpdateId(id);
    setOpenFormModal(true);
  };

  const loadGroups = useCallback(
    async (search: string, limit: number, page: number) => {
      if (!openFormModal) {
        try {
          setLoading(true);
          const pagedGroups = await groupService.findAllPaged(
            search,
            limit,
            page + 1
          );
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
    },
    [openFormModal]
  );

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
              {/* <Button
                sx={{ marginRight: 2 }}
                variant="contained"
                onClick={() => routes.groupById(group.id)}
              >
                Ver
              </Button> */}
              <Button
                sx={{ marginRight: 2 }}
                variant="contained"
                onClick={() => openEditModal(group.id)}
              >
                Editar
              </Button>
              {/* <Button variant="contained" onClick={() => {}}>
                Excluir
              </Button> */}
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
      <WrapperPage>
        <HeaderGroup>
          <button onClick={() => setOpenFormModal(true)}>
            Cadastrar grupo
          </button>
        </HeaderGroup>

        <GroupFormModal
          open={openFormModal}
          closeModal={closeFormModal}
          groupUpdateId={groupUpdateId}
        />
        <Paper
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 0",
          }}
        >
          <TextField
            id="search"
            type="search"
            label="Pesquisar"
            value={search}
            onChange={handleChangeSearch}
            sx={{ width: "95%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "14%" }}>Id</TableCell>
                  <TableCell style={{ width: "14%" }}>Nome</TableCell>
                  <TableCell style={{ width: "14%" }}>
                    Id do Proprietário
                  </TableCell>
                  <TableCell style={{ width: "14%" }}>Criado em</TableCell>
                  <TableCell style={{ width: "14%" }}>Atualizado em</TableCell>
                  <TableCell style={{ width: "14%" }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderGroupsCards()}</TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            style={{ marginTop: "auto", marginLeft: "auto" }}
            rowsPerPageOptions={[10, 15]}
            component="div"
            count={count}
            rowsPerPage={limit}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeLimit}
          />
        </Paper>
      </WrapperPage>
    </>
  );
}
