import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";
import CurrentChat from "./CurrentChat";

import styles from "./message.module.css";
import MyConversations from "./MyConversations";

// import React, { Fragment, useEffect } from "react";
// import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { actionCreators } from "../../redux";

// const Home = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user, profile } = useSelector((state) => state.userReducer,shallowEqual);
//   const { conversations } = useSelector((state) => state.messageReducer,shallowEqual);

//   const myConversations =
//     conversations &&
//     [...conversations].filter((cnv) => cnv.recipients[0]._id === profile._id);
//   // console.log(myConversations);

//   const cnvLength = [...conversations].length;

//   useEffect(() => {
//     if (!user) {
//       navigate("/register", { replace: true });
//     }
//     if (user) {
//       console.log("yes");
//       dispatch(actionCreators.profile());
//       dispatch(actionCreators.getConversations());
//     }
//   }, [user, navigate, cnvLength, dispatch]);

//   return (
//     <div>
//       {profile !== [] && (
//         <div>
//           <h2>{profile.name}</h2>
//           <h3>{profile.username}</h3>
//           <h2>{profile.email}</h2>
//           <div>
//             {myConversations !== [] &&
//               myConversations.map((cnv) => {
//                 return (
//                   <Fragment key={cnv._id}>
//                     <h1>
//                       {cnv.recipients[1]
//                         ? cnv.recipients[1].username
//                         : "Deleted User"}
//                     </h1>
//                     <img
//                       style={{ width: "4rem" }}
//                       src={
//                         cnv.recipients[1]
//                           ? cnv.recipients[1].profilepic
//                           : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
//                       }
//                       alt=""
//                     />
//                     <p>{cnv.text}</p>
//                   </Fragment>
//                 );
//               })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

// // {myMessages !== [] &&
// //   myMessages.map((msg) => {
// //     if (msg.receiver._id === cnv.recipients[1]._id) {
// //       let msgDate = new Date(
// //         msg.createdAt
// //       ).toLocaleString();
// //       //   let msgDate = ((new Date() - msg.createdAt)/60000).toFixed(0);
// //       //   let msgtime = msgDate.getF
// //       return (
// //         <Fragment key={msg._id}>
// //           <p>
// //             {msg.sender.name === profile.name
// //               ? "You"
// //               : msg.sender.name}
// //             : {msg.text}
// //           </p>
// //           {/* <p>{msgDate} mins ago</p> */}
// //           <p>{msgDate}</p>
// //         </Fragment>
// //       );
// //     }
// //   })}

const Message = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userReducer,shallowEqual);
  const [click, setClick] = useState(false);
  const [currentCnv, setCurrentCnv] = useState({});
  const [receiver, setReceiver] = useState();
  const [sender, setSender] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // console.log("yes");
    dispatch(actionCreators.profile());
  }, [dispatch]);
  return (
    <div className={styles.message_container}>
      <MyConversations profile={profile} setClick={setClick} setCurrentCnv={setCurrentCnv} setReceiver={setReceiver} setSender={setSender} onlineUsers={onlineUsers} />
      <CurrentChat profile={profile} currentCnv={currentCnv} receiver={receiver} setReceiver={setReceiver} sender={sender} setSender={setSender} click={click} setOnlineUsers={setOnlineUsers} />
    </div>
  );
};

export default Message;
