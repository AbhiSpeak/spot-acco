import { Link, useLocation } from "react-router-dom";

function AccountNav () {
    const {pathname} = useLocation();
    let subpage = pathname.split('/')?.[2]
    if(subpage === undefined)
        subpage = 'profile'
    function activeClass (type=null) {
        let classes = 'py-2 px-6 rounded-full';
        if(type === subpage) {
            classes += ' bg-primary text-white'
        } else {
            classes += ' bg-gray-200'
        }
        return classes;
    }

    return (
        <nav className="w-full flex gap-2 justify-center mt-4 mb-8">
                <Link className ={activeClass('profile')} to={'/account'}>My Profile</Link>
                <Link className ={activeClass('bookings')} to={'/account/bookings'}>My Bookings</Link>
                <Link className ={activeClass('places')} to={'/account/places'}>My Accommodations</Link>
            </nav>
    )
}

export default AccountNav