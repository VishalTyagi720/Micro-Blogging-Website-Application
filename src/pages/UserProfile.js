import styles from '../styles/settings.module.css';
// import {useToasts} from 'react-toast-notifications';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import { Loader } from '../components';
import { useAuth } from '../hooks';


const UserProfile = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [requestInProgress, setrequestInProgress] = useState(false);
    const {userId} = useParams();
    const history = useHistory();
    // const {addToast} = useToasts();
    const auth = useAuth();
    console.log(auth)

    console.log('userId:', userId);

    useEffect(() => {
        const getUser = async () => {
            const response = await fetchUserProfile(userId);

            if (response.success) {
                setUser(response.data.user);
            }
            else {
                window.alert('Some Error');
                // addToast(response.message,{
                //     appearence: 'error'
                // });
                return history.push('/');
            }

            setLoading(false);
        };

        getUser();
    }, [userId, history]); // addToast

    if (loading) {
        return <Loader></Loader>
    }

    const checkIfUserIsAFriend = () => {
        const friends = auth.user.friends;

        const friendIds = friends.map(friend => friend.to_user._id);
        const index = friendIds.indexOf(userId);

        if (index !== -1) {
            return true;
        }

        return false;
    }

    const handleRemoveFriendClick = async () => {
        setrequestInProgress(true);

        const response = await removeFriend(userId);

        if (response.success) {
            const friendship = auth.user.friends.filter((friend) => friend.to_user._id === userId);

            auth.updateUserFriends(false, friendship[0]);
            window.alert('friend removed successfully');
            // addToast('friend removed successfully',{
            //     appearence: 'success',
            // });
        }
        else {
            window.alert('error in adding friend')
            // addToast(response.message, {
            //     appearence: 'error',
            // });
        }

        setrequestInProgress(false);
    };

    const handleaddFriendClick = async () => {
        setrequestInProgress(true);

        const response = await addFriend(userId);

        if (response.success) {
            const { friendship } = response.data;

            auth.updateUserFriends(true, friendship);
            window.alert('friend added successfully');
            // addToast('friend added successfully',{
            //     appearence: 'success',
            // });
        }
        else {
            window.alert('error in adding friend')
            // addToast(response.message, {
            //     appearence: 'error',
            // });
        }

        setrequestInProgress(false);
    };

    return (
        <div className={styles.settings}>
            <div className={styles.imgContainer}>
                <img
                src="https://cdn-icons-png.flaticon.com/128/2922/2922506.png"
                alt=""
                />
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Email</div>
                <div className={styles.fieldValue}>{user.email}</div> 
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Name</div>

                <div className={styles.fieldValue}>{user.name}</div>
            </div>

            <div className={styles.btnGrp}>
                {checkIfUserIsAFriend() ? (
                    <button
                        className={`button ${styles.saveBtn}`}
                        onClick={handleRemoveFriendClick}> 
                            {requestInProgress ? 'Removing... Friend' : 'Remove Friend'}
                    </button>
                )   : (
                    <button
                        className={`button ${styles.saveBtn}`}
                        onClick={handleaddFriendClick}
                        disabled={requestInProgress}>
                            {requestInProgress ? 'Adding friend...' : 'Add Friend'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserProfile;