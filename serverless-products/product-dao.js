const pg = require('datasource');

exports.addProduct = function(body){
    var query = "insert into public.product(name, description, product_type, unit, price, updated_by) values($1, $2, $3, $4, $5, $6) returning product_id";
	//var param = [device_token, access_token];
	return pg.db.any(query, [body.name,body.description,body.product_type,body.unit,body.price,body.updated_by]);
}

exports.getProduct = function(id){
    return pg.db.any("select * from public.product where product_id = $1", [id]);
}

exports.deleteProduct = function(id){
    return pg.db.any('delete from public.product where product_id = $1', [id]);
}

exports.listProducts = function(){
    return pg.db.any('select * from public.product');
}

exports.updateProduct = function(id, body){
	var query = "update public.product set name = $1, price = $2, updated_by = $3 WHERE product_id = $4 ";
	var param = [body.name, body.price, body.updated_by, id];
	return pg.db.any(query, param);
}
