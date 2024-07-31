using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MontyHallApp_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MontyHallAppController : ControllerBase
    {
        [HttpGet("simulate")]
        public IActionResult SimulateGames(int numberOfGames, bool switchDoor)
        {
            var winCount = 0;
            var rand = new Random();

            for (var i = 0; i < numberOfGames; i++)
            {
                int winningDoor = rand.Next(3);
                int playerChoice = rand.Next(3);
                int revealedDoor;

                do
                {
                    revealedDoor = rand.Next(3);
                } while (revealedDoor == winningDoor || revealedDoor == playerChoice);

                if (switchDoor)
                {
                    playerChoice = 3 - playerChoice - revealedDoor;
                }

                if (playerChoice == winningDoor)
                {
                    winCount++;
                }
            }

            return Ok(new { numberOfGames, winCount, winRate = (double)winCount / numberOfGames });
        }
    }
}
