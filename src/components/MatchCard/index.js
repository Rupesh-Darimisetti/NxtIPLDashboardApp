// Write your code here
import './index.css'

const MachCard = props => {
  const {matchDetails} = props
  const {competingTeamLogo, competingTeam, matchStatus, result} = matchDetails
  const getMatchStatusClassName = status =>
    status === 'Won' ? 'match-won' : 'match-lost'
  const matxhStatusClasName = `match-status ${getMatchStatusClassName(
    matchStatus,
  )}`
  return (
    <li>
      <img src={competingTeamLogo} alt={`competing team ${competingTeam}`} />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p className={matxhStatusClasName}>{matchStatus}</p>
    </li>
  )
}

export default MachCard
