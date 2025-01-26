// Write your code here
import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {name, id, teamImageUrl} = teamDetails
  return (
    <li>
      <Link to={`/team-matches/${id}`}>
        <img src={teamImageUrl} alt={name} />
        <p>{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard
