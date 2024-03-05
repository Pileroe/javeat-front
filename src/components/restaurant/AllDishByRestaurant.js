import { useAtom } from "jotai";
import { currentUser } from "../../App";

const AllDishByRestaurant =() =>
{
    const [user] = useAtom(currentUser);
    return(
        <>
        
        </>
    );
}

export default AllDishByRestaurant;