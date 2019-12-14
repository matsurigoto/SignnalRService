using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace SignalRServices.Hubs
{
    public class MessageHub : Hub
    {
        public int prevNumber { get; set; }

        public async Task SendMessage(string user, string message)
        {
            try
            {
                int numVal = int.Parse(message);
                int diff = numVal - prevNumber;
                if (Math.Abs(diff) > 4)
                {
                    if(Math.Sign(diff) > 0)
                    {
                        await Clients.All.SendAsync("ReceiveMessage", user, message);
                    }
                    else if (Math.Sign(diff) < 0)
                    {
                        await Clients.All.SendAsync("ReceiveMessage", user, message);
                    }
                }
                prevNumber = numVal;
            }
            catch (FormatException e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}
