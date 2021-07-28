import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  return (
    <form className={classes.form}>
        {/*Enter Password*/}
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' />
      </div>
      {/* Change Password Button */}
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
