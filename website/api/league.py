import requests
import json
import time




class Player():

    def __init__(self, apikey=0, name=0, regoin="euw1"):
        self.apikey = apikey
        self.name = name
        self.region = regoin
        self.json = {}
        self.get_sender()
        


    def get_sender(self):
        response = self.requestSummonerData(self.region, self.name, self.apikey)

        try:
            self.status_check = response["status"]
            return
        except:
            self.id = response["id"]
            self.username = response["name"]
            self.level = response["summonerLevel"]
            self.profileIconId = response["profileIconId"]

            self.json['username'] = self.username
            self.json['level'] = self.level
            self.json['profileIconId'] = self.profileIconId

            response = self.requestRankedData(self.region, self.id, self.apikey)

            #This is for ranked data:
            try:
                self.status_code = response["status"]
            except:
                for queues in response:
                    print(queues)
                    print("\n")
                    print(queues["queueType"]) 
                    if queues["queueType"] == "RANKED_FLEX_SR":
                        self.flex_rank = queues["tier"]
                        self.flex_rank_division = queues["rank"]
                        self.flex_rank_lp = queues["leaguePoints"]
                        self.flex_rank_wins = queues["wins"]
                        self.flex_rank_losses = queues["losses"]

                        self.json['flex_rank'] = self.flex_rank
                        self.json['flex_division'] = self.flex_rank_division
                        self.json['flex_lp'] = self.flex_rank_lp
                        self.json['flex_wins'] = self.flex_rank_wins
                        self.json['flex_losses'] = self.flex_rank_losses

                    if queues["queueType"] == "RANKED_SOLO_5x5":
                        self.solo_rank = queues["tier"]
                        self.solo_division = queues["rank"]
                        self.solo_lp = queues["leaguePoints"]
                        self.solo_wins = queues["wins"]
                        self.solo_losses = queues["losses"]

                        self.json['solo_rank'] = self.solo_rank
                        self.json['solo_division'] = self.solo_division
                        self.json['solo_lp'] = self.solo_lp
                        self.json['solo_wins'] = self.solo_wins
                        self.json['solo_losses'] = self.solo_losses
            finally:
                response = self.requestMastery(self.region, self.id, self.apikey)
                self.championData = {}
                for champion in response:
                    self.championData[champion["championId"]] = champion["championLevel"]



                    
    def jsonrdata(self):
        self.json = {}
        return self.json



    def requestSummonerData(self, region, summonerName, APIKey):
        URL = f"https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{summonerName}?api_key={APIKey}"
        print(URL)
        print(URL)
        print(URL)
        print(URL)
        
        response = requests.get(URL)
        return response.json()

    def requestRankedData(self, region, ID, APIKey):
        URL = f"https://{region}.api.riotgames.com/lol/league/v4/entries/by-summoner/{ID}/?api_key={APIKey}"
        print(URL)
        response = requests.get(URL)
        return response.json()

    def requestMastery(self, region, ID, APIKey):
        URL = f"https://{region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/{ID}?api_key={APIKey}"
        print(URL)
        response = requests.get(URL)
        return response.json()




