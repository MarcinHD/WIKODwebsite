const SentOrder = (user, destination, order) => { 
    return {user: user, destination: destination, order: order} 
};
const Order = (deliveryDate, ...OrderPosition) => { 
    return {deliveryDate: deliveryDate, data: OrderPosition, date: getTime()} 
};
const OrderPosition = (code, name, unit, count, desc) => { 
    return {code: code, name: name, unit: unit, count: count, desc: desc} 
};
const UserData = (userInfo, ...destination) => {
    return {userInfo: userInfo, destination: destination}
}
const UserInfo = (firstName, lastName, phone, payment) => {
    return {firstName: firstName, lastName: lastName, phone: phone, payment: payment};
}
const Destination = (place, city, street, number) => {
    return {place: place, address: {city: city, street: street, number: number}};
}

function getTime(){
    const localDate = new Date();
    const dateYMD = [localDate.getFullYear(), localDate.getMonth()+1, localDate.getDate()].map((a)=>(a < 10 ? '0' + a : a));
    const dateHMS = [localDate.getHours(), localDate.getMinutes(), localDate.getSeconds()].map((a)=>(a < 10 ? '0' + a : a));
    return dateYMD.join('-') + " " + dateHMS.join(':');
  };

// <== EXAMPLE DATA ==> 
const destination0 = Destination("Sklep Wędlinka", "Wrocław", "Oławska", "25a");
const destination1 = Destination("Przysmak", "Wrocław", "Piłsudzkiego", "3/1");
const userInfo0 = UserInfo("Waldemar", "Kowalski", "687112336", "Gotówka");
const userdata0 = UserData(userInfo0, destination0, destination1);

const orderPositionExample0 = OrderPosition("10-02-0395","BABUNI MIĘSO","szt",2,"-");
const orderPositionExample1 = OrderPosition("70-05-0042","BALERON PARZONY","szt",3, "-");
const orderPositionExample2 = OrderPosition("70-01-0709","BAMBERSKA","p",6, "bez folii");
const orderPositionExample3 = OrderPosition("70-01-0071","BIAŁA PARZONA","p",1, "wacum");
const order0 = Order(orderPositionExample0, orderPositionExample1, orderPositionExample2, orderPositionExample3);

export { SentOrder, Order, OrderPosition, order0, userdata0 };


