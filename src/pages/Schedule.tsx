import React, { FC } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { DocumentSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';
import { formatToTimeZone } from 'date-fns-timezone';

import SessionSheet from 'controls/SessionSheet';
import { ApplicationState } from 'models/states';
import { Session } from 'models/session';
import { Speaker } from 'models/speaker';
import { getSessionByStartTime, getUnscheduledSessions } from 'store/sessions/selectors';
import { getDatabase, getEventTimezone, getUser, getUserProfile } from 'store/current/selectors';
import { getSpeakers } from 'store/speakers/selectors';

import { Button, Typography } from '@mui/material';

import FirstFloorMap from '/assets/map1.png';
import SecondFloorMap from '/assets/map2.png';
import FourthFloorMap from '/assets/map4.png';

import './Schedule.scss';
import { RadioButtonChecked, RadioButtonUnchecked } from '@mui/icons-material';
import { Profile } from 'models/user';
import { setUserProfile } from 'store/current/reducer';

type ScheduleProps = ReturnType<typeof mapStateToProps>;

const SchedulePage: FC<ScheduleProps> = ({ timezone, scheduled, unscheduled, speakers, profile }) => {
  const dispatch = useDispatch();
  const db = useSelector(getDatabase);
  const user = useSelector(getUser);

  const buildTimeSlot = () => {
    const times = Object.keys(scheduled).sort();
    const slots = [];

    if (unscheduled?.length > 0) {
      slots.push(
        <div key="unscheduled" className="timeslot">
          <div className="timeslot-header">
            <Typography variant="h3">To Be Announced</Typography>
          </div>

          {unscheduled.map(buildSessionSheet)}
        </div>
      );
    }

    for (let time of times) {
      let dateTime = formatToTimeZone(Number(time), 'h:mm A', { timeZone: timezone });

      slots.push(
        <div key={time} className="timeslot">
          <div className="timeslot-header">
            <Typography variant="h3">{dateTime}</Typography>
          </div>

          {scheduled[time].map(buildSessionSheet)}
        </div>
      );
    }

    return slots;
  };

  const buildSessionSheet = (session: DocumentSnapshot) => {
    const data = session.data() as Session;

    const links: Speaker[] = [];
    if (data.speakers && data.speakers.length) {
      data.speakers.forEach(id => {
        if (speakers[id]) {
          links.push(speakers[id].data() as Speaker)
        } 
      });
    }

    return (
      <SessionSheet
        key={session.id}
        speakers={links}
        reference={session.ref}
        session={data}
        isFavorite={profile && profile.favorites && profile.favorites.includes(session.id)}
      />
    );
  };

  const buildMapImage = (image: string) => {
    return <a href={image} target="_blank">
      <img className="mapImage" src={image} />
    </a>;
  };

  const buildFavoriteToggle = () => {
    if (!profile) return null;

    return (
      <Button variant="text" className="showFavorites" onClick={toggleFavorites}>
        {profile.showOnlyFavorites ? <RadioButtonChecked /> : <RadioButtonUnchecked />}&nbsp;&nbsp;Show only favorites
      </Button>
    );
  };

  const toggleFavorites = async () => {
    await updateDoc(doc(db, `/users/${user.uid}`), {
      showOnlyFavorites: !profile.showOnlyFavorites
    });

    const newProfile = await getDoc(doc(db, `/users/${user.uid}`));
    dispatch(setUserProfile(newProfile.data() as Profile));
  };

  return (
    <main className="schedule page-base">
      <div className="container">
        <h1>Venue Map</h1>
        <div className="container mapBox">
          {buildMapImage(FirstFloorMap)}
          {buildMapImage(SecondFloorMap)}
          {buildMapImage(FourthFloorMap)}
        </div>
      </div>
      <div className="container">
        <h1>Schedule</h1>
        <p style={{display: "inline"}}>{buildFavoriteToggle()}</p>
        {buildTimeSlot()}
      </div>
    </main>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  timezone: getEventTimezone(state),
  scheduled: getSessionByStartTime(state),
  unscheduled: getUnscheduledSessions(state),
  speakers: getSpeakers(state),
  profile: getUserProfile(state)
});

export default connect(mapStateToProps)(SchedulePage);