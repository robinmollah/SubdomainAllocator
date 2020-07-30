## Subdomain Allocator for AWS

Register a subdomain to host by JavaScript API

### Prerequisite : AWS Credentials setup

#### Creates IAM User

Create an IAM User with at least Route53 management permission.
Keep the *access_key_id* and *secret_access_key*

#### Setup credentials on machine

On Windows:

Go to the folder: 
`C:\Users\`USERNAME`\.aws\`    
Create `.aws` directory if it is not exists.

Create a file named `credentials` in `.aws` directory
Write the following in this file:
```
[default]
aws_access_key_id = your_access_key_id
aws_secret_access_key = your_secret_access_key
```

### Setup without npm module
**I might release it as a npm module after extending more**

Run the following command to download this code base
> git clone http://github.com/robinmollah/SubdomainAllocator

### Example

```javascript
const subdomainer = require('./SubdomainAllocator');

subdomainer.createSubdomain('johndoe.properbd.net', '10.0.123.12');
```
Allocates johndoe.properbd.net for host 10.0.123.12
