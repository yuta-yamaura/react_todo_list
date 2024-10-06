/* eslint-disable react-hooks/exhaustive-deps */
import { Spinner, Wrap, WrapItem, Center, useDisclosure } from "@chakra-ui/react";
import { memo, FC, useEffect, useCallback } from "react";
import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserDetailModal } from "../organisms/user/UserDetailModal"
import { useSelectUser } from "../../hooks/useSelectUser"
import { useLoginUser } from "../../hooks/useLoginUser"

export const UserManagement: FC = memo(() => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { getUsers, loading, users } = useAllUsers();
    const { onSelectUser, selectedUser } = useSelectUser();
    const { loginUser } = useLoginUser();
    console.log(loginUser)

    useEffect(() => getUsers(), []);

    const onClickUser = useCallback((id: number) => {
        console.log(id)
        onSelectUser({ id, users, onOpen })
        onOpen()
     }, []);

    return (
        <>
        {loading ? (
            <Center h="100vh">
                <Spinner />
            </Center>
        ) : (
        <Wrap p={{ base: 4, md: 10 }}>
            {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
                <UserCard
                    id={user.id}
                    imageUrl="https://picsum.photos/800"
                    userName={user.username}
                    fullName={user.name}
                    onClick={onClickUser}
                />
            </WrapItem>
            ))}
        </Wrap>
        )}
        <UserDetailModal user={selectedUser} isOpen={isOpen} onClose={onClose}/>
        </>
    );
});