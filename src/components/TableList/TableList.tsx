import React from 'react';
import { currencyType } from '../../types';
import TableBody from '@mui/material/TableBody';
import { useAppDispatch } from '../../hooks';
import { sortCurrentPage } from '../../redux/MainSlice';
import {memo} from 'react'
import TableRowItem from '../../TableRowItem/TableRowItem';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';

interface TableListProps{
    currentPage:currencyType[]
}

const TableList:React.FC<TableListProps> = ({currentPage}) => {

const dispatch = useAppDispatch()
    
const onDragEnd =(result:DropResult)=>{
  const {source,destination}=result
  dispatch(sortCurrentPage({source,destination}))

}    
    return (
        <div style={{display:'flex'}}>
        <DragDropContext onDragEnd={onDragEnd}>
             <Droppable droppableId='currency'>
                {(provided)=>(
                
                      <div {...provided.droppableProps} ref={provided.innerRef}>
            {currentPage.map((row:currencyType,index) => (
                <Draggable key={row.key} draggableId={row.key} index={index}>
                    {(provided)=>(  
                            <TableRowItem row={row} 
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef} />
                    )}
                </Draggable>
          ))}
            </div>
                    
                )}
             </Droppable>
        </DragDropContext>
        
        </div>
    );
};
export default memo(TableList);
