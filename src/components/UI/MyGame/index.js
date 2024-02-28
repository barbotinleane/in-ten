import StartParty from "../StartParty";
import { useLocation } from "@reach/router"
import Join from "../Join";

export default function MyGame() {
    const location = useLocation();
    let isCreator = false;
    let isPlayer = false;
    
    //test if visitor is the creator of the game
    if(location.state !== null){
        if(location.state.creatorId === 890989){
            isCreator = true;
        }
        if(location.state.isRegistered === 890989){
            isPlayer = true;
        }
    }

    return (
        <>
            {(isCreator || isPlayer)? 
                <StartParty/>
                :
                <Join/>
            }
        </>
    )
}
