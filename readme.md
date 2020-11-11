# bank-loan-app
This app consists of 3 services.

1. bank-loan-apigateway: This will serve as a gateway for all requests coming to the application. Based on the user action/url, it will redirect the request to appropriate service.
To Run: npm run dev
Application will be running on: http://localhost:3000/
(This is not required anymore as eureka and zuul has been cnfigured, but this is a good example of how to create api gateway)

2. bank-user-svc: This will receive all user action related requests and serve them as appropriate.

        a.Register User:
        
        POST(/users): {
          "name": "Bruce Wayne",
          "username": "batman",
          "email": "bruce.wayne@dc.com",
          "password": "Joker1234",
          "address": "1007 Mountain Drive, Gotham",
          "state": "NJ",
          "country": "USA",
          "PAN": "ABCKL1231M",
          "mobilenumber": 1234114590,
          "DOB": "05-27-1939",
          "accounttype": "savings"
        }
      
        b. Login:
       POST(/users/login): {
        "username": "batman",
        "password": "Joker1234"
        }
    
        c. Logout:
       POST(/users/logout): 
       Put authorization token on header
       
        d. Get user details:
       GET(/users/me): 
       Put authorization token on header
       
        e. Logout:
       PATCH(/users/me): 
       Put authorization token on header
       change anything except username
       {
          "name": "Bruce Wayne",
          "email": "bruce.wayne@dc.com",
          "password": "Joker1234",
          "address": "1007 Mountain Drive, Gotham",
          "state": "NJ",
          "country": "USA",
          "PAN": "ABCKL1231M",
          "mobilenumber": 1234114590,
          "DOB": "05-27-1939",
          "accounttype": "savings"
        }
   

3. bank-loan-svc: This will receive all loan related requests and serve them as appropriate.

        a. New Loan:
            POST(/loan/new):
            Put authorization token on header
            {
            "loanType": "Car",
            "loanAmt": 10000000,
            "loanDate": "05-20-1967",
            "roi": 10,
            "duration": 30
            }
            
         b. Get single loan details of user:
            GET(/loan/single/:loanid):
            Put authorization token on header
            
        c. get all loan details of the user:
            GET(/Loan/all):
            Put authorization token on header
    
