export default async function RiotApiCall() {
    const apiKey = "RGAPI-2b10c467-6c09-439b-92d8-87428166fb5a"
    const playerURL=`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/kiwi%20is%20dead/na1?api_key=${apiKey}`
    
    //Fetching player puuid
    const response = await fetch(playerURL)
    const accountInfo = await response.json()
    const playerPUUID = accountInfo.puuid

    //Fetching latest game
    const latestGameURL = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${playerPUUID}/ids?start=0&count=1&api_key=${apiKey}`
    const latestGamePlayed = await fetch (latestGameURL)
    const matchReference = await latestGamePlayed.json()
    
    
    //Fetching match outcome
    const matchURL = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchReference[0]}?api_key=${apiKey}`
    const matchResponse = await fetch(matchURL)
    const matchData = await matchResponse.json()
    //console.log(matchData.info.participants)
    
    //find game outcome
    const playerMatchFound = matchData.info.participants.find(
        player => player.puuid === playerPUUID
    )
    const gameOutcome = playerMatchFound.win
    
    return gameOutcome
}
