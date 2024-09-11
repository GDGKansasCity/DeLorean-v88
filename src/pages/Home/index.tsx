import React, { FC, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
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

          <h3>{startDate && format(startDate, 'EEEE, MMMM d, yyyy')}</h3>
          <h3>{config?.venue?.name}</h3>

          <div className="mt-4">
            <Button 
                id={`get-event-tickets-${EventbriteConfig.eventId}`} 
                variant="contained" 
                color="secondary" 
                href={EventbriteConfig.url}
                target='_blank'>
              Get Tickets
            </Button>
          </div>
        </div>
      </section>

      <section className="call-to-action" style={SiteTheme.WhatIsSection}>
        <div className="container">
          <h1 className="container-thin">
            What is DevFest?
          </h1>
          <p>
            DevFest is a global community-driven tech conference, hosted by the Google Developer Groups (GDG) community. 
            Each DevFest event is crafted by its GDG organizers to fit the learning needs and interests of their local developer 
            community, with a strong focus on knowledge exchange, networking, and learning about Google developer technologies.
          </p>
          <p>
            DevFest KC is hosted in partnership by GDG Kansas City and the Google Developer Student Club (GDSC) at UMKC. While Google 
            is a sponsor of the event, these groups are and always will be volunteer-led and non-profit. All ticket sales and proceeds 
            go directly into putting on DevFest KC and the groups' other events throughout the year.
          </p>
        </div>
      </section>

      <Papercall />

      <section className="call-to-action" style={SiteTheme.InfoSection}>
        <div className="container">
          <h1 className="container-thin">
            What can you expect from a day at DevFest KC?
          </h1>
          <p>Campus parking permits are not enforced on weekends. It's suggested to park in the <b>Cherry Street garage</b> and take the skywalk to the Student Union. You can see a campus map on the <a style={{color: "white"}} href="https://www.umkc.edu/about/documents/umkc-volker-campus-map-0823.pdf" target="_blank">UMKC website</a>.</p>
          <p>Check-in starts at <b>7:45 AM</b> with the keynote starting at <b>8:30 AM</b>. If you have to join later, the check-in and event help desk will move to the fourth floor, just outside the session rooms.</p>
          <p><b>Boxed breakfast and lunch</b> will be available to attendees. <b>Coffee, water, light snacks, and networking space</b> will be available throughout the day, as well.</p>
          <p>Be sure to stay through the closing remarks at <b>4 PM</b> for some <b>special giveaways!</b></p>
        </div>
      </section>

      {/* <section className="call-to-action" style={SiteTheme.CallToAction}>
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
      </section> */}

      <Venue />
      <Sponsors />
    </main>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  config: getCurrentConfig(state)
});

export default connect(mapStateToProps)(Home);