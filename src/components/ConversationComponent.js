import React, {useState} from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { SearchContainer, SearchInput } from "./ContactListComponent";
import { messagesList } from "../mockData";

const Container = styled.div`
display: flex;
flex-direction: column;
height: 100%;
flex: 3;
background: #f6f7f8;
`;
const ProfileHeader =styled.div`
display: flex;
flex-direction: row;
background: #ededed;
padding: 10px;
align-items: center;
gap: 10px;

`;
const ProfileImage =styled.img`
width: 32px;
height: 32px;
border-radius: 50%;

`;
const ChatBox =styled.div`
display: flex;
background: #f0f0f0;
padding: 10px;
align-items: center;
bottom: 0;

`;
const EmojiImage =styled.img`
width: 28px;
height: 28px;
opacity: 0.4;
cursor: pointer;


`;
const MessageContainer =styled.div`
display: flex;
flex-direction: column;
height: 100%;
background: #e5ddd6;
overflow-y: auto;

`;
const MessageDiv =styled.div`
justify-content: ${(props) => (props.isYours ? "flex-end" : "flex-start")};
display: flex;
margin: 5px 15px;


`;
const Message = styled.div`
background: ${(props) => (props.isYours ? "#daf8cb" : "white")};
max-width: 50%;
color: #303030;
padding: 8px 10px;
font-size: 14px;
border-radius: 4px;

`;

const ConversationComponent =(props)=>{
    const { selectedChat } = props;
    const [text, setText] = useState("");
    const[pickerVisible, togglePicker] = useState(false);
    const [messageList, setMessageList] = useState(messagesList);
    const onEmojiClick = (event, emojiObj) => {
        setText(text + emojiObj.emoji);
        togglePicker(false);

    };
    const onEnterPress=(event)=>{
        if (event.key === "Enter"){
            const messages = [...messageList]
            messages.push({
                id: 0,
                messageType: "TEXT",
                text,
                senderID: 0,
                addedOn: "12.02 PM",



            });
            setMessageList(messages);
            setText("");

        }
    };
    return (
    <Container>
        <ProfileHeader>
        <ProfileImage src ={selectedChat.profilePic}/> 
        {selectedChat.name}


        </ProfileHeader>
        <MessageContainer>
            {messageList.map((messageData) => (
            <MessageDiv isYours={messageData.senderID === 0}>
                <Message isYours={messageData.senderID === 0}>
                    {messageData.text}
                    </Message>
            </MessageDiv>
            ))}

        </MessageContainer>
        <ChatBox>
            <SearchContainer>
                {pickerVisible && (
                <Picker 
                pickerStyle={{position: "absolute", bottom: "60px"}}
                onEmojiClick={onEmojiClick} 
                />
                )}
                <EmojiImage
                 src={"/data.svg"} 
                 onClick={()=>togglePicker(!pickerVisible)}
                  />
                <SearchInput
                 placeholder="Type a message"
                 value={text} 
                 onKeyDown={onEnterPress}
                 onChange={(e)=>setText(e.target.value)}
                 />
            </SearchContainer>
        </ChatBox>
        </Container>
        );
};
export default ConversationComponent;