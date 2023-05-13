import styles from '../styles/settings.module.css';
// import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';
import { useState } from 'react';

const Settings = () => {

    const auth = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(auth.user?.name ? auth.user.name : '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [savingForm, setSavingForm] = useState(false);
    // const {addToast} = useToasts();

    const clearForm = () => {
        setPassword('');
        setConfirmPassword('');
    }

    const updateProfile = async () => {
        setSavingForm(true);

        let error = false;
        if(!name || !password || !confirmPassword) {
            window.alert('Please fill all the fields');
            // addToast('Please fill all the fields', {
            //     appearence : 'error'
            // });

            error = true;
        }

        if (password !== confirmPassword) {
            window.alert('Password and confirmPassword does not match');
            // addToast('Password and confirmPassword does not match', {
            //     appearence: 'error'
            // });
        }

        if (error) {
            return setSavingForm(false);
        }

        const response = await auth.updateUser(auth.user._id, name, password, confirmPassword);

        if (response.success) {
            setEditMode(false);
            setSavingForm(false);
            clearForm();
            window.alert('User updated successfully');
            // return addToast('User updated successfully', {
            //     appearence: 'success'
            // });
        }
        else {
            window.alert('error');
            // addToast(response.message, {
            //     appearence: 'error'
            // });
        }
        setSavingForm(false);
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
            <div className={styles.fieldValue}>{auth.user?.email}</div> 
        </div>

        <div className={styles.field}>
            <div className={styles.fieldLabel}>Name</div>
            {editMode ? (
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                </input>
            )   : (
                <div className={styles.fieldValue}>{auth.user?.name}</div>
            )}
        </div>

        {editMode && (
            <>
                <div className={styles.field}>
                    <div className={styles.fieldLabel}>Password</div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </div>

                <div className={styles.field}>
                    <div className={styles.fieldLabel}>Confirm Password</div>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}>
                    </input>
                </div>
            </>
        )}

        <div className={styles.btnGrp}>
            {editMode ? (
                <>
                    <button className={`button ${styles.saveBtn}`} onClick= {updateProfile} disabled={savingForm}>
                        {savingForm ? 'Saving profile...' : 'Save Profile'}
                    </button>
                    <button className={`button ${styles.editBtn}`} onClick={() => setEditMode(false)}> Go Back </button>
                </>
            )   : (
                <button className={`button ${styles.editBtn}`} onClick={() => setEditMode(true)}>Edit Profile</button>
            )}
        </div>
    </div>
  );
};

export default Settings;