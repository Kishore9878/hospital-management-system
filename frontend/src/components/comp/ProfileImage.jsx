/* eslint-disable react/prop-types */


const ProfileImage = ({ user, className, imageBg = "000000", letter = 1 }) => {
    return (
        <div className="flex items-center gap-3">

            <div className={`${className ? className : 'w-8 h-8'} relative rounded-full `}>
                <img
                    src={
                        user?.profileImage?.url || user?.user?.profileImage?.url ||
                        `https://placehold.co/150x150/${imageBg}/FFFFFF?text=${user?.user?.fullName?.slice(0, letter).toUpperCase() || user?.fullName?.slice(0, letter).toUpperCase()}`
                    }
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                />

            </div>

        </div >
    )
}

export default ProfileImage