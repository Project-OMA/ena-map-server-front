import { useState, useCallback, useEffect } from "react";
import RegisterMapModal from "../../../common/modal/RegisterMapModal";
import { HeaderMapsPage, WrapperMaps } from "./style";
import { serverMapService as mapService } from "../../../service/axiosServer";
import { LoadingComponent } from "../../../common/styled/LoadingComponent";
import MapItem from "../../../common/components/CardItem";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";

import debounce from "lodash/debounce";
import Header from "../../../common/components/Header/Header";
import { WrapperPage } from "../../../common/styled/main.styled";

export default function Admin_Maps() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [maps, setMaps] = useState([]);
  const [mapSelected, setMapSelected] = useState(null);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [count, setCount] = useState<number>(0);

  const closeModal = () => {
    setOpenModal(false);
  };

  const loadMaps = useCallback(
    async (search: string, limit: number, page: number) => {
      if (!openModal) {
        try {
          const pagedMaps = await mapService.findAllPaged(
            search,
            limit,
            page + 1
          );
          setMaps(pagedMaps.data);
          setLimit(pagedMaps.limit);
          setPage(pagedMaps.page - 1);
          setCount(pagedMaps.count);
        } catch (error) {
          console.error(error);
        }
      }
    },
    [openModal]
  );

  const handleSelectMap = (map: any) => {
    setMapSelected(map);
    setOpenModal(true);
  };

  useEffect(() => {
    loadMaps(search, limit, page);
  }, [loadMaps]);

  const debouncedLoadUsers = debounce(loadMaps, 1500);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    loadMaps(search, limit, newPage);
  };

  const handleChangeLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(+event.target.value);
    setPage(0);
    loadMaps(search, +event.target.value, 0);
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    debouncedLoadUsers(newSearch, limit, 0);
  };

  const renderMapCards = useCallback(() => {
    if (maps.length > 0) {
      return maps.map((map: any) => {
        return (
          <MapItem
            key={map.id_map}
            id={map.id}
            title={map.name}
            imgBg={map?.thumb_url}
            handleSelectMap={() => handleSelectMap(map)}
          />
        );
      });
    }
    return <LoadingComponent size={30} />;
  }, [maps]);

  return (
    <>
      <Header title="Mapas" />
      <WrapperPage>
        <HeaderMapsPage>
          <button onClick={() => setOpenModal(true)}>Cadastrar Mapas</button>
        </HeaderMapsPage>
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
          <WrapperMaps>
            <RegisterMapModal
              open={openModal}
              closeModal={closeModal}
              loadMaps={() => loadMaps(search, limit, page)}
              mapSelected={mapSelected}
            />
            {renderMapCards()}
          </WrapperMaps>

          <TablePagination
            style={{ marginTop: "auto", marginLeft: "auto" }}
            rowsPerPageOptions={[1, 20]}
            component="div"
            count={count}
            page={page}
            rowsPerPage={limit}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeLimit}
          />
        </Paper>
      </WrapperPage>
    </>
  );
}
