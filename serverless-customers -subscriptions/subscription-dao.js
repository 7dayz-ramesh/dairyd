const pg = require('datasource');

exports.addSubscription = function(custId, body){
    var query = "insert into public.customer(name, username, phone_number, address, street, city) values($1, $2, $3, $4, $5, $6) returning cust_id";
	return pg.db.any(query, [body.name,body.username,body.phone_number,body.address,body.street,body.city]);
}

exports.getCustomerSubscriptions = function(id){
    return pg.db.any("select * from public.customer where cust_id = $1", [id]);
}

exports.deleteSubscription = function(id){
    return pg.db.any('delete from public.customer where cust_id = $1', [id]);
}

exports.listAllSubscriptions = function(){
    return pg.db.any('select * from public.customer');
}

exports.updateSubscription = function(id, body){
	var query = "update public.customer set name = $1, phone_number = $2, address = $3 WHERE cust_id = $4 ";
	var param = [body.name, body.phone_number, body.address, id];
	return pg.db.any(query, param);
}
