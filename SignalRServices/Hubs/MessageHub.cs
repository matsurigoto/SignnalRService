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

        public static Dictionary<string, int> prevData = new Dictionary<string, int> ();

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task SendActivityMessage(string user, string message)
        {
            try
            {
                int numVal = int.Parse(message);
                int diff = numVal - prevNumber;
                if (Math.Abs(diff) > 4)
                {
                    if (Math.Sign(diff) > 0)
                    {
                        await Clients.All.SendAsync("ReceiveActivityMessage", user, message);
                    }
                    else if (Math.Sign(diff) < 0)
                    {
                        await Clients.All.SendAsync("ReceiveActivityMessage", user, message);
                    }
                }
                prevNumber = numVal;
            }
            catch (FormatException e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public async Task SendAllMessage(string user, string message)
        {
            try
            {
                int numVal = int.Parse(message);

                int pastNumber;
                if (!prevData.ContainsKey(user))
                {
                    pastNumber = 0;
                    prevData.Add(user, pastNumber);
                } else {
                    pastNumber = prevData[user];
                }

                int diff = numVal - pastNumber;
                if (Math.Abs(diff) > 4)
                {
                    prevData[user] = numVal;
                    if (Math.Sign(diff) > 0)
                    {
                        await Clients.All.SendAsync("ReceiveAllMessage", user, JsonConvert.SerializeObject(prevData));
                    }
                    else if (Math.Sign(diff) < 0)
                    {
                        await Clients.All.SendAsync("ReceiveAllMessage", user, JsonConvert.SerializeObject(prevData));
                    }
                }
            }
            catch (FormatException e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}
