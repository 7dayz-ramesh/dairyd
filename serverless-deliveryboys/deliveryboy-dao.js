const pg = require('datasource');

exports.addDeliveryBoy = function(body){
    var query = "insert into public.delivery_oy(name, username, phone_number, address, street, city, vehicle_num, vehicle_details) values($1, $2, $3, $4, $5, $6, $7, $8) returning boy_id";
	return pg.db.any(query, [body.name,body.username,body.phone_number,body.address,body.street,body.city, body.vehicle_num, body.vehicle_details]);
}

exports.getDeliveryBoy = function(id){
    return pg.db.any("select * from public.delivery_boy where boy_id = $1", [id]);
}

exports.deleteDeliveryBoy = function(id){
    return pg.db.any('delete from public.delivery_boy where boy_id = $1', [id]);
}

exports.listDeliveryBoys = function(){
    return pg.db.any('select * from public.delivery_boy');
}

exports.updateDeliveryBoy = function(id, body){
	var query = "update public.delivery_boy set name = $1, phone_number = $2, address = $3 WHERE boy_id = $4 ";
	var param = [body.name, body.phone_number, body.address, id];
	return pg.db.any(query, param);
}
