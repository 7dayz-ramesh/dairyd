const pg = require('pgConnection');
exports.handler = (event, context, callback) => {
    
    let body = JSON.parse(event.body);
	console.log('REQUEST JSON', body);
    
	let productId = addProduct(body);
	
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

function addCustomer(body){
    var query = "insert into public.customer(name, username, phone_number, address, street, city) values($1, $2, $3, $4, $5, $6) returning cust_id";
	//var param = [device_token, access_token];
	return pg.db.any(query, [body.name,body.username,body.phone_number,body.address,body.street,body.city]);
}
