## VPS-Fileshare

A nodejs-based file upload and download API. 

Featuring basic HTTP authentication and Apache2-compliant logging.


## Requirements

To run the project you need NodeJS (at least v18.x)


## Installing

Clone the repository:

`git clone https://github.com/Tom-L-M/vps-fileshare.git`

Enter the cloned repository:

`cd vps-fileshare-main`

Install dependencies:

`npm i`

Create .env from template:

`mv template.env .env`


<br/>

Modify auth stash:

Default credentials are "user"/"password".

To modify the auth stash, add a \<user>: \<password> entry to tokens.json,
Where 'password' must be a sha256 hash in HEX format.


<br/>


To run :

`npm start`
