
import Place from './place'
import { make_json } from '../services/make_json'

export default function SideSelector() {
    const places = make_json()
    return (
        <>
            {places.map((e, index) => {
                return <Place key={index} place={e} />;
            })}
        </>
        )
}