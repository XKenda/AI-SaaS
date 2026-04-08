import { useEffect, useState } from "react";

const NotFeature = () => {

    const [show, setShow] = useState(false)

    useEffect(()=>{
        setShow(true)
    }, [])

    return (
        <div className="not-feature-con bg-blue-600 h-dvh text-center text-white pt-60">
            <h3 className={"title duration-700 " + (show? "text-3xl opacity-100" : "opacity-0")}>This Feature isn't available yet</h3>
            <p className={"detail mt-10 duration-1000 " + (show? " opacity-100" : "opacity-0")}>You can contact Developer on his gmail: maibrahim131@gmail.com</p>
        </div>
    )
}

export default NotFeature;