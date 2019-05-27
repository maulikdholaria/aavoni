import React from 'react';

function Maulik({ match }) {
  return (
    <div>Welcome To Maulik - {match.params.addid} - {match.params.helloid}</div>
  );
}

export default Maulik;