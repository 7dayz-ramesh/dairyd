'use strict';

const customerDAO = require('customer-dao');

exports.handler = (event, context, callback) => {
	
	let body = JSON.parse(event.body);
	console.log('REQUEST JSON', body);

    let id =  (event.pathParameters || {}).custId || false;
    switch(event.httpMethod){

        case "GET":

            if(id) {
                //callback(null, {body: "This is a READ operation on Customer ID " + id});
				getCustomer(id, callback);
                return;  
            } 

            //callback(null, {body: "This is a LIST operation, return all Customers"});
			listCustomers(callback);
            break;

        case "POST":            
            //callback(null, {body: "This is a CREATE operation"}); 
			addCustomer(body, callback);
            break;

        case "PUT": 
            callback(null, {body: "This is an UPDATE operation on Customer ID " + id});
            break;

        case "DELETE": 
            callback(null, {body:"This is a DELETE operation on Customer ID " + id});
            break;

        default:
            // Send HTTP 501: Not Implemented
            console.log("Error: unsupported HTTP method (" + event.httpMethod + ")");
            callback(null, { statusCode: 501 })

    }

}

function addCustomer(body, callback){
	
	let CustomerId = customerDAO.addCustomer(body);
	
	CustomerId.then(function(result){
	    
	    console.log("RESULT======", result);
	    
	    const response = {
	    	statusCode: 200,
        	//body: JSON.stringify('Customer added!')
			body:JSON.stringify(result[0])
	    };
    
    	callback(null, response);
    
	}).catch(function(e){
	    console.log('ERRoR', e);
	    
	    const response = {
	    	statusCode: 400,
        	body: JSON.stringify(e.message)
	    };
	    
	    callback(null, response);
	    
	})
};

function listCustomers(callback){
	
	let list = customerDAO.listCustomers();
	
	list.then(function(result){
	    
	    console.log("RESULT======", result);
	    
	    const response = {
	    	statusCode: 200,
        	body:JSON.stringify(result[0])
	    };
    
    	callback(null, response);
    
	}).catch(function(e){
	    console.log('ERRoR', e);
	    
	    const response = {
	    	statusCode: 400,
        	body: JSON.stringify(e.message)
	    };
	    
	    callback(null, response);
	    
	})
};

function getCustomer(id, callback){
	
	let Customer = customerDAO.getCustomer(id);
	
	Customer.then(function(result){
	    
	    console.log("RESULT======", result);
		
		const resp = {};
	    
		if ( result.length == 0 ) {
			response = {
				statusCode: 404,
				body:JSON.stringify('No Customer!')
			};
		}else{
			response = {
				statusCode: 200,
				body:JSON.stringify(result[0])
			};
		}
           
    	callback(null, response);
    
	}).catch(function(e){
	    console.log('ERRoR', e);
	    
	    const response = {
	    	statusCode: 400,
        	body: JSON.stringify(e.message)
	    };
	    
	    callback(null, response);
	    
	})
};