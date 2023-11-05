const Order = (...OrderPosition) => { 
    return {data: OrderPosition, date: getTime()} 
};
const OrderPosition = (code, name, unit, count, desc) => { 
    return {code: code, name: name, unit: unit, count: count, desc: desc} 
};

function getTime(){
    const localDate = new Date();
    const dateYMD = [localDate.getFullYear(), localDate.getMonth()+1, localDate.getDate()].map((a)=>(a < 10 ? '0' + a : a));
    const dateHMS = [localDate.getHours(), localDate.getMinutes(), localDate.getSeconds()].map((a)=>(a < 10 ? '0' + a : a));
    return dateYMD.join('-') + " " + dateHMS.join(':');
  };

// <== EXAMPLE DATA ==> 
const orderPositionExample0 = OrderPosition("10-02-0395","BABUNI MIĘSO","szt",2,"-");
const orderPositionExample1 = OrderPosition("70-05-0042","BALERON PARZONY","szt",3, "-");
const orderPositionExample2 = OrderPosition("70-01-0709","BAMBERSKA","p",6, "bez folii");
const orderPositionExample3 = OrderPosition("70-01-0071","BIAŁA PARZONA","p",1, "wacum");

const order0 = Order(orderPositionExample0, orderPositionExample1, orderPositionExample2, orderPositionExample3);

export { Order, OrderPosition, order0 };


