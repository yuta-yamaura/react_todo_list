/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react"
import { User } from "../types/api/user"

import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useMessage } from "./useMessage"
import { useLoginUser } from "../hooks/useLoginUser"

export const useAuth = () => {
    const navigate = useNavigate();
    const { showMessage } = useMessage();
    const { setLoginUser } = useLoginUser();

    const [loading, setLoading] = useState(false);

    const login = useCallback((id: string) => {
        setLoading(true);

        axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => {
            if (res.data) {
                setLoginUser(res.data);
                showMessage({ title: "ログインしました", status: "success" });
                navigate("/home");
            } else {
                showMessage({ title: "ユーザが見つかりません", status: "error" });
            }
        }).catch(() => showMessage({ title: "ログインできません", status: "error" }))
        .finally(() => setLoading(false));
    }, []);
    return { login, loading }
}