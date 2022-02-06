# discord-bot-crypto
Reads my crypto currencies associated to a luno account.

This project uses 3 main npm packages:
- discordjs
- axios
- sequelize

a .env file needs to be included in the root directory of this project with the following variables:

LUNO_SECRET - The API Token LUNO provides for the user account.
LUNO_KEY_ID - The API KeyID LUNO associates with the above mentioned token.
BOT_TOKEN - the discord bot token discord provides.
DATABASE_NAME - The schema where Sequelize will create table to store data
DATABASE_ROOT_USERNAME - root username of the above mentioned DBMS
DATABASE_ROOT_PASSWORD - password associated related to the above mentioned username.

To start the project run the following commands from the root folder

1) npm install 
2) npm run

