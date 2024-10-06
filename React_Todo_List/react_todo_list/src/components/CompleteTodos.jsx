import { Flex, Box, IconButton } from "@chakra-ui/react"
import { ArrowUpIcon } from '@chakra-ui/icons'

export const CompleteTodos = (props) => {
    const { completeTodos, onClickBack } = props;

    return (
        <div>
            <p>完了のToDo</p>
                <ul>
                {completeTodos.map((done, index) => (
                <li key={done.id}>
                    <Box flex="1" ml={4}>
                        <Flex justify="space-between" align="center">
                            <p>{done.text}</p>
                            <IconButton icon={<ArrowUpIcon />} onClick={() => onClickBack(index)}></IconButton>
                        </Flex>
                    </Box>
                </li>
                    )
                )}
                </ul>
        </div>
    )
}