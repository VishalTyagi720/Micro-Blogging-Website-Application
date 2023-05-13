import { useState } from "react";
import styles from '../styles/home.module.css';
import { addPost } from "../api";
import { usePosts } from "../hooks";
// import { useToasts } from "react-toast-notifications";

const CreatePost = () => {

    const [post, setPost] = useState('');
    const [addingPost, setAddingPost] = useState(false);
    // const {addToast} = useToasts();
    const posts = usePosts();

    const handleAddPostClick = async () => {
        setAddingPost(true);

        const response = await addPost(post);

        if (response.success) {
            setPost('');
            posts.addPostToState(response.data.post);
            window.alert('Post created successfully');
            // addToast('Post created successfully',{
            //     appearence: 'success'
            // });
        }
        else {
            window.alert('error comes');
            // addToast(response.message,{
            //     appearence: 'success'
            // });
        }

        setAddingPost(false);
    };

    return (
        <div className={styles.createPost}>
            <textarea
                className={styles.addPost}
                value={post}
                onChange={(e) => setPost(e.target.value)}>
            </textarea>
            <div>
                <button
                    className={styles.addPostBtn}
                    onClick={handleAddPostClick}
                    disabled={addingPost}>
                        {addingPost ? 'Adding Post...' : 'Add Post'}
                </button>
            </div>
        </div>
    );
};


export default CreatePost;