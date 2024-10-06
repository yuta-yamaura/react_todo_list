export const CompleteTodos = (props) => {
    const { completeTodos, onClickBack } = props;

    return (
        <div>
            <p>完了のToDo</p>
                <ul>
                {completeTodos.map((done, index) => (
                <li key={done.id}>
                    <p>{done.text}</p>
                    <button onClick={() => onClickBack(index)}>戻す</button>
                </li>
                    )
                )}
                </ul>
        </div>
    )
}