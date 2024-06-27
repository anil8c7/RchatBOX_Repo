import React from 'react';
import countryCodes from '../data/countryCodes';

const MobileCodeSelect = ({ onChange }) => {
  return (
    <>
    <option value="" disabled>Country Code</option>
      {countryCodes.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name} ({country.code})
        </option>
      ))}
    </>
  );
};

export default MobileCodeSelect;
