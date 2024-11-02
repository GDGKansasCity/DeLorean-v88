import { createSelector } from 'reselect';
import { DocumentSnapshot } from '@firebase/firestore';

import { Session } from 'models/session';
import { ApplicationState } from 'models/states';
import { getUserProfile } from 'store/current/selectors';

export const getSessions = (state: ApplicationState) => state.sessions.sessions;

export const getSessionEditorState = (state: ApplicationState) => state.sessions.editor;

export const isSessionEditorOpen = (state: ApplicationState) => state.sessions.isEditorOpen;

export const getSessionByStartTime = createSelector(
  [getSessions, getUserProfile], (sessions, profile) => {
    const slots: Record<number, DocumentSnapshot[]> = {};
    const onlyFavorites = profile && profile.showOnlyFavorites;

    for (let sessionId in sessions) {
      if (onlyFavorites && !profile.favorites.includes(sessionId)) {
        continue;
      }

      const document = sessions[sessionId];
      const session = document.data() as Session;

      if (session?.startTime && !session?.isUnscheduled) {
        const time = session.startTime.toDate().setSeconds(0, 0);
        slots[time] = slots[time] ? slots[time].concat(document) : [document];
      }
    }

    return slots;
  }
);

export const getUnscheduledSessions = createSelector(
  [getSessions, getUserProfile], (sessions, profile) => {
    const items = [];
    const onlyFavorites = profile && profile.showOnlyFavorites;

    for (let sessionId in sessions) {
      if (onlyFavorites && !profile.favorites.includes(sessionId)) {
        continue;
      }

      const document = sessions[sessionId];
      const session = document.data() as Session;

      if (!session.startTime || session.isUnscheduled === true) {
        items.push(document);
      }
    }

    return items;
  }
)