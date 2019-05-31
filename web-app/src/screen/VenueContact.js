import React from 'react';

function VenueContact({ match }) {
  return (
    <div>Welcome To Venue Contact - {match.params.id}</div>
  );
}

export default VenueContact;