class Match():

    def __init__(self, apikey=0, name=0, number=2, regoin="euw1"):
        self.apikey = apikey
        self.name = name
        self.region = regoin
        self.number = number
        self.json = {}
        self.get_sender()
        

    def get_sender(self):
        response = self.requestSummonerData(self.region, self.name, self.apikey)

        try:
            self.status_check = response["status"]
            return
        except:
            self.id = response["id"]
            self.puuid = response["puuid"]

            responseMatchList = self.requestMatchList(self.region, self.puuid, self.apikey, self.number)

            amount = len(responseMatchList)
            print(amount)
            self.info = {}
            self.new = []
            
           
            for num in range(0, amount):
                matchid = responseMatchList[num]
                response = self.requestMatchInfo(self.region, matchid, self.apikey)

                
                self.data = {}
                self.match = {}
                self.data["queueId"] = response["info"]["queueId"]
                self.data["mapId"]  = response["info"]["mapId"]
                self.data["gameDuration"]  = response["info"]["gameDuration"]
           
                
                self.match["players"]  = self.Getplayer(response, self.puuid, self.name)
                self.match["info"] = self.data

                self.new.append(self.match) 
                
        
        
            self.json = self.new
    

                    
    def jsonrdata(self):
        self.json = {}

        return self.json

    def requestSummonerData(self, region, summonerName, APIKey):
        URL = f"https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{summonerName}?api_key={APIKey}"
        print(URL)
        response = requests.get(URL)
        return response.json()

    def requestRankedData(self, region, ID, APIKey):
        URL = f"https://{region}.api.riotgames.com/lol/league/v4/entries/by-summoner/{ID}/?api_key={APIKey}"
        print(URL)
        response = requests.get(URL)
        return response.json()


    def requestMastery(self, region, ID, APIKey):

        time.sleep(0.05)
        URL = f"https://{region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/{ID}?api_key={APIKey}"
        print(URL)
        response = requests.get(URL)
        return response.json()

    def requestMatchList(self, region, puuid, APIKey, number):
        URL = f"https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count={number}&api_key={APIKey}"
        print(URL)
        response = requests.get(URL)
        return response.json()

    def requestMatchInfo(self, region, matchId, APIKey):
        URL = f"https://europe.api.riotgames.com/lol/match/v5/matches/{matchId}?api_key={APIKey}"
        print(URL)
        response = requests.get(URL)
        return response.json()


    

    def Getplayer(self, response, puuid, username):
        result = {}

        participants = len(response["info"]["participants"])
        print(participants)
       
        for x in range(0, participants):
            players = {}
            players["championName"] = response["info"]["participants"][x]["championName"]
            players["win"] = response["info"]["participants"][x]["win"]
            players["kills"] = response["info"]["participants"][x]["kills"]
            players["deaths"] = response["info"]["participants"][x]["deaths"]
            players["assits"] = response["info"]["participants"][x]["assists"]

            if players["deaths"] != 0:
                players["kda"] = round(players["kills"] + players["assits"] / players["deaths"])
            else:
                 players["kda"] = "Perfect"
            
            players["goldEarned"] = response["info"]["participants"][x]["goldEarned"]
            players["totalMinionsKilled"] = response["info"]["participants"][x]["totalMinionsKilled"] 

            players["part"] = participants = len(response["info"]["participants"])
            

            try:
                players["alliedJungleMonsterKills"] = response["info"]["participants"][x]["challenges"]["alliedJungleMonsterKills"]
                players["enemyJungleMonsterKills"] = response["info"]["participants"][x]["challenges"]["enemyJungleMonsterKills"]
            
            except:
                players["alliedJungleMonsterKills"] = 0
                players["enemyJungleMonsterKills"] = 0

        
            players["cs"] = round(players["totalMinionsKilled"] + players["alliedJungleMonsterKills"] + players["enemyJungleMonsterKills"])
            

            players["item1"] = response["info"]["participants"][x]["item1"]
            players["item2"] = response["info"]["participants"][x]["item2"] 
            players["item3"] = response["info"]["participants"][x]["item3"] 
            players["item4"] = response["info"]["participants"][x]["item4"] 
            players["item5"] = response["info"]["participants"][x]["item5"] 
            players["item6"] = response["info"]["participants"][x]["item6"] 

            players["champLevel"] = response["info"]["participants"][x]["champLevel"] 

            players["summoner1Id"] = response["info"]["participants"][x]["summoner1Id"] 
            players["summoner2Id"] = response["info"]["participants"][x]["summoner2Id"] 

            players["summonerName"] = response["info"]["participants"][x]["summonerName"] 

            players["championId"] = response["info"]["participants"][x]["championId"] 
            players["summonerId"] = response["info"]["participants"][x]["summonerId"] 



            
            # responsetwo = self.requestMastery(self.region, players["summonerId"], self.apikey)
            # self.championData = {}
            # for champion in responsetwo:
            #     self.championData[champion["championId"]] = champion["championLevel"]
            # players["championMastery"] = self.championData[players["championId"]]



            if response["info"]["participants"][x]["puuid"] == puuid:
                result[0] = players
                result[x+1] = players
            else:
                result[x+1] = players


                
        return result




