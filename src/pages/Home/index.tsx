import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';

import { Button, Fab } from '@mui/material';
import { ArrowRight } from '@mui/icons-material';

import Venue from './sections/Map';
import Sponsors from './sections/Sponsors';
import Papercall from './sections/Papercall';
import { DeloreanRoutes } from 'components/MainLayout';

import { ApplicationState } from 'models/states';
import { getCurrentConfig } from 'store/current/selectors';
import { SiteTheme, EventbriteConfig } from 'config/delorean.config';
import { DevfestDetails } from 'config/delorean.details.js';

import Logo from 'assets/event-logo.svg';
import background from 'assets/intro-background.jpg';

import './index.scss';
import { useLocation, useNavigate } from 'react-router-dom';

type HomeProps = ReturnType<typeof mapStateToProps>;

const Home: FC<HomeProps> = ({ config }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const startDate = config?.event?.startDate?.toDate();

  useEffect(() => {
    // if (location.pathname !== DeloreanRoutes.HOME) {
    //   navigate(DeloreanRoutes.HOME);
    // }

    // if ('EBWidgets' in window) {
    //   const eventbrite: any = window['EBWidgets'];
    //   eventbrite.createWidget({
    //     widgetType: 'checkout',
    //     eventId: EventbriteConfig.eventId,
    //     modal: true,
    //     modalTriggerElementId: `get-event-tickets-${EventbriteConfig.eventId}`
    //   });
    // }
  }, [])

  return (
    <main className="home-page">
      <section className="intro" style={{ backgroundImage: `url(${background})` }}>
        <div className="container">
          <Logo className="event-logo mb-4"/>

          <h1 className="container-thin">
            {DevfestDetails.description}
          </h1>

          <h3>{startDate && format(startDate, 'MMMM d, yyyy')}</h3>
          <h3>{config?.venue?.name}</h3>

          <div className="mt-4">
            <Button 
                id={`get-event-tickets-${EventbriteConfig.eventId}`} 
                variant="contained" 
                color="secondary" 
                href='https://devfestkc23.eventbrite.com/?aff=dotcom'
                target='_blank'>
              Get Tickets
            </Button>
          </div>
        </div>
      </section>

      <section className="call-to-action" style={SiteTheme.InfoSection}>
        <div className="container">
          <h1 className="container-thin">
            What can you expect from a day at DevFest KC?
          </h1>

          <p>Show up early and grab a boxed breakfast. <b>Check-in and breakfast start at 7:45.</b></p>
          <p>Strike up a conversation with someone between sessions. DevFest attracts a wide range of attendees, from long-time career developers to students.</p>
          <p><b>Boxed lunches will be provided</b> and give plenty of time to meet new people.</p>
          <p>Be sure to stay through the closing remarks for some <b>special giveaways!</b></p>
        </div>
      </section>

      <section className="call-to-action" style={SiteTheme.CallToAction}>
        <div className="container">
          <h1 className="container-thin">
            Looking for all the sessions and speakers?
          </h1>

          <p>View the Schedule page to see all the details.</p>

          <div className="action">
            <Fab href="/schedule">
              <ArrowRight />
            </Fab>
          </div>
        </div>
      </section>

      <Papercall />
      <Venue />
      <Sponsors />
    </main>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  config: getCurrentConfig(state)
});

export default connect(mapStateToProps)(Home);