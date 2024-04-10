import { KanbanColumnSkeleton } from '@/components'
import { KanbanBoardContainer, KanbanBoard } from '@/components/tasks/kanban/board'
import KanbanColumn from '@/components/tasks/kanban/column'
import React from 'react'

const TaskList = () => {
    return (
        <>
            <KanbanBoardContainer>
                <KanbanBoard>
                    <KanbanColumn></KanbanColumn>
                    <KanbanColumn></KanbanColumn>
                </KanbanBoard>
            </KanbanBoardContainer>

        </>
    )
}

export default TaskList