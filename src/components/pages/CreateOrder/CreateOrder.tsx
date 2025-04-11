import { useEffect, useState, FormEvent } from "react"; 
import { useNavigate, useSearchParams } from "react-router-dom";
import { ICart, IMenu } from "../../../types/order";
import { getMenus } from "../../../services/menu.service";
import styles from './CreateOrder.module.css';
import { filters, tables } from "./CreateOrder.constants";
import Select from "../../ui/Select/Select";
import Input from "../../ui/input";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { createOrder } from "../../../services/order.service"; 

const CreateOrder = () => {
    const [menus, setMenus] = useState<IMenu[]>([]);  
    const [searchParams, setSearchParams] = useSearchParams();
    const [carts, setCart] = useState<ICart[]>([]);

    useEffect(() => {
        const fetchOrder = async () => {
            const result = await getMenus(searchParams.get('category') as string);
            setMenus(result.data);
        };
        fetchOrder();
    }, [searchParams]);

    const handleAddToCart = (type: string, id: string, name: string) => {
        const itemIsInCart = carts.find((item: ICart) => item.menuId === id);
        if (type === 'increment') {
            if (itemIsInCart) {
                setCart((prevCarts) => {
                    return prevCarts.map((item: ICart) =>
                        item.menuId === id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                });
            } else {
                setCart([...carts, { menuId: id, name, quantity: 1 }]);
            }
        } else {
            if (itemIsInCart && itemIsInCart.quantity <= 1) {
                setCart(carts.filter((item: ICart) => item.menuId !== id));
            } else {
                setCart(
                    carts.map((item: ICart) =>
                        item.menuId === id ? { ...item, quantity: item.quantity - 1 } : item
                    ),
                );
            }
        }
    };

    const navigate = useNavigate();
   
    const handleOrder = async (event: FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
    
        const payload = {
            customerName: form.customerName.value,
            tableNumber: Number(form.tableNumber.value),
            cart: carts,
        };
    
        await createOrder(payload);
        return navigate('/orders');
    };
    
    

    return (
        <main className={styles.create}>
            <div className={styles.menu}>
                <h1>Temukan Menu Favorit Anda</h1>
                <div className={styles.filter}>
                    {filters.map((filter) => (
                        <button 
                            type="button"
                            className={  
                                (!searchParams.get('category') && filter === 'All' || filter === searchParams.get('category') ? styles.primary : styles.secondary)
                            }
                            key={filter}
                            onClick={() => setSearchParams(filter === 'All' ? {} : { category: filter })} 
                        >
                            {filter}
                        </button>
                    ))}
                </div>
                <div className={styles.list}>
                    {menus.map((item: IMenu) => (
                        <div className={styles.item} key={item.id}>
                            <img 
                                src={item.image_url} 
                                alt={item.name} 
                                className={styles.image} 
                            />
                            <h2>{item.name}</h2>
                            <div className={styles.bottom}>
                                <p className={styles.price}>${item.price}</p>
                                <button onClick={() => handleAddToCart('increment', `${item.id}`, `${item.name}`)}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <form className={styles.form} onSubmit={handleOrder}>
                <div>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Informasi Pemesanan</h2>
                        <Link to="/orders">
                            <Button variant="outlined" color="secondary">Kembali</Button>
                        </Link>
                    </div>
                    <div className={styles.input}>
                        <Input 
                            id="name" 
                            label="Name" 
                            name="customerName"
                            placeholder="Insert Name"
                            required
                        />
                        <Select
                            id="table" 
                            label="Table Number" 
                            name="tableNumber" 
                            options={tables}
                            required
                        />
                    </div>
                </div>
                <div>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Pesanan</h2>
                    </div>
                    {carts.length > 0 ? (
                        <div className={styles.cart}>
                            {carts.map((item: ICart) => (
                                <div className={styles.item} key={item.menuId}>
                                    <h4 className={styles.name}>{item.name}</h4>
                                    <div className={styles.quantity}>
                                        <Button onClick={() => handleAddToCart('decrement', `${item.menuId}`, `${item.name}`)} color="secondary">
                                            -
                                        </Button>
                                        <div className={styles.number}>{item.quantity}</div>
                                        <Button onClick={() => handleAddToCart('increment', `${item.menuId}`, `${item.name}`)} color="secondary">
                                            +
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <Button variant="contained" type="submit" color="primary">Order</Button>
                        </div>
                    ) : (
                        <div className={styles.cart}>
                            <h4>Cart is Empty</h4>
                        </div>
                    )}
                </div>
            </form>
        </main>
    );
};

export default CreateOrder;
