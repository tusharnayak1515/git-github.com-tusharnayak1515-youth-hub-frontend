import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";

import styles from "./myConversations.module.css";

const MyConversations = ({profile, setClick, setReceiver}) => {
  const dispatch = useDispatch();
  const { conversations, messages } = useSelector((state) => state.messageReducer,shallowEqual);
  const myConversations = conversations && [...conversations].filter((cnv) => cnv.recipients[0]._id === profile._id || cnv.recipients[1]._id === profile._id);

  const cnvLength = [...myConversations].length;

  useEffect(() => {
    // console.log("yes");
    dispatch(actionCreators.getConversations());
  }, [messages,cnvLength, dispatch]);
  
  const onCnvClick = (receiver)=> {
    setReceiver(receiver);
    setClick(true);
  }

  return (
    <div className={styles.mycnvs}>
      {profile !== [] && (
        <div>
          <div className={styles.top}>
            <img src={profile.profilepic} alt={profile.username} />
            <h2>{profile.username}</h2>
          </div>
          <div className={styles.bottom}>
          {myConversations !== [] &&
            myConversations.map((cnv) => {
              return (
                <div key={cnv._id} className={styles.cflex}>
                  <div className={styles.cnv} onClick={()=> onCnvClick(cnv.recipients[0]._id === profile._id ? cnv.recipients[1] : cnv.recipients[0])}>
                    <img
                      // style={{ width: "4rem" }}
                      src={
                        cnv.recipients[0]._id === profile._id
                          ? cnv.recipients[1].profilepic ? cnv.recipients[1].profilepic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                          : cnv.recipients[0].profilepic ? cnv.recipients[0].profilepic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                      }
                      alt=""
                    />
                    <div className={styles.flex}>
                      <h2>
                        {cnv.recipients[1]
                          ? cnv.recipients[1].name
                          : "Deleted User"}
                      </h2>
                      <p>{cnv.recipients[0]._id === profile._id ? 'You' : cnv.recipients[0].username}: {cnv.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyConversations;
