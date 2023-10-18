import { useState, useCallback, useEffect } from "react";
import RegisterMapModal from "../../common/modal/RegisterMapModal";
import { HeaderMapsPage, WrapperMaps } from "./style";
import { serverMapService as mapService } from "../../service/axiosServer";
import { LoadingComponent } from "../../common/styled/LoadingComponent";
import { useUser } from "../../hooks/useUser";
import MapItem from "../../common/components/CardItem";
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from "@mui/material/Paper";

import debounce from 'lodash/debounce';

export default function MapPage() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [maps, setMaps] = useState([]);
  const { user } = useUser();

  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [count, setCount] = useState<number>(0);

  const closeModal = () => {
    setOpenModal(false);
  };

  const loadMaps = useCallback(async (search: string, limit: number, page: number) => {
    if (!openModal) {
      try {
        const pagedMaps = await mapService.findAllPaged(search, limit, page + 1);
        setMaps(pagedMaps.data);
        setLimit(pagedMaps.limit);
        setPage(pagedMaps.page - 1);
        setCount(pagedMaps.count);
      } catch (error) {
        console.error(error);
      }
    }
  }, [openModal]);

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
          />
        );
      });
    }
    return <LoadingComponent size={30} />;
  }, [maps]);

  return (
    <>
      <HeaderMapsPage>
        <button onClick={() => setOpenModal(true)}>Cadastrar Mapas</button>
      </HeaderMapsPage>
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
        <WrapperMaps>
          <RegisterMapModal
            open={openModal}
            closeModal={closeModal}
            loadMaps={() => loadMaps(search, limit, page)}
          />
          {renderMapCards()}
        </WrapperMaps>
        
        <TablePagination
          rowsPerPageOptions={[1, 20]}
          component="div"
          count={count}
          page={page}
          rowsPerPage={limit}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeLimit}
        />
      </Paper>
    </>
  );
}
