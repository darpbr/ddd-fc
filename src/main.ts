import Address from './domain/customer/value-object/address';
import Customer from './domain/customer/entity/customer';
import OrderItem from './domain/checkout/entity/order_item';
import Order from './domain/checkout/entity/order';
let customer = new Customer("123","Diego");
const address = new Address("qnm",33,"12345-678","Brasilia");

customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem("1","item 1", 10,"p1",1);
const item2 = new OrderItem("2","item 2", 15,"p2",2);

const order = new Order("1","123",[item1, item2]);