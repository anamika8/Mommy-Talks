import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {Link} from "react-router-dom";

// 1) Make a place to store the users list result
// 2) Make the actual request to backend and store result
// 3) Show the list of users formatted nicely in our webpage

/*
 ** Hooks—functions starting with `use`—can only be called at the top level of your components
 * or [your own Hooks.](https://beta.reactjs.org/learn/reusing-logic-with-custom-hooks)**
 * You can’t call Hooks inside conditions, loops, or other nested functions. Hooks are functions,
 * but it’s helpful to think of them as unconditional declarations about your component’s needs.
 * You “use” React features at the top of your component similar to how you “import” modules
 * at the top of your file.
 */
export const Home = () => {
    return (
        <div>
            <Title />
            <Subtitle />
            <Main />
            <LoginButton />
            <SignupButton />
        </div>
    );
};

export function Title() {
    return(<h1>Mommy Talks</h1>);
}

export function Subtitle() {
    return(<h3>Moms will not feel alone here!!!</h3>);
}

export function Main() {
    return(<p className="theme-details">A place for new, upcoming and experienced mothers to share their concern, get
        helpful suggestions.</p>
    );
}

const LoginButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to a different page
        navigate('/Match');
    };

    return (
        <button onClick={handleClick}>Login</button>
    );
};

const SignupButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to a different page
        navigate('/Home');
    };

    return (
        <button onClick={handleClick}>Signup</button>
    );
};
export const Button = () => {
    const [clicks, setClicks] = useState(0);
    //const history = useHistory();

    return (
        <button
            onClick={() => {
                console.log("Clicked!");
                setClicks(clicks + 1);
            }}
        >
            Clicks: {clicks}
        </button>
    );
};

export const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect( () => {
        const getUsers = async() => {
            const usersRes = await axios.get("http://localhost:8080/users");
            return usersRes.data;

        };

        getUsers().then(setUsers);
    }, []);

    return (
        <div>
            <h2>Users:</h2>
            {
                users ?
                    <ul>
                        {
                            users.map( (user: {email: string, name: string}) =>
                                <li key={user.email}> {user.name} - {user.email} </li>)
                        }
                    </ul>
                    :
                    null
            }

        </div>
    );
};
