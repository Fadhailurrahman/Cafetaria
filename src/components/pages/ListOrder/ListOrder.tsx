import { useEffect, useState } from "react";
import { getOrders, updateOrder } from "../../../services/order.service";
import { Link, useNavigate } from "react-router-dom"; 
import { Button } from "@mui/material"; 
import styles from './ListOrder.module.css';
import { IOrder } from "../../../types/order";
import { removeLocalStorage } from "../../../utils/storage";


const ListOrder = () => {
    const [orders, setOrders] = useState([]);
    const [refetchOrder, setRefecthOrder] = useState(true);
    
    useEffect(() => {
        if (refetchOrder) {
            const fetchOrder = async () => {
                const result = await getOrders();
                setOrders(result.data);
            };
            fetchOrder();
            setRefecthOrder(false);
        }
    }, [refetchOrder]);

    const handleCompleteOrder = async (id: string) => {
        await updateOrder(id, {status: 'COMPLETED'}).then(() => {
            setRefecthOrder(true);
        });
    };

const navigate = useNavigate();

const handleLogout = () => {
    removeLocalStorage('auth');
    return navigate ('/login');
}
    return (
        <main className={styles.order}>
            <section className={styles.header}>
                <h1 className={styles.tytle}>Order List</h1>
                <div className={styles.button}>
                    <Link to="/create">
                    <Button>Create Order</Button>
                    </Link>
                    <Button color="secondary" onClick={handleLogout}>Logout</Button>
                </div>
            </section>
            <section>
                <table
                border={1}
                className={styles.table}
                cellPadding={10}
                cellSpacing={0}
                >
                    <thead>
                        <td>No</td>
                        <td>Customer Name</td>
                        <td>Table</td>
                        <td>Total</td>
                        <td>Status</td>
                        <td>Action</td>

                    </thead>
                    <tbody>
                        {orders.map((order: IOrder, index: number) => [
                            <tr key={order.id}>
                                <td>{index + 1} </td>
                                <td>{order.customer_name} </td>
                                <td>{order.table_number} </td>
                                <td>{order.total} </td>
                                <td>{order.status} </td>
                                <td className={styles.action}>
                                    <Link to={`/orders/${order.id}`}>
                                    <Button>Detail</Button>
                                    </Link>
                                    {order.status === 'PROCESSING' && (
                                        <Button onClick={() => handleCompleteOrder(order.id)}>Complated</Button>
                                    )}
                                </td>
                            </tr>
                        ])}
                    </tbody>
                </table>
            </section>
        </main>

    )
};

export default ListOrder;
