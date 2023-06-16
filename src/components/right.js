import React from 'react';
import { Link } from "react-router-dom";

const Right = () => {
    return (
        <div className="content_main_right_cont_d">
            <table>
                <tr>
                    <td><a href="https://http.cat/status/404">Смотри</a></td>
                    <td><p>Мгновенно находите и просматривайте миллионы быстрых потоковых видео.</p></td>
                </tr>
                <tr>
                    <td><Link to={"/upload"}>Загружай</Link></td>
                    <td><p>Быстро загружайте и помечайте тегами видео практически в любом видеоформате.</p>
                    </td>
                </tr>
                <tr>
                    <td><a href="https://linktr.ee/hasonda?utm_source=linktree_admin_share">Делись</a></td>
                    <td><p>Легко делитесь своими видео с семьей, друзьями или коллегами.</p></td>
                </tr>
            </table>
        </div>
    );
};

export default Right;