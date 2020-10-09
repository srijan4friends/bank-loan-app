# bank-loan-app
This app consists of 3 services.

1. bank-loan-apigateway: This will serve as a gateway for all requests coming to the application. Based on the user action/url, it will redirect the request to appropriate service.
To Run: npm run dev
Application will be running on: http://localhost:3000/

2. bank-user-svc: This will receive all user action related requests and serve them as appropriate.

3. bank-loan-svc: This will receive all loan related requests and serve them as appropriate.
