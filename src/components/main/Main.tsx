import "./Main.scss";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { API_KEY } from "../../constants";
//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import TableCell from "@mui/material/TableCell";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getData } from "../../redux/MainSlice";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { getRightDate } from "../../utils";
import {
  TableBody,
  TableContainer,
  TableRow,
  TableHead,
  Table,
} from "@mui/material";
import LoadingItem from "../LoadingItem/LoadingItem";

const Main = () => {
  const newData = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(0);
  const [thisPage, setThisPage] = useState(
    newData.data.slice(page, 10 + page).map((item) => {
      return { ...item, id: uuidv4() };
    })
  );

  console.log(thisPage);
  useEffect(() => {
    dispatch(
      getData(
        `https://api.iex.cloud/v1/data/CORE/HISTORICAL_PRICES/AAPL,MSFT,GOOGL,AMZN,FB,TSLA,NFLX,JPM,JNJ,XOM,BRK.A,BABA,V,NVDA,BAC,UNH,HD,CVX,PFE,WMT,DIS,MA,INTC,ADBE,CRM,ABT,ORCL,NKE,KO,TMUS,CMCSA,TGT,PEP,MCD,NVAX,MRNA,AMD,GS,UNP,BA,FISV,MMM,NOC,BMY,LOW,CAT,UPS,IBM,GSX,SLB,FDX,DUK,MO,CI,AMGN,RTX,ANTM,MDLZ,SO,KHC,CL,FIS,AMAT,BAH,SPG,REGN,MMM,GM,FDX,DUK,VLO,EOG,CLX,TWTR,ROP,GE,EMN,SLB,ETN,SO,KHC,CL,FIS,AMAT,BAH,SPG,REGN,MMM,GM,FDX,DUK,VLO,EOG,CLX,TWTR,ROP,GE,EMN,SLB,ETN,SO,KHC,CL,FIS,AMAT,BAH,SPG,REGN,MMM,GM,FDX,DUK,VLO,EOG,CLX,TWTR,ROP,GE,EMN,SLB,ETN,SO,KHC,CL,FIS,AMAT,BAH,SPG,REGN,MMM,GM,FDX,DUK,VLO,EOG,CLX,TWTR,ROP,GE,EMN,SLB,ETN,SO,KHC,CL,FIS,AMAT,BAH,SPG,REGN,MMM,GM,FDX,DUK,VLO,EOG,CLX,TWTR,ROP,GE,EMN,SLB,ETN,SO,KHC,CL,FIS,AMAT,BAH,SPG,REGN,MMM,GM,FDX,DUK,VLO,EOG,CLX,TWTR,ROP?token=${API_KEY}`
      )
    );
  }, []);
  useEffect(() => {
    setThisPage(
      newData.data.slice(page, 10 + page).map((item) => {
        return { ...item, id: uuidv4() };
      })
    );
  }, [page, newData.data]);

  const onDragHandle = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    let items = Array.from(thisPage);
    let [item] = items.splice(source.index, 1);
    items.splice(destination.index, 0, item);
    setThisPage(items);
  };

  return (
    <div className="Main_content">
      <Paper elevation={3} className="Main_container">
        {newData.status === "loading" ? (
          <div className="Main_loading">
            <LoadingItem />
          </div>
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Currency </TableCell>
                  <TableCell className="Table_text" align="right">
                    close
                  </TableCell>
                  <TableCell align="right">high</TableCell>
                  <TableCell align="right">flow</TableCell>
                  <TableCell align="right">fvolume</TableCell>
                  <TableCell align="right">fclose</TableCell>
                  <TableCell align="right">fhigh</TableCell>
                  <TableCell align="right">date</TableCell>
                </TableRow>
              </TableHead>

              <DragDropContext onDragEnd={onDragHandle}>
                <Droppable droppableId="currency" type="list">
                  {(provided) => (
                    <TableBody
                      style={{ width: "770px" }}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {thisPage.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided) => (
                              <TableRow
                                key={item.id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <TableCell align="left">
                                  {item.symbol}
                                </TableCell>
                                <TableCell align="left">{item.close}</TableCell>
                                <TableCell align="left">{item.high}</TableCell>
                                <TableCell align="left">{item.flow}</TableCell>
                                <TableCell align="left">
                                  {item.fvolume}
                                </TableCell>
                                <TableCell align="left">
                                  {item.fclose}
                                </TableCell>
                                <TableCell align="left">{item.fhigh}</TableCell>
                                <TableCell align="left">
                                  {getRightDate(item.date)}
                                </TableCell>
                              </TableRow>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </TableBody>
                  )}
                </Droppable>
              </DragDropContext>
            </Table>
          </TableContainer>
        )}

        <div className="Main_buttons">
          <Button
            disabled={page === 0 ? true : false}
            variant="contained"
            onClick={() => {
              setPage((page) => page - 10);
            }}
          >
            назад
          </Button>
          <Button
            onClick={() => {
              setPage((page) => page + 10);
            }}
            disabled={newData.data.length === page + 10 ? true : false}
            variant="contained"
          >
            вперед
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Main;
