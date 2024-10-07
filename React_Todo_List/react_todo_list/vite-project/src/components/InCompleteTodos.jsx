import { DeleteIcon, EditIcon, CheckIcon } from '@chakra-ui/icons'
import { Flex, Box, IconButton } from "@chakra-ui/react"

export const InCompleteTodos = (props) => {
    const { incompleteTodos, inputCardTitle, onClickComplete, handleSubmit, handleChange, handleClick, onClickDelete } = props

    return (
        <div>
        <p>未完了のToDo</p>
        <ul>
          {incompleteTodos.map((todo, index) => (
          <li key={todo.id}>
            <Box display="flex" p={2}>
            <input type="checkbox" onChange={() => onClickComplete(index)}/>
              <Box flex="1" ml={4}>
                {todo.isEditing ? (
                    <form onSubmit={(e) => handleSubmit(index, e)}>
                      <input 
                        id="todo"
                        type="text"
                        value={inputCardTitle}
                        onChange={handleChange}/>
                      <IconButton icon={<CheckIcon />} type="submit"></IconButton>
                    </form>
                      )
                   : (
                      <Box>
                        <Flex justify="space-between" align="center">
                          <p>{todo.text}</p>
                          <Flex ml="auto">
                            <IconButton icon={<EditIcon />} onClick={() => handleClick(index)}></IconButton>
                            <Box px={2}></Box>
                            <IconButton icon={<DeleteIcon />} onClick={() => onClickDelete(index)}></IconButton>
                          </Flex>
                        </Flex>
                      </Box>
                   )}
              </Box>
            </Box>
          </li>
            )
        )}
        </ul>
        </div>
    )
}