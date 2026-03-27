/* eslint-disable react/prop-types */
import Layout from "@/components/comp/Layout"
// import { useSelector } from "react-redux"

import ProfileComponent from "@/components/comp/ProfileComponent"


const Profile = ({ user, isAuthenticated }) => {
    // const { isAuthenticated } = useSelector((state) => state.auth)
    // const [imageOpen, setImageOpen] = useState(false)
    // const openImageModal = () => setImageOpen(true);
    // const closeImageModal = () => setImageOpen(false);

    // const [open, setOpen] = useState(false)
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    return (
        <Layout>
            <section className="min-h-screen lg:px-10 px-5 py-24">


                <ProfileComponent user={user} isAuthenticated={isAuthenticated} />



            </section>
        </Layout >
    )
}

export default Profile