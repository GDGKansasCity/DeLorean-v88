import React, { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DocumentReference, arrayRemove, arrayUnion, deleteDoc, doc, getDoc, updateDoc } from '@firebase/firestore';
import { intervalToDuration } from 'date-fns/fp';
import createDOMPurify from 'dompurify';

import { 
  Accordion, AccordionSummary, AccordionDetails, 
  ListItem, ListItemText, ListItemAvatar, Divider, 
  Typography, Avatar, Tooltip, Button, Paper 
} from '@mui/material';

import SpeakerDetails from '../components/dialogs/Details';

import { Speaker } from 'models/speaker';
import { Session, SessionTypes } from 'models/session';
import { Profile } from 'models/user';
import { isEditMode } from 'store/admin/selectors';
import { openDialog } from 'store/dialogs/reducer';
import { editSession } from 'store/sessions/reducer';

import { ExpandMore, Delete, Edit, Star, StarOutline } from '@mui/icons-material';

import './SessionSheet.scss';
import { getDatabase, getUser } from 'store/current/selectors';
import { setUserProfile } from 'store/current/reducer';

type Props = {
  speakers: Speaker[];
  session: Session;
  reference: DocumentReference;
  isFavorite: Boolean;
};

const DOMPurify = createDOMPurify(window);

const SessionSheet: FC<Props> = ({ session, speakers, reference, isFavorite }) => {
  const dispatch = useDispatch();
  const isEditing = useSelector(isEditMode);
  const db = useSelector(getDatabase);
  const user = useSelector(getUser);

  const onFavoriteClicked = async e => {
    e.preventDefault();
    e.stopPropagation();

    const path = `/users/${user.uid}`;
    await updateDoc(doc(db, path),{
      favorites: isFavorite ? arrayRemove(reference.id) : arrayUnion(reference.id)
    });

    const profile = await getDoc(doc(db, `/users/${user.uid}`));
    dispatch(setUserProfile(profile.data() as Profile));
  };

  const onSpeakerClicked = (speaker) => () => {
    dispatch(
      openDialog({
        views: <SpeakerDetails key={speaker.id} speaker={speaker} />,
        fullscreen: false
      })
    );
  };

  const onDeleteClicked = async e => {
    e.preventDefault();
    e.stopPropagation();

    await deleteDoc(reference);
  };

  const onEditClicked = e => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch(editSession({
      ref: reference, 
      session
    }));
  };

  const hasDescription = useMemo(() => session.description.length > 0, [session.description]);
  const hasSpeakers = useMemo(() => session.speakers.length > 0, [session.speakers]);
  const hasSlides = useMemo(() => session.slidesUrl && session.slidesUrl.length > 0, [session.slidesUrl])

  const buildFavoriteAction = () => (
    <div className="edit-actions">
      <Tooltip title="Favorite" placement="top">
        <Button variant="text" className="favorite" onClick={onFavoriteClicked}>
          {isFavorite ? <Star /> : <StarOutline />}
        </Button>
      </Tooltip>
    </div>
  );

  const buildAdminActions = () => (
    <div className="edit-actions">
      <Tooltip title="Edit" placement="top">
        <Button variant="text" className="edit" onClick={onEditClicked}>
          <Edit />
        </Button>
      </Tooltip>
      <Tooltip title="Delete" placement="top">
        <Button variant="text" className="delete" onClick={onDeleteClicked}>
          <Delete />
        </Button>
      </Tooltip>
    </div>
  );

  const buildSessionHeader = () => {
    return <div className="session-header">
      <Typography variant="h5">{formatSessionTitle()}</Typography>
      <Typography variant="subtitle1">{formatSessionLocation()}</Typography>
      <Typography variant="subtitle2">{formatSessionDuration()}</Typography>
    </div>
  }

  const formatSessionTitle = () => {
    let title = '';

    switch (session.type) {
      case SessionTypes.BREAK:
      case SessionTypes.REGISTRATION:
        break;
      default:
        title += `[${session.type}] `;
    }

    title += session.name;
    return title;
  };

  const formatSessionLocation = () => {
    if (!session.location) {
      return null;
    }

    if (isNaN(+session.location)) {
      return session.location;
    }

    return `Room ${session.location}`;
  };

  const formatSessionDuration = () => {
    if (!session.startTime || !session.endTime) return null;

    const interval = intervalToDuration({
      start: session.startTime.toDate(),
      end: session.endTime.toDate()
    });

    if (interval.hours > 0) {
      return `${interval.hours} hr ${interval.minutes} mins`;
    } else {
      return `${interval.minutes} mins`;
    }
  }

  const formatSlidesUrl = () => {
    if (!session.slidesUrl) return null;

    var text = session.slidesUrl;
    const length = 30;
    if (text.length > length) {
      text = text.substring(0, length - 3) + "..."
    }

    return (
      <a href={session.slidesUrl} target="_blank">Presentation slides</a>
    );
  }

  var actions: React.JSX.Element;
  if (isEditing) {
    actions = buildAdminActions();
  } else if (user && !user.isAnonymous) {
    actions = buildFavoriteAction();
  }

  if (!hasDescription && !hasSpeakers && !hasSlides) {
    return (
      <Paper square className="session-card">
        {actions}
        {buildSessionHeader()}
      </Paper>
    );
  } else {
    return (
      <Accordion className="session">
        <AccordionSummary expandIcon={<ExpandMore />} >
          {actions}
          {buildSessionHeader()}
        </AccordionSummary>
        <AccordionDetails>
          <div className="session-content">
            { hasSlides ? <div>{formatSlidesUrl()}</div> : null }
            { hasSlides && hasDescription ? <br /> : null }
            { hasDescription ? <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(session.description)}} /> : null }
            { (hasDescription || hasSlides) && hasSpeakers ? <Divider className="divider" /> : null }

            { hasSpeakers ?
              <div className="speakers">
                <Typography variant="h6" className="header">
                  Speakers
                </Typography>
                {
                  speakers.map(speaker => (
                    <ListItem key={speaker.name} button onClick={onSpeakerClicked(speaker)}>
                      <ListItemAvatar>
                        <Avatar className="big-avatar" alt={speaker.name} src={speaker.portraitUrl} />
                      </ListItemAvatar>
                      <ListItemText primary={speaker.name} secondary={speaker.company || null} />
                    </ListItem>
                  ))
                }
              </div> : null
            }
          </div>
        </AccordionDetails>
      </Accordion>
    );
  }
};

export default SessionSheet;