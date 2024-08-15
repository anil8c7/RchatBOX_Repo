import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { getUserchats, getUsersOnSearch } from '../../Services/authService';
import debounce from 'lodash/debounce';

function ChatBoxSidebar({ handleCreateChat }) {
    const { userId } = useContext(UserContext);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchChats, setSearchChats] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);

    const fetchResults = async (query) => {
        try {
            const response = await getUsersOnSearch(query);
            if (response) {
                setSearchChats(response.data);
                setShowSearchResults(true);
            }
        } catch (err) {
            console.error('Error fetching results:', err);
        }
    };

    const debouncedFetchResults = debounce((query) => {
        fetchResults(query);
    }, 300);

    const handleKeySearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query.length > 2) {
            debouncedFetchResults(query);
        } else {
            setSearchChats([]);
            setShowSearchResults(false);
        }
    };

    useEffect(() => {
        const fetchChats = async () => {
            if (userId) {
                try {
                    const chatData = await getUserchats(userId);
                    setChats(chatData.data);
                } catch (err) {
                    setError('Failed to fetch chats');
                    console.error('Error fetching chats:', err);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchChats();
    }, [userId]);

    return (
        <div className="user-list">
            <div className="chat-header">
                <div className="userAvtar">
                    <img src={process.env.PUBLIC_URL + 'images/signup.jpg'} alt="User Avatar" />
                </div>
            </div>
            <div className="searchUser">
                <input
                    type="text"
                    placeholder="Search"
                    onChange={handleKeySearch}
                    value={searchQuery}
                />
            </div>
            {error && <p className="error-message">{error}</p>}

            {showSearchResults ? (
                <ul className="chat-list">
                    {searchChats.length > 0 ? (
                        searchChats.map((chat) => (
                            <li key={chat.id} onClick={() => handleCreateChat(chat.id, userId)}>
                                <div className="user">
                                    <div className="friendAvtar">
                                        <img src={process.env.PUBLIC_URL + 'images/signup.jpg'} alt="Friend Avatar" />
                                    </div>
                                    <div className="userChatDetails">
                                        <div className="chatDetails">
                                            <div className="chatName">
                                                <p>{chat.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </ul>
            ) : (
                <ul className="chat-list">
                    {chats.length > 0 ? (
                        chats.map((chat) => (
                            <li key={chat.friendId} onClick={() => handleCreateChat(chat.friendId, userId)}>
                                <div className="user">
                                    <div className="friendAvtar">
                                        <img src={process.env.PUBLIC_URL + 'images/signup.jpg'} alt="Friend Avatar" />
                                    </div>
                                    <div className="userChatDetails">
                                        <div className="chatDetails">
                                            <div className="chatName">
                                                <p>{chat.name}</p>
                                            </div>
                                            <div className="message">
                                                <p className="textMessage">Text Message</p>
                                            </div>
                                        </div>
                                        <div className="messageDetails">
                                            <div className="date">12/05/2024</div>
                                            <div className="notification">2</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : !loading ? (
                        <p>No chats available</p>
                    ) : null}
                </ul>
            )}
        </div>
    );
}

export default ChatBoxSidebar;
