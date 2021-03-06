import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import LinkedinIcon from "../../Assets/Icons/Linkedin";
import TwitterIcon from "../../Assets/Icons/Twitter";
import KeybaseIcon from "../../Assets/Icons/Keybase";
// import Button from "@material-ui/core/Button";
import JoinParticipantDialog from "./JoinParticipantDialog";
import Badge from "@material-ui/core/Badge";
import ConversationsIcon from "../../Assets/Icons/Conversations";
import { Tooltip } from "@material-ui/core";
import ConferenceIcon from "@material-ui/icons/DesktopMac";
// import JoinConversationDialog from "./JoinConversationDialog";
const useStyles = makeStyles((theme) => ({
  root: {},
  participantContainer: {
    "&:hover": {
      backgroundColor: "rgba(28, 71, 98, 0.08)", //"#e0f3ff", //"#e4ffe4",
      cursor: "pointer",
      borderRadius: 0,
    },
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    display: "flex",
  },
  participantDetails: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    position: "relative",
  },
  topicsInterested: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "block",
    width: 190,
  },
  avatar: {
    marginTop: 1,
  },
  socialContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    // wi dth: 16,
    color: theme.palette.text.secondary,
  },
  buttonContainer: {
    width: "100%",
    textAlign: "center",
  },
  button: {
    margin: theme.spacing(1),
  },
  title: {
    marginTop: theme.spacing(1),
    display: "block",
  },
}));
// rgba(28, 71, 98, 0.08)

const AvailableBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: theme.palette.secondary.main, //"#44b700",
    color: theme.palette.secondary.main, //"#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

export default function (props) {
  const classes = useStyles();
  const [joinDialog, setJoinDialog] = React.useState(false);
  const [selectedParticipant, setSelectedParticipant] = React.useState(null);
  const [showJoinButton, setShowJoinButton] = React.useState(false);
  const { users, eventSession, user, onConferenceRoom } = props;

  // const [joinConversationDialog, setJoinConversationDialog] = React.useState(false);
  // const [selectedGroup, setSelectedGroup] = React.useState(null);
  // const [selectedGroupId, setSelectedGroupId] = React.useState(null);

  // const [participantsList , setParticipantsList
  // console.log({ listParticipantsAvailableTab: eventSession.participantsJoined });

  const participantsAvailable = Object.keys(eventSession.participantsJoined).filter((userId) => {
    let participant = users[userId];
    let sessionParticipant = eventSession.participantsJoined[userId];
    // console.log({ sessionParticipant });
    if (!participant) {
      // console.log(users);
      // console.error("Couldn't find participant for user: '" + userId + "'");
      return false;
    }
    // if (
    //   // (onConferenceRoom && sessionParticipant.inNetworkingRoom) ||
    //   (!onConferenceRoom && !sessionParticipant.inNetworkingRoom) ||
    //   (!onConferenceRoom && sessionParticipant.groupId)
    // ) {
    //   return false;
    // }

    if (!sessionParticipant.isOnline) {
      return false;
    }
    return true;
  });
  // console.log({ participantsAvailable });
  // const feelingLucky = () => {
  //   let index = Math.floor(Math.random() * participantsAvailable.length);
  //   let userId = participantsAvailable[index];
  //   let participant = users[userId];
  //   // console.log(participant);
  //   setSelectedParticipant(participant);
  //   setJoinDialog(true);
  // };

  if (!eventSession) {
    return null;
  }

  return (
    <div className={classes.root}>
      <JoinParticipantDialog
        open={joinDialog}
        setOpen={setJoinDialog}
        participant={selectedParticipant}
        eventSession={eventSession}
        user={user}
        onConferenceRoom={onConferenceRoom}
        showJoinButton={showJoinButton}
      />
      {/* <JoinConversationDialog
        open={joinConversationDialog}
        setOpen={setJoinConversationDialog}
        group={selectedGroup}
        groupId={selectedGroupId}
        eventSession={eventSession}
        user={user}
        onConferenceRoom={onConferenceRoom}
      /> */}
      {/* {!onConferenceRoom && (
        <div className={classes.buttonContainer}>
          <Button variant="outlined" color="primary" size="small" className={classes.button} onClick={feelingLucky}>
            I'm feeling lucky
          </Button>
        </div>
      )} */}
      {onConferenceRoom && (
        <Typography variant="overline" className={classes.title} align="center">
          All attendees
        </Typography>
      )}
      {participantsAvailable.map((userId, index) => {
        let participant = users[userId];
        let isMyUser = userId === user.uid;
        const hasSubtitle = participant.company.trim() !== "" || participant.companyTitle.trim() !== "";

        const participantAvatar = participant.avatarUrl ? (
          <Avatar alt={participant.firstName} src={participant.avatarUrl} className={classes.avatar} />
        ) : (
          <Avatar className={classes.avatar}>
            {participant.firstName.charAt(0).toUpperCase()}
            {participant.lastName.charAt(0).toUpperCase()}
          </Avatar>
        );

        let sessionParticipant = eventSession.participantsJoined[userId];

        let isInConversation = sessionParticipant.groupId !== undefined && sessionParticipant.groupId !== null;
        let isInConferenceRoom = !isInConversation && !sessionParticipant.inNetworkingRoom;
        let isAvailable = !isInConversation && sessionParticipant.inNetworkingRoom;

        // console.log({
        //   name: participant.firstName,
        //   isInConversation,
        //   isInConferenceRoom,
        //   isAvailable,
        //   participant,
        //   sessionParticipant,
        // });

        return (
          <div
            className={classes.participantContainer}
            onClick={() => {
              setSelectedParticipant(participant);
              setShowJoinButton(!isMyUser && isAvailable);
              setJoinDialog(true);
            }}
            key={index}
          >
            {isAvailable && (
              <Tooltip title="Available for a conversation">
                <AvailableBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  variant="dot"
                >
                  {participantAvatar}
                </AvailableBadge>
              </Tooltip>
            )}
            {isInConversation && (
              <Tooltip title="Currently in a conversation">
                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={<ConversationsIcon style={{ heigth: "0.85em", width: "0.85em" }} color="primary" />}
                >
                  {participantAvatar}
                </Badge>
              </Tooltip>
            )}
            {isInConferenceRoom && (
              <Tooltip title="Watching on the main stage">
                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={<ConferenceIcon style={{ heigth: "0.85em", width: "0.85em" }} color="primary" />}
                >
                  {participantAvatar}
                </Badge>
              </Tooltip>
            )}
            <div className={classes.participantDetails} style={{ paddingTop: hasSubtitle ? 0 : 8 }}>
              <Typography variant="subtitle1">{`${participant.firstName} ${participant.lastName}`}</Typography>

              {hasSubtitle && (
                <Typography color="textSecondary" variant="caption" className={classes.topicsInterested}>
                  {`${participant.companyTitle}${participant.companyTitle.trim() !== "" ? " @ " : ""}${
                    participant.company
                  }`}
                </Typography>
              )}

              <div className={classes.socialContainer} style={{ top: hasSubtitle ? 0 : 8 }}>
                {participant.keybaseUrl && <KeybaseIcon className={classes.socialIcon} />}
                {participant.twitterUrl && <TwitterIcon className={classes.socialIcon} />}
                {participant.linkedinUrl && <LinkedinIcon className={classes.socialIcon} />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
