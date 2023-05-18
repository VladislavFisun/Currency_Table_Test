import './Main.scss'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {useEffect,useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch,useAppSelector } from '../../hooks';
import { getData, updateCurrentPage } from '../../redux/MainSlice';
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import { currencyType } from '../../types';


const Main = () => {
    const newData = useAppSelector(state=>state.main)
    const dispatch = useAppDispatch()
    const [page,setPage] = useState<number>(0)
    const [thisPage,setThisPage] = useState(newData.data.slice(page,10+page).map(item=>{
      return { ...item,id:uuidv4()}
      }))


    useEffect(()=>{
      dispatch(getData('https://api.iex.cloud/v1/data/CORE/HISTORICAL_PRICES/aapl,fb,googl,amzn,msft,nflx,twtr,tsla,brk.b,jpm,ba,wmt,ma,v,pg,dis,c,hd,unh,ko,pep,pfe,axp,nke,mcd,mmm,mrk,ba,cvx,cat,ge,jnj,ibm,orcl,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba,ba?token=sk_edd20de2d9be43fcbef97407d7e9b2ba'))

    },[])
    useEffect(()=>{
     dispatch(updateCurrentPage(thisPage))
    },[newData.data,page])
useEffect(()=>{
  setThisPage(newData.data.slice(page,10+page).map(item=>{
    return { ...item,id:uuidv4()}
    }))
},[page])
 

   const onDragHandle = (result: DropResult) => {
    const { source, destination} = result
    if(!destination){
      return
    }
    let items  = Array.from(thisPage)
    let [item] = items.splice(source.index,1)
    items.splice(destination.index,0,item)
    setThisPage(items)
 

	}


    return (
        <div className='Main_content'>
            <Paper elevation={3} className='Main_container'>
            <DragDropContext onDragEnd={onDragHandle}>
				<Droppable droppableId="todo" type='list'>
					{(provided) => (
						<div className="currency" {...provided.droppableProps} ref={provided.innerRef}>
							{thisPage.map((item, index) => {
								return (
									<Draggable key={item.id} draggableId={item.id} index={index}>
										{(provided) => (
											<div
                      

												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												
											>
                      {item.close}
											</div>
										)}
									</Draggable>
								)
							})}
						</div>
					)}
				</Droppable>
			</DragDropContext>

<div className='Main_buttons'>
        <Button 
        disabled={page===0?true:false}
        variant='contained'
        onClick={()=>{setPage(page=>page-10)}}
        >назад</Button>
        <Button
         onClick={()=>{setPage(page=>page+10)}}
         disabled={newData.data.length===page+10?true:false}
        variant='contained'>вперед</Button>
</div>

            </Paper>

        </div>
    );
};

export default Main;