import React, {useEffect, useState} from 'react';
import '../styles/styleProfil.css'
import $api from "../API/Instanse";

const Profile = () => {
    useEffect(() => {
        document.title = 'Профиль';
    }, []);
    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')

    async function fetchProfileData() {
        const response = await $api.get('/profile/')
        setNickname(response.data.nickname)
        setEmail(response.data.email)

    }

    async function putProfile(res) {
        await $api.put('/profile/', res)
    }

    useEffect(() => {
        fetchProfileData()
    }, [])

    return (
        <main>
            <h2>Мой профиль</h2>
            <div id="suSignupDiv" className="contentBox">
                <table className="formLabels">
                    <tbody>
                    <tr className="name">
                        <td className="formLabel formLabels">Ник:</td>
                        <td>
                            <input value={nickname}
                                   onChange={e => setNickname(e.target.value)}/>
                        </td>
                    </tr>
                    <tr className="email">
                        <td className="formLabel formLabels">Почта:</td>
                        <td>
                            <input value={email}
                                   onChange={e => setEmail(e.target.value)}/>
                        </td>
                    </tr>
                    <tr className="formLabels">
                        <td>
                            <button type="submit"
                                    onClick={() => putProfile({nickname, email})}>
                                Сохранить
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default Profile;