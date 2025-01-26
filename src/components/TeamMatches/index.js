// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

const TeamMatchesApiUrl = 'https://apis.ccbp.in/ipl/'
class TeamMatches extends Component {
  state = {isLoading: true, teamMatchesDAta: {}}

  componentDidMount() {
    this.getTeamMatches()
  }

  getFormattedData = data => ({
    id: data.id,
    date: data.date,
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`${TeamMatchesApiUrl}${id}`)
    const fetchData = await response.json()
    const formattedData = {
      teamBannerURL: fetchData.team_banner_url,
      latestMatch: this.getFormattedData(fetchData.latest_match_details),
      recentMatches: fetchData.recent_matches.map(eachMatch =>
        this.getFormattedData(eachMatch),
      ),
    }
    this.setState({teamMatchesDAta: formattedData, isLoading: false})
  }

  renderRecentMatchesList = () => {
    const {teamMatchesDAta} = this.state
    const {recentMatches} = teamMatchesDAta

    return (
      <ul>
        {recentMatches.map(recentMatch => (
          <MatchCard key={recentMatch.id} matchDetails={recentMatch} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {teamMatchesDAta} = this.state
    const {teamBannerURL, latestMatch} = teamMatchesDAta

    return (
      <div>
        <img src={teamBannerURL} alt="team banner" />
        <LatestMatch latestMatchData={latestMatch} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="Oval" color="#fff" height={50} />
    </div>
  )

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-container ${this.getRouteClassName()}`

    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}
export default TeamMatches
