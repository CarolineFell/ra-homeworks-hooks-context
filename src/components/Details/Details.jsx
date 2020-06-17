import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useFetchData from '../../hooks/useFetchData';
import './Details.css';

export default function Details({ info }) {
  const { name } = info;
  const [user, setUser] = useState(info);

  const [{data, loading, error}] = useFetchData(`${process.env.REACT_APP_USERS_URL}/${info.id}.json`);

  if (data && (JSON.stringify(user) !== JSON.stringify(data))) {
    setUser(data);
  }

  const { avatar, details } = user;

  return (
    <div className='user-details'>
      { (!error) && <img className='user-details-avatar' alt={loading ? name : ''} src={loading ? '' : avatar}/> }
      <div className='user-details-name'>{name}</div>
      { (!error) && ((loading)
        ? <div className='user-details-loading'>{'Loading user details...'}</div>
        : details && Object.keys(details).map((o) =>
          <div className='user-detail' key={o}>
            {`${o[0].toUpperCase()}${o.slice(1)}: ${details[o]}`}
          </div>
          )
        )
      }
    </div>
  )
}

Details.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
  }),
}