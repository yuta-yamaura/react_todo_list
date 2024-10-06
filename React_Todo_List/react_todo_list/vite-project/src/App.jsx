import { useState } from "react"
import './App.css';
import { InputTodo } from "./components/InputTodo";
import { CompleteTodos } from "./components/CompleteTodos";
import { ChakraProvider, Flex, Box, IconButton } from "@chakra-ui/react"
import { DeleteIcon, EditIcon, CheckIcon } from '@chakra-ui/icons'
import theme from "./theme/theme"
import { v4 as uuidv4 } from "uuid";

export const TodoList = () => {
  const [todoText, settodoText] = useState("");
  const [incompleteTodos, setincompleteTodos] = useState([]);
  const [completeTodos, setcompleteTodos] = useState([]);
  const [inputCardTitle, setInputCardTitle] = useState();
  
  const length1 = incompleteTodos.length
  const length2 = completeTodos.length
  const sum = (length1 + length2)

  // Generate a unique ID
  const uniqueId = uuidv4();
  console.log('A unique ID:', uniqueId);

  const onChangeTodoText = (e) => settodoText(e.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodo = { id: uniqueId, text: todoText, isEditing: false };
    const newTodos = [...incompleteTodos, newTodo];
    setincompleteTodos(newTodos);
    settodoText("");
  }

  const onClickDelete = (index) => {
    // 削除する前に確認のポップアップを表示
    let result = window.confirm("本当に削除してもよろしいですか？");
    if (result) {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setincompleteTodos(newTodos);
    }
  }

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    console.log(newIncompleteTodos);
    
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setincompleteTodos(newIncompleteTodos);
    setcompleteTodos(newCompleteTodos);
  }

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setcompleteTodos(newCompleteTodos);
    setincompleteTodos(newIncompleteTodos);
  }


  const handleClick = (index) => {
    // 編集対象のタスクを初期値に設定
    const selectedTodo = incompleteTodos[index];
    setInputCardTitle(selectedTodo.text);
    const updateTodos = incompleteTodos.map((todo, i) => {
      if (i === index) {
        return { ...todo, isEditing: !todo.isEditing };
      } else{
        return todo;
      }
    });
    setincompleteTodos(updateTodos);
  }

  const handleChange = (e) => {
    setInputCardTitle(e.target.value);
  }

  const handleSubmit = (index, e) => {
    e.preventDefault();
    const updateTodos = incompleteTodos.map((todo, i) => {
      if (i === index) {
        return { ...todo, text: inputCardTitle, isEditing: false};
      } else {
        return todo;
      }
    });
    setincompleteTodos(updateTodos);
  }
  return (
    <>
      <ChakraProvider theme={theme}>
      <Flex h={200} justify='center' align='center' bg='gray.100' >
        <InputTodo 
          todoText={todoText} 
          onChange={onChangeTodoText} 
          onClick={onClickAdd}
        />
        </Flex>
        <Flex h={200} justify='center' align='center' >
        <Box>
          <Box>全てのタスク： {sum} 完了済み：{completeTodos.length} 未完了：{incompleteTodos.length}</Box>
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
        <CompleteTodos 
          completeTodos={completeTodos}
          onClickBack={onClickBack}
          />
        </Box>
        </Flex>
      </ChakraProvider>
    </>
  );
};

export default TodoList;