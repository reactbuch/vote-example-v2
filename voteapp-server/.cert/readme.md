# Creating the certificate for development

* install `openssl`
* in `./cert` folder run ```openssl req -x509 -newkey rsa:4096 -sha256 -keyout server.key -out server.crt -days 365 -config server.conf -new -nodes```


* install cert (Windows) 
  - open the start menu and type "certificates".
  - select "Manage Computer Certificates"
  - expand "Trusted Root Ceritification Authorities"
  - right click on "Certificates" and select "All Tasks" -> "Import".
  - click next
  - enter the path for the crt file.
  - proceed through the next few screens to import the certificate

