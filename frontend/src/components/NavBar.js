import { useContext } from "react";
import { OrderContext } from "./OrderContext";

const NavBar = () => {
  const { orderItems } = useContext(OrderContext);

  console.log("NavBar sees orderItems:", orderItems);
  const totalQuantity = orderItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      {/* <h1>My Restaurant</h1>
      <div className="cart-icon">
        🛒
        {totalQuantity > 0 && <span className="dot"></span>}
      </div> */}
      <div className="App bg-gray-100 text-gray-800 font-sans">
        <nav>
            <a href="/" className="hover:underline">Menu</a>
            <a href="/admin" className="hover:underline">Admin</a>
            <a href="/order" className="hover:underline">{totalQuantity > 0 ? `Order (${totalQuantity})` : "Order"}</a>
          </nav>
      </div>
      
    </nav>
  );
};

export default NavBar;
