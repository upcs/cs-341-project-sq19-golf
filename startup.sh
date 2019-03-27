sudo apt update
sudo apt install git
git pull https://github.com/upcs/cs-341-project-sq19-golf.git

sudo apt install curl
curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
sudo apt-get install -y nodejs

cd cs-341-project-sq19-golf
sudo npm install
sudo npm start --port 80
