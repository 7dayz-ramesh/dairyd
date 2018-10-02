'use strict';

const productDAO = require('product-dao');

exports.handler = (event, context, callback) => {
	
	let body = JSON.parse(event.body);
	console.log('REQUEST JSON', body);

    let id =  (event.pathParameters || {}).productId || false;
    switch(event.httpMethod){

        case "GET":

            if(id) {
                //callback(null, {body: "This is a READ operation on product ID " + id});
				getProduct(id, callback);
                return;  
            } 

            //callback(null, {body: "This is a LIST operation, return all products"});
			listProducts(callback);
            break;

        case "POST":            
            //callback(null, {body: "This is a CREATE operation"}); 
			addProduct(body, callback);
            break;

        case "PUT": 
            callback(null, {body: "This is an UPDATE operation on product ID " + id});
            break;

        case "DELETE": 
            callback(null, {body:"This is a DELETE operation on product ID " + id});
            break;

        default:
            // Send HTTP 501: Not Implemented
            console.log("Error: unsupported HTTP method (" + event.httpMethod + ")");
            callback(null, { statusCode: 501 })

    }

}

function addProduct(body, callback){
	
	let productId = productDAO.addProduct(body);
	
	productId.then(function(result){
	    
	    console.log("RESULT======", result);
	    
	    const response = {
	    	statusCode: 200,
        	//body: JSON.stringify('product added!')
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

function listProducts(callback){
	
	let list = productDAO.listProducts();
	
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

function getProduct(id, callback){
	
	let product = productDAO.getProduct(id);
	
	product.then(function(result){
	    
	    console.log("RESULT======", result);
		
		const resp = {};
	    
		if ( result.length == 0 ) {
			response = {
				statusCode: 404,
				body:JSON.stringify('No Product!')
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