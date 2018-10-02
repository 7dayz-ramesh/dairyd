const pg = require('pgConnection');
exports.handler = (event, context, callback) => {
    
    console.log('event', event);
    console.log('context', context);
	
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
	    	statusCode: 502,
        	body: JSON.stringify(e.message)
	    };
	    
	    callback(null, response);
	    
	})

};

function addProduct(body){
    var query = "insert into public.product(name, description, product_type, unit, price, updated_by) values($1, $2, $3, $4, $5, $6) returning product_id";
	//var param = [device_token, access_token];
	return pg.db.any(query, [body.name,body.description,body.product_type,body.unit,body.price,body.updated_by]);
}
