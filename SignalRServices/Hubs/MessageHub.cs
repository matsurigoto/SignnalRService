using System.Collections.Generic;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace SignalRServices.Hubs
{
    public class MessageHub : Hub
    {
        public static int prevNumber { get; set; }

        public static Dictionary<string, int> prevData = new Dictionary<string, int>();
        public static Dictionary<string, int> countData = new Dictionary<string, int>();

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task GetInitMessage()
        {
            if (countData.Count != 0)
            {
                await Clients.All.SendAsync("ReceiveInitMessage", JsonConvert.SerializeObject(countData));
            }    
        }

        public async Task SendAllMessage(string user, string message)
        {
            try
            {
                user = "user" + user;
                int numVal = int.Parse(message);

                int pastNumber = 0;
                if (!prevData.ContainsKey(user))
                {
                    prevData.Add(user, pastNumber);
                    countData.Add(user, 0);
                } 
                else
                {
                    pastNumber = prevData[user];
                }

                int diff = numVal - pastNumber;
                prevData[user] = numVal;

                if (Math.Abs(diff) > 3)
                {
                    countData[user] += 1;
                    await Clients.All.SendAsync("ReceiveAllMessage", user, JsonConvert.SerializeObject(countData));
                }
            }
            catch (FormatException e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public async Task RemoveUser(string user)
        {
            user = "user" + user;
            prevData.Remove(user);
            countData.Remove(user);
            await Clients.All.SendAsync("ReceiveAllMessage", user, JsonConvert.SerializeObject(countData));
        }
    }
}
