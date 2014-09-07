# README

## Up and SSH the vagrant

move to `vagrant` and `vagrant up`

```
cd vagrant/
vagrant up
```

don't need 'vagrant init'

```
vagrant ssh
```

## Stop iptables

```
sudo service iptables stop
sudo chkconfig iptables off
```

## Create nginx.repo

```
sudo vi /etc/yum.repos.d/nginx.repo
```

write:

```
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=0
enabled=1
```

## Create mongodb.repo

```
sudo vi /etc/yum.repos.d/nginx.repo
```

write:

```
[mongodb]
name=MongoDB Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/
gpgcheck=0
enabled=1
```

## Install yum packages

```
sudo yum install -y git nginx mongo-org
```

## Install nodebrew

```
curl -L https://raw.githubusercontent.com/hokaccha/nodebrew/master/nodebrew | perl - setup
echo 'export PATH=$HOME/.nodebrew/current/bin:$PATH' >> ~/.bash_profile && source ~/.bash_profile
```

## Install node

```
nodebrew install-binary stable
nodebrew use stable
```

## Configuration nginx reverse proxy

remove default.conf

```
sudo rm -f /etc/nginx/conf.d/default.conf
```

create virtual.conf

```
sudo vi /etc/nginx/conf.d/virtual.conf
```

write:

```
server {
  listen 80;
  server_name 192.168.33.10;
  location / {
    proxy_pass http://127.0.0.1:3000;
  }
}
```

## Register Nginx and MySQL to startup

```
sudo service mysqld start
sudo chkconfig mysqld on
sudo service nginx start
sudo chkconfig nginx on
```

## Set password to MySQL root user

```
sudo mysqladmin -u root password asdfghjkl
```

## Apply sql schema

Use a mysql tool (ex. [Sequel Pro](http://www.sequelpro.com/)).

and, apply `schema.sql` to `fututetime` database (default charset to `utf8`).

## Install node packages

logout from virtual machine

```
exit
```

npm install

```
cd ../
npm install
```

## Run

login to virtual machine

```
cd vagrant
vagrant ssh
```

run node app

```
cd /vagrant_data
node app
```
